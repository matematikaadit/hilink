# status

- `GET /api/monitoring/status`
- executor: `/js/main.js, /js/index.js`
- Example Request:
```
GET /api/monitoring/status HTTP/1.1
Host: 192.168.1.1
User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux i686; rv:26.0) Gecko/20100101 Firefox/26.0
Accept: */*
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
X-Requested-With: XMLHttpRequest
Referer: http://192.168.1.1/html/index.html
Connection: keep-alive
```
- Example Response:
```
HTTP/1.1 200 OK
Date: Thu, 01 Jan 1970 00:10:23 GMT
Server: IPWEBS/1.4.0
Cache-Control: no-cache
Content-Length: 641
Content-Type: text/html

<?xml version="1.0" encoding="UTF-8"?>
<response>
<ConnectionStatus>902</ConnectionStatus>
<SignalStrength>99</SignalStrength>
<SignalIcon>5</SignalIcon>
<CurrentNetworkType>4</CurrentNetworkType>
<CurrentServiceDomain>3</CurrentServiceDomain>
<RoamingStatus>0</RoamingStatus>
<BatteryStatus></BatteryStatus>
<BatteryLevel></BatteryLevel>
<simlockStatus></simlockStatus>
<WanIPAddress></WanIPAddress>
<PrimaryDns></PrimaryDns>
<SecondaryDns></SecondaryDns>
<CurrentWifiUser></CurrentWifiUser>
<TotalWifiUser></TotalWifiUser>
<ServiceStatus>2</ServiceStatus>
<SimStatus>1</SimStatus>
<WifiStatus></WifiStatus>
</response>
```

## Connection Status:

`response.ConnectionStatus`

- 900: connecting
- 901: connected
- 902: disconnected
- 903: disconnecting

(variable `MACRO_CONNECTION_*`)
