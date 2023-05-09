#! /bin/bash

sudo npm run dev &
sudo npx json-server -p 5174 -w data/books.json &
sudo http-server -a localhost -p 5175 --cors &
