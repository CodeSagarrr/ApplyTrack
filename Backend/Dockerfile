FROM node:20-alpine AS build
WORKDIR /Backend
COPY package*.json ./
RUN npm install --legacy-peer-deps 
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /Backend
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY --from=build /Backend/dist ./dist
EXPOSE 8080
CMD ["node", "dist/server.js"]