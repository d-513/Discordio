echo "DIO configuration wizard"

abort() {
    echo $1 was not provided. Aborting configuration wizard.
    exit
}

echo -n "What is the bot's token? "
read token
if [ -z $token ] ;then
    abort token
fi

echo -n "What is the bot's prefix? "
read prefix
if [ -z $prefix ] ;then
  abort prefix
fi

echo -n "What is the bot's owner id? "
read owner
if [ -z $owner ] ;then
  echo No owner id provided. Using blank owner id.
fi

echo -n "Do you have a support server? If yes, submit the invite here. "
read invite

echo -n "Would you like the bot to have a custom 'playing' status? If yes, submit it here. "
read status

echo -n "What port should the WebUI use? (80) "
read web_port

if [ -z $web_port ] ;then
  web_port="80"
fi

echo "All done!"
echo "TOKEN: $token"
echo "PREFIX: $prefix"
echo "OWNER: $owner"
echo "INVITE: $invite"
echo "STATUS: $status"
echo "WEBPORT: $web_port"

echo -n "Is it ok (y/n)? "
read confirm

if [ -z $confirm ] ;then
  confirm="Y"
fi

if [ $confirm = "Y" ] || [ $confirm = "y" ] ;then
    echo Setting env vars...
    export DIO_TOKEN=$token
    export DIO_PREFIX=$prefix
    export DIO_OWNER=$owner
    export DIO_INVITE=$invite
    export DIO_STATUS=$status
    export DIO_WEB_PORT=$webport
else
    echo Aborted.
    exit
fi


