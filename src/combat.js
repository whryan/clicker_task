/*

Functions to handle combat
(not currently used)

*/
/*

// Function which runs if a sprite is clicked on
function onEnemyClick(sprite, pointer){
  sprite.damage(player.clickDmg) //damage based on click value
}



//Emit some gold coins
function dropGold(goldCt){
  goldEmitter.x = game.world.centerX;
  goldEmitter.y = game.world.centerY;
  goldEmitter.start(true, 4000, null, goldCt);
}


//Run if an enemy dies
function enemyKilled() {
  player.gold = player.gold + currentEnemy.details.reward; //give gold
  dropGold(currentEnemy.details.reward); //make a gold drop effect
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
}*/