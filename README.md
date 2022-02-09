# 基于vite的vue3脚手架

## 全局模块

### 1. 全局变量

    @constq/qzr-utils 代码中使用inject('$utils')引入utils通用函数

    代码中使用inject('$api')引入api接口对象

### 2. 全局stylus

    vite.config的css

### 3. mock模块

    /src/mock下配置

### 4. 全局引入components

    /components/common 自动全局引入 加common前缀

## 配置项

### 1. vue配置

    src/plugin目录下添加mixin、自定义指令等

### 2. 环境变量

    .env.dev:  开发联调环境、测试环境
    .env.mock: mock环境、前期开发环境
    .env.prod: 生产环境

### 3. jest配置
  
    jest.config.js 配置jest
    /test目录下编写测试文件
    已集成@types/jest eslint-plugin-jest
    可以在.husky pre-push中添加 yarn test命令

### 4. 全局前置配置

    /utils/preFun
    用于配置一些dom或bom相关的方法

## 集成插件

### 1. 移动端自适应

    postcss-px-to-viewport 自动将px单位转成vw

    配置文件postcss.config.js

### 2. 自动引入vue api

    安装unplugin-auto-import 在vite.config中进行配置

    安装vue-global-api eslint依赖 解决eslint报错

### 3. 包依赖分析可视化

    rollup-plugin-visualizer 插件 vite.config配置

    build会生成stats.html文件

### 4. 代码压缩

    vite-plugin-compression插件

## 规范化

### 1. 代码规范

    .editorconfig .prettierrc .eslintrc.js
    引入@constq/eslint-config-qzr集中管理eslint规范

### 2. 提交规范

#### husky + lint-staged

    .husky目录下添加git钩子
    lint-staged 让lint只检测暂存区的文件 加快lint速度

#### Commitizen + commitlint

    .commitlint.config.js文件 配置commit规范

#### cz-customizable

    .cz-config.js配置cz规范
    使用yarn cz 命令行规范化git commit

## 部署

    使用docker进行部署

    修改Dockerfile、nginx.conf文件 暴露的端口
    修改nginx.conf文件 /api接口对应的端口
    修改package.json docker命令相关的dockerhub名称

    执行yarn release进行打包并上传到dockerhub

## 全局components

### icon

index.html引入iconfont js文件

在vue文件中

```html
<common-icon :name="whatever"
             :style="style">
```
