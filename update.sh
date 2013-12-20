echo "Updating DanKlco.com Website Code"
date
/usr/bin/git pull
jekyll  build -d /var/www/html
echo "Update Complete"
