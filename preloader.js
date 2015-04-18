(function() {
  'use strict';

  LD.PreloaderState = function(game) {
    this.game = game;
  };

  LD.PreloaderState.prototype = {
    preload: function() {
      this.stage.backgroundColor = '#DDDDDD';
      // Load sprites
     this.load.image('floor', 'assets/floor.png');
     this.load.image('tiles', 'assets/tileset.png');



      // Sprite Sheets
      this.load.spritesheet('bear', 'assets/bear.png', 128, 78);
      this.load.spritesheet('player', 'assets/player.png', 52, 44);
      this.load.spritesheet('bee', 'assets/bee.png', 32, 22);


      // Tile Map
      this.load.tilemap('platforms', 'assets/tilemap_t.json', null, Phaser.Tilemap.TILED_JSON);

      // Sounds
      // this.load.audio('fly_sound', 'assets/fly.ogg');

    },

    create: function() {
      console.log('preloader create');


      this.state.start('Game');
    }
  };
}());