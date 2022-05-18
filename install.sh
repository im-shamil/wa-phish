clear
pkg install nodejs-lts -y
pkg install wget
npm i
download_cloudflared() {
        url="$1"
        file=`basename $url`
        if [[ -e "$file" ]]; then
                rm -rf "$file"
        fi
        wget --no-check-certificate "$url" > /dev/null 2>&1
        if [[ -e "$file" ]]; then
                mv -f "$file" utils/cloudflared > /dev/null 2>&1
                chmod +x utils/cloudflared > /dev/null 2>&1
        else
                echo -e "Error occured, Install Cloudflared manually."
        fi
}

install_cloudflared() {
        if [[ -e "utils/cloudflared" ]]; then
                echo -e "\nCloudflared already installed."
        else
                echo -e "Installing Cloudflared..."
                arch=`uname -m`
                if [[ ("$arch" == *'arm'*) || ("$arch" == *'Android'*) ]]; then
                        download_cloudflared 'https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm'
                elif [[ "$arch" == *'aarch64'* ]]; then
                        download_cloudflared 'https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm64'
                elif [[ "$arch" == *'x86_64'* ]]; then
                        download_cloudflared 'https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64'
                else
                        download_cloudflared 'https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-386'
                fi
        fi

}

install_cloudflared

clear

echo "NOW RUN node app.js"
