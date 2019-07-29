# Matcha
Dating website

Full specification: https://cdn.intra.42.fr/pdf/pdf/968/matcha.en.pdf

[Server] Python (Flask)

[Client] Bootstrap4, React

[Database] PostgreSQL

[Deployment] Docker

Goals:

- Everything must be secured (CSRF, SQL-debugging)
- Sign In and Sign Up components with email confirmation
- User Profile (gender, tags, pictures, fame rating, etc)
- GPS Location
- Match profiles (Same geographic area, With a maximum of common tags, With a maximum “fame rating”, etc)
- Chat
- Notifications in real time about likes, messages

P.S  When two people “like” each other, we will say that they are “connected” and are now able to chat
## Getting Started

#### Install docker

You can use two variants.
The first one (prefer for home laptop):
```
https://docs.docker.com/compose/install/
```
The second (for school):
```
brew install docker docker-machine docker-compose
docker-machine create --driver virtualbox Matcha
eval $(docker-machine env Matcha)
```

#### Setup Env Vars
create file .env in this file write down:

```
POSTGRES_DB=matchaDB
POSTGRES_USER=user
POSTGRES_PASSWORD=user
POSTGRES_SERVICE=postgres
POSTGRES_PORT=5432
PYTHONPATH=$PYTHONPATH:/usr/src/backend

EMAIL_USER={your gmail}@gmail.com
EMAIL_PASSWORD={your password from gmail}
```

## Build and Run

```
git clone https://github.com/AndreiSukharev/Matcha.git matcha
cd matcha
docker-compose up --build
sh dbGPS.sh
front: http://localhost:3000
check backend: http://localhost:5000
```

#### Note Docker

Run postgres client:

```
docker exec -it postgres psql matchaDB user
```
Enter in container:
```
docker exec -it flask bash
```
Remove all:
```
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
docker rmi $(docker images -a -q)
```
