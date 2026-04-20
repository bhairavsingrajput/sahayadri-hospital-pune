// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');
const contactForm = document.getElementById('contactForm');
const newsletterForm = document.querySelector('.newsletter-form');
const showcaseItems = document.querySelectorAll('.showcase-item');
const appointmentForm = document.getElementById('appointmentForm');
const appointmentDoctorField = document.getElementById('appointmentDoctor');
const appointmentDateField = document.getElementById('appointmentDate');
const appointmentResult = document.getElementById('appointmentResult');
const appointmentTriggers = document.querySelectorAll('.appointment-trigger');

// Message Modal Elements
const messageModal = document.getElementById('messageModal');
const quickMessageForm = document.getElementById('quickMessageForm');
const closeModalBtn = document.querySelector('.close-modal');
const sendMessageBtn = document.querySelector('.btn-primary.btn-large');
const callBtn = document.querySelector('.btn-secondary.btn-large');

// Login & Signup Elements
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

async function postToApi(endpoint, payload) {
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
        throw new Error(data.message || 'Request failed');
    }

    return data;
}

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form Submission
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = contactForm.querySelector('input[type="text"]').value.trim();
    const email = contactForm.querySelector('input[type="email"]').value.trim();
    const phone = contactForm.querySelector('input[type="tel"]').value.trim();
    const message = contactForm.querySelector('textarea').value.trim();
    
    // Simple validation
    if (!name || !email || !message) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    try {
        await postToApi('/api/contact', {
            name,
            email,
            phone,
            message
        });

        showNotification('Message saved successfully! We\'ll get back to you soon.', 'success');
        contactForm.reset();
    } catch (error) {
        showNotification(error.message || 'Unable to save your message right now', 'error');
    }
});

// Newsletter Form Submission
newsletterForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = newsletterForm.querySelector('input[type="email"]').value.trim();
    
    if (!email) {
        showNotification('Please enter your email address', 'error');
        return;
    }
    
    try {
        const response = await postToApi('/api/newsletter', { email });
        showNotification(response.message || 'Successfully subscribed to newsletter!', 'success');
        newsletterForm.reset();
    } catch (error) {
        showNotification(error.message || 'Unable to subscribe right now', 'error');
    }
});

// Feature Showcase Interactive
showcaseItems.forEach((item, index) => {
    item.addEventListener('click', (event) => {
        // Remove active class from all items
        showcaseItems.forEach(i => i.classList.remove('active'));
        // Add active class to clicked item
        item.classList.add('active');
        
        // Add ripple effect
        createRipple(item, event);
    });
});

// Auto-rotate showcase items
let currentShowcaseIndex = 0;
setInterval(() => {
    showcaseItems.forEach(i => i.classList.remove('active'));
    currentShowcaseIndex = (currentShowcaseIndex + 1) % showcaseItems.length;
    showcaseItems[currentShowcaseIndex].classList.add('active');
}, 3000);

// Ripple effect for buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        createRipple(this, e);
    });
});

function createRipple(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add ripple styles dynamically
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .showcase-item {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .doctor-card, .feature-item, .about-highlight, .testimonial-card, .appointment-form-card, .appointment-info-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Counter Animation for Stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '');
        }
    }, 16);
}

// Trigger counter animation when stats are visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const statNumbers = entry.target.querySelectorAll('.stat-item h3');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                if (!isNaN(number)) {
                    animateCounter(stat, number);
                }
            });
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-particles');
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Search functionality (if needed)
function initializeSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search doctors, services...';
    searchInput.className = 'search-input';
    
    // Add search styles
    const searchStyles = document.createElement('style');
    searchStyles.textContent = `
        .search-input {
            padding: 12px 20px;
            border: 2px solid var(--border-color);
            border-radius: 25px;
            outline: none;
            transition: all 0.3s ease;
            width: 300px;
            font-family: inherit;
        }
        
        .search-input:focus {
            border-color: var(--primary-color);
            box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        }
        
        @media (max-width: 768px) {
            .search-input {
                width: 200px;
            }
        }
    `;
    document.head.appendChild(searchStyles);
    
    // Add to navigation
    const navActions = document.querySelector('.nav-actions');
    if (navActions) {
        navActions.insertBefore(searchInput, navActions.firstChild);
    }
}

// Initialize search if needed
// initializeSearch();

// Theme Toggle (Optional)
function initializeThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.className = 'theme-toggle';
    
    const themeStyles = document.createElement('style');
    themeStyles.textContent = `
        .theme-toggle {
            background: transparent;
            border: none;
            font-size: 1.2rem;
            cursor: pointer;
            padding: 8px;
            border-radius: 50%;
            transition: all 0.3s ease;
        }
        
        .theme-toggle:hover {
            background: var(--bg-light);
        }
        
        body.dark-theme {
            --text-dark: #F9FAFB;
            --text-light: #D1D5DB;
            --bg-light: #1F2937;
            --bg-white: #111827;
            --border-color: #374151;
        }
    `;
    document.head.appendChild(themeStyles);
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const icon = themeToggle.querySelector('i');
        icon.className = document.body.classList.contains('dark-theme') ? 'fas fa-sun' : 'fas fa-moon';
    });
    
    const navActions = document.querySelector('.nav-actions');
    if (navActions) {
        navActions.appendChild(themeToggle);
    }
}

// Initialize theme toggle if needed
// initializeThemeToggle();

// Message Modal functionality
sendMessageBtn.addEventListener('click', () => {
    messageModal.style.display = 'block';
});

if (callBtn) {
    callBtn.classList.add('appointment-trigger');
    callBtn.addEventListener('click', () => {
        openAppointmentView();
    });
}

appointmentTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
        event.preventDefault();
        openAppointmentView(trigger.dataset.doctor || '');
    });
});

closeModalBtn.addEventListener('click', () => {
    messageModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === messageModal) {
        messageModal.style.display = 'none';
    }
});

// Quick Message Form Submission
quickMessageForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('quickName').value.trim();
    const phone = document.getElementById('quickPhone').value.trim();
    const message = document.getElementById('quickMessage').value.trim();
    
    if (!name || !phone || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    try {
        await postToApi('/api/messages', {
            name,
            phone,
            message,
            source: 'quick-message-modal'
        });

        const whatsappMessage = `New message from Sahayadri Hospital website:\n\nName: ${name}\nPhone: ${phone}\nMessage: ${message}`;
        const whatsappUrl = `https://wa.me/918767131112?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, '_blank');

        showNotification('Message saved and shared on WhatsApp!', 'success');
        quickMessageForm.reset();
        messageModal.style.display = 'none';
    } catch (error) {
        showNotification(error.message || 'Unable to save your quick message right now', 'error');
    }
});

// Modal Functions
function showLoginModal() {
    loginModal.style.display = 'block';
    messageModal.style.display = 'none';
    signupModal.style.display = 'none';
}

function closeLoginModal() {
    loginModal.style.display = 'none';
}

function showSignupModal() {
    signupModal.style.display = 'block';
    loginModal.style.display = 'none';
    messageModal.style.display = 'none';
}

function closeSignupModal() {
    signupModal.style.display = 'none';
}

function closeMessageModal() {
    messageModal.style.display = 'none';
}

function openAppointmentView(preferredDoctor = '') {
    const appointmentSection = document.getElementById('appointment');

    if (appointmentSection) {
        appointmentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    if (preferredDoctor && appointmentDoctorField) {
        appointmentDoctorField.value = preferredDoctor;
    }

    if (appointmentForm) {
        const firstField = appointmentForm.querySelector('input, select, textarea');
        if (firstField) {
            setTimeout(() => {
                firstField.focus();
            }, 450);
        }
    }
}

if (appointmentDateField) {
    appointmentDateField.min = new Date().toISOString().split('T')[0];
}

if (appointmentForm) {
    appointmentForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const patientName = document.getElementById('appointmentName').value.trim();
        const patientPhone = document.getElementById('appointmentPhone').value.trim();
        const doctor = appointmentDoctorField ? appointmentDoctorField.value : '';
        const date = appointmentDateField ? appointmentDateField.value : '';
        const time = document.getElementById('appointmentTime').value;
        const mode = document.getElementById('appointmentMode').value;

        if (!patientName || !patientPhone || !doctor || !date || !time || !mode) {
            showNotification('Please complete all required appointment details', 'error');
            return;
        }

        const chosenDate = new Date(date + 'T00:00:00');
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (chosenDate < today) {
            showNotification('Please choose today or a future date', 'error');
            return;
        }

        const notes = document.getElementById('appointmentNotes').value.trim();

        try {
            const response = await postToApi('/api/appointments', {
                name: patientName,
                phone: patientPhone,
                doctor,
                date,
                time,
                mode,
                notes
            });

            if (appointmentResult) {
                appointmentResult.innerHTML = `Appointment booked successfully. Booking ID: ${response.bookingId}. ${doctor} on ${date} at ${time} (${mode}).`;
                appointmentResult.style.display = 'block';
            }

            showNotification('Appointment booked successfully!', 'success');
            appointmentForm.reset();
            if (appointmentDateField) {
                appointmentDateField.min = new Date().toISOString().split('T')[0];
            }
        } catch (error) {
            showNotification(error.message || 'Unable to book appointment right now', 'error');
        }
    });
}

// Login Form Submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    if (!email || !password) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    try {
        await postToApi('/api/auth/login', {
            email,
            password,
            rememberMe
        });

        showNotification('Login successful!', 'success');
        loginForm.reset();
        closeLoginModal();
    } catch (error) {
        showNotification(error.message || 'Login failed', 'error');
    }
});

// Signup Form Submission
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const phone = document.getElementById('signupPhone').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;
    
    if (!name || !email || !phone || !password || !confirmPassword) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }
    
    if (!agreeTerms) {
        showNotification('Please agree to terms and conditions', 'error');
        return;
    }
    
    try {
        await postToApi('/api/auth/signup', {
            name,
            email,
            phone,
            password
        });

        showNotification('Registration successful! You can now log in.', 'success');
        signupForm.reset();
        closeSignupModal();
    } catch (error) {
        showNotification(error.message || 'Registration failed', 'error');
    }
});

console.log('Sahayadri Enhanced Website Loaded Successfully!');
