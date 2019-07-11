FROM python:3.7-slim

WORKDIR /usr/src/web
COPY requirements.txt .
RUN pip install --upgrade pip --no-cache-dir -r requirements.txt

#WORKDIR app
#CMD ["python", "main.py"]