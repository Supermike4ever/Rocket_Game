/* ------------- Winter 2024 EECS 493 Assignment 3 Starter Code ------------ */

/* ------------------------ GLOBAL HELPER VARAIBLES ------------------------ */
// Difficulty Helpers
let astProjectileSpeed = 3;            // easy: 1, norm: 3, hard: 5

// Game Object Helpers
let currentAsteroid = 1;
const AST_OBJECT_REFRESH_RATE = 15;
const maxPersonPosX = 1218;
const maxPersonPosY = 658;
const PERSON_SPEED = 5;                // #pixels each time player moves by
const portalOccurrence = 15000;        // portal spawns every 15 seconds
const portalGone = 5000;               // portal disappears in 5 seconds
const shieldOccurrence = 10000;        // shield spawns every 10 seconds
const shieldGone = 5000;               // shield disappears in 5 seconds

// Movement Helpers
let LEFT = false;
let RIGHT = false;
let UP = false;
let DOWN = false;

// TODO: ADD YOUR GLOBAL HELPER VARIABLES (IF NEEDED)
let Spawn_Rate = 800
let playerShielded = false;
let gameRunning = true;
let danger = 20;
let score = 0;
let level = 1;
let turotialShow = true;
/* --------------------------------- MAIN ---------------------------------- */
$(document).ready(function () {
  // jQuery selectors
  game_window = $('.game-window');
  game_screen = $("#actual-game");
  rocket = $('#rocket');
  asteroid_section = $('.asteroidSection');
  game_over = $('#gameOver');
  score_panel = $('#scorePanel');
  // hide all other pages initially except landing page
  game_screen.hide();
  rocket.hide();
  game_over.hide();
  score_panel.hide();
  /* -------------------- ASSIGNMENT 2 SELECTORS BEGIN -------------------- */
  var $playGameButton = $('#playGame');
  var $settingsButton = $('#settings');
  var $closeButton = $('#closeSettings');
  var $tutorialPage = $('#tutorialPage');
  var $settingsPanel = $('#settingsPanel');
  var $mainMenu = $('#MainMenu');

  $settingsPanel.hide();
  $tutorialPage.hide();

  /* --------------------- ASSIGNMENT 2 SELECTORS END --------------------- */

  // TODO: DEFINE YOUR JQUERY SELECTORS (FOR ASSIGNMENT 3) HERE

  // Example: Spawn an asteroid that travels from one border to another
  //spawn(); // Uncomment me to test out the effect!
});


/* ---------------------------- EVENT HANDLERS ----------------------------- */
// Keydown event handler
document.onkeydown = function (e) {
  if (e.key == 'ArrowLeft') LEFT = true;
  if (e.key == 'ArrowRight') RIGHT = true;
  if (e.key == 'ArrowUp') UP = true;
  if (e.key == 'ArrowDown') DOWN = true;
}

// Keyup event handler
document.onkeyup = function (e) {
  if (e.key == 'ArrowLeft') LEFT = false;
  if (e.key == 'ArrowRight') RIGHT = false;
  if (e.key == 'ArrowUp') UP = false;
  if (e.key == 'ArrowDown') DOWN = false;
}

/* ------------------ ASSIGNMENT 2 EVENT HANDLERS BEGIN ------------------ */
var $playGameButton = $('#playGame');
var $settingsButton = $('#settings');
var $closeButton = $('#closeSettings');
var $tutorialPage = $('#tutorialPage');
var $settingsPanel = $('#settingsPanel');
var $mainMenu = $('#MainMenu');


$(document).on('click', '#playGame', function() {
  var $mainMenu = $('#MainMenu');
  var $tutorialPage = $('#tutorialPage');
  // Show the Tutorials Page and hide the others
  $mainMenu.hide();
  if (turotialShow){
    $tutorialPage.show();
  }
  else{
    var $tutorialPage = $('#tutorialPage');
    var $settingsPanel = $('#settingsPanel');
    var $mainMenu = $('#MainMenu');
    var $getReady = $('#getReady');
    //hide the main and turotial pages
    $mainMenu.hide();
    $tutorialPage.hide();
    $getReady.show();
    game_screen.show();
    score_panel.show();
    setTimeout(function() {
      $getReady.hide();
      rocket.show();
      if (gameRunning){
        spawnInterval = setInterval(spawn, Spawn_Rate); 
        portalInterval = setInterval(spawnPortal,portalOccurrence); // Every 15 seconds
        shieldInterval = setInterval(spawnShield, shieldOccurrence); // Every 10 seconds
        positionInterval = setInterval(updateRocketPosition, 100/6);
        collisionInterval = setInterval(collisionCheck,100/6);
        scoreInterval = setInterval(scoreUpdate, 500);
      }
    }, 3000);
  }
});

$(document).on('click', '#settings', function() {
  var $tutorialPage = $('#tutorialPage');
  var $settingsPanel = $('#settingsPanel');
  var $mainMenu = $('#MainMenu');
  // Show the Settings Panel and hide the others
  //$mainMenu.hide();
  //$tutorialPage.hide();
  $settingsPanel.show();
});

$(document).on('click', '#closeSettings', function() {
  var $tutorialPage = $('#tutorialPage');
  var $settingsPanel = $('#settingsPanel');
  var $mainMenu = $('#MainMenu');
  //hide the setting panel
  $settingsPanel.hide();
});


document.addEventListener('DOMContentLoaded', function() {
  // Code to manipulate DOM elements goes here

  var slider = document.getElementById("volumeSlider");
  var output = document.getElementById("value");


  if (slider && output) { // Check if elements exist
      output.innerHTML = slider.value;

      slider.oninput = function() {
        output.innerHTML = this.value;
        //set the valume for all the audio
        $('audio').each(function() {
          this.volume = slider.value*0.01;
        });
      }
  }

  // Get all the buttons
  var buttons = document.querySelectorAll('.difficulty-buttons button');
  // Function to remove the selected class from all buttons
  function clearSelection() {
    buttons.forEach(function(button) {
      button.classList.remove('selected');
    });
  }
  // Add click event listener to each button
  buttons.forEach(function(button) {
    button.addEventListener('click', function() {
      clearSelection();
      button.classList.add('selected'); 
      if(button.id === "easy"){
        astProjectileSpeed = 1;
        Spawn_Rate = 1000;
        danger = 10;
        $('#dangerValue').text(danger);
      }
      else if(button.id === "normal"){
        astProjectileSpeed = 3;
        Spawn_Rate = 800;
        danger = 20;
        $('#dangerValue').text(danger);
      }
      else if(button.id === "hard"){
        astProjectileSpeed = 5;
        Spawn_Rate = 600;
        danger = 30;
        $('#dangerValue').text(danger);
      }
    });
  });
});

/* ------------------- ASSIGNMENT 2 EVENT HANDLERS END ------------------- */

// TODO: ADD MORE FUNCTIONS OR EVENT HANDLERS (FOR ASSIGNMENT 3) HERE
$(document).on('click', '#start-button', function() {

  var $tutorialPage = $('#tutorialPage');
  var $settingsPanel = $('#settingsPanel');
  var $mainMenu = $('#MainMenu');
  var $getReady = $('#getReady');
  //hide the main and turotial pages
  $mainMenu.hide();
  $tutorialPage.hide();
  $getReady.show();
  game_screen.show();
  score_panel.show();
  setTimeout(function() {
    $getReady.hide();
    rocket.show();
    if (gameRunning){
      spawnInterval = setInterval(spawn, Spawn_Rate); 
      portalInterval = setInterval(spawnPortal,portalOccurrence); // Every 15 seconds
      shieldInterval = setInterval(spawnShield, shieldOccurrence); // Every 10 seconds
      positionInterval = setInterval(updateRocketPosition, 100/6);
      collisionInterval = setInterval(collisionCheck,100/6);
      scoreInterval = setInterval(scoreUpdate, 500);
    }
  }, 3000);
});

$(document).on('click', '#startOver-button', function() {
  $('#MainMenu').show();
  $('#gameOver').hide();
  gameRunning = true;
  $('#scoreValue').text(score);
  $('#dangerValue').text(danger);
  $('#levelValue').text(level);
});

// Function to generate a random position within the .game-window
function getRandomPosition() {
  const maxX = maxPersonPosX;
  const maxY = maxPersonPosY;
  const x = getRandomNumber(0, maxX);
  const y = getRandomNumber(0, maxY);

  return { x, y };
}

// Function to spawn a portal
function spawnPortal() {
  const position = getRandomPosition(); 
  const portal = $('<div class="portal"><img src="src/port.gif"></div>').css({
      left: `${position.x}px`,
      top: `${position.y}px`
  });
  $('#portals').append(portal);
  
  // Remove the portal after 5 seconds
  setTimeout(() => portal.remove(), portalGone);
}

// Function to spawn a shield
function spawnShield() {
  const position = getRandomPosition(); 
  const shield = $('<div class="shield"><img src="src/shield.gif"></div>').css({
      left: `${position.x}px`,
      top: `${position.y}px`
  });
  $('#shields').append(shield);
  
  // Remove the shield after 5 seconds
  setTimeout(() => shield.remove(), shieldGone);
}

function scoreUpdate(){
  score += 40;
  $('#scoreValue').text(score);
}


function updateRocketPosition() {

  var rocket = $('#rocket');
  var position = rocket.position();
  //console.log(position.left, position.top);
  var rocketImg = $('#rocket img');
  var player = 'src/player/player.gif';
  var playerS = 'src/player/player_shielded.gif';
  if (LEFT && position.left > 0) {

    rocket.css('left', position.left - PERSON_SPEED);
    player = 'src/player/player_left.gif';
    playerS = 'src/player/player_shielded_left.gif';
  }
  if (RIGHT && position.left < maxPersonPosX) {
    // console.log('right');
    // console.log(PERSON_SPEED);
    rocket.css('left', position.left + PERSON_SPEED);
    player = 'src/player/player_right.gif';
    playerS = 'src/player/player_shielded_right.gif';
  }
  if (UP && position.top > 0) {
    // console.log('up');
    // console.log(PERSON_SPEED);
    rocket.css('top', position.top - PERSON_SPEED);
    player = 'src/player/player_up.gif';
    playerS = 'src/player/player_shielded_up.gif';
  }
  if (DOWN && position.top < maxPersonPosY) {
    // console.log('down');
    // console.log(PERSON_SPEED);
    rocket.css('top', position.top + PERSON_SPEED);
    player = 'src/player/player_down.gif';
    playerS = 'src/player/player_shielded_down.gif';
  }

  rocketImg.attr('src', playerShielded ? playerS : player);

}


function collisionCheck() {

  astroids = $('.curAsteroid');
  shields = $('.shield');
  portals = $('.portal')
  astroids.each(function() {
    if (isColliding($('#rocket'), $(this))) {
      if (playerShielded === true) {
        $(this).remove();//remove the astroid otherwise die again
        playerShielded = false;

      } else {
        $('#rocket img').attr('src', 'src/player/player_touched.gif');
        // Play for die
        var sound = document.getElementById('die');
        sound.play();
        // Stop all movement in the page
        gameRunning = false;
        clearInterval(positionInterval);
        clearInterval(spawnInterval);
        clearInterval(portalInterval);
        clearInterval(shieldInterval);
        clearInterval(collisionInterval);
        clearInterval(scoreInterval);
        setTimeout(gameover, 2000);
      }
    }
  });

  shields.each(function() {
    if (isColliding($('#rocket'), $(this))) {
      playerShielded = true;
      // Play sound for collect
      var sound = document.getElementById('collect');
      sound.play();
      //console.log($(this))
      $(this).remove(); //Remove the shield
    }
  });

  portals.each(function() {
    if (isColliding($('#rocket'), $(this))) {
      level+=1;
      $('#levelValue').text(level);
      danger += 2;
      $('#dangerValue').text(danger);
      astProjectileSpeed += 0.4; //2/5
      // Play sound for collect
      var sound = document.getElementById('collect');
      sound.play();
      $(this).remove(); //Remove the portal
    }
  });
}


function gameover(){
  game_screen.hide();
  game_over.show();
  $('#finalScore').text(score);
  score_panel.hide();
  rocket.hide();
  danger = 20;
  score = 0;
  level = 1;
  asteroid_section.empty();
  rocket.css({
    'position': 'absolute',
    'left': 'calc(50% - 40px)',
    'top': 'calc(50% - 40px)'
  });
  $('#rocket img').attr('src', 'src/player/player.gif');
  rocket.hide();
  //not showing tutorial anymore
  turotialShow = false
}


/* ---------------------------- GAME FUNCTIONS ----------------------------- */
// Starter Code for randomly generating and moving an asteroid on screen
class Asteroid {
  // constructs an Asteroid object
  constructor() {
    /*------------------------Public Member Variables------------------------*/
    // create a new Asteroid div and append it to DOM so it can be modified later
    let objectString = "<div id = 'a-" + currentAsteroid + "' class = 'curAsteroid' > <img src = 'src/asteroid.png'/></div>";
    asteroid_section.append(objectString);
    // select id of this Asteroid
    this.id = $('#a-' + currentAsteroid);
    currentAsteroid++; // ensure each Asteroid has its own id
    // current x, y position of this Asteroid
    this.cur_x = 0; // number of pixels from right
    this.cur_y = 0; // number of pixels from top

    /*------------------------Private Member Variables------------------------*/
    // member variables for how to move the Asteroid
    this.x_dest = 0;
    this.y_dest = 0;
    // member variables indicating when the Asteroid has reached the boarder
    this.hide_axis = 'x';
    this.hide_after = 0;
    this.sign_of_switch = 'neg';
    // spawn an Asteroid at a random location on a random side of the board
    this.#spawnAsteroid();
  }

  // Requires: called by the user
  // Modifies:
  // Effects: return true if current Asteroid has reached its destination, i.e., it should now disappear
  //          return false otherwise
  hasReachedEnd() {
    if (this.hide_axis == 'x') {
      if (this.sign_of_switch == 'pos') {
        if (this.cur_x > this.hide_after) {
          return true;
        }
      }
      else {
        if (this.cur_x < this.hide_after) {
          return true;
        }
      }
    }
    else {
      if (this.sign_of_switch == 'pos') {
        if (this.cur_y > this.hide_after) {
          return true;
        }
      }
      else {
        if (this.cur_y < this.hide_after) {
          return true;
        }
      }
    }
    return false;
  }

  // Requires: called by the user
  // Modifies: cur_y, cur_x
  // Effects: move this Asteroid 1 unit in its designated direction
  updatePosition() {
    if(!gameRunning){
      return;
    }
    // ensures all asteroids travel at current level's speed
    this.cur_y += this.y_dest * astProjectileSpeed;
    this.cur_x += this.x_dest * astProjectileSpeed;
    // update asteroid's css position
    this.id.css('top', this.cur_y);
    this.id.css('right', this.cur_x);
  }

  // Requires: this method should ONLY be called by the constructor
  // Modifies: cur_x, cur_y, x_dest, y_dest, num_ticks, hide_axis, hide_after, sign_of_switch
  // Effects: randomly determines an appropriate starting/ending location for this Asteroid
  //          all asteroids travel at the same speed
  #spawnAsteroid() {
    // REMARK: YOU DO NOT NEED TO KNOW HOW THIS METHOD'S SOURCE CODE WORKS
    let x = getRandomNumber(0, 1280);
    let y = getRandomNumber(0, 720);
    let floor = 784;
    let ceiling = -64;
    let left = 1344;
    let right = -64;
    let major_axis = Math.floor(getRandomNumber(0, 2));
    let minor_aix = Math.floor(getRandomNumber(0, 2));
    let num_ticks;

    if (major_axis == 0 && minor_aix == 0) {
      this.cur_y = floor;
      this.cur_x = x;
      let bottomOfScreen = game_screen.height();
      num_ticks = Math.floor((bottomOfScreen + 64) / astProjectileSpeed) || 1;

      this.x_dest = (game_screen.width() - x);
      this.x_dest = (this.x_dest - x) / num_ticks + getRandomNumber(-.5, .5);
      this.y_dest = -astProjectileSpeed - getRandomNumber(0, .5);
      this.hide_axis = 'y';
      this.hide_after = -64;
      this.sign_of_switch = 'neg';
    }
    if (major_axis == 0 && minor_aix == 1) {
      this.cur_y = ceiling;
      this.cur_x = x;
      let bottomOfScreen = game_screen.height();
      num_ticks = Math.floor((bottomOfScreen + 64) / astProjectileSpeed) || 1;

      this.x_dest = (game_screen.width() - x);
      this.x_dest = (this.x_dest - x) / num_ticks + getRandomNumber(-.5, .5);
      this.y_dest = astProjectileSpeed + getRandomNumber(0, .5);
      this.hide_axis = 'y';
      this.hide_after = 784;
      this.sign_of_switch = 'pos';
    }
    if (major_axis == 1 && minor_aix == 0) {
      this.cur_y = y;
      this.cur_x = left;
      let bottomOfScreen = game_screen.width();
      num_ticks = Math.floor((bottomOfScreen + 64) / astProjectileSpeed) || 1;

      this.x_dest = -astProjectileSpeed - getRandomNumber(0, .5);
      this.y_dest = (game_screen.height() - y);
      this.y_dest = (this.y_dest - y) / num_ticks + getRandomNumber(-.5, .5);
      this.hide_axis = 'x';
      this.hide_after = -64;
      this.sign_of_switch = 'neg';
    }
    if (major_axis == 1 && minor_aix == 1) {
      this.cur_y = y;
      this.cur_x = right;
      let bottomOfScreen = game_screen.width();
      num_ticks = Math.floor((bottomOfScreen + 64) / astProjectileSpeed) || 1;

      this.x_dest = astProjectileSpeed + getRandomNumber(0, .5);
      this.y_dest = (game_screen.height() - y);
      this.y_dest = (this.y_dest - y) / num_ticks + getRandomNumber(-.5, .5);
      this.hide_axis = 'x';
      this.hide_after = 1344;
      this.sign_of_switch = 'pos';
    }
    // show this Asteroid's initial position on screen
    this.id.css("top", this.cur_y);
    this.id.css("right", this.cur_x);
    // normalize the speed s.t. all Asteroids travel at the same speed
    let speed = Math.sqrt((this.x_dest) * (this.x_dest) + (this.y_dest) * (this.y_dest));
    this.x_dest = this.x_dest / speed;
    this.y_dest = this.y_dest / speed;
  }
}

// Spawns an asteroid travelling from one border to another
function spawn() {
  let asteroid = new Asteroid();
  setTimeout(spawn_helper(asteroid), 0);
}

function spawn_helper(asteroid) {
  let astermovement = setInterval(function () {
    // update Asteroid position on screen
    asteroid.updatePosition();
    // determine whether Asteroid has reached its end position
    if (asteroid.hasReachedEnd()) { // i.e. outside the game boarder
      asteroid.id.remove();
      clearInterval(astermovement);
    }
  }, AST_OBJECT_REFRESH_RATE);
}

/* --------------------- Additional Utility Functions  --------------------- */
// Are two elements currently colliding?
function isColliding(o1, o2) {
  return isOrWillCollide(o1, o2, 0, 0);
}

// Will two elements collide soon?
// Input: Two elements, upcoming change in position for the moving element
function willCollide(o1, o2, o1_xChange, o1_yChange) {
  return isOrWillCollide(o1, o2, o1_xChange, o1_yChange);
}

// Are two elements colliding or will they collide soon?
// Input: Two elements, upcoming change in position for the moving element
// Use example: isOrWillCollide(paradeFloat2, person, FLOAT_SPEED, 0)
function isOrWillCollide(o1, o2, o1_xChange, o1_yChange) {
  const o1D = {
    'left': o1.offset().left + o1_xChange,
    'right': o1.offset().left + o1.width() + o1_xChange,
    'top': o1.offset().top + o1_yChange,
    'bottom': o1.offset().top + o1.height() + o1_yChange
  };
  const o2D = {
    'left': o2.offset().left,
    'right': o2.offset().left + o2.width(),
    'top': o2.offset().top,
    'bottom': o2.offset().top + o2.height()
  };
  // Adapted from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
  if (o1D.left < o2D.right &&
    o1D.right > o2D.left &&
    o1D.top < o2D.bottom &&
    o1D.bottom > o2D.top) {
    // collision detected!
    return true;
  }
  return false;
}

// Get random number between min and max integer
function getRandomNumber(min, max) {
  return (Math.random() * (max - min)) + min;
}
