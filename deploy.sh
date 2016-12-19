#!/usr/bin/env sh

ssh simvps "rm -rf /var/www/html/stratos/*"
scp -r ./site/* simvps:/var/www/html/stratos/
