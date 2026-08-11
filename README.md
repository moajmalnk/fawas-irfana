# Golden Dreamscape Invites

# Role & Objective

Act as an expert in immersive frontend engineering, UI/UX design, and 3D web integration. Build a premium, single-page wedding invitation website that is highly animated, features sophisticated 3D elements, and integrates a professional, AI-generated cartoon-style portrait, all while maintaining a clean, structured, and professional demeanor. The core of this is the "simplicity of motion"—controlled, deliberate, and elegant, never frantic.

# Design System & Aesthetics

- **Core Aesthetic**: Sophisticated "3D Dreamscape." Think curated, textured 3D models (like soft clay, frosted glass, and polished gold leaf) placed in a serene, clean environment.

- **AI Cartoon Portrait**: Instead of static photos, use a high-fidelity, polished, **premium-tier AI-generated cartoon portrait** (highly stylized Pixar-level quality, not childish doodles) of the couple. They must wear elegant, detailed traditional Kerala wedding attire.

- **Color Palette (Refined)**:

  - Background: Clean, premium matte cream/off-white (`#FBFBF9`).

  - Primary Text: Deep forest green (`#2C4C3B`).

  - Metallic Accents: Polished, reflective gold (`#E3B778`).

  - Botanical Elements: Detailed 3D rendered sage-green leaves and a few golden-threaded leaves.

- **Typography**: Luxurious Script font for the names with subtle 3D text properties (like gold leaf plating), and clean Sans-serif for details. 

- **Animations (Crucial for "More but Simple")**:

  - **Parallax**: Use deep layer parallax on the background and foreground botanical elements, creating depth as the user scrolls.

  - **Particle System**: Subtly glowing gold dust particles gently drift across the screen.

  - **3D Model Hover Effects**: Make key 3D elements subtly rotate or pulse when hovered.

  - **Transition**: Everything should fade and slide into place with a "cushioned" easing function (very smooth).

# Content & Layout Structure

## 1. Hero / Header Section

- **Background**: A deep 3D parallax background showing stylized, layered, polished gold and forest green leaves.

- **Top Motif**: A central, *3D rendered, polished gold* Bismillah calligraphy element.

- **Hosts (Professional Overlay)**:

  - Rendered on a clear, *frosted glass* (neumorphic style) panel that floats with a subtle bounce animation over the 3D background.

  - Text: "Mr. Ali Haji & Mrs. Kadheeja" (Prominent serif font)

  - Subtext: "Kottakkulath House, Punnathala PO, Puthanathani"

  - Invitation Message: "Cordially invite your esteemed presence with family on the auspicious occasion of the marriage of our son"

## 2. The Couple Section (3D & AI Cartoon Focus)

Create a beautifully centered, single-column showcase layout. 

- **AI Portrait Showcase**: 

  - On a large central pedestal with a glowing gold rim, place a **beautifully rendered, high-quality 3D AI cartoon diorama** of Muhammed Fawas Wafy and Irzana Mahdiyya. (Prompt example for model: A handsome young groom, Muhammed, in an elegant ivory Kerala kasavu mundu and shirt, and a beautiful bride, Irzana, in a matching ivory and gold kasavu sari with traditional jewelry, rendered in a detailed, professional AI cartoon style, standing together in a simple, romantic pose).

- **Names (3D Text)**: 

  - "Muhammed Fawas Wafy" (Script, large 3D gold text)

  - Divider: "weds" (Small serif, italicized, floating)

  - "Irzana Mahdiyya" (Script, large 3D gold text)

- **Bride's Family Details**: 

  - Placed elegantly below the bride's name in a clean, sans-serif font: "D/o. Abdul Majeed & Umaiba, Perum Kuzhiyil (H)"

## 3. Event Details Section (3D & Animated Focus)

Create a 3D icon block layout. Each detail card uses a floating glass panel with a 3D model icon.

- **Date Block**: 

  - Icon: A **detailed, high-poly 3D desk calendar model**. *Animation*: The calendar pages *gently flip* and settle on the '16' page when the section comes into view.

  - Main text: "16" (Large, stylized)

  - Subtext: "Sunday, August 2026"

  - Islamic Date: "(1448 Rabi Al Awwal 3)"

- **Venue Block**: 

  - Icon: A **detailed, architectural 3D miniature model** of a modern CV Auditorium. *Animation*: The auditorium model *slowly rotates 360 degrees* on its axis.

  - Main text: "CV Auditorium"

  - Subtext: "Athirumada"

- **Time Block**: 

  - Icon: A **classic, detailed 3D analog grandfather clock model**. *Animation*: The clock hands *slowly sweep* until they point to 11:00 am and 02:00 pm respectively.

  - Main text: "11:00 am to 02:00 pm"

## 4. Footer Section

- **Background**: The 3D botanical scene from the hero section returns, with the leaves *gently swaying* in a slow breeze animation.

- **Text**: "Best compliments from: Friends & Relatives" (Centered, serif font)

- **Final Motif**: A **slowly rotating, pulsing 3D gold heart model** floating gently below the text.

# Technical Constraints & Instructions

- Output clean, modular React/Tailwind CSS code.

- Use a robust 3D library like React-Three-Fiber or Three.js.

- For animations, use Framer Motion or Framer Motion 3D, and configure **easing curves that feel "natural" and premium**, not robotic.

- Ensure strict mobile responsiveness. 3D models must scale perfectly, and the layout must look stunning on small screens.

- Use the exact names, dates, and locations provided. Do not use placeholder text.

## Development

You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd fawas-irfana
npm i
npm run dev
```
