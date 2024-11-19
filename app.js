const base_url = "https://latest.currency-api.pages.dev/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const form_currency = document.querySelector(".form select");
const to_currency = document.querySelector(".to select");
let msg = document.querySelector(".result input");


for(let select of dropdowns) {
    for (currency_code in countryList) {
        let newoption = document.createElement("option");
        newoption.innerText = currency_code;
        newoption.value = currency_code;
        if(select.name === "form" && currency_code === "USD") {
            newoption.selected = "selected";
        }
        else if(select.name === "to" && currency_code === "INR") {
            newoption.selected = "selected";
        }
        select.append(newoption);
    }
    select.addEventListener("change", (evt) => {
        update_flag(evt.target);
    });
}

const update_exchange_rate = async () => {
    let amount = document.querySelector(".amount input");
    let amount_value = amount.value;
    if( amount_value === "" || amount_value < 1) {
        amount_value = 1;
        amount.value = "1";
    }

    const url = `${base_url}/${form_currency.value.toLowerCase()}.json`;
    let response = await fetch (url);
    let data = await response.json();
    let rate = data[form_currency.value.toLowerCase()][to_currency.value.toLowerCase()];
    
    let final_amount = amount_value * rate;
    msg.value = final_amount;

};

const update_flag = (element) => {
    let currency_code = element.value;
    let countrycode = countryList[currency_code];
    let new_src = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = new_src;

}


btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    update_exchange_rate();  
});

window.addEventListener("load", () => {
    update_exchange_rate();
});
