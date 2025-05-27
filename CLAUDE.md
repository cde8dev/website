# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Code 8 is a professional business website for blockchain development and advisory services. The site showcases expertise in Rust, Zig, and blockchain technologies with a focus on high-performance systems and security.

## Architecture

### Technology Stack
- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with CSS variables for theming
- **Build**: Static site with npm scripts for development
- **Fonts**: Google Fonts (JetBrains Mono, Inter)

### File Structure
```
/
├── index.html          # Homepage with hero section and overview
├── services.html       # Detailed services breakdown
├── expertise.html      # Technical skills and proficiency
├── portfolio.html      # Case studies and project showcases
├── about.html         # Personal philosophy and background
├── contact.html       # Contact form and engagement options
├── styles/
│   └── main.css       # Complete stylesheet with responsive design
├── scripts/
│   ├── main.js        # Core functionality and navigation
│   └── contact.js     # Contact form handling
└── package.json       # Project configuration and scripts
```

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Run tests
npm run test
```

## Design System

### Color Scheme (Dark Theme)
- Primary Background: `#0a0a0a`
- Secondary Background: `#1a1a1a` 
- Tertiary Background: `#2a2a2a`
- Primary Accent: `#00ff88` (green)
- Secondary Accent: `#0088ff` (blue)
- Text colors: White (#ffffff) to gray (#808080)

### Typography
- Monospace: JetBrains Mono (code, terminals, metrics)
- Sans-serif: Inter (body text, headings)

### Key Visual Elements
- Animated terminal displays
- Network visualization diagrams
- Gradient text effects
- Hover animations and transitions
- Mobile-responsive grid layouts

## Content Strategy

### Brand Positioning
- Expert-level blockchain developer (not "just a developer")
- 20+ years systems engineering experience
- Rust 🦀 and Zig ⚡ specialist
- Focus on performance, security, and scalability

### Technical Credibility Signals
- Specific metrics (15,000+ nodes, <2s finality)
- Real project achievements
- Technology-specific expertise levels
- Detailed case studies with results

### Key Messaging
- "More than just code" - creator mindset
- Balance of theory and practice
- Security-first development approach
- Performance without compromise

## Code Conventions

### CSS
- Use CSS custom properties (variables) for consistency
- Mobile-first responsive design approach
- Semantic class naming (BEM-like structure)
- Smooth transitions and animations

### JavaScript
- Vanilla JS (no frameworks)
- Progressive enhancement
- Event delegation for performance
- Graceful degradation for accessibility

### HTML
- Semantic markup structure
- Accessibility considerations (ARIA labels, alt text)
- SEO-optimized meta tags and structure
- Fast-loading optimizations

## Contact Form Behavior
- Client-side validation with visual feedback
- mailto: link generation for compatibility
- Professional project categorization
- Technology selection checkboxes

## Performance Considerations
- Minimal dependencies (no heavy frameworks)
- Optimized images and assets
- CSS/JS minification for production
- Mobile-responsive without compromising desktop experience

## Brand Voice
- Technical but accessible
- Confident without being arrogant
- Results-focused with specific metrics
- Professional with personality

When making changes to this website, maintain the technical credibility while ensuring the site remains accessible to potential clients who may not have deep technical knowledge.