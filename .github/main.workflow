# Push
workflow "Push" {
  on = "push"
  resolves = ["Release"]
}

action "Installation" {
  needs = "Filters for GitHub Actions"
  uses = "thonatos/github-actions-nodejs@v0.1.1"
  args = "npm install npminstall -g && npminstall"
}

action "CI" {
  needs = "Installation"
  uses = "thonatos/github-actions-nodejs@v0.1.1"
  args = "npm run ci"
}

action "Release" {
  needs = "CI"
  uses = "thonatos/github-actions-nodejs@v0.1.1"
  args = "npm run semantic-release "
  secrets = ["GITHUB_TOKEN", "NPM_TOKEN"]
}

action "Filters for GitHub Actions" {
  uses = "actions/bin/filter@3c0b4f0e63ea54ea5df2914b4fabf383368cd0da"
  secrets = ["GITHUB_TOKEN"]
  args = "branch master"
}

# Pull Request
workflow "Pull Request" {
  on = "pull_request"
  resolves = ["npm check"]
}

action "npm install" {
  uses = "docker://node:lts-slim"
  args = "npm install"
}

action "npm ci" {
  uses = "docker://node:lts-slim"
  needs = ["npm install"]
  args = "npm run ci"
}

action "npm check" {
  uses = "thonatos/github-actions-workman@master"
  needs = ["npm ci"]
  args = "workman check"
  secrets = [
    "GITHUB_TOKEN",
    "NPM_TOKEN"
  ]
}