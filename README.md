# KarmaJobsCordova

This is a mobile cordova app.
This app communicates with a small api, and uses some components of the phone.

The project uses an api available publicaly `http://karmajobs.servehttp.com/api`.

# Requirements

- Node >= 7
  - npm

# Install

```
# Clone repo
git clone https://github.com/Grisou13/KarmaJobsCordovaApp.git && cd KarmaJobsCordovaApp

# install global cli utils. *MIGHT REQUIRE SUDO*
npm i -g webpack cordova yarn

# install dependencies
yarn

# Install plateforms
cordova platform add android

# Restore configs
cordova prepare

# build assets
npm run build

# run the cordova app
npm run start
```

## Build for standalone use

```
# build app for production
npm run build

# build android apk
cordova build android
```

an apk should be available in `platforms/android/build/outputs/apk/android-debug.apk`

# Sources

Sources can be found in the [src](src) directory.

The app is a react-redux app, routed with react-router v4.

# Validation

## Storage

To validate storage of the phone, you have 1 easy option.

1. Start the app.
2. Goto settings
3. Change the api url, and click save
4. Close the app, (completly, even destroy the activity)
5. Reload the app
6. Go back to settings
7. The setting should have changed and be stored

You can also use the chrome devtools to access local storage.
Please refer to the [Api communication (steps 1-5)](#Api communication).

Now in the devtools you can do
```
localStorage.getItem("api-url")
```

## Phone component

To check the usage of GPS, you're gonna need to visit the jobs page.

1. Start the app
2. login in the app
  - email: user@karmajobs.com
  - password: password
3. Now all the jobs should say "The job .... IS AT -- km"

**Nota: if the map doesn't load, refresh by clicking in menu the `jobs` link**

## Api communication

That's the weirdest, please make sure you have chrome installed first.

1. Start the app
2. Start chrome
3. Connect your phone to your laptop (usb debugging should be enabled)
4. goto `chrome://inspect` and you should see remote devices
 For more help, visit the [chrome remote debugging guide](https://developers.google.com/web/tools/chrome-devtools/remote-debugging/)
5. Now on chrome, open the devtools `f12` and goto the `network` tab
6. Back in the app, goto login (maybe you need to logout first).
7. Fill out the form and hit send. This should trigger a network request (visible in chrome devtools)
