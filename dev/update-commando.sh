# This script should be executed when developing
# This updates discord.js-commando to the latest commit version.
# Please test it after running this script!
# We don't use the master branch so that it can't randomly break.

# Deps: apt install git
# Run with: sh update-commando.sh
echo RUNNING: git clone https://github.com/discordjs/Commando tmp-commando
git clone https://github.com/discordjs/Commando tmp-commando
cd tmp-commando
COMMIT=$(git log --format="%H" -n 1)
echo GOT COMMIT ID: $COMMIT
cd ..
echo RUNNING: npm install --save "git://github.com/discordjs/Commando.git#$COMMIT"
npm install --save "git://github.com/discordjs/Commando.git#$COMMIT"
echo RUNNING: rm -rf tmp-commando
rm -rf tmp-commando
echo "INFO: Successfully updated commando to $COMMIT"