FROM node:18-alpine AS build

WORKDIR /app

# Set environment variable to handle OpenSSL issues with Node.js 18
ENV NODE_OPTIONS=--openssl-legacy-provider

COPY package*.json ./

RUN npm install

COPY . .

# Set the API URL for production build
ENV REACT_APP_API_URL=http://localhost:5000/api

RUN npm run build

# Production environment
FROM nginx:alpine

# Copy built files from build stage to nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
