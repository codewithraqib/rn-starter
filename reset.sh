#!/bin/bash
watchman watch-del-all && rm -f yarn.lock && rm -rf node_modules && yarn && yarn start --reset-cache
