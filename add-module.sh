# Adds a module folder to the bot
# Used for installing 3-rd party commands
MODULE=$1
GROUPNAME=$2
GROUPDESC=$3
if [ ! $MODULE ]; then
  echo "No git url provided"
  exit
fi
if [ ! $GROUPNAME ]; then
  echo "No group name provided"
  exit
fi
if [ ! $GROUPDESC ]; then
  echo "No group description provided"
  exit
fi

echo "$GROUPNAME|$GROUPDESC" >> "cmdgroups.md"
TEMPFOLDER="$GROUPNAME-import"
git clone $MODULE $TEMPFOLDER
sudo mv $TEMPFOLDER ./src/commands/$GROUPNAME
echo Done!