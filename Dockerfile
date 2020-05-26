FROM node as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY frontend/ ./
#COPY frontend/package.json ./
#COPY frontend/package-lock.json ./
RUN npm ci --silent
RUN npm install react-scripts@3.4.1 -g --silent
COPY . ./
RUN npm run build

FROM golang

EXPOSE 80
ENV PORT 80

WORKDIR /go/src/app
COPY . .

RUN go get -d -v ./...
RUN go install -v ./...

COPY --from=build /app/build /go/src/app/build

CMD ["app"]