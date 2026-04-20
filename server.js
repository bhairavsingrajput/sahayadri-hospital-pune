const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const { MongoClient } = require('mongodb');

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 3000);
const DB_NAME = process.env.MONGODB_DB || 'hospital_portal';

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname));

let cachedDb = null;
let cachedClient = null;

function buildMongoUriCandidates() {
    const fromEnv = [process.env.MONGODB_URI].filter(Boolean);

    return fromEnv;
}

async function getDb() {
    if (cachedDb) {
        return cachedDb;
    }

    const candidates = buildMongoUriCandidates();
    let lastError = null;

    for (const uri of candidates) {
        try {
            const client = new MongoClient(uri, {
                serverSelectionTimeoutMS: 5000,
                connectTimeoutMS: 5000
            });

            await client.connect();
            const db = client.db(DB_NAME);

            cachedClient = client;
            cachedDb = db;

            console.log(`Connected to MongoDB using URI: ${uri}`);
            return db;
        } catch (err) {
            lastError = err;
            console.warn(`MongoDB connection failed for ${uri}: ${err.message}`);
        }
    }

    throw new Error(`Unable to connect to MongoDB. Last error: ${lastError ? lastError.message : 'Unknown error'}`);
}

function requireFields(payload, fields) {
    for (const field of fields) {
        if (!payload[field] || String(payload[field]).trim() === '') {
            return field;
        }
    }
    return null;
}

function safeText(value) {
    return String(value || '').trim();
}

app.get('/api/health', async (req, res) => {
    try {
        const db = await getDb();
        await db.command({ ping: 1 });
        return res.json({ ok: true, database: DB_NAME });
    } catch (err) {
        return res.status(500).json({ ok: false, message: err.message });
    }
});

app.post('/api/contact', async (req, res) => {
    try {
        const missing = requireFields(req.body, ['name', 'email', 'message']);
        if (missing) {
            return res.status(400).json({ ok: false, message: `Missing field: ${missing}` });
        }

        const db = await getDb();
        const payload = {
            name: safeText(req.body.name),
            email: safeText(req.body.email).toLowerCase(),
            phone: safeText(req.body.phone),
            message: safeText(req.body.message),
            createdAt: new Date()
        };

        const result = await db.collection('contact_messages').insertOne(payload);
        return res.status(201).json({ ok: true, id: result.insertedId });
    } catch (err) {
        return res.status(500).json({ ok: false, message: err.message });
    }
});

app.post('/api/newsletter', async (req, res) => {
    try {
        const missing = requireFields(req.body, ['email']);
        if (missing) {
            return res.status(400).json({ ok: false, message: 'Email is required' });
        }

        const email = safeText(req.body.email).toLowerCase();
        const db = await getDb();
        const existing = await db.collection('newsletter_subscriptions').findOne({ email });

        if (existing) {
            return res.status(200).json({ ok: true, message: 'Already subscribed' });
        }

        const result = await db.collection('newsletter_subscriptions').insertOne({
            email,
            createdAt: new Date()
        });

        return res.status(201).json({ ok: true, id: result.insertedId });
    } catch (err) {
        return res.status(500).json({ ok: false, message: err.message });
    }
});

app.post('/api/messages', async (req, res) => {
    try {
        const missing = requireFields(req.body, ['name', 'phone', 'message']);
        if (missing) {
            return res.status(400).json({ ok: false, message: `Missing field: ${missing}` });
        }

        const db = await getDb();
        const payload = {
            name: safeText(req.body.name),
            phone: safeText(req.body.phone),
            message: safeText(req.body.message),
            source: safeText(req.body.source) || 'quick-message-modal',
            createdAt: new Date()
        };

        const result = await db.collection('quick_messages').insertOne(payload);
        return res.status(201).json({ ok: true, id: result.insertedId });
    } catch (err) {
        return res.status(500).json({ ok: false, message: err.message });
    }
});

app.post('/api/appointments', async (req, res) => {
    try {
        const missing = requireFields(req.body, ['name', 'phone', 'doctor', 'date', 'time', 'mode']);
        if (missing) {
            return res.status(400).json({ ok: false, message: `Missing field: ${missing}` });
        }

        const db = await getDb();
        const bookingId = `SAH-${Date.now().toString().slice(-6)}`;

        const payload = {
            bookingId,
            patientName: safeText(req.body.name),
            patientPhone: safeText(req.body.phone),
            doctor: safeText(req.body.doctor),
            date: safeText(req.body.date),
            time: safeText(req.body.time),
            mode: safeText(req.body.mode),
            notes: safeText(req.body.notes),
            status: 'booked',
            createdAt: new Date()
        };

        const result = await db.collection('appointments').insertOne(payload);
        return res.status(201).json({ ok: true, id: result.insertedId, bookingId });
    } catch (err) {
        return res.status(500).json({ ok: false, message: err.message });
    }
});

app.post('/api/auth/signup', async (req, res) => {
    try {
        const missing = requireFields(req.body, ['name', 'email', 'phone', 'password']);
        if (missing) {
            return res.status(400).json({ ok: false, message: `Missing field: ${missing}` });
        }

        const email = safeText(req.body.email).toLowerCase();
        const db = await getDb();
        const existing = await db.collection('users').findOne({ email });

        if (existing) {
            return res.status(409).json({ ok: false, message: 'Email already registered' });
        }

        const passwordHash = await bcrypt.hash(String(req.body.password), 10);

        const result = await db.collection('users').insertOne({
            name: safeText(req.body.name),
            email,
            phone: safeText(req.body.phone),
            passwordHash,
            createdAt: new Date()
        });

        return res.status(201).json({ ok: true, id: result.insertedId });
    } catch (err) {
        return res.status(500).json({ ok: false, message: err.message });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const missing = requireFields(req.body, ['email', 'password']);
        if (missing) {
            return res.status(400).json({ ok: false, message: `Missing field: ${missing}` });
        }

        const email = safeText(req.body.email).toLowerCase();
        const password = String(req.body.password);
        const db = await getDb();

        const user = await db.collection('users').findOne({ email });
        const isValid = !!(user && (await bcrypt.compare(password, user.passwordHash)));

        await db.collection('login_attempts').insertOne({
            email,
            success: isValid,
            rememberMe: Boolean(req.body.rememberMe),
            createdAt: new Date(),
            userAgent: safeText(req.headers['user-agent'])
        });

        if (!isValid) {
            return res.status(401).json({ ok: false, message: 'Invalid email or password' });
        }

        return res.json({ ok: true, message: 'Login successful' });
    } catch (err) {
        return res.status(500).json({ ok: false, message: err.message });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// For Vercel serverless deployment
module.exports = app;

// For local development
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });

    process.on('SIGINT', async () => {
        if (cachedClient) {
            await cachedClient.close();
        }
        process.exit(0);
    });
}
