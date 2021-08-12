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