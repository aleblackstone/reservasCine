let listaButacas;
let butacasReservadas;
window.onload = function(){ 
    cargarButacas();
    butacasReservadas = leerStorage("butacasSeleccionadas");
    datosAsientos();
 };

 function cargarButacas(){
     listaButacas = leerStorage("listaButacas");
     if(listaButacas == null){
        leerJson();
     }
 }

 
function guardarCompra(){
    let datosPase = leerStorage("pase");

    for(let i = 1; i < 26; i++){
        for(let j = 0; j < butacasReservadas.length; j++){
            if(listaButacas[i]["fila"] == butacasReservadas[j][0] && listaButacas[i]["asiento"] == butacasReservadas[j][1]){
                listaButacas[i][datosPase[1]][datosPase[0]]["estado"] = "ocupado";
                alert("wujaajajaj");
            }
        }
    }
    guardarConsulta(listaButacas,"listaButacas");

}

 function datosAsientos(){
     for(let i = 0; i < butacasReservadas.length; i++){
         $("#asientosReservados").append(
             '<div>'+
                '<p> Fila :' + butacasReservadas[i][0] + '</p>'+
                '<p> Número asiento:' + butacasReservadas[i][1] + '</p>'+
            '</div>'
        );
     }
     let precioTotal = 7 * butacasReservadas.length;
     $("#precioTotal").text(precioTotal+"€");
 }

 function leerStorage(clave){
    var aux = localStorage.getItem(clave);
    aux = JSON.parse(aux);
    return aux;
}

function guardarConsulta(valor, clave){
	aux = JSON.stringify(valor);
	localStorage.setItem(clave ,aux);
}

function leerJson(){
    readTextFile("../data/asientos.json", function(text){
        listaButacas = JSON.parse(text);
    });
}

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    };
    rawFile.send(null);
}