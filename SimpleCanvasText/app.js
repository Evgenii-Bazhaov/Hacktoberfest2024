const canvas = document.querySelector('#canvas')
const ctx = canvas?.getContext('2d')

if (ctx) {
	ctx.lineWidth = 3
	ctx.strokeStyle = 'black'
	ctx.fillStyle = "rgb(180, 255, 57)";
	ctx.font = "48px serif";
	ctx.fillText("Hacktoberfest 2024", 58, 59);
}