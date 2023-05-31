export default defineAppConfig({
  lazyCodeLoading: "requiredComponents",
  pages: [
    "pages/index/index",
    "pages/detail/detail",
    "pages/parameters/parameters",
  ],
  requiredPrivateInfos: ["getLocation", "chooseLocation"],
  permission: {
    "scope.userLocation": {
      desc: "你的位置信息将用于小程序位置接口的效果展示", // 高速公路行驶持续后台定位
    },
  },
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
});
