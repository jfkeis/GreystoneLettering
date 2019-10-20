import requests
import json
import time

#tfile = open("/sys/bus/w1/devices/28-00000807fc61/w1_slave")

#text = tfile.read()

#tfile.close()

#secondline = text.split("\n")[1]

#temperaturedata = secondline.split(" ")[9]

#temperature = float(temperaturedata[2:])

#temperature = temperature / 1000
temperature = 22.56

print(temperature)

timestr = time.strftime("%Y.%m.%d-%H.%M.%S")
filename = str(timestr)+'.json'
timestamp = int(time.time())
#print timestr


with open(filename , "a") as myfile:
        myfile.write('"currently":{'+'\n'+' "time":'+repr(timestamp)+ ','+'\n' +' "temp":'+repr(temperature)+'}'+'\n')


firebase_url = 'https://weathernow-3f8f4.firebaseio.com'

data = {'time':timestamp,'temp':temperature}
result = requests.post(firebase_url + '/Siggi' + '/temperature.json', data=json.dumps(data))

#result1 = requests.put(firebase_url, 'test',data)

#result2 = requests.get(firebase_url + '/Siggi.json')
print(result2.json)
