let { setInterval, clearInterval } = require('sdk/timers');
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
    var request = Request({
        url: reqURL,
        onComplete: function(response){
            if (response.status == 200)
                cpanel.port.emit("changeStatus", response.text);
            else
                console.log("REQ:"+reqURL+":"+response.status);
        }
    });
    request.get();
};

cpanel.port.on("checkStatus", function() {checkStatus();});

cpanel.port.on("dial", function(action){
    var reqURL = HOMEURL + "/api/dialup/dial";
    var request = Request({
        url: reqURL,
        content: action,
        onComplete: function(response){
            if (response.status == 200)
                cpanel.port.emit("dialResponse", response.text);
            else
                console.log("REQ:"+reqURL+":"+response.status);
        }
    });
    request.post();
});
