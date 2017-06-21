# KarmaJobsCordova

This is a mobile cordova app.
This app communicates with a small api, and uses some components of the phone.

# Prerequisites

- Node >= 7
  - npm

# Install

```
# install global cli utils
npm i -g webpack cordova

# install dependencies
npm i

# Install for android
cordova platform add android

# build assets
npm run build

# run the cordova app
npm run start
```

# Sources

Sources a^can be found in the [src](src) directory.

# Validation

## Storage

To validate storage of the phone, you have 1 easy option.

1. Start the app.
2. Goto settings
3. Change the api url, and click save
4. Close the app, (completly, even destroy the activity)
5. Reload the app
6. Go back to settings

## Phone component

To check the usage of GPS, you're gonna need to visit the jobs page.

1. Start the app
2. login in the app
  - email: user@karmajobs.com
  - password: password
3. Now all the jobs should say "The job .... IS AT -- km"

## Api communication

That's the weirdest, please make sure you have chrome installed first.

1. Start the app
2. Start chrome
3. Start remote debugging in chrome [https://developers.google.com/web/tools/chrome-devtools/remote-debugging/](https://developers.google.com/web/tools/chrome-devtools/remote-debugging/)
4. In devtools, goto `network` tab
5. In the app, goto login
6. Set data, and login. This should trigger a network request (visible in chrome devtools)
