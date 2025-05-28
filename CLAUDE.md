# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Code 8 is a professional business website for blockchain development and advisory services. The site showcases expertise in Rust, Zig, and blockchain technologies with a focus on high-performance systems and security.

## Development Commands

```bash
# Install dependencies (required before first run)
npm install

# Start development server on http://localhost:3000
npm run dev

# Build for production (currently placeholder - no actual minification)
npm run build

# Lint code (currently placeholder)
npm run lint

# Run tests (currently placeholder)
npm run test
```

## Architecture

### Technology Stack
- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with CSS variables for theming
- **Build**: Static site with live-server for development
- **Dependencies**: Minimal (only live-server for dev)
- **No Framework**: Pure vanilla implementation for performance

### JavaScript Architecture
- **Modular Structure**: Separated by concern (main.js for global, contact.js for forms)
- **Event-Driven**: DOM manipulation with event delegation
- **Performance**: Intersection Observer for lazy animations
- **State Management**: DOM-based using CSS classes (.active, .visible)
- **No Build Process**: Direct ES6+ modules, no transpilation

### CSS Architecture  
- **Single Stylesheet**: All styles in main.css for simplicity
- **CSS Variables**: Consistent theming via custom properties
- **Mobile-First**: Breakpoint at 768px
- **BEM-like Naming**: Component-based class names
- **Advanced Effects**: Gradients, animations, backdrop-filter

### Cross-File Relationships
- **Global Scripts**: main.js loaded on every page for navigation
- **Page-Specific**: contact.js only on contact.html
- **Form Handling**: Client-side validation with mailto: fallback (no backend)
- **Font Loading**: Google Fonts CDN (JetBrains Mono, Inter)

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