class Canvas {
	constructor(containerId, options) {
		this.canvas = document.createElement('canvas');
		this.container = document.getElementById(containerId);
		this.options = options || {};
		this.canvas.width = this.options.width || 640;
		this.canvas.height = this.options.height || 360;
		this.container.appendChild(this.canvas);
		this.ctx = this.canvas.getContext('2d');

		this.gbarLife = new Image();
		this.gbarLife.src = 'assets/tile/gbar_life.png'
		this.gbarRing = new Image();
		this.gbarRing.src = 'assets/tile/gbar_ring.png'

		this.gbarCanvas = document.createElement('canvas');
		this.canvas.insertAdjacentElement('afterend', this.gbarCanvas);
		this.gbarCtx = this.gbarCanvas.getContext('2d');
		this.gbarCanvas.width = 630;
		this.gbarCanvas.height = 40;
		this.gbarCanvas.classList.add('gbar');
		
		this.view = {
			x:0,
			y:0,
			width: this.canvas.width,
			height: this.canvas.height
		}; 

		this.sprites = {
			ball: new Sprite(99, 1), //small ball
			bigball: new Sprite(1, 1, 54, 54), //big ball
			throne: new Sprite(309 ,1, 80, 80), //throne enemy
			B: new Sprite(85, 165), //red wall block
			T: new Sprite(891, 1),  //throne
			Y: new Sprite(1, 165), //upside-down throne
			P: new Sprite(559, 1), //pumper
			O: new Sprite(601, 1), //upside-down pumper 
			S: new Sprite(517, 1), //power speed
			D: new Sprite(225, 1), //deflater
			'%': new Sprite(267, 1), //upside-down deflater 
			C: new Sprite(141, 1), //diamond checkpoint
			A: new Sprite(183, 1), //arrow checkpoint
			L: new Sprite(391, 1), //life
			pop: new Sprite(58, 1), //pop ball died
			Z: new Sprite(127, 165), //slanting block right
			V: new Sprite(169, 165), //upside-down slanting left
			X: new Sprite(211, 165), //slanting clock left
			N: new Sprite(253, 165), //upside-down slanting clock right
			I: new Sprite(43, 165), //bounce block
			G: new Sprite(1, 83, 80, 80), //gate closed
			'=': new Sprite(802, 83, 80, 80), //gate opened
			R: new Sprite(849, 1, 40, 80), //ring vertical
			E: new Sprite(767, 1, 80, 40), //ring horizontal
			Q: new Sprite(725, 1, 40, 80), //ring collected vertical
			W: new Sprite(643, 1, 80, 40), //ring collected horizontal
			'0': new Sprite(295, 165), //water
			'6': new Sprite(475, 1), //power jump
			'7': new Sprite(433, 1), //power gravity
		};
	}

	setScroll(dx, dy) {
		this.view.x = dx;
		this.view.y = dy;
	}

	drawTile(tile, i, j) {
		let x = i * Tile.size;
		let y = j * Tile.size;
		
		if (this.sprites[tile]) {

			this.drawSprite(x, y, tile);
			return;
		}

		this.ctx.fillStyle = '#51DAFE';
		// this.ctx.fillStyle = '#000';

		if (tile === '-' || tile === '+' || tile === '#' || tile === '*' || tile === '$') {
			return;
		} else {
			this.ctx.fillRect(x - this.view.x, y - this.view.y, Tile.size, Tile.size);
		}
	}

	drawSprite(x, y, sprite) {
		this.sprites[sprite].draw(this.ctx, x - this.view.x, y - this.view.y);
	}

	clear() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}