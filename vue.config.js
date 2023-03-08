const { defineConfig } = require('@vue/cli-service')
const path = require(`path`);

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
        resolve: {
            symlinks: false,
            alias: {
                vue: path.resolve(`./node_modules/vue`)
            }
        }
    },
    devServer: {
        //proxy: 'http://localhost:5000/'
        proxy: 'https://doktor-socket.mekmar.com/',
        
    } 
  
})
