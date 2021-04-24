const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');
const isProductionMode = process.env.NODE_ENV === "production";



module.exports={
  entry:'./src/index.js',
  output:{
    filename:'[hash:10].bundle.js',
    path:resolve(__dirname,'dist'),     // ext 取文件原来扩展名
    assetModuleFilename:'image/[hash:10][ext][query]',
    clean: true,
  },
  module:{
    rules:[ 
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: { // 指示js 做怎样的兼容处理 只能转换基本语法 不能转promise
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']    
          }
        }
      },
       // 详细loader 配置
      {
        test:/\.css$/,
        use:[ // use 使用中loader 执行顺序，有右到左;从下到上依次执行
        
          // style-loader 创建style标签 ，将js中的样式资源插入进行,添加到head中生效
           //css-loader 将css 文件变成commonjs模块加载js中,里面内容是样式字符串
         MiniCssExtractPlugin.loader, 
          'css-loader',
          {
            loader:'postcss-loader',
            options:{
              postcssOptions:{
                plugins:[
                  [
                    'postcss-preset-env'
                  ]
                ]
              }
            }
          }
        //  {loader:'sass-loader'}
       ]
      },
      {
        test:/\.less$/i,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          { // 将less 编译成css 文件
            loader: "less-loader",
          },
        ],
      },
      {
        test:/\.(png|jpg|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ]
  },
  optimization:{
    minimize:true,
    minimizer:[
      new CssMinimizerPlugin()
    ]
  },
  plugins:[
    // 详情plugins 配置
     new HtmlWebpackPlugin({
        title:'管理输出',
        template:'./src/index.html'
     }),
     new MiniCssExtractPlugin({
      filename: 'css/[hash:10].css',
      chunkFilename: '[id].css',
     }),
    // new ESLintPlugin({
    //   fix: true,
    //   extensions: ['js', 'json', 'coffee'],
    //   exclude: '/node_modules/'
    // })
  
  ],
  mode:'development',
  // 开发服务器 devServer:用来自动化(自动编译，自动打开浏览器,自动刷新浏览器)
  // 特点: 只会在内存中编译打包,不会有任何输出
  // devServer:{
  //   contentBase:path.join(__dirname,'dist'),
  //   compress:true, // 启用 gizp 压缩
  //   port:9000,
  //   open:true
  // }
}