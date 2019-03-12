

function guardaDatosUSU(sUsu, sSector)
{
    localStorage.setItem('USU', sUsu);
    localStorage.setItem('SECTOR', sSector);
}

function recuperaDatosUSU()
{
    var sUsu = localStorage.getItem('USU');
    var sSector = localStorage.getItem('SECTOR');
    return sUsu + "|" + sSector;
}

function baixarDades()
{
    $('#pTxtAvis').html(constants("WAITRebent"));
    $('#Avis').show();

    var datosUsu = recuperaDatosUSU();
    var sUsu = datosUsu.split("|")[0]; 
    var sSector = datosUsu.split("|")[1]; 

    $.ajax({
        url: constants("urlServeiREST"),
        data: {"usu": escape(sUsu), "sector": escape(sSector) },
        type: "GET",
        dataType: "json",
        headers: {"Accept": "application/json"},
        success: function(response, status) {
            response = JSON.stringify(response);
            mensajePopup('OK', constants('OKRebent'), 4000);
            var rebut = response.split("#");
            //$("#txtCamp1").val("el " + rebut[0].split("|")[0] + " és " + rebut[0].split("|")[1]);
            //$("#txtCamp2").val("el " + rebut[1].split("|")[0] + " és " + rebut[1].split("|")[1]);
            if(rebut.length > 2)
                $("#txtCampOBS").val(rebut[0].split("|")[1] + " / " + rebut[1].split("|")[1] + " / " + rebut[2].split("|")[1]);
        },
            error: function(request, status, error) { 
                mensajePopup('KO', constants('ERRORRevent') + status + "\n" + request.statusText + "\n" + request.status + "\n" + request.responseText + "\n" + request.getAllResponseHeaders(), 0);
        }
    });

}

