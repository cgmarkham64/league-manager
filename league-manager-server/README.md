### Build image from Dockerfile
- ```docker build -t league-manager-api .```

### Run docker image on docker network
- ```docker run --name league-manager-api -p 4000:4000 --network league-manager-net -d league-manager-api:latest```
