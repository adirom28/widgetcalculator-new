#!/usr/bin/env bash

cd server

mvn clean install

scp target/*.jar root@151.115.58.69:/site/booking-widget/server
scp docker-compose.yml root@151.115.58.69:/site/booking-widget/server
scp Dockerfile root@151.115.58.69:/site/booking-widget/server
scp nginx/conf/default.conf root@151.115.58.69:/site/booking-widget/server/nginx/conf
scp application.properties root@151.115.58.69:/site/booking-widget/server/
scp mongo/init/mongo-init.js root@151.115.58.69:/site/booking-widget/server/mongo/init

cd ../client
npm install
npm run build
zip -r build.zip build
scp build.zip root@151.115.58.69:/site/booking-widget/client
rm build.zip
rm -r build

cd ..

ssh -tt root@151.115.58.69<<"ENDSSH"
	cd /site/booking-widget/client
	rm -r build
	unzip build.zip
	rm build.zip
	cd /site/booking-widget/server
	sudo docker-compose down
	sudo docker-compose up --build -d
	exit
ENDSSH