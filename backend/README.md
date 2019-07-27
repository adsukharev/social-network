# RESTful API Matcha

#### Note
All data should be sent to server in JSON file.

Schemas are in backend/db/models.py

## Endpoints

### Users

```
GET     /api/users -> get all users
```

### Sign Up
```
POST     /api/sign_up
```
**NOTE:**

These keys are required to sign up a user:
```
email, login, password, name
```
Example for POST:
```
{
    "email": "test@user.ru",
    "login": "test1",
    "password": "wertyq123",
    "user_name": "Olega1"
}
 ```
 
 ### Sign In
```
POST     /api/sign_in
```
**NOTE:**

These keys are required to sign in a user:
```
login, password, latitude (can be empty), longitude (can be empty)
```
Example for POST:
```
{
    "login": "test1",
    "password": "wertyq123",
    "latitude": "55.7116063",
    "longitude": "37.738073"
}
 ```
 In the response you get token:
 ```
 {
    "message": "ok",
    "access_token": "eyJ0eXAiOiJK"
}
```

### Users_id

```
GET     /api/users/<user_id> -> get one user
PUT     /api/users/<user_id> -> update user's data
```

**NOTE:**

Columns that can be changed in PUT
```
['email', 'login', 'password', 'user_name', 'age', 'sex', 'preferences', 'bio', 'avatar',
 'latitude', 'longitude', 'status', 'notification', 'tags']
```
Tags must be in an array, even if there is only one value.

Example for PUT:
```
{
    "password": "newPass",
    "tags": ["sport", "fashion"]
}
```

### Images
```
DELETE  /api/images/<image_id> -> delete one of five images
```


### History

```
GET     /api/history/<login> -> get user
POST    /api/history -> add history to user
```

**NOTE:**

it's required one key 'to_history_id'.

Meaning: to_history_id - ID пользователя, к которому зашли на страницу. ID того, кто зашел, я возьму из сессии.

Example:
```
{
    "to_history_id": 2
}
```

### Likes

```
POST    /api/likes -> add like to user
DELETE  /api/likes -> add dislike to user
```

**NOTE:**

For POST it's required one key 'to_like_id'.

Meaning: to_like_id - ID пользователя, которого лайкнули. ID того, кто лайкнул, я возьму из сессии.

Example:
```
{
    "to_like_id": 2
}
```

The same for dislike but change key to: "to_dislike_id"

### Rating

```
GET     /api/rating -> get rating
```

### Tags
```
GET     /api/tags -> get rating
```