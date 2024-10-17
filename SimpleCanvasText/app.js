const canvas = document.querySelector('#canvas')
const ctx = canvas?.getContext('2d')

if (ctx) {
	ctx.lineWidth = 3
	ctx.strokeStyle = 'black'
	ctx.fillStyle = "rgb(24, 55, 24)";
	ctx.font = "48px serif";
}

canvas.addEventListener('click', (event) => {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	ctx.fillText("Hacktoberfest 2024", event.offsetX - 180, event.offsetY);
})