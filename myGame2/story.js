/* global game Phaser game_state */
game_state.story = function() {};

game_state.story.prototype = {
    
    preload: function() {
        game.stage.backgroundColor = ('#000000')
        
        
    },
    create: function() {
        
        this.scoreText = game.add.text(16, 16, "Welcome. \nEarth has been in a drought for 100 years, \nAnd suddenly it started to rain.\nHelp Man Mann by collecting rain.\nWatch out for rockslides.\nPress up arrow to start", {
            fontSize: '32px',
            fill: '#ffffff'
        });
        this.up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        
    },
    update: function() {
        if (this.up.isDown) {
            game.state.start('main');
            
        }
        
        
    },
    
 
    
    

}
game.state.add('story', game_state.story);
game.state.start('story');