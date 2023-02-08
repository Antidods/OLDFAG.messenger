docker-build:
	docker build -t oldfag.messenger .

docker-run:
	docker run -p 3000:3000 -d --name oldfag.messenger oldfag.messenger

dev:
	webpack serve

start:
	webpack && node server.js

build:
	webpack

lint:
	eslint . --fix && npx stylelint "**/*.scss" --fix

jest:
	jest

