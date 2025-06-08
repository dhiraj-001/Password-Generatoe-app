# Password Generator App

A simple and secure password generator built with React Native.

## Features

- **Customizable Passwords:** Choose password length and include/exclude numbers, lowercase, uppercase, and symbols.
- **Modern UI:** Clean, responsive design with light/dark mode support.
- **Animated Splash Screen:** Beautiful splash screen with a gradient background, colorful logo, and custom text.

## Splash Screen

- The splash screen features a blue gradient background, a colorful logo, the text "Let's generate awesome passwords", and the handle "@dhiraj" at the bottom.
- To change the logo, replace `src/assets/logo.png`.
- To edit the splash screen text or style, modify `src/components/SplashScreen.tsx`.

## Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

### Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

### Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

#### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

#### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

```sh
cd ios
pod install
```

Then run:

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

### Step 3: Modify your app

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

## Project Structure

```
Second/
├── App.tsx
├── src/
│   ├── assets/
│   │   └── logo.png
│   └── components/
│       └── SplashScreen.tsx
├── android/
├── ios/
└── ...
```

## License

This project is licensed under the MIT License.

---

**Created by @dhiraj**
