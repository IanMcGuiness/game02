/* global game Phaser game_state */
game_state.end = function() {};

game_state.end.prototype = {
    
    preload: function() {
        
        
        
    },
    create: function() {
        
        this.scoreText = game.add.text(16, 16, "Game Over", {
            fontSize: '64px',
            fill: '#ffffff'
        });
        
        
    },
    update: function() {
        
        
        
    },
    
 
    
    

}
game.state.add('end', game_state.end);
game.state.start('end');