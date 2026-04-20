# Sahayadri Hospital Pune - Modern Healthcare Platform

A stunning, modern healthcare website built with HTML, CSS, and JavaScript. This enhanced version of Sahayadri Hospital Pune features beautiful animations, responsive design, and an exceptional user experience.

## 🌟 Features

### Design & UI
- **Modern Gradient Design** - Beautiful color gradients and smooth animations
- **Responsive Layout** - Perfect on all devices (mobile, tablet, desktop)
- **Interactive Elements** - Hover effects, transitions, and micro-interactions
- **Professional Typography** - Clean, readable fonts with Inter font family
- **Glass Morphism Effects** - Modern frosted glass navigation bar

### Functionality
- **Smooth Scrolling** - Seamless navigation between sections
- **Mobile Menu** - Hamburger menu for mobile devices
- **Contact Forms** - Working contact and newsletter forms with validation
- **Interactive Features** - Auto-rotating showcase items, ripple effects
- **Scroll Animations** - Elements animate in as you scroll
- **Counter Animations** - Animated statistics counters
- **Parallax Effects** - Beautiful parallax scrolling in hero section

### Sections
- **Hero Section** - Eye-catching landing with call-to-action buttons
- **Services Grid** - Six healthcare service cards with hover effects
- **Doctors Section** - Professional doctor profiles with ratings
- **Features Section** - Why choose Prescripto with interactive showcase
- **Contact Section** - Contact form and information
- **Footer** - Complete footer with newsletter subscription

## 🚀 Getting Started

### Prerequisites
- A modern web browser
- Node.js 18+
- MongoDB (Atlas or local)

### Installation

1. **Clone or download the files**
   ```bash
   # If using git
   git clone <repository-url>
   cd prescripto-enhanced
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   copy .env.example .env
   ```

   Update `.env` with your MongoDB URI if needed.

4. **Start the development server**
   ```bash
   npm run dev
   ```
   
   Or simply open `index.html` in your browser.

### API + MongoDB Data Storage
All form submissions are saved into MongoDB via Express API endpoints.

Collections used:
- `appointments`
- `contact_messages`
- `quick_messages`
- `newsletter_subscriptions`
- `users`
- `login_attempts`

Health check:
```bash
http://localhost:3000/api/health
```

## ▲ Deploy On Vercel

### Option 1: Deploy from GitHub (recommended)
1. Push this project to a GitHub repository.
2. Go to [https://vercel.com/new](https://vercel.com/new).
3. Import your repository.
4. Keep the default settings (this is a static site).
5. Click **Deploy**.

### Option 2: Deploy with Vercel CLI
```bash
npm i -g vercel
vercel
```

Then follow the CLI prompts:
- Set up and deploy: **Y**
- Link to existing project: **N** (or **Y** if already linked)
- Deploy path: current folder

For production deployment:
```bash
vercel --prod
```

### Included Vercel config
This project includes `vercel.json` for static routing. If you deploy MongoDB-backed APIs on Vercel, add serverless API functions or deploy this Node server to a Node host (Render/Railway/VM).

## 📁 Project Structure

```
sahayadri-enhanced/
├── index.html          # Main HTML file
├── styles.css          # Complete CSS with animations
├── script.js           # Interactive JavaScript functionality
├── package.json        # Project dependencies
└── README.md          # This file
```

## 🎨 Customization

### Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #4F46E5;
    --secondary-color: #10B981;
    --accent-color: #F59E0B;
    /* ... other variables */
}
```

### Fonts
The website uses Inter font from Google Fonts. You can change it in the HTML head:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
```

### Content
All content is easily editable in the HTML file:
- Update text content in respective sections
- Change images by updating `src` attributes
- Modify links and contact information

## 🔧 Features Breakdown

### Navigation
- Fixed header with blur effect
- Smooth scroll to sections
- Mobile-responsive hamburger menu
- Scroll-based styling changes

### Hero Section
- Gradient background with floating particles
- Animated statistics counters
- Interactive consultation card
- Call-to-action buttons with ripple effects

### Service Cards
- Hover animations with border effects
- Icon animations on hover
- Smooth transitions
- Grid layout that adapts to screen size

### Doctor Profiles
- Image hover effects with overlay
- Rating and experience display
- Professional card design
- View profile functionality

### Contact Forms
- Input validation
- Success/error notifications
- Smooth focus transitions
- Newsletter subscription

### Animations
- Intersection Observer for scroll animations
- CSS keyframe animations
- Parallax scrolling effects
- Counter animations
- Ripple effects on buttons

## 📱 Responsive Design

The website is fully responsive with breakpoints at:
- **Desktop**: > 768px
- **Tablet**: 768px - 480px  
- **Mobile**: < 480px

## 🌐 Browser Support

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge
- Modern mobile browsers

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support or questions:
- Email: bhairavrajput83@gmail.com
- Create an issue in the repository

---

**Built with ❤️ by Bhairavsing**
