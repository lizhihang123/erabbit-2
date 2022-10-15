const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    // 把less代码注入到全局 每个用的时候不需要在单独的 @import
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.join(__dirname, 'src/assets/styles/mixins.less'),
        path.join(__dirname, 'src/assets/styles/variables.less')
      ]
    }
  }
})
