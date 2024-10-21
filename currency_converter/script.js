// Updated base URL
const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Select the country name labels
const fromCountryNameLabel = document.getElementById("fromCountryName");
const toCountryNameLabel = document.getElementById("toCountryName");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlagAndName(evt.target);
  });
}

const updateFlagAndName = (element) => {
  let currCode = element.value;
  let countryName = countryList[currCode]; // Fetch country name

  // Update the flag
  let newSrc = `https://flagsapi.com/${countryName.replace(/ /g, "%20")}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;

  // Update the full country name label
  if (element.name === "from") {
    fromCountryNameLabel.innerText = countryName;
  } else if (element.name === "to") {
    toCountryNameLabel.innerText = countryName;
  }
};

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  // Updated URL structure
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;

  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

  let finalAmount = amtVal * rate;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  // Initial updates for flag and country name when page loads
  updateFlagAndName(fromCurr);
  updateFlagAndName(toCurr);
  updateExchangeRate();
});
