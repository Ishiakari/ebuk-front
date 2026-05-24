# eBuk Mobile (Expo / React Native)

This is the mobile frontend for the eBuk platform. It supports browsing books, viewing native PDFs, and uploading books with cover images.

## Prerequisites
- Node.js (v18+)
- npm or yarn
- Expo Go app on your physical device (or an Android/iOS emulator)

## Setup Instructions

**1. Clone the repository and install dependencies**
```bash
git clone <repository-url>
cd ebuk-mobile
npm install
```

**2. Configure the API Connection**
Open `config.js` in the root of the mobile project. You must change the `API_URL` to point to the machine running your Laravel backend. 

*Example:* If your computer running Laravel is on `192.168.1.41`, update `config.js` to:
```javascript
export const API_URL = 'http://192.168.1.41:8000/api';
```
*(Do not use `localhost` if you are testing on a physical phone, as localhost will point to the phone itself, not your computer).*

**3. Start the Expo Server**
Since this project uses native modules like `react-native-webview` (for in-app PDF rendering) and `react-native-svg`, it is highly recommended to start the server and clear the bundler cache to prevent errors:
```bash
npx expo start -c
```

**4. Run on your Device**
- Open the **Expo Go** app on your iPhone or Android.
- Scan the QR code that appears in your terminal.
- Enjoy reading!
