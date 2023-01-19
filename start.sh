#!/usr/bin/env bash

localNpm=`which npm`
if [ -z $localNpm ]
then
    echo "NPM is not installed, please install NPM first!"
    exit
fi

localNode=`which node`
if [ -z $localNode ]
then
    echo "Node is not installed, please install Node first!"
    exit
fi

localBower=`which bower`
if [ -z $localBower ]
then
    echo "Bower is not installed! Installing bower..."
    npm install bower -g
fi

localGulp=`which gulp`
if [ -z $localGulp ]
then
    echo "Gulp is not installed! Installing Gulp..."
    npm install gulp-cli -g
fi

localRuby=`which ruby`
if [ -z $localRuby ]
then
    echo "Ruby is not installed! Please install Ruby, to continue!"
    exit
fi

npm install && bower install

# run gulp task from command line, or run default task serve
# kill -9 $(pgrep -f "gulp") &
if [ ! -z $1 ]
then
    gulp $1 &
else
    gulp serve &
fi
