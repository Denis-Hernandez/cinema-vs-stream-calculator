const currencies = [
    {currency: 'USD', value: 1, symbol: "$" },
    {currency: 'EUR', value: 0.85364, symbol: "€" },
    {currency: 'HNL', value: 23.75561, symbol: "L." },
    {currency: 'UYU', value: 43.25574, symbol: "$" },
    {currency: 'ARS', value: 97.27888, symbol: "$AR" },
    {currency: 'BRL', value: 5.37883, symbol: "R$" },
    {currency: 'CLP', value: 787.63353, symbol: "$" },
    {currency: 'COP', value: 3850.14216, symbol: "$" },
    {currency: 'GBP', value: 0.72718, symbol: "£" },
    {currency: 'GTQ', value: 7.72923, symbol: "Q" },
    {currency: 'MXN', value: 20.0368, symbol: "$" },
];
const services = [
    {name:'Netflix',price:9},
    {name:'Disney+',price:8},
    {name:'Prime Video',price:10},
    {name:'Paramount+',price:5},
    {name:'HBO Max',price:15},
    {name:'Apple TV',price:5},
];
let currentCurrency=1;

function compararPrecios(){
    var precios = preciosDeStreamSeleccionados();
    var opcionPrincipal = "...";
    var opcionSecundaria = "...";
    var cantidadProducciones = document.getElementById("productions_amount").value;
    if(precios.length > 0 && cantidadProducciones > 0){
        var totalStream = calcularTotalStream(precios)*currentCurrency;
        var totalCine = calcularCine(cantidadProducciones);
        if(totalStream>totalCine){
            opcionPrincipal = "Cine: " + totalCine.toFixed(2);
            opcionSecundaria = "Stream: " + totalStream.toFixed(2);
        }else{
            opcionPrincipal = "Stream: " + totalStream.toFixed(2);
            opcionSecundaria = "Cine: " + totalCine.toFixed(2);
        }
    }
    var labelPrincipal = document.getElementById("first-option");
    var labelSecundaria = document.getElementById("second-option");
    labelPrincipal.innerText = opcionPrincipal;
    labelSecundaria.innerText = opcionSecundaria;
}

function calcularTotalStream(precios){
    return precios.reduce((total,precio)=>{
        return total+precio;
    });
}

function calcularCine(cantidad){
    var precioCine = document.getElementById("cinema_price").value;
    return cantidad * precioCine;
}

function preciosDeStreamSeleccionados(){
    var seleccionado=[];
    var checks = document.querySelectorAll(".container__form--input-check");
    checks.forEach(check=>{
        if (check.checked){
            precio = Number(check.value);
            seleccionado.push(precio);
        }
    });
    return seleccionado;
}

function generateLists(){
    generateListOfServices();
    generateListOfCurrencies();
}

function generateListOfCurrencies(){
    let list = document.querySelector(".list-container__list");
    currencies.forEach((currency)=>{
        let option = document.createElement("option");
        Object.assign(option,{
            className: 'list-container__list--option',
            type: 'checkbox',
            value: currency.currency,
            innerHTML: `${currency.currency} (${currency.symbol})`
        });
        //option.addEventListener('click', actualizarCurrency)
        list.appendChild(option);
    });
}

function generateListOfServices(){
    let div = document.querySelector("#list-options")
    services.forEach((service, index)=>{
        let option =optionList(index,service.name,service.price);
        div.appendChild(option);
    });
}

function optionList(index,name,price){
    let label = document.createElement("label");
    let input = document.createElement("input");
    let span = document.createElement("span");
    span.className = 'container__form--checkmark';
    Object.assign(input,{
        className: 'container__form--input-check',
        type: 'checkbox',
        value: price,
        id: `option_${index}`,
    });
    input.addEventListener('input', compararPrecios)
    Object.assign(label,{
        className:'container__form--check-container',
        htmlFor:`option_${index}`,
        innerHTML: name
    });
    label.appendChild(input);
    label.appendChild(span);
    return label;
}

function displayList(input){
    let currencies = document.getElementById('currencies');
    input.style.borderRadius = "5px 5px 0 0";
    currencies.style.display = 'block';
    let options = currencies.options;
    //console.log(currencies);
    //console.log(options);
    for (let option of currencies.options){
        option.onclick = ()=>{
            input.value = option.value;
            currencies.style.display = 'none';
            input.style.borderRadius = "5px";
            actualizarCurrency(option.value);
            compararPrecios();
        }
    }
    /*currencies.options.forEach((option)=>{
        option.onclick = ()=>{
            input.value = option.value;
            currencies.style.display = 'none';
            input.style.borderRadius = "5px";
        }
    });*/
    
}

function actualizarCurrency(value){
    let selected=currencies.filter((currency) => {return currency.currency == value});
    currentCurrency = selected[0].value;
    console.log(currentCurrency);
    //console.log(selected);
    //console.log(value);
}