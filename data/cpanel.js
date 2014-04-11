var homeLink = document.getElementById("home");
var connectLink = document.getElementById("connect");
var disconnectLink = document.getElementById("disconnect");
var statusContainer = document.getElementById("status");

homeLink.onclick = function(e) {
    e.preventDefault();
    self.port.emit("openHome", null);
};

self.port.on("changeStatus", function(status){
    statusContainer.innerHTML = status;
});
