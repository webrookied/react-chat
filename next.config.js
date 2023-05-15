/*
 * @Author: yangfan 1437446666@qq.com
 * @Date: 2023-03-22 09:55:23
 * @LastEditors: yangfan 1437446666@qq.com
 * @LastEditTime: 2023-03-22 16:20:15
 * @FilePath: \react2006-a\hongye_room\next.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/** @type {import('next').NextConfig} */
// module.exports = {
//   async redirects() {
//     return [
//       {
//         source: '/',
//         destination: '/home',
//         permanent: true,
//       },
//     ]
//   },
// }

// const path = require('path')
const withTM = require('next-transpile-modules')(['react-vant'])
let nextConfig = withTM({
  // 你项目中其他的 Next.js 配置
  typescript: {
    ignoreBuildErrors: true,
  },
})

// nextConfig = {
// async redirects() {
//   return [
//     {
//       source: '/',
//       destination: '/home',
//       permanent: true,
//     },
//   ]
// },
// plugins: [
//   'postcss-flexbugs-fixes',
//   [
//     'postcss-preset-env',
//     {
//       autoprefixer: {
//         flexbox: 'no-2009',
//       },
//       stage: 3,
//       features: {
//         'custom-properties': false,
//       },
//     },
//   ],
// ],
// }
module.exports = nextConfig
