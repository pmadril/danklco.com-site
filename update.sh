cd /opt/dev/danklco.com-site
echo "Updating DanKlco.com Website Code"
date
/usr/bin/git pull
jekyll /var/www/html --no-auto
echo "Update Complete"
