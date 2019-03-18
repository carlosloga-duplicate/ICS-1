
 var nEnvia;

function onFailCamera(message) {
    $('#Avis').hide();
    mensajePopup('KO', constants("ERROREnviant") + "\n" + message, 0);
    $('#divBotonEnviar').show(); //Mostrar de nuevo el botón de Adjuntar i enviar foto
}

var OKfoto = function (r) {    
    clearTimeout(nEnvia); 
    $('#Avis').hide();
    mensajePopup('OK', constants('OKEnviant'), 8000);
    $('#divBotonEnviar').show(); //Mostrar de nuevo el botón de Adjuntar i enviar foto
    $("#txtCampOBS").val("");
}

var ERRORfoto = function (error) {
    clearTimeout(nEnvia); 
    $('#Avis').hide();
    mensajePopup('KO', 'ERROR: (codi:' + error.code + ') enviant la foto ',0); // + error.target, 0);
    $('#divBotonEnviar').show(); //Mostrar de nuevo el botón de Adjuntar i enviar foto
    //alert("ERROR enviant dades: \nCODE: " + error.code + ' \nSOURCE: ' + error.source + ' \nTARGET: ' + error.target);
}

function clearCacheCamera() {
    navigator.camera.cleanup();
}

function capturePhoto() {  
    $('#divBotonEnviar').hide(); //Ocultar botón de Adjuntar i enviar foto
    $('#pTxtAvis').html(constants('WAITEnviant')); //Mostrar aviso 'enviando...'
    $('#Avis').show();
    EstadoUSUsector(false); 
    navigator.camera.getPicture(onCapturePhoto, onFailCamera, {
        quality: 100,
        destinationType: destinationType.FILE_URI,
        saveToPhotoAlbum: false
    });
}

var retries = 0;
function onCapturePhoto(fileURI) {
    var win = function (r) {
        clearCacheCamera();
        retries = 0;        
    }
 
    var fail = function (error) {
        if (retries == 0) {
            retries ++
            setTimeout(function() {
                onCapturePhoto(fileURI)
            }, 1000)
        } else {
            retries = 0;
            clearCacheCamera();
            mensajePopup('KO', constants("ERRORFoto") + error, 0);            
        }
    }
 
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = "Foto_" + Ahora() + "_" +  $("#txtCampUSU").val() + "_" + $("#txtCampSECTOR").val() + ".jpeg";  
    options.mimeType = "image/jpeg"; 
    options.chunkedMode = false;
    var params = {};
    params.p_camp1 = $("#txtCampUSU").val();
    params.p_camp2 = $("#txtCampSECTOR").val();
    params.p_camp3 = $("textarea#txtCampOBS").val();
    options.params = params;  

    var ft = new FileTransfer();
    ft.upload(fileURI, encodeURI(constants("urlServeiREST")), OKfoto, ERRORfoto, options);
    
    nEnvia = setTimeout(function() {    
        ft.abort();    
        mensajePopup('KO', constants("ERRORtimeOut") , 0);        
    }, 50000);

}

