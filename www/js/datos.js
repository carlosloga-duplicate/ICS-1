
function EstadoUSUsector(bVer)
{
    if(bVer)
    {
        $('#txtCampUSU').prop('readonly', false);
        $('#txtCampSECTOR').prop('readonly', false);
        $('#txtCampUSU').prop('style', "background-color:white;"); 
        $('#txtCampSECTOR').prop('style', "background-color:white;"); 

        $('#txtCampOBS').prop('disabled', true);  
        $('#divBotonEnviar').prop('disabled', true);        
        
        $("#trBotonGuardaDatosUSU").show();   
    }
    else
    {
        $("#trBotonGuardaDatosUSU").hide();
        $('#txtCampUSU').prop('readonly', true);
        $('#txtCampSECTOR').prop('readonly', true);

        $('#txtCampUSU').prop('class', "");
        $('#txtCampUSU').prop('style', "border:none !important;"); 
        $('#txtCampUSU').prop('style', "background-color:silver;");           
        $('#txtCampSECTOR').prop('class', "");                              
        $('#txtCampSECTOR').prop('style', "border:none !important;");           
        $('#txtCampSECTOR').prop('style', "background-color:silver;"); 

        $('#txtCampOBS').prop('disabled', false);  
        $('#divBotonEnviar').prop('disabled', false);       
    }
}

function guardaDatosUSU(sUsu, sSector)
{
    localStorage.setItem('USU', sUsu);
    localStorage.setItem('SECTOR', sSector);
}

function recuperaDatosUSU()
{
    try{
        var sUsu = localStorage.getItem('USU');
        var sSector = localStorage.getItem('SECTOR');
        if(sUsu == null || sSector == null)
            return constants('NOConfig');
        else
            return sUsu + "|" + sSector;
    }
    catch(err)
    {
        return constants('ERRORConfig') + err.message;
    }
}

function guardaUsuSector()
{
    var sUsu = $("#txtCampUSU").val();
    var sSector = $("#txtCampSECTOR").val();
    guardaDatosUSU(sUsu,sSector);
    EstadoUSUsector(false);
}

function cancelaUsuSector()
{
    EstadoUSUsector(false);
}

function cambiaUsuSector()
{
    if($("#trBotonGuardaDatosUSU").is(':visible') )    
        EstadoUSUsector(false); 
    else
        EstadoUSUsector(true); 
}

function historicoUsuSector()
{
    $('#pTxtAvis').html(constants("WAITRebent"));
    $('#Avis').show();

/*  var datosUsu = recuperaDatosUSU();
    var sUsu = datosUsu.split("|")[0]; 
    var sSector = datosUsu.split("|")[1];  */

    var sUsu = $('#txtCampUSU').val(); 
    var sSector = $('#txtCampSECTOR').val(); 

    $.ajax({
        url: constants("urlServeiREST"),
        data: {"usu": escape(sUsu), "sector": escape(sSector) },
        type: "GET",
        dataType: "json",
        headers: {"Accept": "application/json"},
        success: function(response, status) {
            response = JSON.stringify(response);
            //mensajePopup('OK', constants('OKRebent'), 4000);
            var sResp = "";
            var aRegistros = response.split("#");
            for(var x=0; x<aRegistros.lenght; x++)
            {
                sResp += aRegistros[x].replace("|"," / ") + "<br/>";
            }
            $('#txtCampOBS').prop('disabled', false);
            $('#txtCampOBS').css('overflow', 'hidden').autogrow();
            $("#txtCampOBS").val(sResp);
            $('#txtCampOBS').focus();

            $('#pTxtAvis').html("");
            $('#Avis').hide();
        },
            error: function(request, status, error) { 
                $('#pTxtAvis').html("");
                $('#Avis').hide();
                mensajePopup('KO', constants('ERRORRevent') + status + "\n" + request.statusText + "\n" + request.status + "\n" + request.responseText + "\n" + request.getAllResponseHeaders(), 0);
        }
    });

}

