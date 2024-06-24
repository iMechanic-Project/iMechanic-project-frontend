FROM node:latest as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
RUN npm install -g @angular/cli
COPY . .
RUN npm run build --configuration=production

FROM nginx:latest
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/i-mechanic-project-frontend/browser /usr/share/nginx/html
EXPOSE 80

# docker build -t angular-mechanic .
# docker run -d -p 4200:80 angular-mechanic