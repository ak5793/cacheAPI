# cacheAPI

**Structure**

app
  models
    randomObject.js
package.json
README.md
server.js

**Getting Started**

- Install the all the required modules listed in package.json with the terminal command ‘npm install’.
- Within server.js, at the top under Base Setup, there exists configurable fields that can be redefined for your own local setup, i.e., you can change the URI values to match those of your local setup.


**Database Schema**

RandomObject [Model]
 - name::string
 - createdAt::Date<Expiration:5mins>

**API Endpoints**

/api/randomObjects
- GET: Returns list of all objects in cache
- POST: Create an object in the cache (Note: When cache is full, oldest created -- can also be oldest to be last modified --  object is    deleted). I decided this since there was no specification for a batch create endpoint.
- DELETE: Flushes the cache

/api/randomObjects/:randomObject_id
- GET: Returns specified object
- PUT: Update specified object
- DELETE: Deletes specified object

Things I would improve: I would improve the modularity of the endpoints such that they are more descriptive. For example, perhaps creating an object would be done so using a POST to an endpoint /api/randomObjects/create/, etc, while also modularizing the server.js to be more readable. I would also include unit tests using a proper framework.
