const API_KEY = "e236a94e8b672e90315c8324"; // Replace with your actual API key
const BASE_URL = "https://v6.exchangerate-api.com/v6/";

async function convertCurrency() {
    const baseCurrency = document.getElementById("base-currency").value.toUpperCase();
    const targetCurrency = document.getElementById("target-currency").value.toUpperCase();
    const amount = document.getElementById("amount").value;
    const resultElement = document.getElementById("result");
    const conversionRateElement = document.getElementById("conversion-rate");

    // Validate user input
    if (!baseCurrency || !targetCurrency || !amount || amount <= 0) {
        resultElement.innerHTML = "⚠️ Please enter valid currency codes and amount.";
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}${API_KEY}/latest/${baseCurrency}`);
        if (!response.ok) {
            throw new Error("Failed to fetch exchange rate.");
        }

        const data = await response.json();

        if (!data.conversion_rates || !data.conversion_rates[targetCurrency]) {
            throw new Error("Invalid currency code.");
        }

        const exchangeRate = data.conversion_rates[targetCurrency];
        const convertedAmount = (amount * exchangeRate).toFixed(2);

        resultElement.innerHTML = `💱 ${amount} ${baseCurrency} = <strong>${convertedAmount} ${targetCurrency}</strong>`;
        conversionRateElement.innerHTML = `📈 1 ${baseCurrency} = ${exchangeRate} ${targetCurrency}`;
    } catch (error) {
        resultElement.innerHTML = `❌ Error: ${error.message}`;
    }
}

function swapCurrencies() {
    let baseCurrency = document.getElementById("base-currency");
    let targetCurrency = document.getElementById("target-currency");

    // Swap values
    let temp = baseCurrency.value;
    baseCurrency.value = targetCurrency.value;
    targetCurrency.value = temp;
}