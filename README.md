# Modern Portfolio Website

A beautiful, responsive, and interactive portfolio website built with HTML, CSS, and JavaScript. This portfolio features a modern design with dark/light theme support, smooth animations, and excellent user experience.

## ✨ Features

- **Modern Design**: Clean and professional layout with gradient accents
- **Dark/Light Theme**: Toggle between themes with persistent storage
- **Responsive Design**: Works perfectly on all devices and screen sizes
- **Smooth Animations**: Intersection Observer animations and hover effects
- **Interactive Elements**: Animated counters, skill bars, and particle effects
- **Contact Form**: Functional contact form with validation
- **Mobile Navigation**: Hamburger menu for mobile devices
- **Performance Optimized**: Throttled scroll events and optimized animations
- **Accessibility**: Keyboard navigation and screen reader friendly
- **PWA Ready**: Service worker support for offline functionality

## 🚀 Quick Start

1. **Clone or Download** the files to your local machine
2. **Open `index.html`** in your web browser
3. **Customize** the content to match your information
4. **Deploy** to your preferred hosting platform

## 📁 File Structure

```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 🎨 Customization Guide

### 1. Personal Information

Edit the following sections in `index.html`:

#### Hero Section
```html
<h1 class="hero-title">
    Hi, I'm <span class="highlight">Your Name</span>
</h1>
<h2 class="hero-subtitle">Data Science Engineer & Frontend Developer</h2>
```

#### About Section
```html
<p>
    I am a dedicated Data Science Engineer with expertise in machine learning...
</p>
```

#### Contact Information
```html
<p>your.email@example.com</p>
<p>+91 1234567890</p>
<p>Your City, State</p>
```

### 2. Skills Section

Update the skills in `index.html`:

```html
<div class="skill-item">
    <div class="skill-icon">
        <i class="fab fa-python"></i>
    </div>
    <div class="skill-info">
        <h4>Python</h4>
        <div class="skill-bar">
            <div class="skill-progress" data-width="95"></div>
        </div>
    </div>
</div>
```

**Available Icons**: Use Font Awesome icons from [FontAwesome](https://fontawesome.com/icons)

### 3. Projects Section

Replace the project cards with your own:

```html
<div class="project-card">
    <div class="project-image">
        <div class="project-overlay">
            <div class="project-links">
                <a href="your-project-url" class="project-link">
                    <i class="fas fa-external-link-alt"></i>
                </a>
                <a href="your-github-url" class="project-link">
                    <i class="fab fa-github"></i>
                </a>
            </div>
        </div>
        <i class="fas fa-code project-icon"></i>
    </div>
    <div class="project-content">
        <h3>Your Project Name</h3>
        <p>Project description goes here...</p>
        <div class="project-tech">
            <span class="tech-tag">HTML</span>
            <span class="tech-tag">CSS</span>
            <span class="tech-tag">JavaScript</span>
        </div>
    </div>
</div>
```

### 4. Experience Section

Update the timeline with your work experience:

```html
<div class="timeline-item">
    <div class="timeline-dot"></div>
    <div class="timeline-content">
        <div class="timeline-date">2023 - Present</div>
        <h3>Your Job Title</h3>
        <h4>Company Name</h4>
        <p>Job description and responsibilities...</p>
        <div class="timeline-tech">
            <span class="tech-tag">Technology 1</span>
            <span class="tech-tag">Technology 2</span>
        </div>
    </div>
</div>
```

### 5. Colors and Theme

Customize colors in `styles.css`:

```css
:root {
    --primary-color: #2563eb;      /* Main brand color */
    --secondary-color: #7c3aed;    /* Secondary color */
    --accent-color: #06b6d4;       /* Accent color */
    --text-primary: #1f2937;       /* Primary text color */
    --text-secondary: #6b7280;     /* Secondary text color */
    --bg-primary: #ffffff;         /* Primary background */
    --bg-secondary: #f9fafb;       /* Secondary background */
}
```

### 6. Profile Image

Replace the placeholder icon with your actual image:

```html
<div class="profile-image">
    <img src="path/to/your/image.jpg" alt="Your Name">
</div>
```

Add this CSS to style the image:

```css
.profile-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
}
```

## 🌐 Deployment Options

### 1. GitHub Pages (Free)

1. Create a new repository on GitHub
2. Upload your portfolio files
3. Go to Settings > Pages
4. Select source branch (usually `main`)
5. Your site will be available at `https://username.github.io/repository-name`

### 2. Netlify (Free)

1. Sign up for [Netlify](https://netlify.com)
2. Drag and drop your portfolio folder
3. Your site will be deployed instantly
4. Get a custom domain or use the provided URL

### 3. Vercel (Free)

1. Sign up for [Vercel](https://vercel.com)
2. Connect your GitHub repository
3. Deploy automatically on every push
4. Get a custom domain and SSL certificate

### 4. Traditional Web Hosting

Upload the files to your web hosting provider via FTP or file manager.

## 🔧 Advanced Customization

### Adding New Sections

1. Add the HTML structure in `index.html`
2. Add corresponding CSS in `styles.css`
3. Add any JavaScript functionality in `script.js`

### Custom Animations

Add new animations in `styles.css`:

```css
@keyframes your-animation {
    0% { /* initial state */ }
    100% { /* final state */ }
}

.your-element {
    animation: your-animation 2s ease-in-out infinite;
}
```

### Form Integration

To make the contact form functional, replace the form handling in `script.js`:

```javascript
function handleContactForm(e) {
    e.preventDefault();
    
    // Add your form submission logic here
    // Example: Send to email service or API
    
    const formData = new FormData(contactForm);
    // Process form data...
}
```

## 📱 Mobile Optimization

The portfolio is fully responsive and optimized for mobile devices. Key features:

- Touch-friendly navigation
- Optimized images and animations
- Readable typography on small screens
- Swipe gestures support

## 🎯 Performance Tips

1. **Optimize Images**: Use WebP format and compress images
2. **Minimize CSS/JS**: Use minified versions for production
3. **Enable Caching**: Set appropriate cache headers
4. **Use CDN**: Serve Font Awesome from CDN (already implemented)

## 🔍 SEO Optimization

1. **Meta Tags**: Update meta description and keywords
2. **Structured Data**: Add JSON-LD schema markup
3. **Alt Text**: Add descriptive alt text to images
4. **Sitemap**: Create a sitemap.xml file
5. **Robots.txt**: Add robots.txt file

## 🛠️ Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and submit pull requests for improvements.

## 📞 Support

If you need help customizing or deploying your portfolio, feel free to reach out!

---

**Made with ❤️ for developers and designers** 