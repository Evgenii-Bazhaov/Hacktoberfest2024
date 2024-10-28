class Tile {
	static isSolid(tile) {
		return ['B', 'F', 'D', 'P', 'O', '%', 'S', 'I', '#'].includes(tile);
	}

	static isPickable(tile) {
		return ['C', 'L', 'R','E', '+', '-', '=', '$', '0'].includes(tile);
	}

	static isLethal(tile) {
		return ['T', 'Y'].includes(tile);
	}
}

Tile.size = 45;
Tile.ballSize = 45;