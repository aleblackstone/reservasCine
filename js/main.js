let _data;
window.onload = function(){ 
    /*
    readTextFile("data/data.json", function(text){
        _data = JSON.parse(text);
    }); 
    */
   readTextFile("/reservasCine/data/data.json", function(text){
    _data = JSON.parse(text);
    }); 
    
    let aux = setTimeout(crearPeliculas, 200);
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

function crearPeliculas(){
    for(let i = 0; i < _data.length; i++){
        let _tabindex = i + 2;
        $("#container").append(
            '<div class="pelicula" id="'+i+'" onclick="paginaPelicula(this)">'+
                '<a href="html/paginaPelicula.html">'+
                    '<img src="' + _data[i]["foto"] + '" alt="Imagen de la película '+ _data[i]["titulo"]+'">'+
                '</a>'+
                '<div class="oculto">'+
                    '<p>'+ _data[i]["titulo"] + '</p>' +
                '</div>'+
            '</div>'
        );
    }
}
let idElemento;
function paginaPelicula(elemento){
    idElemento = $(elemento).attr("id");
    setIdPelicula();
}

function setIdPelicula(){
	aux = JSON.stringify(idElemento);
	localStorage.setItem("idElemento" ,aux);

}

function getIdElemento(){
    return idElemento;
}
