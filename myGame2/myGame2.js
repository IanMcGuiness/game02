/*global Phaser*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {}
var scoreText;
var score = 0;
var lastdir;
var nme;
var nmesprite;
var ifrock;
var hit;
var p;
var ifstar;
var star;
var starso;

game_state.main = function() {};
game_state.main.prototype = {

    preload: function() {
        game.load.image('player', 'assets/pl.png')
        game.load.image('object', 'assets/waters.png')
        game.load.image('floor', 'assets/platform.png')
        game.load.spritesheet('playeranim', 'assets/playeranim.png', 32, 32);
        game.load.image('sky', 'assets/greysky.png')
        game.load.image('nme', 'assets/enemy.png')
        game.load.image('rock', 'assets/rockbackup.png')
        game.load.audio('Hit', 'assets/Hit.ogg')
        game.load.audio('Pickup', 'assets/Pickup.wav')
        game.load.image('Star', 's.png')
        game.load.audio('star', 'star.ogg')

    },

    create: function() {
        //Add audio
        hit = game.add.audio('Hit');
        p = game.add.audio('Pickup');
        hit.play();
        hit.volume = 1;
        p.volume = 1;
        // starso = game.add.audio('star')
        // starso.volume = 1;
        // Change the background color
        game.stage.backgroundColor = '#37393d'

        //Start the arcade physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //Add the player to the bottom of the screen
        this.player = game.add.sprite(200, 515, 'playeranim');

        //Player animations
        this.player.animations.add('idle', [0, 1, 2, 3, 4, 5], 5, true)
        this.player.animations.add('left', [6, 7, 8, 9], 15, true)
        this.player.animations.add('right', [10, 11, 12, 13], 15, true)

        //Scale the player
        this.player.scale.set(2);

        //Enable player physics
        game.physics.arcade.enable(this.player);

        //Enable player body
        this.player.enableBody = true;
        this.player.body.collideWorldBounds = true;

        //Make it so that the player wont move when collecting the ball
        this.player.body.immovable = true;

        //Add a floor
        this.floor = game.add.sprite(200, 579, 'floor')
        this.floor = game.add.sprite(0, 579, 'floor')
        this.floor = game.add.sprite(450, 579, 'floor')

        //Movement keys
        this.left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

        //Add objects group
        this.objects = game.add.group();
        this.objects.enableBody = true;
        

        //Add the rocks group
        this.rock = game.add.group();
        this.rock.enableBody = true;

        //add the stars group
        // this.star = game.add.group();
        // this.star.enableBody = true;

        //Anchor the object to a variable
        var _this = this;


        //Create objects over time
        setInterval(function() {
            //Create and object at the top of the screen at a random x
            var object = _this.objects.create(Math.random() * 800, -64, 'object');

            if (score > 19) {
                ifrock = Math.random();
                if (ifrock < 0.1 + score * 0.001) {
                    var rock = _this.rock.create(Math.random() * 750, -64, 'rock');
                }
                // ifstar = Math.random();
                // if (ifstar < 0.05) {
                // var star = _this.star.create(Math.random() * 800, -64, 'Star');


            }
            //Let gravity do it's thing
            object.body.gravity.y = 500 + score * 10;
            rock.body.gravity.y = 300 + score * 10;
            // star.body.gravity.y = 250;
        }, 125);

        //Score text
        scoreText = game.add.text(16, 16, "Score:" + score, {
            fontSize: '32px',
            fill: '#908585'
        });
    },

    update: function() {


        //Check for rock collision
        game.physics.arcade.collide(this.rock, this.player, this.hitRock);

        //Update score text
        scoreText.text = "Score: " + score;

        //Moving the player
        if (this.left.isDown) {
            this.player.body.velocity.x = -400;
            lastdir = 2;
            this.player.animations.play('left');
        }
        else if (this.right.isDown) {
            this.player.body.velocity.x = 400;
            this.player.animations.play('right')
            lastdir = 1;
        }
        else {
            this.player.body.velocity.x = 0;
            this.player.animations.play('idle');
            lastdir = 0;

        }

        //Player and object collision
        game.physics.arcade.overlap(this.player, this.objects, this.hitObject, null, this);
        game.physics.arcade.overlap(this.player, this.rock, this.hitRock, null, this);
        game.physics.arcade.overlap(this.player, this.star, this.hitStar, null, this);

        //Enemies
        nme = Math.random();
        if (nme > 0.9) {


        }

    },
    hitObject: function(player, object) {
        object.kill();
        score += 1;
        p.play();

    },
    hitRock: function(player, rock) {

        player.body.gravity.y = 25000;
        hit.play();
        rock.kill();
        score = 0;
        game.state.start('story');
    },

    hitStar: function(player, star) {
        p.play();
        star.kill();
        score += 5;

    },


}



game.state.add('main', game_state.main);
