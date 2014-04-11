let { setInterval, clearInterval } = require('sdk/timers');
let { XMLHttpRequest } = require('sdk/net/xhr');
var Request = require("sdk/request").Request;
var widgets = require("sdk/widget");
var panels = require("sdk/panel");
var tabs = require("sdk/tabs");
var self = require("sdk/self");
var data = self.data;
var HOMEURL = "http://192.168.1.1";


var cpanel = panels.Panel({
    width: 175,
    height: 100,
    contentURL: data.url("cpanel.html"),
    contentScriptFile: data.url("cpanel.js")
});

var widget = widgets.Widget({
    id: "hilink",
    label: "HiLink Modem Control Panel",
    contentURL: data.url("hilink.ico"),
    panel: cpanel
});


cpanel.port.on("openHome", function(t) {
    tabs.open(HOMEURL);
});

var checkStatusId = null;
cpanel.on("show", function(){
    checkStatus();
    checkStatusId = setInterval(checkStatus, 7000);
});

cpanel.on("hide", function(){
    if (checkStatusId) {
        clearInterval(checkStatusId);
    }
});
/* TODO: create standalone module for helper function */
var checkStatus = function() {
    var reqURL = HOMEURL + '/api/monitoring/status';
    var request = new XMLHttpRequest();
    request.overrideMimeType("text/xml");
    request.onload =  function() {
        if (this.status == 200) {
            if (this.responseXML) {
                var xml = this.responseXML;
                var elements = xml.getElementsByTagName("ConnectionStatus");
                if (elements) {
                    var text = elements[0].innerHTML;
                    emitStatus(text);
                }
            }
        }
        else {
            console.log(reqURL + ":" + this.status);
        }

    };
    request.open("GET", reqURL, true);
    request.send(null);
};

var emitStatus = function(text) {
    var statusMap = {
        "900": "connecting",
        "901": "connected",
        "902": "disconnected",
        "903": "disconnecting"
    };
    var statusString = null;
    if (statusMap[text]) {
        statusString = statusMap[text];
    }
    else {
        statusString = "unknown";
    }
    cpanel.port.emit("changeStatus", statusString);
};
