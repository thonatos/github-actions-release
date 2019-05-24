#!/bin/sh
set -e

sh -c "mkdir -p /root/.ssh";
sh -c "echo \"$RELEASE_SSH_ID_RSA\" > /root/.ssh/id_rsa";
sh -c "echo \"$RELEASE_SSH_ID_RSA_PUB\" > /root/.ssh/id_rsa.pub";
sh -c "chmod 400 /root/.ssh/id_rsa";
sh -c "chmod 400 /root/.ssh/id_rsa.pub";
sh -c "git config --global user.email \"release_bot@eggjs.app\"";
sh -c "git config --global user.name \"Release Bot\"";
sh -c "node dist/index.js";