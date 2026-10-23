# Diana Taylor — Actress Portfolio

> *"A hundred lives. One unflinching gaze."*

[![Live Demo](https://img.shields.io/badge/Demo-diana--taylor.vercel.app-c88f52?style=flat&logo=vercel)](https://diana-taylor.vercel.app/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-lightgrey.svg)](LICENSE)

An editorial, cinematic portfolio website crafted for film, television, and theatre performer **Diana Taylor**.

Unlike traditional multi-page portfolios, the site is conceived around **"The Stage"** concept: a persistent performer stands centered on stage while the lighting, kinetic monumental typography, and interface choreography shift seamlessly around her scene by scene.

---

## 🎬 Live Preview

Experience the live performance: **[diana-taylor.vercel.app](https://diana-taylor.vercel.app/)**

---

## ✨ Features & Concept

### 🎭 "The Stage" Architectural Concept
- **Persistent Performer**: Diana stands continuously on the stage with dynamic floor reflections and atmospheric stage lighting (wash, beam, spotlight, and grain vignette).
- **Choreographed Scenes**: Instead of separate page loads or standard vertical scrolling, the site behaves like acts in a theatre production.
- **Monumental Kinetic Typography**: Large serif scene typography (`DIANA TAYLOR`, `WORK`, `RANGE`, `REEL`, `ABOUT`, `CURTAIN`) lives physically behind the performer, creating depth through opposing parallax layers.

### 📜 6 Curated Scenes
| Scene | Name | Description |
|:-----:|:-----|:------------|
| **00** | **Arrival** | The grand curtain rise, atmospheric introduction, featured project teaser (*The Silent Room*), and showreel cue. |
| **01** | **Work** | Interactive filmography listing with real-time hover/focus still preview and director credits. |
| **02** | **Range** | Exploration of acting archetypes (*The Ingénue*, *The Fracture*, *The Predator*, *The Penitent*, *The Ghost*), adjusting stage spotlight focus in real-time. |
| **03** | **Reel** | Cinematic video showreel stage with poster frame and interactive playback trigger. |
| **04** | **About** | Biographical editorial profile, portrait photograph, and selected industry recognition/awards. |
| **05** | **Curtain (Contact)** | Agent representation details (*Wilson Enterprises*), direct inquiries, representation links (IMDb, Vimeo, Instagram), and theatrical "Fin." |

### 🕹️ Multi-Modal Navigation
- **Keyboard Navigation**:
  - `→` / `PageDown` or `Space`: Advance to next scene
  - `←` / `PageUp`: Return to previous scene
  - `0` – `5`: Jump directly to scene index
  - `Home` / `End`: Jump to first / final scene
- **Mouse Wheel**: Smooth wheel transitions between scenes with intelligent nested scroll detection (allowing text-heavy scenes to scroll naturally).
- **Touch Gestures**: Horizontal swipe gestures tuned for mobile and tablet devices.
- **Scene Index & Bottom Pager**: Persistent interactive timeline and navigation controls showing current scene number, title, and progress meter.

### 💡 Dynamic Spotlight & Focus Poses
- **Mouse Parallax**: Cursor movement gently displaces the performer figure while moving the background monumental typography in reverse for authentic optical depth.
- **Dynamic Lighting**: Hovering over filmography rows or range buttons refocuses the stage spotlight and performer framing (upper body, mid body, or full figure).

### 🎯 Custom Physics Cursor
- Context-aware custom cursor with smooth trailing spring physics and interactive labels (`View`, `Play`).
- Automatically hidden on touch devices and disabled when `prefers-reduced-motion` is active.

### ♿ Accessibility & Progressive Enhancement
- **No-JS Fallback**: Graceful layout degradation with `.no-js` fallback so content remains completely legible and accessible without JavaScript.
- **Accessible Markup**: Semantic landmarks (`<main>`, `<header>`, `<section>`, `<nav>`, `<footer>`), ARIA attributes (`aria-current`, `aria-hidden`, `aria-labelledby`), and visible focus outlines.
- **Keyboard Skip Link**: Skip directly to main scene content.
- **Reduced Motion Support**: Listens to `(prefers-reduced-motion: reduce)`, disabling intense parallax, fast cuts, and cursor emulation for sensitive users.

---

## 🛠️ Tech Stack

- **HTML5**: Semantic document structure and accessibility hooks.
- **CSS3**: Custom design tokens, CSS Grid & Flexbox, hardware-accelerated transforms, backdrop filters, and responsive typography clamp.
- **Vanilla JavaScript (ES6+)**: Custom scene director, gesture handlers, and parallax loops with zero external framework dependencies or runtime overhead.
- **Typography**:
  - *Cormorant Garamond* (Theatrical, expressive editorial serif)
  - *Jost* (Clean, modern geometric sans-serif)

---

## 📁 Project Structure

```text
Diana-Taylor/
├── assets/
│   └── images/
│       ├── about-portrait.webp          # Editorial portrait photo
│       ├── diana-full-body.png          # Main stage persistent performer asset
│       ├── feature-card.webp            # Featured credit still (Arrival)
│       ├── in-the-absence-of-light.webp # Project still
│       ├── og-img.png                   # Open Graph social sharing image
│       ├── parallel.webp                # Project still
│       ├── reel-thumbnail.webp          # Showreel preview poster
│       ├── salt-and-ember.webp          # Project still
│       ├── the-long-winter.webp         # Project still
│       └── the-silent-room.webp         # Project still
├── index.html                           # Main document and stage structure
├── script.js                            # Scene director, parallax, and navigation
├── style.css                            # Stage lighting, layout, and animations
└── README.md                            # Documentation
```

---

## 🚀 Getting Started

Since this project has **zero build steps and zero dependencies**, you can run it directly in any browser.

### 1. Clone the repository
```bash
git clone https://github.com/m-faisal-askari/Diana-Taylor.git
cd Diana-Taylor
```

### 2. Run locally

You can open `index.html` directly in your browser, or start a local development server:

**Using VS Code Live Server:**
- Right-click `index.html` and choose **"Open with Live Server"**.

**Using Python:**
```bash
# Python 3
python -m http.server 3000
```
Then visit `http://localhost:3000`.

**Using Node.js (npx):**
```bash
npx serve .
```

---

## 🎨 Customization Guide

### Updating Performer Details
- **Bio & Name**: Edit `index.html` inside `<div class="about__body">` and `<h2 class="scene__title">Diana Taylor</h2>`.
- **Filmography Credits**: Update the `<ol class="filmo">` list in `index.html` with title, year, role, and director.
- **Agent & Contact Info**: Update `<footer class="contact">` with actual agency representation, email links, and social accounts.

### Replacing Images
1. **Performer Cutout**: Replace `assets/images/diana-full-body.png` with a transparent full-body portrait cutout of your talent.
2. **Project Stills**: Add 16:9 or 3:2 webp stills inside `assets/images/` and update `data-still="..."` attributes on `.filmo__link` elements.
3. **Showreel Poster**: Update `assets/images/reel-thumbnail.webp` with a high-resolution frame from the actor's reel.

### Connecting a Real Showreel Video
In `index.html` under Scene 03 (`#scene-reel`), replace the placeholder button with an embedded player or modal:
```html
<!-- Example: Modal or embedded Vimeo / YouTube iframe -->
<div class="reel-embed">
  <iframe src="https://player.vimeo.com/video/YOUR_VIDEO_ID" allowfullscreen></iframe>
</div>
```

### Styling & Color Tokens
All core atmospheric variables can be adjusted at the top of `style.css`:
```css
:root {
  --stage:      #0b0a08;   /* Warm near-black stage backdrop */
  --ink:        #e8ddca;   /* Stage-light cream typography */
  --amber:      #c88f52;   /* Warm theatrical spotlight tone */
  --serif:      "Cormorant Garamond", serif;
  --sans:       "Jost", sans-serif;
  --cut:        1.05s;     /* Scene transition timing */
}
```

---

## 📱 Responsive & Cross-Browser Support

- **Desktop**: Full cursor tracking, spotlight hover effects, and keyboard navigation.
- **Tablet / Mobile**: Touch swipe gestures, streamlined responsive layout, and touch-optimized tap targets.
- **Browsers**: Chrome, Edge, Safari, Firefox.

---

## 📄 License

Distributed under the [MIT](LICENSE) License.

---

## 👤 Author

**Faisal Askari**
- GitHub: [@m-faisal-askari](https://github.com/m-faisal-askari)
- Project: [Diana Taylor Portfolio](https://github.com/m-faisal-askari/Diana-Taylor)
