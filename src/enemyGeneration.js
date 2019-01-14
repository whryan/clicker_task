/*

Functions to handle enemy generation
(not currently used)
*/

/*

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
    enemy = enemies.create(-100, -100, data.image); //make them off screen
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
}*/
