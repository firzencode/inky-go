# 自动重置随机数种子

通常，Inky 会保存随机数种子，这意味着，即使你重新读档，下一个随机数依然是固定的

可以通过重置随机数功能，在每次读档之后，重置随机数种子，使得下一个随机数变的不一样

使用方式：

本功能无法使用 TAG 控制，需要修改项目中的 main.js 文件

在 main.js 文件中搜索以下内容

```js
let REFRESH_RANDOM_SEED_WHEN_LOAD = false
```

将它改为

```js
let REFRESH_RANDOM_SEED_WHEN_LOAD = true
```

并保存