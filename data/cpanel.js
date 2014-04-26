var homeLink = document.getElementById("home");
var connectLink = document.getElementById("connect");
var disconnectLink = document.getElementById("disconnect");
var statusContainer = document.getElementById("status");

disconnectLink._sibling = connectLink;
connectLink._sibling = disconnectLink;

self.port.on("changeStatus", function(xmlstr){
    var status = xmlstr2status(xmlstr);
    statusContainer.innerHTML = status;
    updateLink(status);
});

function updateLink(status) {
    switch(status){
        case "connected":
        case "connecting":
            unhide(disconnectLink);
            break;
        case "disconnected":
        case "disconnecting":
            unhide(connectLink);
            break;
        default:
            unhide(connectLink);
            break;
    }
}

function unhide(link) {
    link.classList.remove("hidden");
    link._sibling.classList.add("hidden");
}

function xmlstr2status(xmlstr){
    var parser = new DOMParser();
    var xml = parser.parseFromString(xmlstr, "application/xml");
    var elements = xml.getElementsByTagName("ConnectionStatus");
    var status = "";
    if (elements) {
        status = num2Status(elements[0].innerHTML);
    }
    return status;

}

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

connectLink.onclick = dialFunction(1);
disconnectLink.onclick = dialFunction(0);

function dialFunction(action){
    return function(e) {
        e.preventDefault();
        var xml = action2XML(action);
        self.port.emit("dial", xml);
        self.port.emit("checkStatus", null);
        unhide(this._sibling);
    };
};

var action2XML = function(action) {
    var actionXML = '<?xml version="1.0" encoding="UTF-8"?>' +
            '<request><Action>' + action + '</Action></request>';
    return actionXML;
};
