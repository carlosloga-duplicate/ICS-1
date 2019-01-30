
function Ahora() 
{
    var x = new Date();
    var y = x.getFullYear().toString();
    var m = (x.getMonth() + 1).toString();
    var d = x.getDate().toString(); 
    var h = x.getHours().toString();
    var mi = x.getMinutes().toString();
    var s = x.getSeconds().toString();
    var mil = x.getMilliseconds().toString();
    (d.length == 1) && (d = '0' + d);
    (m.length == 1) && (m = '0' + m);
    (h.length == 1) && (h = '0' + h);
    (mi.length == 1) && (mi = '0' + mi);
    (s.length == 1) && (s = '0' + s);
    var ahora = y + m + d + h + mi + s + mil;
    return ahora;
}

function constants(sCual)
{
    var dict = {};
    var sRet = "";
    try
    {
        dict['urlServeiREST'] = "http://a200.ecap.intranet.gencat.cat/REST_1_ICS/api/Foto";

        dict['ERRORGenerico'] = "S´ha produit un error ";
        dict['ERROREnviant'] = "ERROR enviant les dades ";
        dict['ERRORRevent'] = "ERROR rebent dades ";    
        dict['ERRORFoto'] = "ERROR capturant foto ";

        dict['OKEnviant'] = "Les dades s´han enviat correctament";
        dict['OKRebent'] = "Les dades s´han rebut correctament";    
        
        dict['WAITRebent'] = "Rebent dades del servidor";
        dict['WAITEnviant'] = "Enviant dades al servidor";

        sRet = dict[sCual].toString();
    }
    catch(err){
        sRet = "constants: " + err.message; 
    };

    return sRet;
}


