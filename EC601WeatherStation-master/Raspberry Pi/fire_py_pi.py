from firebase import firebase
firebase = firebase.FirebaseApplication('https://weathernow-3f8f4.firebaseio.com/', None)
result = firebase.get('/alerts', None)
new_user = 'Siggi Thorvalds'

result1 = firebase.post('/test', 22.5)
result2 = firebase.put('/test2', 23.45)
print result
