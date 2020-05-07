// ref: https://umijs.org/config/
import {resolve} from "path";

export default {
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: false,
      dva: true,
      dynamicImport: false,
      title: 'app-market-client',
      dll: false,
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  proxy: {
    "/api": {
      "target": "http://localhost/",
      "changeOrigin": true
    }
  },
  alias: {
    api: resolve(__dirname, './src/services/'),
    utils: resolve(__dirname, "./src/utils"),
    services: resolve(__dirname, "./src/services"),
    components: resolve(__dirname, "./src/component"),
    config: resolve(__dirname, "./src/utils/config"),
  },
  // outputPath: '../app-online-shop-server/src/main/resources/static'
}
