# youdid
Time based views for Github project activity.

![alt text](https://github.com/klaptrap/youdid/raw/master/docs/screenshot.png "Logo Title Text 1")

youdid allows you to view prs and commits for a given github project, user, branch and time period.

## Setup
### Adding github app token

1) Create yourself a github app token by following [these](https://developer.github.com/apps/building-github-apps/creating-a-github-app/) instructions.

2) Add the token to the `VUE_APP_GITHUB_TOKEN` enviroment variable as you would normally do or by adding it to the `.env.local` file (see `.env.local.template` as an example).

### NPM install

`cd youdid; npm install`

## Run the dev server

`npm run serve`

## Build for production

`npm run build`
