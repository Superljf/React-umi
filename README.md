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
  
###  `src/index.js` ：

 ```js
   1. 从 'dva' 依赖中引入 dva ：`import dva from 'dva'`;
   2. 通过函数生成一个 app 对象：`const app = dva()`;
   3. 加载插件：`app.use({})`;
   4. 注入 model：`app.model(require('./models/example'))`;
   5. 添加路由：`app.router(require('./routes/indexAnother'))`;
   6. 启动：app.start('#root');
   ```
   
   ### Dva 使用依赖
   ```js  "babel-runtime": "^6.26.0", // 一个编译后文件引用的公共库，可以有效减少编译后的文件体积
    "dva-core": "^1.1.0", // dva 另一个核心，用于处理数据层
    "global": "^4.3.2", // 用于提供全局函数的引用
    "history": "^4.6.3", // browserHistory 或者 hashHistory
    "invariant": "^2.2.2", // 一个有趣的断言库
    "isomorphic-fetch": "^2.2.1", // 方便请求异步的函数，dva 中的 fetch 来源
    "react-async-component": "^1.0.0-beta.3", // 组件懒加载
    "react-redux": "^5.0.5", // 提供了一个高阶组件，方便在各处调用 store
    "react-router-dom": "^4.1.2", // router4，终于可以像写组件一样写 router 了
    "react-router-redux": "5.0.0-alpha.6",// redux 的中间件，在 provider 里可以嵌套 router
    "redux": "^3.7.2" // 提供了 store、dispatch、reducer 
```
