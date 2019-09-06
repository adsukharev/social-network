# Matcha
Social network for dating

Full specification: https://cdn.intra.42.fr/pdf/pdf/968/matcha.en.pdf

[Server] Python (Flask)

[Client] Vue, Bootstrap4

[Database] PostgreSQL

[Deployment] Docker

Goals:

- Everything must be secured (JWT, SQL-debugging, XSS)
- Sign In and Sign Up components with email confirmation
- User Profile (biography, tags, pictures, fame rating, etc)
- GPS Location
- Match profiles (Same geographic area, With a maximum of common tags, With a maximum “fame rating”, etc)
- Chat
- Notifications in real time about likes, messages

P.S  When two people “like” each other, we will say that they are “connected” and are now able to chat
## Getting Started

#### Install npm
brew install node

#### Install docker

You can use two variants.
The first one:
```
https://docs.docker.com/compose/install/
```
The second one:
```
brew install docker docker-machine docker-compose
docker-machine create --driver virtualbox Matcha
eval $(docker-machine env Matcha)
```

## Build and Run

```
git clone https://github.com/AndreiSukharev/Matcha.git matcha
cd matcha
docker-compose up --build
sh dbGPS.sh
cd client
npm i
npm run serve
go to: http://localhost:8080
```

## Test

Create test users:
```
docker exec flask bash -c "python test_entity.py"
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
