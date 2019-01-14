var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
  game.load.image('star', 'assets/star.png');
  game.load.image('sky', 'assets/sky.png');
  game.load.image('box', 'assets/firstaid.png');
  game.load.image('dude', 'assets/dude.png');
  game.load.image('diamond', 'assets/diamond.png');
  game.load.image('blue-button-up', 'assets/ui/uipack/blue_button07.png');
  game.load.image('blue-button-down', 'assets/ui/uipack/blue_button08.png');
  game.load.image('green-button-up', 'assets/ui/uipack/green_button07.png');
  game.load.image('green-button-down', 'assets/ui/uipack/green_button08.png');
}

//All labels 
var labelText;
var clickText;
var goldText;
var killText;
var clickDmgText;
var autoDmgText;
var autoDmgText;
var percentHP = 100;
//current enemy variable
var currentEnemy;
var tick;

// Define enemy data 
var enemyData = [
  {name: 'Star Boi', image: 'star', hp: 10, reward: 2},
  {name: 'Bad Boi', image: 'box', hp: 4, reward: 1}
]

function create() {
  // define input methods and controllers
  game.input.mouse.capture = true;
  
  //Define time tracking method
  tick = game.time.now;
  
  //create background
  game.add.sprite(0, 0, 'sky');
  
  
  //========================
  //Create UI (must be before enemy creation)
  //========================  
  // Set health bar configuration
  var barConfig = {x: 200, y: 100, width: 250, height: 30, animationDuration: 20};  
  this.enemyHealthBar = new HealthBar(this.game, barConfig);
  this.enemyHealthBar.setPosition(game.world.centerX, 520);

  // Create text
  goldText = game.add.text(16, 15, 'Gold: 0', { fontSize: '12px', fill: '#000' });
  clickText = game.add.text(16, 30, 'Clicks: 0', { fontSize: '12px', fill: '#000' });
  clickDmgText = game.add.text(16, 45, 'Click Damage: 1', { fontSize: '12px', fill: '#000' });
  autoDmgText = game.add.text(16, 60, 'Auto Damage/Second: 0', { fontSize: '12px', fill: '#000' });
  killText = game.add.text(16, 75, 'Kills: 0', { fontSize: '12px', fill: '#000' });
  labelText = game.add.text(game.world.centerX-75, 550, 'Name here', { fontSize: '32px', fill: '#000' });
  
  // Create click damage shop
  var clickDmgButton = game.add.button(16, 100, 'blue-button-up', clickDmgClicked, this);
  var autoDmgButton = game.add.button(16, 150, 'green-button-up', autoDmgClicked, this);
  
  //========================
  // Enemy creation
  //========================
  /*
  enemies = game.add.group();
  // loop through enemy list and make enemies
  enemyData.forEach(function(data) {
    //create the enemy
    enemy = enemies.create(500, 400, data.image); //make them off screen
    //give the enemy HP
    enemy.health = data.hp;
    enemy.maxHealth = data.hp;
    //save info
    enemy.details = data;
  });
  // Add input to them
  enemies.setAll('inputEnabled', true);
  enemies.setAll('input.useHandCursor', true);
  // Do something when they are clicked
  enemies.forEach(function(enemy) {
    enemy.events.onInputDown.add(onEnemyClick, this);
  }); 
  */
  //Create a new enemy group
  newEnemyGroup(enemyData);
  //Select one initial enemy to fight
  newChallenger(enemies);

  //========================
  //Create player
  //========================
  player = game.add.sprite(-50,-50, 'dude') //create sprite offscreen
  player.clickDmg = 1;
  player.gold = 0;
  player.clicks = 0;
  player.enemiesKilled = 0;
  player.xp = 0;
  player.autoDmg = 0;
}

function update() {
  // Keep text up to date 
  // This could be moved into other functions, but this seemed cleanest
  goldText.setText('Gold: ' + player.gold);
  clickText.setText('Clicks: ' + player.clicks);
  clickDmgText.setText('Click Damage: ' + player.clickDmg);
  autoDmgText.setText('Auto Damage/Second: ' + player.autoDmg);
  labelText.setText(currentEnemy.details.name); //Update enemy label bar
  killText.setText('Kills: ' + player.enemiesKilled);

  // Update health bar
  percentHP = currentEnemy.health/currentEnemy.maxHealth  * 100; //update percent HP 
  this.enemyHealthBar.setPercent(percentHP)
  
  // Track overall click count
  game.input.onDown.addOnce(updateClickCt, this);
  
  //Deal DoT damage every second
  if (game.time.now - tick > 100) {
    currentEnemy.damage(player.autoDmg)
    tick = game.time.now;
  }
}

/* ===========================

BELOW HERE ARE OTHER FUNCTIONS
EVENTUALLY SHOULD BE MOVED INTO SEPERATE SCRIPTS

=========================== */ 
// Makes a new enemy come to the center of the screen
function newChallenger(enemy_group){
  currentEnemy = enemy_group.getRandom(); //choose one enemy, move it to the center
  currentEnemy.reset(game.world.centerX, game.world.centerY, currentEnemy.maxHealth); //move them to the front
  currentEnemy.events.onKilled.add(enemyKilled, this); //if killed, do this
}

// Make a new group of enemies
function newEnemyGroup(groupData){
  enemies = game.add.group();
  // loop through enemy list and make enemies
  groupData.forEach(function(data) {
    //create the enemy
    enemy = enemies.create(500, 400, data.image); //make them off screen
    //give the enemy HP
    enemy.health = data.hp;
    enemy.maxHealth = data.hp;
    //save info
    enemy.details = data;
  });
  // Add input to them
  enemies.setAll('inputEnabled', true);
  enemies.setAll('input.useHandCursor', true);
  // Do something when they are clicked
  enemies.forEach(function(enemy) {
    enemy.events.onInputDown.add(onEnemyClick, this);
  });
}

// Function which runs if a sprite is clicked on
function onEnemyClick(sprite, pointer){
  sprite.damage(player.clickDmg) //damage based on click value
}

//Run if an enemy dies
function enemyKilled() {
  player.gold = player.gold + currentEnemy.details.reward; //give gold
  currentEnemy.destroy(); // kill enemy
  player.enemiesKilled++; //update kill count
  if(enemies.length>0){ //if there are more enemies in the group
    newChallenger(enemies); // Make a new enemy
  }
  else { //otherwise, if enemies are all gone
    enemies.destroy(); //destroy current enemies
    newEnemyGroup(enemyData); //make a new group of enemies
    newChallenger(enemies); //choose one as a challenger
  }
}

// Triggers whenever anything is clicked
function updateClickCt() {
  player.clicks = player.clicks + 1;
}

//When the click damage button is clicked
function clickDmgClicked(){
  if (player.gold > 2) {
    player.gold = player.gold - 2;
    player.clickDmg = player.clickDmg + 1;
      }
  else {
    console.log('Too poor, failed purchase');
  }
}


//When the auto damage button is clicked
function autoDmgClicked(){
  if (player.gold > 2) {
    player.gold = player.gold - 2;
    player.autoDmg = player.autoDmg + 0.1;
      }
  else {
    console.log('Too poor, failed purchase');
  }
}