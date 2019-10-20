import requests
import json
import time
from firebase import firebase

tfile = open("/sys/bus/w1/devices/28-00000807fc61/w1_slave")

text = tfile.read()

tfile.close()
	
secondline = text.split("\n")[1]

temperaturedata = secondline.split(" ")[9]

temperature = float(temperaturedata[2:])

temperature = temperature / 1000

print temperature

timestr = time.strftime("%Y.%m.%d-%H.%M.%S")
filename = str(timestr)+'.json'
timestamp = int(time.time())
parent = 'h'+str(timestamp)[:9]+'0'
entry = '\'' + str(timestr) + '\''
print parent


with open(filename , "a") as myfile:
   	myfile.write('"currently":{'+'\n'+' "time":'+repr(timestamp)+ ','+'\n' +' "temp":'+repr(temperature)+'}'+'\n')

#firebase_url = 'https://weathernow-3f8f4.firebaseio.com' #Siggi
#firebase_url = 'https://weathernow-db3fe.firebaseio.com' #John

firebase = firebase.FirebaseApplication('https://weathernow-db3fe.firebaseio.com/')
resultPut = firebase.put('/temperature',parent,{'time':timestamp,'temp':temperature})

data = {'time':timestamp,'temp':temperature}
#result = requests.post(firebase_url + '/' + '/temperature.json', data=json.dumps(data))

#result2 = request.post(firebase_url
