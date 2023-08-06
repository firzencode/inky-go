# 嵌入图片控制

显示一个嵌入在文本中的图片，默认会撑满整个文字区域的宽度
注意，链接开头的两个 // 都需要加上 \
```
例如：
https://www.ahayoo.com/abc
需要写成
https:\/\/www.ahayoo.com/abc
```

使用方法：

```
显示图片
# IMAGE: <图片远程地址或相对路径>
例如
# IMAGE: https:\/\/ahayoo.com/inky-sample-1/image.jpeg
# IMAGE: image.jpeg

控制图片宽度
# SIZE_IMAGE: <宽度>@<图片远程地址或相对路径>
宽度可以使用 0% ~ 100% 相对文字区域宽度，也可以用 px 等单位

例如
# SIZE_IMAGE: 50%@https:\/\/ahayoo.com/inky-sample-1/image.jpeg
# SIZE_IMAGE: 200px@https:\/\/ahayoo.com/inky-sample-1/image.jpeg
```
