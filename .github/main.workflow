## actions
action "npm install" {
  uses = "docker://node:lts-slim"
  args = "npm i"
}

action "npm test" {
  uses = "docker://node:lts-slim"
  needs = ["npm install"]
  args = "npm run test"
}

action "npm ci" {
  uses = "docker://node:lts-slim"
  needs = ["npm install"]
  args = "npm run ci"
}

action "github-actions-release" {
  uses = "./"
  needs = ["npm ci"]
  args = "release"
  secrets = [
    "GITHUB_TOKEN",
    "RELEASE_SSH_ID_RSA",
    "RELEASE_SSH_ID_RSA_PUB",
  ]
}

## workflow
workflow "Push" {
  on = "push"
  resolves = ["npm install", "npm test", "npm ci"]
}

workflow "Pull Request" {
  on = "pull_request"
  resolves = ["npm install", "npm test", "npm ci", "github-actions-release"]
}
