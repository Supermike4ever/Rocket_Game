# Asteroids Game 🚀

A browser-based interactive game built using **HTML**, **CSS**, and **jQuery**. This project was developed for **EECS 493: User Interface Development** (Winter 2024) at the University of Michigan.

The objective is to pilot a rocket ship, avoid incoming asteroids, collect shields, and travel through portals to increase your level and score.

## 🎮 Game Overview

The game features a complete navigation loop including a Main Menu, a Settings Panel, a Tutorial, the Gameplay loop, and a Game Over screen. It utilizes dynamic DOM manipulation to handle game state, collision detection, and animation.

### Key Features
* **Dynamic Difficulty:** Three difficulty settings (Easy, Normal, Hard) available in the settings panel.
* **Entity Spawning:**
    * **Asteroids:** Spawn randomly and traverse the screen.
    * **Portals:** Interactive elements that allow the player to advance levels.
    * **Shields:** Collectible items that provide protection.
* **Score Tracking:** Real-time updates for **Score**, **Danger**, and **Level** displayed in the score panel.
* **Audio System:** Integrated sound effects for collecting items (`collect.mp3`) and collisions (`die.mp3`), with a volume slider.
* **Movement Physics:** Smooth 8-directional movement using arrow keys.

## 🛠️ Technologies Used
* **HTML5:** Structure and layout (e.g., Game Window, Score Panel).
* **CSS3:** Styling, animations, and transitions.
* **JavaScript (ES6):** Game logic and state management.
* **jQuery:** DOM manipulation and event handling (`scripts/jquery.min.js`).

## 📂 Project Structure

```text
.
├── index.html          # Main entry point and game container
├── style/
│   └── index.css       # Game styling and layout
├── scripts/
│   ├── page.js         # Main game logic
│   └── jquery.min.js   # jQuery library
└── src/                # Assets
    ├── audio/          # Game sound effects (collect.mp3, die.mp3)
    ├── player/         # Rocket ship sprites (player.gif, etc.)
    ├── asteroid.png    # Asteroid sprite
    ├── shield.gif      # Shield sprite
    └── port.gif        # Portal sprite
```

## 🕹️ How to Play

### 1. Launch the Game
* Open `index.html` in a web browser (Google Chrome is recommended).
* From the Main Menu, you can start a new game or adjust the game settings.

### 2. Controls
* **Movement:** Use the **Arrow Keys** to move your rocket ship Up, Down, Left, or Right.
* **Navigation:** Use the on-screen buttons to navigate menus (Play Game, Settings, Start Over).

### 3. Objectives & Mechanics
The goal is to survive as long as possible while increasing your score.
* **Avoid Asteroids:** Dodge the asteroids flying across the screen. Contact without a shield causes a "Game Over".
* **Collect Shields:** Pick up shield icons to protect your ship. A shield allows you to survive one collision with an asteroid.
* **Enter Portals:** Fly through portals to advance to the next level.

### 4. Settings
* **Difficulty:** Toggle between **Easy**, **Normal**, and **Hard** in the settings panel to change the game challenge.
* **Volume:** Adjust the slider to control the volume of sound effects.



