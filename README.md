# 🐸 Frogger (HTML5 Canvas)

A fully playable **Frogger-style arcade game** built from scratch using **vanilla JavaScript (ES6 modules) and HTML5 Canvas**.  
This project focuses on **game fundamentals**, including game loops, collision detection, sprite animation, and state management — without using any external game engines or build tools.

---

## 🎮 Features

- Classic Frogger gameplay
- Multi-layer canvas rendering (background, sprites, UI)
- Custom game loop and timing system
- Collision detection (vehicles, logs, river)
- Score, lives, and countdown timer
- Start screen and end-game screen (win / game over)
- Sprite atlas rendering

---

## 🛠 Technologies Used

- **JavaScript (ES6 Modules)**
- **HTML5 Canvas**
- **CSS**
- No external libraries or frameworks
- No build tools required

---

## 🚀 How to Run

Because the game uses ES6 modules, it must be served over HTTP (not opened directly as a `file://` URL).

### Option 1 — VS Code Live Server
1. Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension.
2. Right-click `sources/index.html` → **Open with Live Server**.

### Option 2 — Python HTTP server
```bash
cd sources
python3 -m http.server 8080
```
Then open `http://localhost:8080` in your browser.

### Option 3 — Node.js `serve`
```bash
npx serve sources
```

---

## 🎯 Controls

| Action      | Key        |
|-------------|------------|
| Move Up     | Arrow ↑    |
| Move Down   | Arrow ↓    |
| Move Left   | Arrow ←    |
| Move Right  | Arrow →    |

Click **Start** to begin or **Play Again** after game over.

---

## 🧠 Architecture Overview

The game is split into **ES6 modules** inside `sources/modules/` for a clean separation of concerns:

```
sources/
├── index.html          # HTML shell with three canvas layers
├── index.js            # Entry point — wires event listeners and boots the game
├── assets/
│   ├── sprites.png     # Sprite atlas (all game graphics)
│   └── dead.png        # Death animation image
└── modules/
    ├── Sprite.js       # Sprite class (position, size, atlas coordinates)
    ├── Lane.js         # Lane constructor (direction, speed, sprites, river flag)
    ├── entities.js     # All sprite and lane instances
    ├── state.js        # Shared mutable state (frog, player, canvases, images)
    ├── collision.js    # Point and box collision detection helpers
    ├── renderer.js     # All canvas drawing functions
    └── game.js         # Game loop, input handling, win/lose logic
```

### Three Canvas Layers

| Layer          | Canvas ID          | Purpose                          |
|----------------|--------------------|----------------------------------|
| Background     | `backgroundCanvas` | Static environment, HUD          |
| Sprites        | `spriteCanvas`     | Moving vehicles and logs         |
| Interface      | `interfaceCanvas`  | Frog, overlays, start/end screen |

### Core Concepts Implemented

- Manual game loop via `setInterval`
- State-based game flow (`start` → `playing` → `end`)
- Axis-aligned bounding box (AABB) collision detection
- Sprite atlas rendering with source-rectangle slicing
- Object movement with screen-edge wrapping

---

## 🚧 Next Steps

Planned improvements include:

- 🔁 **Rewrite the game in C++**
  - Implement the same mechanics using **C++ and a lightweight graphics library (SFML or SDL)**
  - Recreate the game loop, collision detection, and entity system
  - Compare architectural differences between JavaScript and C++
  - Explore memory management, ownership, and performance considerations

- 🧱 **Improve architecture**
  - Introduce a `Game` class to own global state
  - Convert entities (Frog, Vehicles, Logs) into reusable components

- 🎮 **Gameplay improvements**
  - Difficulty scaling
  - Level progression
  - Improved collision precision
  - Sound effects and animations

The goal is to use this project as a **cross-language gameplay engineering exercise**.
