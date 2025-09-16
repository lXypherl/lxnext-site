# LX Next - Asset Inventory

## Project Structure
```
lxnext-site/
├── assets/
│   └── images/
│       ├── ai-agents.png              # AI Agents & Applications service
│       ├── computer-vision.png        # Computer Vision Solutions service
│       ├── creative-ai.png           # Creative AI Applications service
│       ├── hero-background.png       # Hero section background
│       ├── predictive-intelligence.png # Predictive Intelligence service
│       ├── robotics-automation.png   # Robotics & Automation service
│       ├── systems-integration.png   # Systems Integration service
│       └── company-logo.png          # LX Next company logo
├── css/
│   ├── main.css                      # Core design system
│   └── components/
│       ├── hero.css                  # Hero section styles
│       └── navigation.css            # Navigation component styles
├── js/
│   └── main.js                       # Main JavaScript functionality
├── .gitignore                        # Git ignore rules
├── DEPLOYMENT.md                     # Vercel deployment guide
├── README.md                         # Project documentation
├── index.html                        # Main website file
└── vercel.json                       # Vercel configuration
```

## Image Assets
All images have been organized with meaningful names:

### Service Images (300x200px, optimized for web)
- **ai-agents.png**: AI Agents & Applications service illustration
- **computer-vision.png**: Computer Vision Solutions service illustration  
- **creative-ai.png**: Creative AI Applications service illustration
- **predictive-intelligence.png**: Predictive Intelligence service illustration
- **robotics-automation.png**: Robotics & Automation service illustration
- **systems-integration.png**: Systems Integration service illustration

### Brand Assets
- **company-logo.png**: Official LX Next company logo
- **hero-background.png**: Hero section background image

## Company Information
- **Company Info.MD**: Comprehensive company information document located in parent directory
- Contains complete business overview, services, leadership, technology stack, and contact details
- All information is current and integrated into the website

## File Organization Notes
- Removed old backup files (index-old.html)
- Organized all assets into logical directory structure
- Updated all file references in HTML, CSS, and JavaScript
- Maintained clean, production-ready workspace
- All UUID-named files have been renamed with descriptive names

## Usage in Code
- All image paths updated to use `./assets/images/` prefix
- CSS background images use proper relative paths
- JavaScript references updated for new asset structure
- All references are consistent across the codebase

Last Updated: September 16, 2025