// fetch user input currency
let inputCurrency = document.querySelector("#inputCurrency");
inputCurrency.addEventListener("change", function (event) {
  inputCurrency = this.value;
  console.log(inputCurrency);
  let userOrderPrice = document.querySelectorAll(".userOrderPrice");
  userOrderPrice.forEach(function (element) {
      element.firstElementChild.innerText = inputCurrency;
  })
})

// fetch unit type
let unitType = document.querySelector("#unitType");
unitType.addEventListener("change", function (event) {
  unitType = this.value;
  console.log(unitType)
  // set units in input fields
  let unitInputFields = document.querySelectorAll(".userUnitChoice");
  unitInputFields.forEach(function (element) {
      element.firstElementChild.innerText = (unitType === 'metric') ? "cm" : "in";
  })
})

// calculate which pizza is a better choice
let pizzaForm = document.querySelector("#pizzaForm");
pizzaForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let firstPizzaSize;
    let firstPizzaAmount = document.querySelector("#firstPizzaAmount").value;
    if (document.querySelector("#radiusPizzaOne").checked) {
        firstPizzaSize = document.querySelector("#firstPizzaDiameter").value;
    } else {
        firstPizzaSize = (document.querySelector("#firstPizzaDiameter").value) / 2;
    }
    ;
    let firstPizzaPrice = document.querySelector("#firstPizzaPrice").value * 100;

    let secondPizzaSize;
    let secondPizzaAmount = document.querySelector("#secondPizzaAmount").value;
    if (document.querySelector("#radiusPizzaTwo").checked) {
        secondPizzaSize = document.querySelector("#secondPizzaDiameter").value;
    } else {
        secondPizzaSize = (document.querySelector("#secondPizzaDiameter").value) / 2;
    }
    ;
    let secondPizzaPrice = document.querySelector("#secondPizzaPrice").value * 100;

// calculate which deal offers more pizza per square unit
    let firstPizzaResult = firstPizzaPrice / (firstPizzaAmount * (3.14 * Math.pow(firstPizzaSize, 2)));
    let secondPizzaResult = secondPizzaPrice / (secondPizzaAmount * (3.14 * Math.pow(secondPizzaSize, 2)));
    console.log(firstPizzaResult);
    console.log(secondPizzaResult);

// check for previous results and clear if present
    let resultParagraph = document.querySelector("#pizzaResponse");
    if (document.contains(document.querySelector("#pizzaResponse").firstElementChild)) {
      document.querySelector("#pizzaResponse").firstElementChild.remove()
    }

// compare results and print to the user
    let resultElement = document.createElement("p");
    if (!isNaN(firstPizzaResult) && !isNaN(secondPizzaResult)) {
        if (firstPizzaResult > secondPizzaResult) {
            let difference = (firstPizzaResult / secondPizzaResult - 1) * 100;
            resultElement.innerText =
                "in this deal pizza #2 gets you " +
                difference.toFixed(2) +
                "% more pizza for your money!";
            resultElement.classList.add("alert", "alert-success");
            resultParagraph.appendChild(resultElement);
        } else {
            let difference = (secondPizzaResult / firstPizzaResult - 1) * 100;
            resultElement.innerText =
                "Deal #1 gets you " +
                difference.toFixed(2) +
                "% more pizza for your money!";
            resultElement.classList.add("alert", "alert-success");
            resultParagraph.appendChild(resultElement);
        }
    } else {
        resultElement.innerText = "Some fields were left empty - try again";
        resultElement.classList.add("alert", "alert-danger");
        resultParagraph.appendChild(resultElement)
    }
});

// fetch exchange rates from https://free.currencyconverterapi.com/
// api key c55ec618255a86ae9959
// free server url https://free.currconv.com

var apiKEy = "c55ec618255a86ae9959";

// currency list
// /api/v7/currencies?apiKey=[YOUR_API_KEY]
// let rawCurrencyArray = [];
let selectors = document.querySelectorAll(".currencyList");
selectors.forEach(function (element) {
  fetch("https://free.currconv.com" + "/api/v7/currencies?apiKey=" + apiKEy)
      .then((response) => response.json())
      .then((data) => {
        let rawCurrencyArray = Object.values(data.results);
        // console.log(data)
        rawCurrencyArray.forEach(function (currency) {
          // console.log(currency.id)

          let option = document.createElement("option");
          option.value = currency.id;
          option.innerText = currency.currencyName + " - " + currency.id;
          element.appendChild(option);
        });
      });
// rawCurrencyArray.forEach(function (currency) {
//     // console.log(currency.id)
// });
})



inputCurrency = "EUR";
let outputCurrency = "USD";
let inputToOutPut = inputCurrency + "_" + outputCurrency;
let outputToInput = outputCurrency + "_" + inputCurrency;

// fetch input currency to output currency
// fetch('https://free.currconv.com' + '/api/v7/convert?q=' + inputCurrency + '_' + outputCurrency + ',' + outputCurrency + '_' + inputCurrency + '&compact=ultra&apiKey=' + apiKEy)
//     .then(response => response.json())
//     .then(data => {
//         console.log(data[inputToOutPut]);
//         console.log(data[outputToInput]);
//     });
