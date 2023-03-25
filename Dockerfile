#Build
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

#Serve
FROM node:18-alpine AS serve
WORKDIR /app
COPY --from=build /app/dist .
COPY package*.json ./
RUN npm install --only=production
EXPOSE 8080
CMD ["node", "main.js"]
