class Player extends Entity {
	constructor(game, position) {
		super(game, position.x * Tile.ballSize, position.y * Tile.ballSize);
		this.width = Tile.ballSize;
		this.height = Tile.ballSize;
		this.direction = 1;
		this.velY = 0;
		this.isJumping = false;
		this.t = 0;
		this.dead = false;
		this.passedAllRings = false;
		this.sprite = 'ball';
	}

	update() {
		const { keys } = this.game.input;
		const vel = 7;

		if (this.game.isBig === true) {
			this.sprite = 'bigball';
			// Tile.ballSize = 54;
			this.width = Tile.ballSize;
			this.height = Tile.ballSize;
		} else {
			this.sprite = 'ball';
			Tile.ballSize = Tile.size;
			this.width = Tile.ballSize;
			this.height = Tile.ballSize;
		}

		if(keys.up.hold) {
			if(!this.isJumping && this.canJump()) {
				this.t = 5;
          		this.isJumping = true;
          		this.velY = vel;
          		
          		if (!this.game.canBounce) {
          			if (this.game.isBig) {
          				this.jumpGoal = this.y - 6.6 * Tile.ballSize;
          			} else {
          				this.jumpGoal = this.y - 4.4 * Tile.ballSize;	
          			}
          		} else {
          			this.jumpGoal = this.y - 9 * Tile.ballSize;
          		}
			}
		}

		if (!this.isJumping && !this.canJump()) {
			this.y += this.velY;
			this.velY += 0.2;
			
			if(this.velY >= vel) {
				this.velY = vel;
			}

			this.adjustFall();
		}

		if (this.isJumping) {
			this.y -= this.velY;
			this.velY -= 0.01;
			
			if(this.y <= this.jumpGoal) {
				this.game.canBounce = false;
				this.y = this.jumpGoal;
				this.isJumping = false;
				this.velY = 0;
			}

			this.adjustJump();
		}

		if(keys.right.hold) {
			this.x += vel;
			this.direction = -1;
			this.adjustWalk('right');
		}

		if(keys.left.hold) {
			this.x -= vel;
			this.direction = -1;
			this.adjustWalk('left');
		}

		this.touchTiles();
	}

	canJump() {
		this.y++;
		const ret = this.clipped('down');
		this.y--;
		return ret;
	}

	adjustWalk(direction) {
		if(this.clipped(direction)) {
			if(direction === 'left') {
				this.x += this.width - 1;
			}
			this.x = Tile.ballSize * Math.floor(this.x / Tile.ballSize);
			if(direction === 'right') {
				return (this.x += Tile.ballSize - this.width);
			}
		} else {
			if(this.canJump()) {
				this.t++;
			}
		}
	}

	adjustJump() {
		if(this.clipped('up')) {
			this.y += Tile.ballSize;
			this.y = Tile.ballSize * Math.floor(this.y / Tile.ballSize);
			this.isJumping = false;
			this.velY = 0;
			this.game.canBounce = false;
		}
	}

	adjustFall() {
		if(this.clipped('down')) {
			this.y = Tile.ballSize * Math.floor(this.y / Tile.ballSize);
		}
	}

	draw() {
		this.game.canvas.drawSprite(this.x, this.y, this.sprite);
	}

	respawn() {
		this.dead = false;
		this.x = this.game.checkpoint.x;
		this.y = this.game.checkpoint.y;
		if (this.game.checkpoint.big === true) {
			this.game.isBig = true;
		} else {
			this.game.isBig = false;
		}
		this.game.canvas.drawSprite(this.x, this.y, this.sprite);
		this.game.canvas.setScroll(this.x);
	}
	
	touchTiles() {
		const tiles = this.getTouchedTiles();
		for (let tile of tiles) {
			if (Tile.isLethal(tile.tile)) {
				this.kill();
				return;
			}
			
			if (Tile.isPickable(tile.tile)) {
				if (tile.tile === 'C') {
					this.game.score += 500;
					this.game.level.clearTile(tile.x, tile.y, 'A');
					this.game.checkpoint = {x: tile.x, y: tile.y, big: this.game.isBig};
				}

				if (tile.tile === 'L') {
					this.game.lives++;
					this.game.score += 1000;
					this.game.level.clearTile(tile.x, tile.y);
				}

				if (tile.tile === 'R' || tile.tile === '+' || tile.tile === 'E' || tile.tile === '-') {
					this.game.score += 250;
					this.game.level.ringsCollected++;
					if (tile.tile === 'R') {
						this.game.level.clearTile(tile.x, tile.y, 'Q');
						this.game.level.clearTile(tile.x, tile.y + Tile.size, '*');
					} else if (tile.tile === '+') {
						this.game.level.clearTile(tile.x, tile.y - Tile.size, 'Q');
						this.game.level.clearTile(tile.x, tile.y, '*');
					} else if (tile.tile === 'E') {
						this.game.level.clearTile(tile.x, tile.y, 'W');
						this.game.level.clearTile(tile.x + Tile.size, tile.y, '*');
					} else if (tile.tile === '-') {
						this.game.level.clearTile(tile.x - Tile.size, tile.y, 'W');
						this.game.level.clearTile(tile.x, tile.y, '*');
					} else {
						return;
					}
				}

				if ((tile.tile === '=' || tile.tile === '$') && this.passedAllRings === true) {
					this.game.score += (1000 + this.game.lives * 500);

					if (this.game.lives >= 3 && this.passedAllRings) {
						this.game.stars = 3;
					} else if (this.game.lives >= 2 && this.game.score >= 4000) {
						this.game.stars = 2;
					} else {
						this.game.stars = 1;
					}

					if (this.game.gameData[this.game.currentLevel].stars < this.game.stars) {
						this.game.gameData[this.game.currentLevel].stars = this.game.stars;
					} 

					if (this.game.currentLevel < this.game.lastLevel - 1) {
						this.game.gameData[this.game.currentLevel + 1].locked = false;
					}

					this.game.saveGameData();
					this.game.levelComplete = true;
				}
				
				if (tile.tile === '0' && this.game.isBig === true) {
					if (this.y < tile.y && this.game.floatUp === true) {
						this.y -= 4;
					} else if (this.game.floatUp === false) {
						this.y = tile.y - Tile.size;
					}
				}
			}
		}
	}

	kill() {
		if(!this.dead) {
			this.dead = true;
			this.game.lives--;
			if (this.game.currentLevel === 2) {
				this.game.isBig = true;
				this.game.checkpoint.big = true;
			} else {
				this.game.isBig = false;
				this.game.checkpoint.big = false;
			}
			this.respawn();
		}
	}
}