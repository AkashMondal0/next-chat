FROM node:latest
 
ENV DATABASE_URL="mysql://root:akash2003@13.126.179.239:3306/chatapp"
ENV SOCKET_URL=https://socket.skysolo.me/

WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm","run","dev"]
