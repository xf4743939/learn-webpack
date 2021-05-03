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
  插件目的在于解决 loader 无法实现的其他事
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

1. 优化打包构建速度
   > > HMR JS 默认时不支持
2. 优化代码调试
   source-map
   > > source-map、inline-source-map、eval-source-map

- 生产环境性能优化

- 生产环境性能优化

- 优化打包构建速度

1. oneOf 同类型只用一个
2. babel 缓存
3. 多进程打包
4. externals
5. dll

- 优化代码运行的性能

1. 缓存(hash-chunkhash-contenthash)
2. tree shaking(es6 和生产环境)
3. code split
4. 懒加载/预加载
5. pwa

## webpack 缓存

- babel 缓存
  cacheDirectory:true
- 文件资源缓存
  hash:每次 webpack 打包都会重新生成一个唯一的 Hash 值
  问题:因为 js 和 css 同时使用一个 Hash 值(可能我只改动一个文件所有缓存都失效)
  chunkHash:根据 chunk 生成的 hash 值,如果打包来源于一个 chunk,那么 hash 值就一样;js 和 css 的 hash 值还是一样的(因为 css 是在 js 中被引入的,所以同属于一个 chunk)
  contenthash

## tree shaking

前提: 1.必须使用 ES6 模块化. 2.开启 production 环境

## runtime

主要是指:在浏览器运行过程中,webpack 用来连接模块化应用程序所需的所有代码。

## manifest

当 compiler 开始执行、解析和映射应用程序时，它会保留所有模块的详细要点。这个数据集合称为 "manifest"，当完成打包并发送到浏览器时，runtime 会通过 manifest 来解析和加载模块。无论你选择哪种 模块语法，那些 import 或 require 语句现在都已经转换为 **webpack_require** 方法，此方法指向模块标识符(module identifier)。通过使用 manifest 中的数据，runtime 将能够检索这些标识符，找出每个标识符背后对应的模块

## 懒加载和预加载区别

懒加载:当文件需要使用时才加载;预加载:会在使用之前,提前加载 js 文件(等其他资源加载完毕,浏览器空闲了再偷偷加载资源)
