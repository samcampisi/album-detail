# Album app

This is a simple album list, photo list and photo detail application.

- Made with React Native + Typescript Starter Kit
- Uses data from https://jsonplaceholder.typicode.com

## How to install

- `git clone git@github.com:samcampisi/album-detail.git`
- `cd album-detail`
- `npm install`

## Running on Android

- Make sure you have no other packagers running. In the console:
- `npm start`
- Start an emulator (e.g., using Android Studio -> Tools -> AVD Manager -> start one) or connect a real android device to your computer.
- `react-native run-android` OR
- Click on "RUN" right in Android Studio
- If you connected a real android device, shake the device and on the pop-up menu select Settings -> Debug server host & port for device -> enter your IP with the port 8081 (example: 192.168.1.222:8081) and select OK. Then you can reload the app.

## Running on iOS

- You must have cocoapods installed (if you don't, you can install it by doing `sudo gem install cocoapods` in the console)
- `cd ios && pod install && cd ..`
- `npm start` (make sure you don't have other packagers running)
- Start an emulator (e.g. using XCode -> Select a device such as iPhone 11 -> Run) or connect a real iOS device to your computer and select it from the dropdown in XCode.

## Troubleshooting

- if things don't work, clean up all your build and node_modules folders, npm install and rebuild

## Known issues

- According to https://github.com/facebook/react-native/issues/26707, it is possible that the app freezes when you test it on an iPhone simulator due to the existence of a TextInput component. To avoid this, make sure that on the simulator screen you select Device from the upper menu, and click on "Erase all contents and settings" (hope there's nothing valuable inside that simulator lol). Also on the Edit item on the upper menu, make sure "Automatically sync pasteboard" is not selected.
