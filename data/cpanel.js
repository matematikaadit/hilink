var homeLink = document.getElementById("home");
var connectLink = document.getElementById("connect");
var disconnectLink = document.getElementById("disconnect");
var statusContainer = document.getElementById("status");

self.port.on("changeStatus", function(status){
    var parser = new DOMParser();
    var xml = parser.parseFromString(status, "application/xml");
    var elements = xml.getElementsByTagName("ConnectionStatus");
    var statusString = "";
    if (elements) {
        statusString = num2Status(elements[0].innerHTML);
    }
    statusContainer.innerHTML = statusString;
});

var num2Status = function(text) {
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
    return statusString;
};

homeLink.onclick = function(e) {
    e.preventDefault();
    self.port.emit("openHome", null);
};

connectLink.onclick = dialFunc(1);
disconnectLink.onclick = dialFunc(0);

function dialFunc(action){
    return function(e) {
        e.preventDefault();
        var xml = action2XML(action);
        self.port.emit("dial", xml);
        self.port.emit("checkStatus", null);
    };
};

var action2XML = function(action) {
    var actionXML = '<?xml version="1.0" encoding="UTF-8"?>' +
            '<request><Action>' + action + '</Action></request>';
    return actionXML;
};
