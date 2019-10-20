from firebase import firebase

firebase = firebase.FirebaseApplication('https://weathernow-3f8f4.firebaseio.com/')

#result = firebase.post('/Users',{'Three':{'ThreeChild':'threeChildValue'}})
resultPut = firebase.put('/Users','Four',{'FourChild':'4','ThreeChildTwo':'ThreeChildTwoValue'})

print(result)
print(resultPut)