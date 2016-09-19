import WebFont from 'webfontloader';

class BootState extends Phaser.State {

	init(){
		this.stage.backgroundColor = '#EDEEC9';

		this.fontsLoaded = false;
	}

	preload(){
		WebFont.load({
			google: {
				families: ['Nunito']
			},
			active: this.onFontsLoaded.bind(this)
		});

		this.loaderText = this.add.text(this.world.centerX, this.world.centerY, 'loading', {
			font: '16px Arial',
			fill: '#dddddd',
			align: 'center'
		});

		this.load.image('loaderBg', '/assets/images/loader-bg.png');
		this.load.image('loaderBar', '/assets/images/loader-bar.png');
	}

	render(){
		if(this.fontsLoaded){
			this.state.start('Splash');
		}
	}

	onFontsLoaded(){
		this.fontsLoaded = true;
	}

}

export default BootState;