class Entity {
	constructor(game, x, y) {
		this.game = game;
		this.x = x;
		this.y = y;
	}

	draw() { }

	update() { }

	kill() {
		return false;
	}

	getCorners() {
		const offset = 1;
		const xs = [this.x + offset, this.x + this.width - offset];
		const ys = [this.y, this.y + this.height - offset];

		const corners = [];
		for (let i = 0; i < ys.length; i++) {
			for (let j = 0; j < xs.length; j++) {
				corners.push([xs[j], ys[i]]);
			}
		}

		return corners;
	}

	getTouchedTiles() {
		const touchedTiles = [];
		const corners = this.getCorners();

		for(let i = 0; i < corners.length; i++) {
			touchedTiles.push({
				x: corners[i][0],
				y: corners[i][1],
				tile: this.game.level.getTile(corners[i][0], corners[i][1])
			});
		}

		return touchedTiles;
	}

	clipped(direction) {
		const tiles = this.getTouchedTiles();

		for (let i = 0; i < tiles.length; i++) {
			if (tiles[i].tile === 'P' || tiles[i].tile === 'O') {
				this.game.isBig = true;
			} else if (tiles[i].tile === 'D' || tiles[i].tile === '%') {
				this.game.isBig = false;
			} else if (tiles[i].tile === 'I') {
				this.game.canBounce = true;
			}
		}

		const mapping = {
			up: [tiles[0].tile, tiles[1].tile],
			down: [tiles[2].tile, tiles[3].tile],
			left: [tiles[0].tile, tiles[2].tile],
			right: [tiles[1].tile, tiles[3].tile]
		};

		if (this.game.isBig && this.game.floatUp && (mapping.up[0] === 'B' || mapping.up[1] === 'B')) {
			this.game.floatUp = false;
		} else if (!this.game.floatUp && (mapping.up[0] != 'B' && mapping.up[1] != 'B')) {
			this.game.floatUp = true; 
		}


		return mapping[direction].map(Tile.isSolid).reduce((acc, cur) => acc || cur);
	}

	static pointInRect(x, y, rect) {
		return x >= rect.x && x <= rect.x + rect.width && y >= rect.y && y <= rect.y + rect.height;
	}

	pointCollison(x, y) {
		return Entity.pointInRect(x, y, this);
	} 

	hasCollided(entity) {
		return (this.x < entity.x + entity.width &&
			this.x + this.width > entity.x &&
			this.y < entity.y + entity.height &&
			this.y + this.height > entity.y);
	}
}