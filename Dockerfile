FROM node:lts-slim

LABEL "com.github.actions.name"="github-actions-workman"
LABEL "com.github.actions.description"="Workman For Egg.js"
LABEL "com.github.actions.icon"="settings"
LABEL "com.github.actions.color"="white"

LABEL "repository"="https://github.com/thonatos/actions"
LABEL "homepage"="https://github.com/thonatos/actions"
LABEL "maintainer"="Thonatos Yang <thonatos.yang@gmail.com>"

RUN \
    apt-get update -y && \
    apt-get install -y git && \
    npm i -g github-actions-workman

COPY . .

COPY entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
