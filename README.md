# Tranquill Retreat 🏡

A mobile application for booking luxury cabins. Experience stunning mountain views, explore forests, or relax in your private retreat.

![Tranquill Retreat Banner](./assets/images/aboutBackground.jpg)

## 📱 Features

- **User Authentication**: Secure login and signup functionality
- **Cabin Browsing**: View available cabins with detailed information
- **Cabin Reservations**: Book cabins with customizable options
  - Date selection
  - Guest count management
  - Breakfast inclusion options
  - Special requests
- **Booking Management**: View, edit, and cancel your bookings
- **User Profile**: Manage your personal information
- **Admin Dashboard**: Special features for administrators
  - Cabin management (create, edit, delete)
  - Settings adjustments
  - Duplication of cabins

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (16.x or higher)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- iOS Simulator or Android Emulator (optional)
- Expo Go app for physical device testing

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd tranquill-retreat
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:

   ```
   EXPO_PUBLIC_BACKEND_URL=<your-api-url>
   EXPO_PUBLIC_BACKEND_URL_IMAGE=<your-image-api-url>
   ```

4. Start the development server:

   ```bash
   npx expo start
   ```

5. Use the Expo Go app to scan the QR code, or press:
   - `a` to open in Android emulator
   - `i` to open in iOS simulator

## 💻 Technology Stack

- **Frontend**: React Native, Expo
- **State Management**: React Query, Context API
- **Styling**: TailwindCSS (via NativeWind)
- **Navigation**: Expo Router
- **Forms**: React Hook Form
- **UI Components**: Custom components, Expo Vector Icons

## 🔧 Available Scripts

- `npx expo start` - Start the development server
- `npm run android` - Run on Android emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run as web application (experimental)

## 👥 Contributors

- [Bạch Đức Cảnh](https://github.com/BachCanh) - Developer
- [Nguyễn Tuấn Vũ](https://github.com/TuanWoox) - Developer
