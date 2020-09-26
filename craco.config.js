const CracoLessPlugin = require('craco-less');
const { resolve } = require("path");

function resolvePath(path) {
  return resolve(__dirname, "src", path);
}

module.exports = {
    webpack: {
        alias: {
            "@utils": resolvePath("utils"),
            "@api": resolvePath("api"),
            "@comps": resolvePath("components"),
            "@assets": resolvePath("assets"),
            "@pages": resolvePath("pages"),
            "@redux": resolvePath("redux"),
            "@conf": resolvePath("config"),
          }
    },
    // devServer: {
    //     proxy: {
    //         "/api": {
    //             target: "http://baidu.com",  
    //             //target: 'http://192.168.9.19:8080',
    //             changeOrigin: true,
    //             pathRewrite: {
    //                 "^/api": ""
    //             }
    //         }
    //     }
    // },
    babel: {
        // 解决装饰器语法
        plugins: [
            ["@babel/plugin-proposal-decorators", { legacy: true }]
        ]
    },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1DA57A' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};