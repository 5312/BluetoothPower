import { PropsWithChildren } from "react";
import { useLaunch } from "@tarojs/taro";
import "./app.less";
import "taro-ui/dist/style/index.scss"; // 全局引入一次即可
import "./assets/font/iconfont.css";

function App({ children }: PropsWithChildren) {
  useLaunch(() => {
    console.log("App launched.");
  });
  // children 是将要会渲染的页面
  return children;
}

export default App;
