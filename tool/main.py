#!/bin/python3

import wx
import os
from bs4 import BeautifulSoup
import requests


class MainWindow(wx.Frame):
    def __init__(self, *args, **kwargs):
        super(MainWindow, self).__init__(*args, **kwargs)
        self.init_ui()

    def init_ui(self):
        v_box = wx.BoxSizer(wx.VERTICAL)
        hint = wx.StaticText(self, label="导入时会覆盖原有文件！请注意备份！")
        v_box.Add(hint, proportion=1, flag=wx.ALL | wx.ALIGN_CENTER_HORIZONTAL, border=15)
        button_import = wx.Button(self, label="选择文件夹导入 Inky Go 模版")
        button_import.Bind(wx.EVT_BUTTON, self.open_project)
        v_box.Add(button_import, proportion=1,
                  flag=wx.ALL | wx.EXPAND, border=15)

        # Main
        self.SetSize((340, 120))
        self.SetSizer(v_box)
        self.SetTitle("Inky Go Tool")
        self.Center()
        self.Show(True)

    def open_project(self, e):
        dlg = wx.DirDialog(self, "选择 Inky 导出的 Web 项目文件夹",
                           style=wx.DD_DEFAULT_STYLE)
        if dlg.ShowModal() == wx.ID_OK:
            self.import_inky_go(dlg.GetPath())
        dlg.Destroy()

    def import_inky_go(self, target_dir):
        print('准备导入项目: ' + target_dir)

        # 检查当前文件夹是否是 inky 导出项目
        target_dir_files = os.listdir(target_dir)
        if ('ink.js' not in target_dir_files):
            print('不是 inky 导出的项目文件夹')
            dial = wx.MessageDialog(
                None, '无法导入 Inky Go\n' + target_dir + "不是 Inky 导出D的 Web 项目目录", '错误', wx.OK)
            dial.ShowModal()
            return
        print('check inky web dir ok')

        # 从已有的项目中分析 title 和 story.js
        # 从当前目录中获取所有 js 文件
        story_js = None
        for file in target_dir_files:
            if file.endswith('.js') and (file != 'ink.js') and (file != 'main.js'):
                story_js = file
                break
        if story_js == None:
            print('找不到 story.js')
            dial = wx.MessageDialog(
                None, '无法导入 Inky Go\n' + target_dir + "中找不到 story.js", '错误', wx.OK)
            dial.ShowModal()
            return
        print('find story.js: ' + story_js)

        # 从 html 中获取 head 部分的 title
        html_file = target_dir + '/index.html'
        with open(html_file, 'r') as file:
            html_content = file.read()

        # 使用 BeautifulSoup 解析 HTML 内容
        soup = BeautifulSoup(html_content, 'html.parser')

        # 提取 head 部分的 title
        title_element = soup.find('head').find('title')
        if title_element:
            title_content = title_element.text.strip()
            print(title_content)
        else:
            print('找不到 title')
            dial = wx.MessageDialog(
                None, '无法导入 Inky Go\n' + html_file + "中找不到 title", '错误', wx.OK)
            dial.ShowModal()
            return

        # 下载
        if not self.download_file(
                'https://gitee.com/firzencode/inky-go/raw/master/index.html', target_dir + '/index.html'):
            return

        if not self.download_file(
                'https://gitee.com/firzencode/inky-go/raw/master/main.js', target_dir + '/main.js'):
            return

        if not self.download_file(
                'https://gitee.com/firzencode/inky-go/raw/master/style.css', target_dir + '/style.css'):
            return

        # 替换 index.html 中的内容
        replace_index_html = target_dir + '/index.html'
        with open(replace_index_html, 'r') as file:
            replace_index_html_content = file.read()
        replace_index_html_content = replace_index_html_content.replace(
            'Inky Go', title_content)
        replace_index_html_content = replace_index_html_content.replace(
            'sample.js', os.path.basename(story_js))
        
        # 写入文件
        with open(replace_index_html, 'w') as file:
            file.write(replace_index_html_content)
        
        # 弹窗提示
        dial = wx.MessageDialog(
            None, '导入成功', '成功', wx.OK)
        dial.ShowModal()

    def download_file(self, url, local_path):
        print("开始下载, url: " + url + ", path: " + local_path)
        response = requests.get(url)

        if response.status_code == 200:
            with open(local_path, 'wb') as file:
                file.write(response.content)
            print("下载成功")
            return True
        else:
            print(f"下载失败, Status code: {response.status_code}")
            dial = wx.MessageDialog(
                None, '无法导入 Inky Go\n' + url + "下载失败", '错误', wx.OK)
            dial.ShowModal()
            return False


def main():
    app = wx.App()
    MainWindow(None)
    app.MainLoop()


if __name__ == '__main__':
    main()
