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
                    alert('ERROR recuperant l´usuari/sector d´aquest mòvil: ' + err.message);
                }

                //DEBUG:
                if(datosUsu == null || datosUsu.length < 1)
                {
                    datosUsu = "carlos|4321";
                }
                alert(datosUSU);

                $.mobile.changePage('#pagePrincipal', {transition: "flow"}); 

                if(datosUsu == null || datosUsu.length < 1)
                {
                    $("txtCampUSU").removeAttr("readonly");
                    $("txtCampSECTOR").removeAttr("readonly");
                    $("botonGuardaDatosUSU").attr("display","block");
                }
                else{
                    var sUsu = datosUsu.split("|")[0]; 
                    var sSector = datosUsu.split("|")[1];
                }

                $("#txtCampUSU").val(sUsu);
                $("#txtCampSECTOR").val(sSector);
/*                 if(datosUSU=="")
                {

                } */
                //$.mobile.changePage('#pagePrincipal', {transition: "flow"});  
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
 

