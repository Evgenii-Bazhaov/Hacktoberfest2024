const colorPicker = document.getElementById("color-picker");

colorPicker.addEventListener('input', () => {
    const colorSelector = colorPicker.value;
    document.body.style.background = colorSelector;
})
