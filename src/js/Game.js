import BootState from './states/Boot';
import SplashState from './states/Splash';
import MenuState from './states/Menu';

class Game extends Phaser.Game {

	constructor(settings) {
		super(settings.width, settings.height, Phaser.AUTO, settings.container, null);

		this.settings = settings;

		this.state.add('Boot', BootState, false);
		this.state.add('Splash', SplashState, false);
		this.state.add('Menu', MenuState, false);

		this.state.start('Boot');
	}

}

export default Game;