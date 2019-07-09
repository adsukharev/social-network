# Matcha
Dating website

Full specification: https://cdn.intra.42.fr/pdf/pdf/968/matcha.en.pdf

[Server] Python (Flask)

[Client] HTML - CSS - JavaScript (pure)

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

#### Prerequisites

- node v10
- python3

#### Install node, python3

```
brew install node python3
```

#### Install docker

```
brew install docker docker-machine docker-compose
docker-machine create --driver virtualbox Matcha
eval $(docker-machine env Matcha)
```

### Build and Run

```
docker-compose up --build -d
go to http://localhost:8001
```

#### Note Docker

Run mysql client:

```
docker-compose exec db mysql -u root -p
```
Enter in docker container:
```
docker exec -it {container name} bash
```
Remove all:
```
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
docker rmi $(docker images -a -q)
```