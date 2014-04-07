var widgets = require("sdk/widget");
var panels = require("sdk/panel");
var tabs = require("sdk/tabs");
var self = require("sdk/self");
var data = self.data;
var HOMEURL = "http://192.168.1.1/";


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
