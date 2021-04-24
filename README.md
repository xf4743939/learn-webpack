# learn-webpack

打包出来的 js 带有 defer 属性 作用
**B 站 webpack 第 19 章看完**

## webpack 入门到精通的学习

- 只能处理 js 和 json 资源;其他 css/img 等资源处理不了
- 生产环境比开发环境多一个压缩代码
- 生产和开发环境可以将 es6 模块化编译成浏览器识别的模块化

1. webpack.config.js webpack 配置文件
   > > 作用：指示 webpack 干那些活（运行 webpack 指令时，会加载里面的配置文件）
2. **所有的构建工具都是基于 node.js 平台运行的~模块化默认采用 common.js**

## webpack 是什么？

webpack 是一种前端资源构建工具，一个静态模块打包器(module bundler)。
在 webpack 看来，前端所有资源的模块文件 js、css、less、img 等都会作为模块处理。它将根据模块的依赖关系进行静态分析,打包生成对应的静态资源(bundle)

## webpack 五个核心概念

- Entry
  webpack 以那个入口文件为起点开始打包,分析构建内部依赖图
- output
  把包后输出到哪里去,以及如何命名
- loader
  Loader 让 webpack 能够处理那些非 javascript 文件 即其他类型文件,将它们转化为有效模块,以供应用程序使用,以及被添加到依赖图中(webpack 自身只理解 javascript)
  1. html-loader 处理 html 中 img 图片资源
  2. style-loader 创建 style 标签 ，将 js 中的样式资源插入进行,添加到 head 中生效
  3. css-loader 将 css 文件变成 commonjs 模块加载 js 中,里面内容是样式字符串
  4. MiniCssExtractPlugin.loader 作用: 提取 js 中的 css 成单独文件
  5. posscss-loader:给 css 添加兼容,
  6. eslint-loader:
- Plugins
  插件可以用于执行范围更广的任务,插件范围包括从打包优化和压缩，资源管理,注入环境变量。
  1. html-webpack-plugin:创建一个空的 HTML,自动引入打包输出的所有资源(js/css)
  2. mini-css-extract-plugin:会将 css 提取到单独的文件中,为每个包含 css 的 js 文件创建一个 css 文件,并支持 css 和 sourceMap 按需加载
  3. css-minimizer-webpack-plugin:压缩 css;支持缓存和并发模式下运行
  4. eslint-plugin-import 用于在 webpack 中读取 eslintconfig 配置项
  5. eslint-webpack-plugin: 设置 eslint
- Mode
  模式(Mode)指示 Webpack 使用相应模式的配置

## webpack 性能优化

- 开发环境性能优化
- 生产环境性能优化

## 开发环境性能优化

- 优化打包构建速度
- 优化代码调试

## 生成环境性能优化

- 优化打包构建速度
- 优化代码运行的性能
