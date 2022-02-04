const currencyEl_one = document.getElementById('currency-one') as HTMLSelectElement;
const amountEl_one = document.getElementById('amount-one') as HTMLInputElement;
const currencyEl_two = document.getElementById('currency-two') as HTMLSelectElement;
const amountEl_two = document.getElementById('amount-two') as HTMLInputElement;
const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

const API_KEY = '14e2946d05c3d996b0f793fd';


function calculate() {
    const currency_one = currencyEl_one.value;
    const currency_two = currencyEl_two.value;
    fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${currency_one}`)
        .then(res => res.json())
        .then(data => {
            const rate = data.conversion_rates[currency_two];
            rateEl!.textContent = `1 ${currency_one} = ${rate} ${currency_two}`;
            amountEl_two.value = (+amountEl_one.value * rate).toFixed(2);
        })
        .catch(err => {
            console.log('Error:', err);
        })
}


currencyEl_one?.addEventListener('change', calculate);
amountEl_one?.addEventListener('input', calculate);
currencyEl_two?.addEventListener('change', calculate);
amountEl_two?.addEventListener('input', calculate);

swap?.addEventListener('click', () => {
    const temp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    calculate();
})

calculate();