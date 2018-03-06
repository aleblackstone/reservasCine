let _data;
window.onload = function(){
    readTextFile("../data/data.json", function(text){
        _data = JSON.parse(text);
    }); 

    leerStorage();
    let aux= setTimeout(cargarDatosPelicula, 200);
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

function cargarDatosPelicula(){
    let indice = leerStorage();
    $("#infoPelicula").append(
        '<div class="pelicula">'+
                '<img src="../' + _data[indice]["foto"] +'" alt="Imagen de la película'+_data[indice]["titulo"]+'" tabindex="0" /> '+
                '<div class="datos">'+
                    '<h2 tabindex="0" id="titulo">'+ _data[indice]["titulo"] + '</h2>' +
                    '<div id="sinopsis" tabindex="0">'+
                        '<p >'+ _data[indice]["sinopsis"] + '</p>'+
                    '</div>'+
                    '<div  tabindex="0" alt="Trailer de la película" >'+
                        '<iframe src="' + _data[indice]["trailer"] +'" > Trailer de la película. </iframe>'+
                    '</div>'+
                '</div>'+
        '</div>'
    );
}

function guardarConsulta(){
	aux = JSON.stringify(listaConsultas);
	localStorage.setItem("consultas" ,aux);
}

function setPase(pase){
    let datos = [];
    datos.push(pase,$("#titulo").text());
	aux = JSON.stringify(datos);
	localStorage.setItem("pase" ,aux);
}


function leerStorage(){
    var aux = localStorage.getItem("idElemento");
    aux = JSON.parse(aux);
    return aux;
}