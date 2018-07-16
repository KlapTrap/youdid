# youdid

Time based views for Github project activity.

![alt text](https://github.com/klaptrap/youdid/raw/master/docs/screenshot.png 'Logo Title Text 1')

youdid allows you to view prs and commits for a given github project, user, branch and time period.

## Setup

### Adding github app token

1.  Create yourself a github app token by following [these](https://developer.github.com/apps/building-github-apps/creating-a-github-app/) instructions.

2.  Add the token to the `GITHUB_APP_TOKEN` environment variable as you would normally do or by adding it to the `.env` file (see `.env.template` as an example).

### NPM install

`cd youdid; npm install`

## Run the dev server

`npm run serve`

## Run the youdid backend serve

`npm run start-server`

## Build for production

`npm run build`

## Build for production and run backend server

`npm run build-start-server`
