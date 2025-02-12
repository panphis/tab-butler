# 谷歌浏览器插件

一个谷歌浏览器 tab 插件，带有书签搜索，管理功能。

可以根据用户爱好，自定义搜索引擎，搜索参数

## 使用介绍

### 通过谷歌浏览器插件市场下载

### 手动打包导入

1. 从代码仓库获取代码

```bash
git clone xxx
```

2. 根据运行环境要求 安装 nodejs（18）并安装包管理工具 pnpm
3. 安装依赖并打包

```bash
pnpm i

pnpm run build
```

## 内容介绍

### Apps

- `pages`: 由 vite react typescript 构建的多页面应用
- `chrome-extension`: 由 vite typescript 浏览器插件后台运行脚本

### Packages

- `@repo/eslint-config`: eslint 配置
- `@repo/hmr`: vite 关于浏览器插件热更新的 ws 推送插件
- `@repo/tailwind-config`: 在项目中用到的 tailwind 配置
- `@repo/typescript-config`: tsconfig 拓展模板
- `@repo/ui`: shadcn ui 构建的组件库
- `@repo/vite`: vite 配置

## 备注

### 关于搜索引擎高级搜索参数配置文档地址

1. google: https://www.google.com/advanced_search?q=

2. Bing/必应:https://support.microsoft.com/zh-cn/topic/%E9%AB%98%E7%BA%A7%E6%90%9C%E7%B4%A2%E9%80%89%E9%A1%B9-b92e25f1-0085-4271-bdf9-14aaea720930

3. 百度: 百度首页 > 设置 > 高级搜索

以排除搜索结果包含 csdn CSDN 为例

google ` -csdn -CSDN` (注意前端有个空格)

Bing/必应 ` -site:csdn.net` (注意前端有个空格)

百度 ` -(csdn | CSDN)` (注意前端有个空格)

### 关于添加搜索引擎

以 github 为例

1. 打开GitHub 搜索 chrome 得到页面 url 地址
   `https://github.com/search?q=chrome&type=repositories`

2. 删除无用参数并去掉上一步搜索关键次得到我们所需要的搜索地址
   `https://github.com/search?q=`

常用搜索引擎

| 名称   | 搜索地址                         |
| :----- | :------------------------------- |
| google | https://www.google.com/search?q= |
| Bing   | https://bing.com/search?q=       |
| 必应   | https://cn.bing.com/search?q=    |
| 百度   | https://www.baidu.com/s?wd=less  |
| GitHub | https://github.com/search?q=     |
| npm    | https://www.npmjs.com/search?q=  |
