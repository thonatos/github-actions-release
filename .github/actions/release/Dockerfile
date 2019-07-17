FROM node:lts-slim

LABEL "com.github.actions.name"="github-actions-release"
LABEL "com.github.actions.description"="GitHub Actions for release"
LABEL "com.github.actions.icon"="award"
LABEL "com.github.actions.color"="white"

LABEL "repository"="https://github.com/thonatos/github-actions-release"
LABEL "homepage"="https://github.com/thonatos/github-actions-release"
LABEL "maintainer"="Thonatos Yang <thonatos.yang@gmail.com>"

RUN \
    apt-get update -y && \
    apt-get install -y git

COPY entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
