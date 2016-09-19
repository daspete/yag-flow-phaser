import LogoSprite from '../sprites/menu/Logo';

class MenuState extends Phaser.State {

	init(){

	}

	create(){
		this.logo = new LogoSprite({
			game: this.game,
			x: this.game.world.centerX,
			y: this.game.world.centerY,
			asset: 'logo'
		});

		this.game.add.existing(this.logo);
	}

	render(){

	}

}

export default MenuState;