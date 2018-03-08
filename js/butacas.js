let listaAsientos;
let datosPase;

window.onload = function(){ 
    listaAsientos = leerStorage("listaButacas");
    /*
    if(listaAsientos == null){
        readTextFile("../data/asientos.json", function(text){
            listaAsientos = JSON.parse(text);
        }); 
    }*/
    if(listaAsientos == null){
        readTextFile("/reservasCine/data/data.json", function(text){
            listaAsientos = JSON.parse(text);
        }); 
    }
    
    let _aux = setTimeout(cargarButacas, 100);
    datosPase = leerStorage("pase");
 };


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

function cargarButacas(){
    const  svgns = 'http://www.w3.org/2000/svg';
    const  xlinkns = 'http://www.w3.org/1999/xlink';
    let _pelicula = datosPase[1];
    let _pase = datosPase[0];
    for(let i = 1; i < 26; i++){
        let clase = "libre";
        let aux = listaAsientos[i][_pelicula][_pase]["estado"];
        if(aux == "ocupado")
            clase = "ocupado";

        let use = document.createElementNS(svgns, "use");
        use.id = listaAsientos[i]["fila"] + "_" + listaAsientos[i]["asiento"];
        use.setAttribute("x", listaAsientos[i]["x"]);
        use.setAttribute("y", listaAsientos[i]["y"]);
        use.setAttributeNS(xlinkns, "href", "#butaca");
        use.addEventListener("click", function(){
        let claseElemento = this.getAttribute("class");

            switch(claseElemento){
                case "ocupado":
                    alert("No puede reservar una butaca ocupada");
                    break;
                case "seleccionado":
                    this.setAttribute("class", "libre");
                    break;
                case "libre":
                    this.setAttribute("class", "seleccionado");
            }
        });
        use.classList.add(clase);
        document.getElementById("lienzo").appendChild(use)
    }
}

function butacasReservadas(){
    let seleccionadas = document.getElementsByClassName("seleccionado");
    let listaButacasSeleccionadas = [];
    
    for(let i = 0; i < seleccionadas.length; i++){
        let aux = [];
        let id = seleccionadas[i].id;
        let fila = id.substring(0,1);
        let asiento = id.substring(2,3);
        
        aux.push(fila,asiento,id);
        listaButacasSeleccionadas.push(aux);
    }
    guardarConsulta(listaButacasSeleccionadas,"butacasSeleccionadas");
}

function setButacas(){
    var aux = $(".seleccionado");
    aux = aux[0];
    guardarConsulta(aux,"butacasSeleccionadas");
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
