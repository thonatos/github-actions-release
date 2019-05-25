# Github Actions Release &middot; [![GitHub license][license-square]][license-url]

[![Egg.js][egg-square]][egg-url]
[![NPM Version][npm-square]][npm-url]

[license-square]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[egg-square]: https://img.shields.io/badge/Awesome-Egg.js-ff69b4.svg?style=flat-square
[npm-square]: https://img.shields.io/npm/v/github-actions-release.svg?style=flat-square
[license-url]: https://github.com/thonatos/github-actions-release/blob/HEAD/LICENSE
[egg-url]: https://eggjs.org/
[npm-url]: https://www.npmjs.com/package/github-actions-release

> Github actions for the package release.

## Features

😀🤓😎🤗😉😇

**Check Release Proposal**

> Example: 'Release {Semver Version}'

**Check Release Version**

```
1.0.0 -> 1.0.1 ✅
1.0.0 -> 1.0.1 ✅
2.0.0 -> 1.0.0 ❎
```

**Search Release Label**

Add the label to the Release Pull Request

```
1.0.0 -> 1.0.1 👉 semver:patch
1.0.0 -> 1.1.1 👉 semver:minor
1.0.0 -> 2.2.1 👉 semver:major
```

## Usage

**Enable Github Actions**

> https://github.com/features/actions

**Add SSH Keys / Npm Auth Token to Secrets.**

> Project - Settings - Secrets

- `NPM_AUTH_TOKEN`
- `RELEASE_SSH_ID_RSA`
- `RELEASE_SSH_ID_RSA_PUB`
- `RELEASE_GIT_USER_NAME`
- `RELEASE_GIT_USER_EMAIL`

**Create Workflow**

```bash
## actions
action "npm install" {
  uses = "docker://node:lts-slim"
  args = "npm i"
}

action "npm ci" {
  uses = "docker://node:lts-slim"
  needs = ["npm install"]
  args = "npm run ci"
}

action "npm release" {
  uses = "thonatos/github-actions-release@master"
  needs = ["npm ci"]
  args = "actions-release"
  secrets = [
    "GITHUB_TOKEN",
    "NPM_AUTH_TOKEN",
    "RELEASE_SSH_ID_RSA",
    "RELEASE_SSH_ID_RSA_PUB",
    "RELEASE_GIT_USER_NAME",
    "RELEASE_GIT_USER_EMAIL"
  ]
}

## workflow
workflow "Pull Request" {
  on = "pull_request"
  resolves = ["npm install", "npm ci", "npm release"]
}
```

**Handle Pull Request**

- Create the PR
- Review code
- Change PR title to `Release {Semver Version}`
- Close PR without deleting branch

What will the action do ?

1. It will a add label like: `semver:patch`
2. Create a Release Tag with updated changelog
3. Release the package with run `npm publish --access public`

## Contributing

### Suggestions

Please open an issue [here](https://github.com/thonatos/github-actions-release/issues).

### License

Github Actions Release is [MIT licensed](./LICENSE).
