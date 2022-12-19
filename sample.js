var storyContent = ﻿{"inkVersion":20,"root":[["^这是 Inky Go 测试项目。","\n","^目前有以下功能：","\n","^- 中文化菜单","\n","^- 多个档位，存档读档","\n","^- 单句模式","\n","^- 更加好用的 BGM / SE 控制","\n","^- Image 横向可以控制大小","\n","^- 背景图片显示 / 隐藏","\n","^- 重置随机数","\n","^- 字体、颜色优化","\n","^项目地址：https://gitee.com/firzencode/inky-go","\n","ev","str","^继续","/str","/ev",{"*":"0.c-0","flg":4},{"c-0":["\n",{"->":"0.g-0"},{"#f":5}],"g-0":["^以下对部分需要操作的功能进行演示","\n",{"->":"menu"},["done",{"#f":5,"#n":"g-1"}],{"#f":5}]}],"done",{"menu":[["ev","str","^更加好用的 BGM / SE 控制","/str","/ev",{"*":".^.c-0","flg":4},"ev","str","^Image 横向可以控制大小","/str","/ev",{"*":".^.c-1","flg":4},"ev","str","^背景图片显示 / 隐藏","/str","/ev",{"*":".^.c-2","flg":4},"ev","str","^单句模式","/str","/ev",{"*":".^.c-3","flg":4},{"c-0":["^ ","\n",{"->":"bgm_se"},{"#f":5}],"c-1":["\n",{"->":"img_width"},{"#f":5}],"c-2":["\n",{"->":"bg"},{"#f":5}],"c-3":["\n",{"->":"single_sentence"},{"#f":5}]}],{"#f":1}],"bgm_se":[["ev","str","^播放 BGM","/str","/ev",{"*":".^.c-0","flg":4},"ev","str","^停止 BGM","/str","/ev",{"*":".^.c-1","flg":4},"ev","str","^继续播放 BGM","/str","/ev",{"*":".^.c-2","flg":4},"ev","str","^暂停 BGM","/str","/ev",{"*":".^.c-3","flg":4},"ev","str","^播放 SE","/str","/ev",{"*":".^.c-4","flg":4},"ev","str","^返回","/str","/ev",{"*":".^.c-5","flg":4},{"c-0":["^ ","\n",{"->":"bgm_se.bgm_play_demo"},{"#f":5}],"c-1":["^ ","\n",{"->":"bgm_se.bgm_stop_demo"},{"#f":5}],"c-2":["^ ","\n",{"->":"bgm_se.bgm_resume_demo"},{"#f":5}],"c-3":["^ ","\n",{"->":"bgm_se.bgm_pause_demo"},{"#f":5}],"c-4":["^ ","\n",{"->":"bgm_se.se_play_demo"},{"#f":5}],"c-5":["^ ","\n",{"->":"menu"},{"#f":5}]}],{"bgm_play_demo":["^播放背景音乐，会自动无限循环，同时只能有一个背景音乐会播放","\n","^用法：","\n","^# BGM: http:\\/\\/xxxxx.mp3","\n","^例如：","\n","^# BGM: https:\\/\\/ahayoo.com/inky-sample-1/music_1.mp3","\n","^备注：","\n","^如果 src 是 http 链接，注意双斜杠需要增加反斜杠转义，否则会被识别成注释","\n","^以下进行背景音乐播放，根据网速可能会有延迟","\n",{"#":"BGM: https://ahayoo.com/inky-sample-1/music_1.mp3"},{"->":".^.^"},{"#f":1}],"bgm_stop_demo":["^停止播放背景音乐","\n","^用法：","\n","^# BGM: stop","\n","^以下进行背景音乐停止","\n",{"#":"BGM: stop"},{"->":".^.^"},{"#f":1}],"bgm_pause_demo":["^暂停播放背景音乐","\n","^用法：","\n","^# BGM: pause","\n","^以下进行背景音乐暂停","\n",{"#":"BGM: pause"},{"->":".^.^"},{"#f":1}],"bgm_resume_demo":["^恢复播放背景音乐","\n","^用法：","\n","^# BGM: resume","\n","^以下进行背景音乐恢复","\n",{"#":"BGM: resume"},{"->":".^.^"},{"#f":1}],"se_play_demo":["^播放音效，只会播放一次","\n","^用法：","\n","^# SE: http://xxxxx.mp3","\n","^例如：","\n","^# SE: http://downsc.chinaz.net/Files/DownLoad/sound1/201906/11582.mp3","\n","^以下进行音效播放，根据网速可能会有延迟","\n",{"#":"SE: http://downsc.chinaz.net/Files/DownLoad/sound1/201906/11582.mp3"},{"->":".^.^"},{"#f":1}],"#f":1}],"img_width":["^使用 SIZE_IMAGE 可以创建一个指定宽高的图片","\n","^用法：","\n","^# SIZE_IMAGE: w@src","\n","^例如：","\n","^# SIZE_IMAGE: 50%@https:\\/\\/ahayoo.com/inky-sample-1/image.jpeg","\n","^# SIZE_IMAGE: 200px@https:\\/\\/ahayoo.com/inky-sample-1/image.jpeg","\n","^其中：","\n","^w 指宽度，可以使用 0% ~ 100% 相对文字区域宽度，也可以用 px 像素，例如 200px","\n","^以下是一个 50% 宽度，和一个 200px 宽度的例子","\n","^备注：","\n","^链接中的斜杠要转义","\n",{"#":"SIZE_IMAGE: 50%@https://ahayoo.com/inky-sample-1/image.jpeg"},{"#":"SIZE_IMAGE: 200px@https://ahayoo.com/inky-sample-1/image.jpeg"},{"->":"menu"},{"#f":1}],"bg":["^显示 & 切换背景图片: # BG: https://www.ahayoo.com/inky-sample-1/white_bg_1.jpeg","\n","^隐藏背景图片：# BG: hide","\n","^注意：通常来说，使用背景图后，需要进一步手动修改模版的各种颜色，以确保文字能正常显示","\n",{"->":"bg_menu"},{"#f":1}],"bg_menu":[["ev","str","^显示1","/str","/ev",{"*":".^.c-0","flg":4},"ev","str","^显示2","/str","/ev",{"*":".^.c-1","flg":4},"ev","str","^隐藏","/str","/ev",{"*":".^.c-2","flg":4},"ev","str","^返回","/str","/ev",{"*":".^.c-3","flg":4},{"c-0":["\n",{"#":"BG: https://www.ahayoo.com/inky-sample-1/white_bg_1.jpeg"},{"->":".^.^.^"},{"#f":5}],"c-1":["\n",{"#":"BG: https://www.ahayoo.com/inky-sample-1/white_bg_2.jpeg"},{"->":".^.^.^"},{"#f":5}],"c-2":["\n",{"#":"BG: hide"},{"->":".^.^.^"},{"#f":5}],"c-3":["\n",{"->":"menu"},{"->":"menu"},{"#f":5}]}],{"#f":1}],"single_sentence":[["^通常来说，只要修改 html 中的开关，即可全局调整单句模式，这里为了演示，进行动态修改","\n","ev","str","^开启单句模式","/str","/ev",{"*":".^.c-0","flg":4},"ev","str","^关闭单句模式","/str","/ev",{"*":".^.c-1","flg":4},{"c-0":["\n",{"#":"SINGLE_SENTENCE: on"},[["^已开启单句模式","\n",{"->":".^.^.^.^.g-0"},{"#f":5,"#n":"g-0"}],null],{"#f":5}],"c-1":["\n",{"#":"SINGLE_SENTENCE: off"},[["^已关闭单句模式","\n",{"->":".^.^.^.^.g-0"},{"#f":5,"#n":"g-0"}],null],{"#f":5}],"g-0":["^以下将输出一段文本：","\n","^生命之色涡旋流转，","\n","^七重之门现于世间，","\n","^力量之塔君临九天！","\n","^究↓极↑","\n",{"#":"SINGLE_SENTENCE: off"},{"->":"menu"},{"#f":5}]}],{"#f":1}],"global decl":["ev",{"list":{},"origins":["kettleState"]},{"VAR=":"kettleState"},"/ev","end",null],"#f":1}],"listDefs":{"kettleState":{"cold":1,"boiling":2,"recently_boiled":3}}};