#!/usr/bin/env bash

# Steps:
# https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-18-04

add-apt-repository ppa:certbot/certbot -y
apt update
apt install python-certbot-nginx -y

certbot --nginx -d billtrackerprodemo.com -d www.billtrackerprodemo.com

service nginx restart