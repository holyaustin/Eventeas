## EventEAS
This is the repository to contain Dapp Twitter Clone using React and Solidity. The following contract were deployed to these chains.

Optimism Testnet: 0x09c67f656805d3B4CB544ce11683928e62a9c4d7
<https://goerli-optimism.etherscan.io/address/0x09c67f656805d3b4cb544ce11683928e62a9c4d7>

Mode Testnet: 0xe078fe7A93017F8e18c1C52E79632d0B94c56c26
<https://sepolia.explorer.mode.network/address/0xe078fe7A93017F8e18c1C52E79632d0B94c56c26>

Zora Goerli Testnet = 0x42Fc1d53EcF8B4c46989da0d44f07490668338c8
<https://testnet.explorer.zora.energy/address/0x42Fc1d53EcF8B4c46989da0d44f07490668338c8>

Base Testnet = 0xe078fe7A93017F8e18c1C52E79632d0B94c56c26
<https://goerli.basescan.org/address/0xe078fe7a93017f8e18c1c52e79632d0b94c56c26>

EAS
Schema user : https://optimism-goerli-bedrock.easscan.org/schema/view/0x4a97c3aa0da89370da3a4db71c479f0144ebc7534deffd63fd3a7509193c5374

UID:
0x4a97c3aa0da89370da3a4db71c479f0144ebc7534deffd63fd3a7509193c5374

Schema Tweet : https://optimism-goerli-bedrock.easscan.org/schema/view/0x413c4a703e9724216093b8188a58b81528e6393102eacfdb776f3a2d316725b8

UID:
0x413c4a703e9724216093b8188a58b81528e6393102eacfdb776f3a2d316725b8



## Eventeas
<br />

![](/.github/assets/presentation.png)

<p align="center">
  Twitter clone built in Next.js + TypeScript + Tailwind CSS using Cloud Firestore and Storage
</p>

## Preview 🎬

https://user-images.githubusercontent.com/55032197/201472767-9db0177a-79b5-4913-8666-1744102b0ad7.mp4

## Features ✨

- Authentication with Firebase Authentication
- Strongly typed React components with TypeScript
- Users can add tweets, like, retweet, and reply
- Users can delete tweets, add a tweet to bookmarks, and pin their tweet
- Users can add images and GIFs to tweet
- Users can follow and unfollow other users
- Users can see their and other followers and the following list
- Users can see all users and the trending list
- Realtime update likes, retweets, and user profile
- Realtime trending data from Twitter API
- User can edit their profile
- Responsive design for mobile, tablet, and desktop
- Users can customize the site color scheme and color background
- All images uploads are stored on Firebase Cloud Storage

## Tech 🛠

- [Next.js](https://nextjs.org)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Firebase](https://firebase.google.com)
- [SWR](https://swr.vercel.app)
- [Headless UI](https://headlessui.com)
- [React Hot Toast](https://react-hot-toast.com)
- [Framer Motion](https://framer.com)

## Development 💻

Here are the steps to run the project locally.

1. Clone the repository

   ```bash
   git clone https://github.com/ccrsxx/twitter-clone.git
   ```

1. Install dependencies

   ```bash
   npm i
   ```

1. Create a Firebase project and select the web app

1. Add your Firebase config to `.env.development`. Note that `NEXT_PUBLIC_MEASUREMENT_ID` is optional

1. Make sure you have enabled the following Firebase services:

   - Authentication. Enable the Google sign-in method.
   - Cloud Firestore. Create a database and set its location to your nearest region.
   - Cloud Storage. Create a storage bucket.

1. Install Firebase CLI globally

   ```bash
   npm i -g firebase-tools
   ```

1. Log in to Firebase

   ```bash
   firebase login
   ```

1. Get your project ID

   ```bash
   firebase projects:list
   ```

1. Select your project ID

   ```bash
   firebase use your-project-id
   ```

1. Deploy Firestore rules, Firestore indexes, and Cloud Storage rules

   ```bash
   firebase deploy --except functions
   ```

1. Run the project

   ```bash
   npm run dev
   ```

> **_Note_**: When you deploy Firestore indexes rules, it might take a few minutes to complete. So before the indexes are enabled, you will get an error when you fetch the data from Firestore.<br><br>You can check the status of your Firestore indexes with the link below, replace `your-project-id` with your project ID: https://console.firebase.google.com/u/0/project/your-project-id/firestore/indexes

Optional:

- If you want to get trending data from Twitter API, you need to create a Twitter developer account and get your API keys. Then add your API keys to `.env.development`. I hope Elon Musk doesn't make this API paid 😅.
- If you want to make the user stats synced with the deleted tweets, you need to enable the Cloud Functions for Firebase. Then deploy the Cloud Functions.
