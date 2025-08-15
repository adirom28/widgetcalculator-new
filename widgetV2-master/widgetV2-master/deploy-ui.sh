#!/usr/bin/env bash

cd client
npm install
npm run build
zip -r build.zip build
scp build.zip root@151.115.58.69:/site/booking-widget/client
rm build.zip
rm -r build

cd ..

ssh -tt root@151.115.58.69<<"ENDSSH"
	cd /site/booking-widget/client
	sudo rm -r build
	unzip build.zip
	rm build.zip
	cd /site/booking-widget/server
	sudo docker-compose restart frontend
	exit
ENDSSH