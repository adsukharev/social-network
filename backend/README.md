# RESTful API Matcha

#### Note
All data should be sent to server in JSON file.

Schemas are in backend/db/models.py

## Endpoints

### Sign Up
```
POST     /api/signup
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
 
 ### Sign In, Forgot Password
```
POST     /api/signin -> Sign In
PUT     /api/signin - > Forgot Password
```

These keys are required to sign in a user:
```
login, password, latitude (can be empty), longitude (can be empty)
```
Example for POST:
```
{
    "login": "test1",
    "password": "123Wertyq",
    "latitude": "55.7116063",
    "longitude": "37.738073"
}
 ```
 In the response you will get a token:
 ```
 {
    "message": "ok",
    "access_token": "eyJ0eXAiOiJK",
    'user_id': "32"
}
```

Example PUT:
```
{
    "email": test@mail.ru
}
```
Response if ok:
```
We have sent new passport to your email
```

 ### Log out
```
DELETE     /api/logout
```

 ### OAuth
```
POST    /api/oauth -redirect to facebook
GET     /api/oauth - callback from facebook
```

request from GET:
```
"message": "ok",
"access_token": "eyJ0eXAiOiJK",
'user_id': "32"
```

 
 
 ### Check Authorization
```
GET     /api/secret
```
Request Header:
```
Key                 Value
Authorization       Bearer eyJ0eXAiOiJK(token)
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
    "avatar": [
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASAB",
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQSADASDD"
    ],
    "notification": true,
    "fake": false,
    "city": "Moscow",
    "latitude": 55.7116,
    "longitude": 37.7382,
    "online": "online",
    "room": "asdas2342ddsa",
    "sumlikes": 6,
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
    "avatar": ["data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASAB"],
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
        "avatar": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASAB",
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
    "location": 1, -> 1 - search closest location, 0 - search everywhere
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
        "avatar": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASAB",
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
POST     /api/fake/<user_id> -> report fake account
```

### Chats

```
GET     /api/chats  -> get chats of the user
GET    /api/chats/<chat_id>  -> get the certain chat with messages
```
Example GET response
```
[
    {
        "chat_name": "test7+test6",
        "chat_id": 3
    },
    {
        "chat_name": "test7+test2",
        "chat_id": 5
    }
]
```

Example GET <chat_id>  response
```
{
    "messages": [
        {
            "creation_date": "2019-08-07 15:34:07",
            "text": "asdad",
            "author": "test1"
        },
        {
            "creation_date": "2019-08-07 15:34:11",
            "text": "asdd",
            "author": "test2"
        }
    ],
    "partner_id": 2
}
```

### Socket

```
/api/socket -> connect to socket
    
```
Events

on:

```
'connect' -> connected to socket
'receive_message(message)' -> get message from server to another user
'notification(message)' -> notificate about message, fake, history, likes, dislikes

```

emit:

```
'connect_logged_user(user_id)' -> after sign in send user_id
```

```
'join(chat_id)' -> send chat_id to join the chat
```

```
'message(message)' -> send message 
{
    "text": "Hello",
    "chat_id": "1", -> get this from url
    "author": "YoYo", -> login of user
    "creation_date": "2019-09-02T09:25:07.561Z", -> new Date(),
    "partner_id": '2'
}
```

```
'manage_notification(data)' -> send notification 
{
    "author": "YoYo", -> login of user
    "partner_id": "2", for whom notification
    "type": "history" or "like" or "dislike" or "fake"
}
```


