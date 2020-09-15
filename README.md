## 启动
- npm i 
- npm start 
### 打包编译 
- npm run build

### 设置代理
-  /config/config.js
指向本地服务器或者远程服务器
 ```js

  proxy: {
    '/store/api/': {
      'target': 'http://127.0.0.1:8080/store/api',
      'changeOrigin': true,
      'pathRewrite': { "^/" : "" },
    },
    '/fs/api/': {
      target: 'http://192.168.10.89',
      changeOrigin: true,
    },
  },
  ```
  ### 路由设置
  - /config/router.config.js
  
