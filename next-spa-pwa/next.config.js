/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    // Will only be available on the server side
    apiUrl: process.env.SERVER_SIDE_API_URL //'http://payload:3001/api/'
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    apiUrl: process.env.NEXT_PUBLIC_API_URL //'http://localhost:3001/api/'
  }
}
const withPWA = require("next-pwa")({
  dest:'public'
    // Config explained https://github.com/shadowwalker/next-pwa#configuration
});
module.exports = withPWA({
  ...nextConfig
});
