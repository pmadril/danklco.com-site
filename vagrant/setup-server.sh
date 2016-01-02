!/bin/bash
echo "Installing epel..."
yum -y install epel-release

if test -e /etc/fail2ban; then
	echo "fail2ban already installed..."
else
	echo "Installing fail2ban..."
	yum -y install fail2ban
	systemctl start fail2ban.service
	systemctl enable fail2ban.service
	echo "fail2ban installed"
fi

echo "Configuring IP Tables..."
systemctl stop firewalld
systemctl mask firewalld
yum -y install iptables-services
iptables -F
iptables -A INPUT -p tcp --tcp-flags ALL NONE -j DROP
iptables -A INPUT -p tcp ! --syn -m state --state NEW -j DROP
iptables -A INPUT -p tcp --tcp-flags ALL ALL -j DROP
iptables -A INPUT -i lo -j ACCEPT
iptables -A INPUT -p tcp -m tcp --dport 80 -j ACCEPT
iptables -A INPUT -p tcp -m tcp --dport 443 -j ACCEPT
iptables -A INPUT -p tcp --dport 22 -m state --state NEW -m recent --set --name ssh --rsource
iptables -A INPUT -p tcp --dport 22 -m state --state NEW -m recent ! --rcheck --seconds 60 --hitcount 4 --name ssh --rsource -j ACCEPT
iptables -I INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
iptables -P OUTPUT ACCEPT
iptables -P INPUT DROP
iptables -L -n
iptables-save | sudo tee /etc/sysconfig/iptables
systemctl start iptables.service
systemctl enable iptables.service
echo "IP Tables configured"


if test -e /etc/newrelic/nrsysmond.cfg; then
	echo "newrelic already installed..."
else
	echo "Installing newrelic..."
	rpm -Uvh http://download.newrelic.com/pub/newrelic/el5/i386/newrelic-repo-5-3.noarch.rpm
	yum -y install newrelic-sysmond
	cp /tmp/conf/newrelic/nrsysmond.cfg /etc/newrelic/nrsysmond.cfg
	chkconfig newrelic-sysmond on
	systemctl start newrelic-sysmond
	echo "newrelic installed"
fi

if test -e /home/klcodanr; then
	echo "user already added..."
	userdel klcodanr
fi
echo "Adding klcodanr..."
useradd klcodanr
chpasswd < /tmp/conf/ssh/password
useradd -G wheel klcodanr
mkdir -p /home/klcodanr/.ssh
cp /tmp/conf/ssh/authorized_keys /home/klcodanr/.ssh/
chmod 700 /home/klcodanr/.ssh
chmod 600 /home/klcodanr/.ssh/authorized_keys
chown -R klcodanr:klcodanr /home/klcodanr/.ssh
cp /tmp/conf/ssh/sudoers /etc
chmod 440 /etc/sudoers
echo "User added"

if grep -q "PermitRootLogin no" "/etc/ssh/sshd_config"; then
	echo "Root login already disabled..."
else
	echo "" >> /etc/ssh/sshd_config
	echo "# Security Settings" >> /etc/ssh/sshd_config
	echo "AllowUsers klcodanr" >> /etc/ssh/sshd_config
	echo "Protocol 2" >> /etc/ssh/sshd_config
	echo "PermitRootLogin no" >> /etc/ssh/sshd_config
	systemctl restart sshd.service
fi

if grep -q "Root Access" "/root/.bashrc"; then
	echo "Root access email already configured..."
else
	yum -y install mailx
	echo "echo 'ALERT - Root Shell Access (danklco.com) on:' `date` `who` | mail -s \"Alert: Root Access from `who | cut -d'(' -f2 | cut -d')' -f1`\" daniel.klco@gmail.com" >> /root/.bashrc
	echo "Defaults    mail_always" >> /etc/sudoers
	echo "Defaults    mailto=\"daniel.klco@gmail.com\"" >> /etc/sudoers
fi

if test -e /usr/bin/java; then
	echo "java already installed..."
else
	echo "Installing java..."
	rpm -ivh /tmp/conf/java/*.rpm
	echo "Java installed"
fi

if test -e /usr/bin/jekyll; then
	echo "Jekyll already installed..."
else
	echo "Installing Jekyll..."
	yum -y install ruby ruby-devel rubygems nodejs gcc execjs
	gem install -V yui-compressor jekyll jekyll-paginate
	echo "Jekyll installed"
fi

if test -e /usr/bin/git; then
	echo "git already installed..."
else
	echo "Installing git..."
	yum -y install git
	echo "git installed"
fi

if test -e /usr/bin/svn; then
	echo "svn already installed..."
else
	echo "Installing svn..."
	yum -y install svn
	echo "svn installed"
fi

if test -e /usr/bin/mvn; then
	echo "Maven already installed..."
else
	echo "Installing Maven..."
	mkdir /opt/mvn
	cd /opt/mvn
	tar xzvf /tmp/conf/java/*.tar.gz
	ln -s /opt/mvn/apache-maven-*/bin/mvn /usr/bin/mvn
	echo "svn installed"
fi

if test -e  /etc/httpd; then
	echo "httpd already installed..."
else
	echo "Installing httpd..."
	yum -y install httpd
	systemctl enable httpd.service
	echo "httpd installed"
fi

if test -e /etc/httpd/conf.d/ssl.conf; then
	echo "SSL support already installed..."
else
	echo "Installing SSL Support..."
	yum -y install mod_ssl
	cp /tmp/conf/httpd/ssl.conf /etc/httpd/conf.d
	cp /tmp/conf/ssl/*.* /etc/httpd/conf
	systemctl restart httpd.service
	echo "SSL support installed"
fi

if test -e /etc/httpd/conf.d/default.conf; then
	echo "default configuration already installed..."
else
	echo "Installing default configuration..."
	cp /tmp/conf/httpd/default.conf /etc/httpd/conf.d
	cp /tmp/conf/httpd/welcome.conf /etc/httpd/conf.d
	cp /tmp/conf/httpd/httpd.conf /etc/httpd/conf
	mkdir -p /opt/dev
	chmod a+wx /opt/dev
	git clone https://github.com/klcodanr/danklco.com-site.git /opt/dev/danklco.com-site
	/usr/local/bin/jekyll build --source /opt/dev/danklco.com-site --destination /var/www/html
	chown -R apache:apache /opt/dev/danklco.com-site /var/www/html
	systemctl restart httpd.service
	echo "Default configuration installed"
fi

if test -e /etc/httpd/conf.d/update.conf; then
	echo "Update vhost already installed..."
else
	echo "Installing Update vhost..."
	cp /tmp/conf/httpd/update.conf /etc/httpd/conf.d
	mkdir -p /var/www/vhosts/update
	git clone https://github.com/klcodanr/PHP-Jekyll-Post-Receive-Hook.git /var/www/vhosts/update
	cp /tmp/conf/httpd/config.json /var/www/vhosts/update
	yum -y install php
	systemctl restart httpd.service
	echo "Update vhost installed"
fi

if test -e /etc/httpd/conf.d/kids.conf; then
	echo "kids configuration already installed..."
else
	echo "Installing kids configuration..."
	git clone https://github.com/klcodanr/email2html.git /opt/dev/email2html
	cd /opt/dev/email2html
	mvn clean install
	git clone https://github.com/klcodanr/kid-pictures.git /opt/dev/kid-pictures
	cd /opt/dev/kid-pictures
	cp /tmp/conf/httpd/config.properties .
	cp /tmp/conf/httpd/kids.conf /etc/httpd/conf.d
	mkdir -p /var/www/vhosts/kids
	cp /tmp/conf/cron/kids-site.sh /etc/cron.daily
	systemctl restart httpd.service
	echo "kids vhost installed"
fi

echo "Setting up Sling Project..."
wget https://people.apache.org/keys/group/sling.asc -O /tmp/sling.asc
gpg --import /tmp/sling.asc
export MAVEN_OPTS="-Xmx512M -XX:MaxPermSize=512M"
git clone https://github.com/apache/sling.git /opt/dev/sling
cd /opt/dev/sling
mvn clean install -f /opt/dev/sling/pom.xml -DskipTests=true
echo "Sling setup and configured"

if test -e /etc/yum/yum-cron.conf; then
    echo "Update Emails already installed..."
else
    echo "Installing Update Emails configuration..."
    yum -y install yum-cron
    cp /tmp/conf/cron/yum-cron.conf /etc/yum/yum-cron.conf
    systemctl start yum-cron.service
    echo "Update Emails configured!"
fi

echo "Installing upgrades..."
yum -y update
