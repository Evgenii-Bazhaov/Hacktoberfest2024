class Level {
	constructor(game, n) {
		this.game = game;
		this.game.currentLevel = n;
		this.map = new LevelMap(n);
		this.tiles = [];
		this.entities = [];
		this.ringsCollected = 0;
		if (this.game.currentLevel === 2) {
			this.game.isBig = true;
		}
		this.player = new Player(this.game, this.map.player);
		this.entities.push(this.player);
		this.game.checkpoint = {x: this.map.player.x * Tile.size, y: this.map.player.y * Tile.size};
		if (this.map.enemies) {
      		for (let enemy of this.map.enemies) {
        		this.entities.push(new Enemy(this.game, enemy.x * Tile.size, enemy.y * Tile.size, enemy.d, enemy.dist));
      		}
    	}
	}

	getCoords(x, y) {
		const i = Math.floor(x / Tile.size);
		const j = Math.floor(y / Tile.size);
		return [i, j];
	}

	inBounds(i, j) {
		if (i < 0 || i >= this.map.tiles[0].length)
			return false;
		
		if (j < 0 || j >= this.map.tiles.length)
			return false;

		return true;
	}

	getTile(x, y) {
		const [i, j] = this.getCoords(x, y);

		if (!this.inBounds(i, j))
			return ' ';

		return this.map.tiles[j][i];
	}

	clearTile(x, y, z) {
		const [i, j] = this.getCoords(x, y);
		const k = z || ' ';

		if (this.inBounds(i, j)) {
			const line = this.map.tiles[j];
			this.map.tiles[j] = line.slice(0, +(i - 1) + 1 || undefined) + k + line.slice(i + 1);
		}
	}

	update() {
		this.entities.map(entity => entity.update());
	}

	showGbar() {
		const gbarCtx = this.game.canvas.gbarCtx;
		gbarCtx.clearRect(0, 0, 630, 40);
		gbarCtx.drawImage(this.game.canvas.gbarLife, 10, 5, 26, 26);
		gbarCtx.fillStyle = '#fff';
		gbarCtx.font = '26px GameFont';
		gbarCtx.textAlign = 'left';
		gbarCtx.fillText('X ' + this.game.lives, 42, 28);

		let ringX;
		for (let j = 0; j < (this.map.rings - Math.ceil(this.ringsCollected / 2)); j++) {
			ringX = 80 + (j * 15);
			gbarCtx.drawImage(this.game.canvas.gbarRing, ringX, 5, 11, 26);	
		}
		gbarCtx.textAlign = 'right';
		gbarCtx.fillText(this.game.score, 620, 28);

		gbarCtx.font = '18px GameFont';
		gbarCtx.fillText('LEVEL ' + (this.game.currentLevel + 1), 350, 24);
	}
	
	draw() {

		this.showGbar();

		let playerX = Math.floor(this.player.x);
		let playerY = Math.floor(this.player.y);
		let dx, dy;
		if (playerX <= 297) {
			dx = 0;
		}
		else if (playerX > (Tile.size * this.map.tiles[0].length - 342)) {
			dx = Tile.size * this.map.tiles[0].length - 640;
		} else {
			dx = this.player.x - 297;
		}

		if (playerY <= 157) {
			dy = 0;
		} else if(playerY > (Tile.size * this.map.tiles.length - 202)) {
			dy = Tile.size * this.map.tiles.length - 360;
		} else {
			dy = this.player.y - 157
		}
		

		this.game.canvas.setScroll(dx, dy);
		
		for (let j = 0; j < this.map.tiles.length; j++) {
			const line = this.map.tiles[j];
			for (let i = 0; i < line.length; i++) {
				const tile = line[i];
				this.drawTile(tile, i, j);

				if (tile === 'G') {
					if (Math.ceil(this.ringsCollected / 2) === this.map.rings) {
						let currentLine = this.map.tiles[j];
						let nextLine = this.map.tiles[j + 1];
						this.player.passedAllRings = true;
						currentLine = currentLine.slice(0, +(i - 1) + 1 || undefined) + '=' + line.slice(i + 1);
						currentLine = currentLine.slice(0, +(i) + 1 || undefined) + '$' + line.slice(i + 2);
						this.map.tiles[j] = currentLine;
						nextLine = nextLine.slice(0, +(i - 1) + 1 || undefined) + '$' + nextLine.slice(i + 1);
						nextLine = nextLine.slice(0, +(i) + 1 || undefined) + '$' + nextLine.slice(i + 2);
						this.map.tiles[j + 1] = nextLine;
					}
				}
			}
		}

		for (let entity of this.entities) {
			if (entity.dead) {
				let index = this.entities.indexOf(entity);
				this.entities.splice(index, 1);
			}
		}

		this.entities.map(entity => entity.draw());
	}

	drawTile(tile, i, j) {
		this.game.canvas.drawTile(tile, i, j);
	}
}