// set default currency & fetch user currency choice
let userCurrencyChoice = "EUR";
let inputCurrency = document.querySelector("#inputCurrency");
inputCurrency.addEventListener("change", function (event) {
  inputCurrency = this.value;
  console.log("user changed currency to: " + inputCurrency);
  userCurrencyChoice = inputCurrency;
  let userOrderPrice = document.querySelectorAll(".userOrderPrice");
  userOrderPrice.forEach(function (element) {
    element.firstElementChild.innerText = inputCurrency;
  });
});

// set default unit type & fetch user unit choice
let unitType = document.querySelector("#unitType");
let userUnitChoice = "cm";
unitType.addEventListener("change", function (event) {
  unitType = this.value;
  userUnitChoice = unitType;
  console.log("user changed unit type to: " + userUnitChoice);
  // set units in input fields
  let unitInputFields = document.querySelectorAll(".userUnitChoice");
  unitInputFields.forEach(function (element) {
    element.firstElementChild.innerText = unitType === "cm" ? "cm" : "in";
  });
});

// calculate which pizza is a better choice
let firstPizzaSize;
let firstPizzaPrice;
let firstPizzaAmount;
let firstPizzaResult;
let secondPizzaSize;
let secondPizzaPrice;
let secondPizzaAmount;
let secondPizzaResult;
let finalPizzaPrice;
let pizzaForm = document.querySelector("#pizzaForm");
pizzaForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // calculate first pizza deal
  firstPizzaAmount = document.querySelector("#firstPizzaAmount").value;
  if (document.querySelector("#radiusPizzaOne").checked) {
    firstPizzaSize = document.querySelector("#firstPizzaDiameter").value;
  } else {
    firstPizzaSize = document.querySelector("#firstPizzaDiameter").value / 2;
  }
  firstPizzaPrice = document.querySelector("#firstPizzaPrice").value * 100;

  // calculate second pizza deal
  secondPizzaAmount = document.querySelector("#secondPizzaAmount").value;
  if (document.querySelector("#radiusPizzaTwo").checked) {
    secondPizzaSize = document.querySelector("#secondPizzaDiameter").value;
  } else {
    secondPizzaSize = document.querySelector("#secondPizzaDiameter").value / 2;
  }
  secondPizzaPrice = document.querySelector("#secondPizzaPrice").value * 100;

  // calculate which deal offers more pizza per square unit
  firstPizzaResult =
    firstPizzaPrice / (firstPizzaAmount * (3.14 * Math.pow(firstPizzaSize, 2)));
  secondPizzaResult =
    secondPizzaPrice /
    (secondPizzaAmount * (3.14 * Math.pow(secondPizzaSize, 2)));
  // check for previous results and clear if present
  let resultParagraph = document.querySelector("#pizzaResponse");
  if (
    document.contains(
      document.querySelector("#pizzaResponse").firstElementChild
    )
  ) {
    // document.querySelector("#pizzaResponse").firstElementChild.remove()
    while (resultParagraph.firstElementChild) {
      resultParagraph.removeChild(resultParagraph.firstElementChild);
    }
  }

  // compare results and display to the user
  let resultMainMessage = document.createElement("p");
  resultMainMessage.classList.add("alert", "alert-success");
  let resultSliceCost = document.createElement("p");
  resultSliceCost.classList.add("alert", "alert-success");

  if (
    isNaN(firstPizzaResult) ||
    firstPizzaAmount === "" ||
    firstPizzaSize === 0 ||
    firstPizzaPrice === 0 ||
    isNaN(secondPizzaResult) ||
    secondPizzaAmount === "" ||
    secondPizzaSize === 0 ||
    secondPizzaPrice === 0
  ) {
    resultMainMessage.innerText =
      "Some fields were left empty - give it another go!";
    resultMainMessage.classList.add("alert", "alert-danger");
    resultParagraph.appendChild(resultMainMessage);
  } else {
    if (firstPizzaResult < secondPizzaResult) {
      console.log("first pizza is the better deal: ");
      console.log("first pizza result: " + firstPizzaResult);
      console.log("first pizza price: " + firstPizzaPrice);
      console.log("first pizza amount: ") + firstPizzaAmount;
      let difference = (secondPizzaResult / firstPizzaResult - 1) * 100;
      resultMainMessage.innerText =
        "Deal #1 gets you " +
        difference.toFixed(2) +
        "% more pizza for your money!";
      resultParagraph.appendChild(resultMainMessage);
      resultSliceCost.innerText =
        "One slice costs " +
        (firstPizzaPrice / 100 / (8 * firstPizzaAmount)).toFixed(2) +
        " " +
        userCurrencyChoice +
        " set at " +
        (firstPizzaResult / 100).toFixed(2) +
        " " +
        userCurrencyChoice +
        " per square " +
        userUnitChoice;
      resultParagraph.appendChild(resultSliceCost);
      finalPizzaPrice = firstPizzaPrice;
    } else {
      console.log("second pizza is the better deal: ");
      console.log("second pizza result: " + secondPizzaResult);
      console.log("second pizza price: " + secondPizzaPrice);
      console.log("second pizza amount: " + secondPizzaAmount);
      let difference = (firstPizzaResult / secondPizzaResult - 1) * 100;
      resultMainMessage.innerText =
        "Deal #2 gets you " +
        difference.toFixed(2) +
        "% more pizza for your money!";
      resultParagraph.appendChild(resultMainMessage);
      resultSliceCost.innerText =
        "One slice costs " +
        (secondPizzaPrice / 100 / (8 * secondPizzaAmount)).toFixed(2) +
        " " +
        userCurrencyChoice +
        " set at " +
        (secondPizzaResult / 100).toFixed(2) +
        " " +
        userCurrencyChoice +
        " per square " +
        userUnitChoice;
      resultParagraph.appendChild(resultSliceCost);
      finalPizzaPrice = secondPizzaPrice;
    }
  }
});

// currency list section and xchange rates section
// open-source API documentation: https://www.currencyconverterapi.com/docs
// let apiKey = "c55ec618255a86ae9959";
let apiKey = "1786db1f496903ce52d4";

// generate currency list for users to choose from
let selectors = document.querySelectorAll(".currencyList");
selectors.forEach(function (element) {
  fetch("https://free.currconv.com" + "/api/v7/currencies?apiKey=" + apiKey)
    .then((response) => response.json())
    .then((data) => {
      //add few common currencies first
      let optionPLN = document.createElement("option");
      optionPLN.value = "PLN";
      optionPLN.innerText = "PLN - Polish Zloty";
      element.appendChild(optionPLN);
      let optionUSD = document.createElement("option");
      optionUSD.value = "USD";
      optionUSD.innerText = "USD - United States Dollar";
      element.appendChild(optionUSD);
      let optionSeparator = document.createElement("option");
      optionSeparator.disabled = true;
      optionSeparator.value = "---";
      optionSeparator.innerText = "-----------------";
      element.appendChild(optionSeparator);
      // add rest of currencies
      let rawCurrencyArray = Object.values(data.results);
      rawCurrencyArray.sort((a, b) => a.id.localeCompare(b.id));
      rawCurrencyArray.forEach(function (currency) {
        // test log for json contents validation
        // console.log(currency.id);
        if (currency.id !== "USD" && currency.id !== "PLN") {
          let option = document.createElement("option");
          option.value = currency.id;
          option.innerText = currency.id + " - " + currency.currencyName;
          element.appendChild(option);
        }
      });
    })
    .catch((error) => {
      console.log(error);
      alert(
        "There's an issue with fetching currency data - please come back in some time. Access refreshes every hour. Calculating your pizza deal still works though! Just can't change play arround with the currencies"
      );
    });
  // .catch( err => {
  //     err.text()
  //         .then( errorMessage => {
  //             alert(errorMessage)
  //         });
  // });
});

// check exchange rate of better pizza deal to chosen currency
let userOutputCurrencyChoice;
let currencyComparisonResult = document.createElement("div");
let outputCurrency = document.querySelector("#outputCurrency");
let currencyChangeForm = document.querySelector("#currencyChangeForm");
currencyChangeForm.addEventListener("submit", function (event) {
  event.preventDefault();
  userOutputCurrencyChoice = outputCurrency.value;
  console.log(firstPizzaResult);
  console.log(secondPizzaResult);
  if (
    firstPizzaResult === undefined ||
    secondPizzaResult === undefined ||
    isNaN(firstPizzaResult) ||
    isNaN(secondPizzaResult)
  ) {
    currencyComparisonResult.innerText =
      "Didn't fill out the form up there, did ya?";
    currencyComparisonResult.classList.add("alert", "alert-danger");
    outputCurrency.parentElement.appendChild(currencyComparisonResult);
    console.log("flag 1");
  } else {
    console.log("flag 2");
    let inputToOutPut = userCurrencyChoice + "_" + userOutputCurrencyChoice;
    let outputToInput = userOutputCurrencyChoice + "_" + userCurrencyChoice;
    console.log("user chose comparing currency: " + userOutputCurrencyChoice);
    // fetch exchange rate
    fetch(
      "https://free.currconv.com" +
        "/api/v7/convert?q=" +
        userCurrencyChoice +
        "_" +
        userOutputCurrencyChoice +
        "," +
        userOutputCurrencyChoice +
        "_" +
        userCurrencyChoice +
        "&compact=ultra&apiKey=" +
        apiKey
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("input to output print out: " + data[inputToOutPut]);
        let exchangeRate = data[inputToOutPut];
        console.log(exchangeRate);
        currencyComparisonResult.innerText =
          "You pizza deal that costs: " +
          (finalPizzaPrice / 100).toFixed(2) +
          " " +
          userCurrencyChoice +
          " would cost " +
          ((finalPizzaPrice * exchangeRate) / 100).toFixed(2) +
          " " +
          userOutputCurrencyChoice +
          " (exchange rate is: " +
          exchangeRate.toFixed(2) +
          " " +
          userCurrencyChoice +
          " to " +
          userOutputCurrencyChoice +
          ") ";
        currencyComparisonResult.classList.add("alert", "alert-warning");
        outputCurrency.parentElement.appendChild(currencyComparisonResult);
        // console.log(data[outputToInput]);
      });
    // .catch( err => {
    //     err.text()
    //         .then( errorMessage => {
    //         alert(errorMessage)
    //     })
    // })
  }
});
