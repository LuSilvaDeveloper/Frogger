# 🐸 Frogger (HTML5 Canvas)

A fully playable **Frogger-style arcade game** built from scratch using **vanilla JavaScript and HTML5 Canvas**.  
This project focuses on **game fundamentals**, including game loops, collision detection, sprite animation, and state management — without using any external game engines.

---

## 🎮 Features

- Classic Frogger gameplay
- Multi-layer canvas rendering (background, sprites, UI)
- Custom game loop and timing system
- Collision detection (vehicles, logs, river)
- Score, lives, and countdown timer
- Start screen and end-game screen
- Sprite atlas rendering

---

## 🛠 Technologies Used

- **JavaScript (ES6)**
- **HTML5 Canvas**
- **CSS**
- No external libraries or frameworks

---

## 🧠 Architecture Overview

- **Three Canvas Layers**
  - Background (static environment)
  - Sprites (moving objects)
  - Interface (UI & overlays)

- **Core Concepts Implemented**
  - Manual game loop
  - State-based game flow (`start`, `playing`, `end`)
  - Axis-aligned bounding box (AABB) collision
  - Sprite atlas rendering
  - Object movement and wrapping logic

---

## 🎯 Controls

| Action | Key |
|------|-----|
| Move Up | Arrow ↑ |
| Move Down | Arrow ↓ |
| Move Left | Arrow ← |
| Move Right | Arrow → |

Click **Start** to begin or **Play Again** after game over.

---

---

## 🚧 Next Steps

This project is intentionally built without a game engine to focus on **core gameplay and system fundamentals**.

Planned improvements include:

- 🔁 **Rewrite the game in C++**
  - Implement the same mechanics using **C++ and a lightweight graphics library (SFML or SDL)**
  - Recreate the game loop, collision detection, and entity system
  - Compare architectural differences between JavaScript and C++
  - Explore memory management, ownership, and performance considerations

- 🧱 Improve architecture
  - Introduce a `Game` class to own global state
  - Convert entities (Frog, Vehicles, Logs) into reusable components

- 🎮 Gameplay improvements
  - Difficulty scaling
  - Level progression
  - Improved collision precision
  - Sound effects and animations

The goal is to use this project as a **cross-language gameplay engineering exercise**

