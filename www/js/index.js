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
        
        $.doTimeout( 3000, function(){ 
            $.mobile.changePage('#pagePrincipal', {transition: "none"});
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

function clearCache() {
    navigator.camera.cleanup();
}

var retries = 0;
function onCapturePhoto(fileURI) {
    var win = function (r) {
        clearCache();
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
            clearCache();
            alert('S´ha produit un error');
        }
    }
 
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName =  "Foto_" + Ahora() + ".jpeg";  //fileURI.substr(fileURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    options.params = {};  //si se necesitan ...
    var ft = new FileTransfer();
    ft.upload(fileURI, encodeURI("http://a200.ecap.intranet.gencat.cat/REST_1_ICS/api/PostFoto2"), OKfoto, ERRORfoto, options);
}

function capturePhoto() {
    navigator.camera.getPicture(onCapturePhoto, onFail, {
        quality: 100,
        destinationType: destinationType.FILE_URI
    });
}
 
function onFail(message) {
    alert('Error: ' + message);
}

function Ahora() {
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

var OKfoto = function (r) {
    alert('Foto pujada: ' + r.response + '  \nbytes enviats:' + r.bytesSent);
}

var ERRORfoto = function (error) {
    alert("ERROR enviant la foto: \nCODE: " + error.code + ' \nSOURCE: ' + error.source + ' \nTARGET: ' + error.target);
}

