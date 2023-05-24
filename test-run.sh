#! /bin/bash

sudo npm run dev &
sudo http-server data/book_unpck/ -a localhost -p 5175 --cors
sudo npx json-server data/books.json -H localhost -p 5174 --cors
