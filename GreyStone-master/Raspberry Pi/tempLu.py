

tfile = open("/sys/bus/w1/devices/28-00000807fc61/w1_slave")

text = tfile.read()

tfile.close()
	
secondline = text.split("\n")[1]

temperaturedata = secondline.split(" ")[9]

temperature = float(temperaturedata[2:])

temperature = temperature / 1000

print temperature

import time
timestr = time.strftime("%Y.%m.%d-%H.%M.%S")
filename = str(timestr)+'.txt'
timestamp = int(time.time())
#print timestr


with open(filename , "a") as myfile:
   	myfile.write('"currently":{'+'\n'+' "time":'+repr(timestamp)+ ','+'\n' +' "temp":'+repr(temperature)+'}'+'\n')



