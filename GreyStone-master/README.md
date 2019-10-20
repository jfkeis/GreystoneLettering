# EC601WeatherStation
EC601 Project
## Team Members: 
Qing Lu:Anand Shivalkar;John Keisling;Sigurdur Thorvaldsson

## Website
Add all files from bootstrap-3.3.7-dist into the same folder.  Access live website via AWS: http://ec601weathernow.com.s3-website-us-east-1.amazonaws.com/

## Data Cloud -- Dark Sky API
```
login username: luq001@bu.edu
```
Password: weatherstation
```
[Sample API Call](https://api.darksky.net/forecast/d369eb463511ff07a4c61681c7fd69af/37.8267,-122.4233)
```

## Raspberry Pi
### Wi-Fi Setting
```
Scan: sudo iwlist wlan0 scan
```
Add to Pi: 
```
sudo nano /etc/wpa-supplicant/wpa_supplicant.conf 
```
```
network = { ssid = "Hotspot Name" psk = "Password" }
```
Pressing Ctrl+X then Y, finally press Enter
```
```
If error, restart with " sudo ifdown wlan0" and " sudo ifup wlan0" 
```
```
Verify Succeed:
```
ifconfig wlan0 
```
```
inet addr 
```
MongoDB: [Install DB on Pi](https://docs.mongodb.com/manual/tutorial/install-mongodb-enterprise-on-ubuntu/?_ga=1.185082272.826439590.1477339556)


