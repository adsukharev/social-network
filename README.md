# Matcha
Dating website

Full specification: https://cdn.intra.42.fr/pdf/pdf/778/camagru.en.pdf

[Server] Python (Flask)

[Client] HTML - CSS - JavaScript (pure)

[Database] PostgreSQL

[Webserver] Apache2

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

#### Download project
```
git clone https://github.com/AndreiSukharev/Matcha.git matcha
cd matcha
```
#### Activate Virtual Environment
1. pip3 install virtualenv
2. python3 -m venv venv
3. source venv/bin/activate
4. pip install -r requirements.txt

to deactivate:
```
deactivate
```

#### Install docker

```
brew install docker docker-machine docker-compose
docker-machine create --driver virtualbox Matcha
eval $(docker-machine env Camaguru)
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