document.getElementById('convertButton').addEventListener('click', function() {
    const tempInput = parseFloat(document.getElementById('tempInput').value);
    const unitInput = document.getElementById('unitInput').value;
    let result;

    if (unitInput === 'C') {
        // Convert Celsius to Fahrenheit and Kelvin
        const fahrenheit = (tempInput * 9/5) + 32;
        const kelvin = tempInput + 273.15;
        result = `Fahrenheit: ${fahrenheit.toFixed(2)} °F, Kelvin: ${kelvin.toFixed(2)} K`;
    } else if (unitInput === 'F') {
        // Convert Fahrenheit to Celsius and Kelvin
        const celsius = (tempInput - 32) * 5/9;
        const kelvin = celsius + 273.15;
        result = `Celsius: ${celsius.toFixed(2)} °C, Kelvin: ${kelvin.toFixed(2)} K`;
    } else {
        // Convert Kelvin to Celsius and Fahrenheit
        const celsius = tempInput - 273.15;
        const fahrenheit = (celsius * 9/5) + 32;
        result = `Celsius: ${celsius.toFixed(2)} °C, Fahrenheit: ${fahrenheit.toFixed(2)} °F`;
    }

    document.getElementById('result').innerText = result;
});
