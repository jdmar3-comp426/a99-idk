# API Endpoints
## GET Endpoints
+ "/app": Default endpoint on which the Express app is running on. Port 3001
+ "/app/{uid}": Returns a JSON response of all items in the current user's document in Firebase "items" collection based on user UID
## POST Endpoints
+ "/app/create/{uid}": Adds an item to the user document in Firebase by updating the document with new array received from the frontend based on user UID.
## PATCH Endpoints
+ "/app/update/{uid}": Updates items in user document based on parameters changed in the frontend by updating the document with updated array received from frontend based on user UID.
## DELETE Endpoints
+ "/app/delete/{uid}": Deletes the current user from the database and removes its document in Firestore based on user UID.
