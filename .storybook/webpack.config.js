const path = require("path");

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

// Export a function. Accept the base config as the only param.
module.exports = (storybookBaseConfig, configType) => {
  // configType has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  // Make whatever fine-grained changes you need
  storybookBaseConfig.module.rules.push({
    test: /\.scss$/,
    loaders: ["style-loader", "css-loader", "sass-loader"],
    include: path.resolve(__dirname, "../")
  });
  storybookBaseConfig.resolve['alias']['@'] = resolve('src');

  // Return the altered config
  console.log(storybookBaseConfig)
  return storybookBaseConfig;
};


// const path = require('path')

// function resolve (dir) {
//   return path.join(__dirname, '..', dir)
// }

// module.exports = {
//   resolve: {
//     alias: {
//       '@': resolve('src')
//     }
//   },
//   module: {
//     rules: [
//       {
//         test: /\.scss$/,
//         use: [{
//           loader: 'style-loader' // creates style nodes from JS strings
//         }, {
//           loader: 'css-loader' // translates CSS into CommonJS
//         }, {
//           loader: 'sass-loader' // compiles Sass to CSS
//         }]
//       }
//     ]
//   }
// }
