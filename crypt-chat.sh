#!/bin/bash
cd /media/shaarif/E/semester06/computerNetworks/crypt-chat/backend
gnome-terminal -e nodemon app.js
cd ../frontend
gnome-terminal -e "npm start"
cd .. && code .
