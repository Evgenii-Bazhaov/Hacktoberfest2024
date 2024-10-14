let cTemp = document.getElementById("cel");
let fTemp = document.getElementById("fahr");
let kTemp = document.getElementById("kel");

// If User give input in celsius
let fromCelsius = () =>{
    let celsius = parseFloat(cel.value);
    if(isNaN(celsius) === ""){
        fahr.value = "";
        kel.value = "";
    }
    else{
        fahr.value = ((9 * celsius) / 5 + 32).toFixed(2);
        kel.value = (273.15 + celsius).toFixed(2);
    }
}
// If User give input in fahrenheit
let fromFahrenheit = () =>{
    let fahrenheit = parseFloat(fahr.value);
    if(isNaN(fahrenheit) === ""){
        cel.value = "";
        kel.value = "";
    }
    else{
        cel.value = (((fahrenheit - 32) * 5) / 9).toFixed(2);
        kel.value = (((fahrenheit - 32) * 5) / 9 + 273.15).toFixed(2);
    }
}
// If User give input in kelvin
let fromKelvin = () =>{
    let kelvin = parseFloat(kel.value);
    if(isNaN(kelvin) === ""){
        cel.value = "";
        fahr.value = "";
    }
    else{
        cel.value = (kelvin - 273.15).toFixed(2);
        fahr.value = (((kelvin - 273.15) * 9) / 5 + 32).toFixed(2);
    }
}
cTemp.addEventListener("input",fromCelsius);
fTemp.addEventListener("input",fromFahrenheit);
kTemp.addEventListener("input",fromKelvin);