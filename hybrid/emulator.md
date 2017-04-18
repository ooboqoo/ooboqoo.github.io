# Android Virtual Device

> 模拟器占用资源相当大，我 8G 内存基本扛不住

## VS Emulator for Android

微软的东东，免费，试用下感觉还不错啊

### 常见问题

##### `adb devices` 无法找到虚拟设备

找到 `HKEY_LOCAL_MACHINE\SOFTWARE\Wow6432Node\Android SDK Tools` 项，添加条目 `Path  /  REG_SZ / D:\Program Files\Android\android-sdk` (根据实际安装目录填写) 再 `adb kill-server` 即可解决。



