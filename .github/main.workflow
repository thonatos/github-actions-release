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

action "npm release" {
  uses = "./.github/actions/release"
  needs = ["npm ci"]
  args = "ls && node ."
  secrets = [
    "GITHUB_TOKEN",
    "NPM_AUTH_TOKEN",        
    "RELEASE_SSH_ID_RSA",
    "RELEASE_SSH_ID_RSA_PUB",
    "RELEASE_GIT_USER_NAME",
    "RELEASE_GIT_USER_EMAIL",
  ]
}

## workflow
workflow "Push" {
  on = "push"
  resolves = ["npm install", "npm test", "npm ci"]
}

workflow "Pull Request" {
  on = "pull_request"
  resolves = ["npm install", "npm test", "npm ci", "npm release"]
}
