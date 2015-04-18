(function() {
  'use strict';
  console.log('level Load');
  // var ANIMATE_SEQ = [];

  LD.Level = function(gameState) {
    // INITIALIZE
    this.gameState = gameState;
    this.game = gameState.game;
    this.layer = [];

    this.map = this.game.add.tilemap('platforms');
    this.map.addTilesetImage('tileset', 'tiles');


    this.layer[0] = this.map.createLayer('Background');
    this.layer[1] = this.map.createLayer('Platform');
    this.layer[1].resizeWorld();
    // this.layer[1].debug = true;



    this.game.physics.arcade.enable(this.layer[1], Phaser.Physics.ARCADE, true);
    this.platforms = this.game.make.group();
    this.platforms.enableBody = true;
    this.map.setCollisionBetween(120,130,true,this.layer[1]);



    // var floor = this.platforms.create(0, this.game.world.height / 2, 'floor');
    // floor.scale.setTo(100, 2);
    // floor.body.immovable = true;

  };

  LD.Level.prototype.add = function() {
    this.game.world.add(this.platforms);
  };

  LD.Level.prototype.render = function() {

  };

  LD.Level.prototype.update = function(player) {

  };


}());