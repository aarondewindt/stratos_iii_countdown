#!/usr/bin/env sh

ssh daresim "rm -rf /var/www/html/stratos/*"
scp -r ./site/* daresim:/var/www/html/stratos/
