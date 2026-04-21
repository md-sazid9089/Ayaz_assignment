# Quick Start Guide

## 🚀 Getting Started in 3 Steps

### Step 1: Install Dependencies
Open your terminal in the project folder and run:
```bash
npm install
```
This will install React, Tailwind CSS, and all required dependencies.

### Step 2: Start the Development Server
```bash
npm run dev
```
The application will automatically open in your browser at `http://localhost:3000`

### Step 3: Start Customizing
Edit files in the `src/components/` folder to customize the content:
- `Navbar.jsx` - Change navigation items, logo text, button labels
- `Hero.jsx` - Update heading, description, button text
- `Features.jsx` - Modify feature cards and descriptions
- `HowItWorks.jsx` - Edit the 3-step process
- `Footer.jsx` - Update footer links and contact info

## 📱 Responsive Testing

The page is fully responsive. To test on different devices:
- Press `F12` to open Developer Tools
- Click the device toggle icon to test different screen sizes
- Test on: Mobile, Tablet, and Desktop views

## 🎨 Customizing Colors

Edit `tailwind.config.js`:
```javascript
colors: {
  primary: "#533638",    // Deep Cocoa Brown
  accent: "#F7B9C4",     // Dusty Blush Pink
  light: "#F5EDEC",      // Warm Off-white
}
```

## 📦 Building for Production

When ready to deploy:
```bash
npm run build
```

The `dist/` folder will contain your production-ready files.

## 🔧 Useful Tailwind Classes Used

- `.btn-primary` - Primary button style
- `.btn-secondary` - Secondary button style
- `.card-hover` - Card hover animation
- Responsive prefixes: `md:` (tablet), `lg:` (desktop)

## 📚 File Descriptions

| File | Purpose |
|------|---------|
| `Navbar.jsx` | Navigation with mobile menu |
| `Hero.jsx` | Main landing section |
| `Features.jsx` | Feature cards showcase |
| `HowItWorks.jsx` | 3-step process guide |
| `Footer.jsx` | Footer with links |
| `App.jsx` | Main component combining all sections |
| `index.html` | HTML entry point |

## 💡 Tips

- Use lucide-react icons for custom icons: https://lucide.dev
- Tailwind docs: https://tailwindcss.com/docs
- React docs: https://react.dev

## ❓ Common Issues

**Issue**: Port 3000 already in use
**Solution**: Change port in `vite.config.js` or close the app using port 3000

**Issue**: Styles not showing
**Solution**: Make sure to run `npm install` before starting the dev server

## 🎯 Next Steps

1. Replace "PriceTracker" with your actual project name
2. Update feature descriptions
3. Add your contact information
4. Deploy to hosting (Vercel, Netlify, GitHub Pages, etc.)

Happy coding! 🎉
