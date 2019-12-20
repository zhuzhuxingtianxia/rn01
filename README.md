# react-native 

*react-native-cli: 2.0.1*
*react-native: 0.61.4*
*react-navigation: 4.0.10*

## 安装脚手架
执行一次，之后不用再执行
```
npm install -g yarn react-native-cli

```
 
## 创建项目
```
react-native init AwesomeProject

```
指定react-native版本,*注意版本号必须精确到两个小数点*
```
react-native init MyApp --version 0.44.3
```
## 编译并运行
```
react-native run-ios

```
## 运行pods时，Specs无法下载
切换下载源，在podfile顶部添加如下：
```
source 'https://mirrors.tuna.tsinghua.edu.cn/git/CocoaPods/Specs.git'
```
## 运行pods时，boost库无法下载
切换下载源，例如：将源切换至gitee.com，或下载该源上传到其他代码管理平台
```
pod 'boost-for-react-native',:git=>"https://gitee.com/damon-s/boost-for-react-native.git"
```
## 添加React Navigation
```
yarn add react-navigation

```
添加相关依赖项组件
```
yarn add react-native-reanimated react-native-gesture-handler react-native-screens@^1.0.0-alpha.23
```
### 如果使用tabbar或TopTabNavigator功能
则还需添加：
```
yarn add react-navigation-tabs

```
```
yarn add react-navigation-stack

```
###如果使用Ionicons组件
则需添加：
```
yarn add react-native-vector-icons

```
同时把下面配置粘贴到iOS项目的info.plist文件中：
```
<key>UIAppFonts</key>
<array>
  <string>AntDesign.ttf</string>
  <string>Entypo.ttf</string>
  <string>EvilIcons.ttf</string>
  <string>Feather.ttf</string>
  <string>FontAwesome.ttf</string>
  <string>FontAwesome5_Brands.ttf</string>
  <string>FontAwesome5_Regular.ttf</string>
  <string>FontAwesome5_Solid.ttf</string>
  <string>Foundation.ttf</string>
  <string>Ionicons.ttf</string>
  <string>MaterialIcons.ttf</string>
  <string>MaterialCommunityIcons.ttf</string>
  <string>SimpleLineIcons.ttf</string>
  <string>Octicons.ttf</string>
  <string>Zocial.ttf</string>
</array>

```
## 添加async-storage
以前我们都从react-native中导入AsyncStorage，但是React官方说是要讲这个AsyncStorage从react-native中抽取出来，也就是在以后的版本中会将其从react-native包中删除，其建议我们从@react-native-community/async-storage中导入这个组件
```
yarn add @react-native-community/async-storage
```
关联react-native原生代码0.60版本一下执行，0.60以上自动关联
```
react-native link @react-native-community/async-storage
```

## 添加Toast组件
```
yarn add react-native-root-toast
```
或使用
```
yarn add react-native-smart-tip
```
如果运行出错，重新执行npm install

## 获取版本信息
```
yarn add react-native-device-info
```
或者：https://www.jianshu.com/p/16d5b48a158e
```
//ios
NSDictionary *initialProps = [NSDictionary dictionaryWithObjectsAndKeys:@"应用名称", @"appName", @"v1.0.0", @"appVersion", nil];
  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"rn01"
                                            initialProperties:initialProps];
```

## 标装机修改连接指向
 node_modules->react-native->third-party-podspecs->.podspec文件下spec.source的下载地址

 ## 指定运行scheme
 ```
  "ios-scheme": "react-native run-ios --scheme 'rn01'",
 ```

 ## rn图表组件纯js

先要安装react-native-svg
```
yarn add react-native-svg
```
若对应react-native版本号进行安装，则指定版本号
```
yarn add react-native-svg@9.13.4
或
yarn add react-native-svg@latest
```
然后安装victory-native
```
yarn add victory-native
```

## rn图表组件混合

```
yarn add react-native-charts-wrapper
yarn add @babel/runtime

```
配置android依赖环境和iOS环境