docker build --tag patient-js .
docker run -p 3000:3000 -i -d --name patient-js patient-js