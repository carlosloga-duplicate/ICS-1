

function onFailCamera(message) {
    mensajePopup('KO', constants("ERROREnviant") + "\n" + message, 0);
}

var OKfoto = function (r) {    
    mensajePopup('OK', constants('OKEnviant'), 4000);
    $("#txtCampOBS").val("");
    // alert('Foto pujada: ' + r.response + '  \nbytes enviats:' + r.bytesSent);
}

var ERRORfoto = function (error) {
    mensajePopup('KO', 'ERROR: ' + error.code + ' desant en: ' + error.target, 0);
    //alert("ERROR enviant dades: \nCODE: " + error.code + ' \nSOURCE: ' + error.source + ' \nTARGET: ' + error.target);
}

function clearCacheCamera() {
    navigator.camera.cleanup();
}

function capturePhoto() { 
    $('#pTxtAvis').html(constants('WAITEnviant'));
    $('#Avis').show();
    navigator.camera.getPicture(onCapturePhoto, onFailCamera, {
        quality: 100,
        destinationType: destinationType.FILE_URI
    });
}

var retries = 0;
function onCapturePhoto(fileURI) {
    var win = function (r) {
        clearCacheCamera();
        retries = 0;
        //alert('Done!');
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
    var params = {};
    params.p_camp1 = $("#txtCampUSU").val();
    params.p_camp2 = $("#txtCampSECTOR").val();
    params.p_camp3 = $("#txtCampOBS").val();
    options.params = params;  
    var ft = new FileTransfer();
    ft.upload(fileURI, encodeURI(constants("urlServeiREST")), OKfoto, ERRORfoto, options);
}