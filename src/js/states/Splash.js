class SplashState extends Phaser.State {

	init(){

	}

	preload(){
		this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
		this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');

		this.load.setPreloadSprite(this.loaderBar);

		this.load.image('logo', 'assets/images/mushroom2.png');
	}

	create(){
		this.state.start('Menu');
	}

	render(){

	}

}

export default SplashState;