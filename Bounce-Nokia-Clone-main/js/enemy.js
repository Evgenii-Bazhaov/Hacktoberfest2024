class Enemy extends Entity {
	constructor(game, x, y, d, dist) {
		super(game, x, y);
		this.width = Tile.size * 2;
		this.height = Tile.size * 2;
		this.sprite = 'throne';
		this.vel = 1;
		this.directionY = 1;
		this.directionX = 1;
		this.sideways = d;
		if (this.sideways === 1) {
			this.distance = dist;
		} else {
			this.distance = 4;
		}
		this.orgY = this.y;
		this.orgX = this.x;
		this.destY = (this.y + Tile.size * this.distance);
		this.destX = (this.x + Tile.size * this.distance);
	}

	move() {
		if (!this.sideways) {
			if (this.y < this.destY && this.directionY === 1) {
				this.y += this.vel;
				if (this.y === this.destY) 
					this.directionY = 0;
			} else if (this.y > this.orgY && this.directionY === 0) {
				this.y -= this.vel;
				if (this.y === this.orgY)
					this.directionY = 1;
			}
		} else {
			if (this.x < this.destX && this.directionX === 1) {
				this.x += this.vel;
				if (this.x === this.destX) 
					this.directionX = 0;
			} else if (this.x > this.orgX && this.directionX === 0) {
				this.x -= this.vel;
				if (this.x === this.orgX)
					this.directionX = 1;
			}
		}
	}

	update() {
		this.move();
		for (let i = 0; i < this.game.level.entities.length; i++) {
			let entity = this.game.level.entities[i];
			if (entity instanceof Player) {
				if (this.hasCollided(entity)) {
					entity.kill();
					return;
				}
			}
		}
	}

	draw() {
		this.game.canvas.drawSprite(this.x, this.y, this.sprite);
	}
}