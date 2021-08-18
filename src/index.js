//import modulo from './option_list';
function compararPrecios(){
    var precios = preciosDeStreamSeleccionados();
    var opcionPrincipal = "...";
    var opcionSecundaria = "...";
    var cantidadProducciones = document.getElementById("productions_amount").value;
    if(precios.length > 0 && cantidadProducciones > 0){
        var totalStream = calcularTotalStream(precios);
        var totalCine = calcularCine(cantidadProducciones);
        if(totalStream>totalCine){
            opcionPrincipal = "Cine: " + totalCine;
            opcionSecundaria = "Stream: " + totalStream;
        }else{
            opcionPrincipal = "Stream: " + totalStream;
            opcionSecundaria = "Cine: " + totalCine;
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

function generateListOfServices(){
    let services = [
        {name:'Netflix',price:9},
        {name:'Disney+',price:8},
        {name:'Prime Video',price:10},
        {name:'Paramount+',price:5},
        {name:'HBO Max',price:15},
        {name:'Apple TV',price:5},];
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
        oninput: 'compararPrecios()',
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