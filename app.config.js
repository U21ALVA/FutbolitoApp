
const { config } = require('dotenv');
config();
module.exports = ({ config: expoConfig }) => ({
  ...expoConfig,
  plugins: [
    ...(expoConfig.plugins || []),
    'expo-secure-store',
  ],
  extra: {
    ...(expoConfig.extra || {}),
    API_URL: process.env.API_URL || 'http://10.0.2.2:3000/api',
  },
});