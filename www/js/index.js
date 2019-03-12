/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var pictureSource;   // picture source
var destinationType; // sets the format of returned value

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() { 
        app.receivedEvent('deviceready');
        pictureSource = navigator.camera.PictureSourceType;
        destinationType = navigator.camera.DestinationType;
        
        $.doTimeout(2000, function(){ 
            cordova.getAppVersion.getVersionNumber(function (version) {
                $("#tdPie").html("v." + version + " - DEBUG");                    
                $("#deviceready").hide();

                alert('recuperaDatosUSU'); 

                var datosUsu = "-";
                try
                {
                    datosUsu = recuperaDatosUSU();                 
                }
                catch(err)
                {
                    mensajePopup("KO", 'ERROR recuperant l´usuari/sector d´aquest mòvil: ' + err.message, 0);
                }

                //DEBUG:
                if(datosUsu == undefined)  //compara si es null o es undefined (la function no devolvió nada) 
                {   
                    datosUsu = "carlos|4321";
                    $.mobile.changePage('#pagePrincipal', {transition: "flow"}); 
                    mensajePopup("KO", "No s´ha trobat l´usuari/sector en aquest mòvil. Informi´ls si us plau", 0);
                    $('#txtCampUSU').prop('readonly', false);
                    $('#txtCampSECTOR').prop('readonly', false);
                    $("#botonGuardaDatosUSU").attr("display","block");    
                }
                else
                {                                 
                    if(datosUsu.startsWith("ERROR")) 
                    {
                        datosUsu = "carlos|4321";
                        $.mobile.changePage('#pagePrincipal', {transition: "flow"}); 
                        mensajePopup("KO", datosUsu, 0);
                        $('#txtCampUSU').prop('readonly', false);
                        $('#txtCampSECTOR').prop('readonly', false);
                        $("#botonGuardaDatosUSU").attr("display","block");  
                    }
                    else
                    {
                        if(datosUsu == "null|null")
                        {
                            datosUsu = "carlos|4321";
                            $.mobile.changePage('#pagePrincipal', {transition: "flow"}); 
                            mensajePopup("KO", "No s´ha trobat l´usuari/sector en aquest mòvil. Informi´ls si us plau", 0);
                            $('#txtCampUSU').prop('readonly', false);
                            $('#txtCampSECTOR').prop('readonly', false);
                            $("#botonGuardaDatosUSU").attr("display","block");  
                        }
                        else
                        {
                            mensajePopup("KO", "No s´ha trobat l´usuari/sector en aquest mòvil. Informi´ls si us plau", 0);
                            var sUsu = datosUsu.split("|")[0]; 
                            var sSector = datosUsu.split("|")[1];                        
                            $("#txtCampUSU").val(sUsu);
                            $("#txtCampSECTOR").val(sSector);
                        }
                    }
                }
                alert('2: ' + datosUSU);                
 
            });                   
        });    
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
    }

};
 

