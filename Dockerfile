FROM node:19

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json", "./"]

COPY . .

RUN npm install --build-from-resource

# RUN apk add --update --no-cache \
#     python3 \
#     make \
#     g++



CMD ["npm", "run", "start:dev"]
