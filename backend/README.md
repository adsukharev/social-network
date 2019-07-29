# RESTful API Matcha

#### Note
All data should be sent to server in JSON file.

Schemas are in backend/db/models.py

## Endpoints

### Sign Up
```
POST     /api/sign_up
```

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
 In the response you will get a token:
 ```
 {
    "message": "ok",
    "access_token": "eyJ0eXAiOiJK"
}
```

### Users

```
GET     /api/users -> get all users
GET     /api/users/<user_id> -> get one user by id
PUT     /api/users/<user_id> -> update user's data
GET     /api/user_login/<login> -> get one user by login
```

Response for getting one user:
```
    "user_id": 4,
    "login": "test",
    "email": "mr.andrey.sd@gmail.com",
    "user_name": "myName",
    "age": 25,
    "sex": male,
    "preferences": "bisexual",
    "bio": "I like swimming",
    "avatar": [
        "life.jpg",
        "vietnam.jpg"
    ],
    "likes": [
       "login1",
       "login2"
    ],
    "history": [
        "login1",
        "login2"
    ],
    "tags": [
        "sport",
        "chess"
    ]
}

```

Columns that can be changed in PUT
```
['email', 'login', 'password', 'user_name', 'age', 'sex', 'preferences', 'bio', 'avatar',
 'latitude', 'longitude', 'notification', 'tags']
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
POST    /api/history -> add history to user
```

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
Response:
```
{
    "user_id": 4,
    "login": "test",
    "user_name": "Olega",
    "avatar": "life.jpg",
    "sumlikes": 8
}

```

### Tags
```
GET     /api/tags -> get tags
```