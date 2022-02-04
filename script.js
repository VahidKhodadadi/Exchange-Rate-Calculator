"use strict";
var currencyEl_one = document.getElementById('currency-one');
var amountEl_one = document.getElementById('amount-one');
var currencyEl_two = document.getElementById('currency-two');
var amountEl_two = document.getElementById('amount-two');
var rateEl = document.getElementById('rate');
var swap = document.getElementById('swap');
var API_KEY = '14e2946d05c3d996b0f793fd';
function calculate() {
    var currency_one = currencyEl_one.value;
    var currency_two = currencyEl_two.value;
    fetch("https://v6.exchangerate-api.com/v6/".concat(API_KEY, "/latest/").concat(currency_one))
        .then(function (res) { return res.json(); })
        .then(function (data) {
        var rate = data.conversion_rates[currency_two];
        rateEl.textContent = "1 ".concat(currency_one, " = ").concat(rate, " ").concat(currency_two);
        amountEl_two.value = (+amountEl_one.value * rate).toFixed(2);
    })
        .catch(function (err) {
        console.log('Error:', err);
    });
}
currencyEl_one === null || currencyEl_one === void 0 ? void 0 : currencyEl_one.addEventListener('change', calculate);
amountEl_one === null || amountEl_one === void 0 ? void 0 : amountEl_one.addEventListener('input', calculate);
currencyEl_two === null || currencyEl_two === void 0 ? void 0 : currencyEl_two.addEventListener('change', calculate);
amountEl_two === null || amountEl_two === void 0 ? void 0 : amountEl_two.addEventListener('input', calculate);
swap === null || swap === void 0 ? void 0 : swap.addEventListener('click', function () {
    var temp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    calculate();
});
calculate();
