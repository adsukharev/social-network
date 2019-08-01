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
    "sex": male,                -> 2 types: male, female
    "preferences": "bisexual",  -> 3 types: bisexual, gomo, getero
    "bio": "I like swimming",
    "rating: 234,
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
POST    /api/history/<user_id> -> add history to user
```

### Likes

```
POST    /api/likes/<user_id> -> add like to user
DELETE  /api/likes/<user_id> -> add dislike to user
```

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
### Search

```
GET     /api/search -> get recommended users
POST    /api/search -> get detailed users
```

to recommend people user has to fill all fields in profile, if not you get the following response
```
{
    "message": "error"
}
```
if ok:
```
[
    {
        "user_id": 2,
        "user_name": "Vika",
        "age": 23,
        "sex": "female",
        "preferences": "getero",
         "sumlikes": 10,
        "tags": [
           "sport",  "yoga"
        ]
    }
]
```

Example POST request
```
{
    "age": [20, 32],
    "sumLikes": [1, 3],
    "sex": "male",
    "preferences": "getero",
    "location": 1,
    "tags": [
       "sport"
    ]
}
```
Example POST response
```
[
    {
        "user_id": 2,
        "user_name": "Vika",
        "age": 23,
        "sex": "female",
        "preferences": "getero",
         "sumlikes": 10,
        "tags": [
           "sport",  "yoga"
        ]
    }
]
```

### Fake

```
POST     /api/fake/<user_id> report fake account
```
