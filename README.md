# Cache_API
A REST API consisting of methods to interact with a cache.

Installation
To install the app, clone the repository and run the following command:

```
npm install
```

Usage
To start the app, run the following command:

```
npm start
```

# Cache_API
A REST API consisting of methods to interact with a cache.

### Installation
To install the app, clone the repository and run the following command:

```
npm install
```

### Usage
To start the app, run the following command:

```
npm start
```

## API Routes
### POST /cache/upsert-key
Create a new cache entry.

**Required Headers:**

- Content-Type: application/json
- key-name: <name of cache key>
- value: <value of cache key>

Request Body:
json
```
{
  "key_name": "John Doe",
  "value": "johndoe@example.com"
}
```

Response: 201
```
{
    "output": "Cache data updated",
    "key": "John Doe"
}
```

### GET /cache/fetch-key
Fetch an existing cache value based on the key provided.
If key doesn't exist, new cache entry with provided key is added in cache with a random string value. 

**Required Headers:**

- key-name: <name of cache key>

Response: 201
(When key does not already exist)
```
{
        "output": "Cache Miss",
        "key": "John Doe",
        "value": "vjkk4"
}  
```

Response: 200 
(When key exists)
```
{
        "output": "Cache Hit",
        "key": "John Doe",
        "value": "vjkk4"
}  
```
### GET /cache/fetch-all-keys
Fetch all the keys present in the cache


Response: 200
```
{
    "keys": [
        "John Doe"
    ]
}
```

### DELETE /cache/delete-key
Deletes a key present in the cache

**Required Headers:**

- key-name: <name of cache key>


Response: 204 No Content

### DELETE /cache/clear
Deletes all entries in the cache


Response: 204 No Content