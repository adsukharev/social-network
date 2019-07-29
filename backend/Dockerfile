FROM python:3.7-slim
RUN apt-get update && apt-get install -y wget tar
WORKDIR /usr/src/backend
COPY requirements.txt .
RUN pip install --upgrade pip --no-cache-dir -r requirements.txt
