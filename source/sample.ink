这是 Inky Go 测试项目。

目前有以下功能：

\- 中文化菜单
\- 多个档位，存档读档
\- 单句模式
\- 更加好用的 BGM / SE 控制
\- Image 横向可以控制大小
\- 背景图片显示 / 隐藏 / 过渡
\- 重置随机数
\- 键盘控制：按键盘选择选项、单句模式步进
\- 字体、颜色优化

项目地址：https:\/\/gitee.com/firzencode/inky-go

+ [继续]

- 以下对部分需要操作的功能进行演示

-> menu

== menu ==

+ [更加好用的 BGM / SE 控制] 
-> bgm_se
+ [Image 横向可以控制大小]
-> img_width
-> END

== bgm_se ==

+ [播放 BGM] 
-> bgm_play_demo
+ [停止 BGM] 
-> bgm_stop_demo
+ [继续播放 BGM] 
-> bgm_resume_demo
+ [暂停 BGM] 
-> bgm_pause_demo
+ [播放 SE] 
-> se_play_demo
+ [返回] 
-> menu

= bgm_play_demo
    播放背景音乐，会自动无限循环，同时只能有一个背景音乐会播放
    用法：
    \# BGM: http:\\\/\\\/xxxxx.mp3
    例如：
    \# BGM: https:\\\/\\\/ahayoo.com/inky-sample-1/music_1.mp3
    备注：
    如果 src 是 http 链接，注意双斜杠需要增加反斜杠转义，否则会被识别成注释
    以下进行背景音乐播放，根据网速可能会有延迟
    # BGM: https:\/\/ahayoo.com/inky-sample-1/music_1.mp3
-> bgm_se

= bgm_stop_demo
    停止播放背景音乐
    用法：
    \# BGM: stop
    以下进行背景音乐停止
    # BGM: stop
-> bgm_se

= bgm_pause_demo
    暂停播放背景音乐
    用法：
    \# BGM: pause
    以下进行背景音乐暂停
    # BGM: pause
-> bgm_se

= bgm_resume_demo
    恢复播放背景音乐
    用法：
    \# BGM: resume
    以下进行背景音乐恢复
    # BGM: resume
-> bgm_se
    
= se_play_demo
    播放音效，只会播放一次
    用法：
     \# SE: http:\/\/xxxxx.mp3
    例如：
    \# SE: http:\/\/downsc.chinaz.net/Files/DownLoad/sound1/201906/11582.mp3
    以下进行音效播放，根据网速可能会有延迟
    # SE: http:\/\/downsc.chinaz.net/Files/DownLoad/sound1/201906/11582.mp3
-> bgm_se

== img_width 

使用 SIZE_IMAGE 可以创建一个指定宽高的图片
用法：
\# SIZE_IMAGE: w@src
例如：
\# SIZE_IMAGE: 50%@https:\\\/\\\/ahayoo.com/inky-sample-1/image.jpeg
\# SIZE_IMAGE: 200px@https:\\\/\\\/ahayoo.com/inky-sample-1/image.jpeg

其中：
w 指宽度，可以使用 0% ~ 100% 相对文字区域宽度，也可以用 px 像素，例如 200px
以下是一个 50% 宽度，和一个 200px 宽度的例子
备注：
链接中的斜杠要转义
# SIZE_IMAGE: 50%@https:\/\/ahayoo.com/inky-sample-1/image.jpeg
# SIZE_IMAGE: 200px@https:\/\/ahayoo.com/inky-sample-1/image.jpeg

-> menu