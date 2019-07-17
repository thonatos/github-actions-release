workflow "Push" {
  on = "push"
  resolves = ["Release"]
}

# 安装：仅当分支筛选通过时依赖安装
action "Installation" {
  needs = "Filters for GitHub Actions"
  uses = "thonatos/github-actions-nodejs@v0.1.1"
  args = "npm install npminstall -g && npminstall"
}

# CI: 需先安装依赖
action "CI" {
  needs = "Installation"
  uses = "thonatos/github-actions-nodejs@v0.1.1"
  args = "npm run ci"
}

# 发布：必须通过 CI
action "Release" {
  needs = "CI"
  uses = "thonatos/github-actions-nodejs@v0.1.1"
  args = "npm run semantic-release "
  secrets = ["GITHUB_TOKEN", "NPM_TOKEN"]
}

# 过滤：仅当 push 分支为 master 时通过
action "Filters for GitHub Actions" {
  uses = "actions/bin/filter@3c0b4f0e63ea54ea5df2914b4fabf383368cd0da"
  secrets = ["GITHUB_TOKEN"]
  args = "branch master"
}
