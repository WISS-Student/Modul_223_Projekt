FROM node:24-alpine AS build-step

RUN mkdir /app
WORKDIR /app
COPY package.json /app

RUN npm install
COPY . /app

# Set the environment variable during the build step
# ARG REACT_APP_API_URL=/api
# ENV REACT_APP_API_URL=$REACT_APP_API_URL

ARG VITE_API_URL=http://backend:8080
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# Stage 2

FROM httpd:2.4
COPY --from=build-step /app/dist /usr/local/apache2/htdocs