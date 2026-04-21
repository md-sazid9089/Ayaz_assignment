# Product Price Tracking System

A modern, responsive web application for tracking product prices across e-commerce platforms. Built with **ReactJS** and **Tailwind CSS**, this application helps users monitor prices, view price history, and receive alerts when prices drop.

## Features

✨ **Key Features:**
- 🔍 **Real-time Price Tracking** - Monitor product prices automatically
- 📊 **Price History Visualization** - View detailed charts and trends
- 🔔 **Smart Email Alerts** - Get notified when prices drop
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 🎨 **Modern UI** - Clean, professional, and beginner-friendly interface
- ⚡ **Smooth Animations** - Subtle transitions and hover effects

## Project Structure

```
product-price-tracking-system/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx        # Navigation bar with mobile menu
│   │   ├── Hero.jsx          # Hero section with CTA buttons
│   │   ├── Features.jsx      # Features showcase with cards
│   │   ├── HowItWorks.jsx    # How it works section (3 steps)
│   │   └── Footer.jsx        # Footer with links and info
│   ├── App.jsx               # Main app component
│   ├── main.jsx              # React entry point
│   └── index.css             # Tailwind CSS styles
├── index.html                # HTML entry point
├── package.json              # Project dependencies
├── tailwind.config.js        # Tailwind CSS configuration
├── postcss.config.js         # PostCSS configuration
├── vite.config.js            # Vite build configuration
└── .gitignore                # Git ignore rules
```

## Color Scheme

The application uses a warm, professional color palette:
- **Primary Color**: `#533638` (Deep Cocoa Brown)
- **Accent Color**: `#F7B9C4` (Dusty Blush Pink)
- **Light Background**: `#F5EDEC` (Warm Off-white)

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```
   The application will open at `http://localhost:3000`

3. **Build for Production**
   ```bash
   npm run build
   ```
   Output will be in the `dist/` folder

4. **Preview Production Build**
   ```bash
   npm run preview
   ```

## Components Overview

### Navbar
- Sticky navigation with brand logo
- Responsive mobile menu with hamburger icon
- Navigation links: Home, Features, About, Contact
- Sign In button
- Smooth animations on hover

### Hero Section
- Bold, eye-catching heading
- Compelling subheading
- Call-to-action buttons: "Get Started" and "Learn More"
- Decorative wave element

### Features Section
- 4 feature cards with icons from lucide-react
- Each card includes:
  - Icon
  - Title
  - Description
  - Hover effects and elevation
- Responsive grid layout

### How It Works Section
- 3-step process visualization
- Step icons with circle design
- Visual connectors between steps
- Informational box with CTA

### Footer
- Multi-column layout
- Brand information
- Quick links
- Company links
- Contact information
- Copyright notice
- Responsive design

## Technologies Used

- **React 18** - UI library
- **Tailwind CSS 3** - Utility-first CSS framework
- **Vite** - Build tool and dev server
- **Lucide React** - Icon library
- **PostCSS & Autoprefixer** - CSS processing

## Responsive Design

The application is fully responsive with breakpoints for:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

All components adapt seamlessly to different screen sizes using Tailwind's responsive classes.

## Customization

### Changing Colors
Edit `tailwind.config.js` to modify the color scheme:
```javascript
colors: {
  primary: "#533638",    // Change primary color
  accent: "#F7B9C4",     // Change accent color
  light: "#F5EDEC",      // Change light background
}
```

### Adding Content
Edit component files in `src/components/` to update:
- Feature descriptions
- Navigation items
- Footer links
- Social media links

### Styling
Tailwind CSS utility classes are used throughout. Modify in:
- Component `.jsx` files using className
- `src/index.css` for custom utilities

## Performance Optimizations

- Optimized images and SVGs
- Smooth transitions without performance impact
- Lazy loading ready
- Mobile-first responsive design
- Minimal CSS bundle with Tailwind CSS

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- Add user authentication
- Integrate backend API
- Add product search functionality
- Implement price comparison
- Add user dashboard
- Create mobile app version

## License

This project is created for educational purposes as a university project.

## Author

Created as a modern frontend example for the Product Price Tracking System.

---

**Made with ❤️ for smart shoppers**
