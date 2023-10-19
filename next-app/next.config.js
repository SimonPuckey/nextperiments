// Config must be JS file but can add type checking using JSDoc as below
// TODO: can/should we eclude this file from type checking?
/** 
 * @type {import('next').NextConfig} 
 * */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true
  }
}
const withPWA = require("next-pwa")({
  dest:'public'
    // Config explained https://github.com/shadowwalker/next-pwa#configuration
});
module.exports = withPWA({
  ...nextConfig
});
