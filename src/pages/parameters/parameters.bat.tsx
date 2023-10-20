import { View } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import "./parameters.less";

export default function Parameters() {
  /* switch click */
  const arr: IconList[] = [
    { name: "权限效验", icon: "quanxian" },
    { name: "快速设置", icon: "shezhi" },
    { name: "电压参数", icon: "dianya" },
    { name: "温度参数", icon: "wendu" },
    { name: "电流参数", icon: "dianliu" },
    { name: "均衡参数", icon: "vlb" },
    { name: "电池包参数", icon: "dianchibao" },
    { name: "系统参数", icon: "xitong" },
    { name: "其他参数", icon: "shezhi-xitongshezhi" },
    { name: "厂家参数", icon: "cailiaochangjia" },
    { name: "GPRS参数", icon: "GPRS" },
  ];
  return (
    <View>
      <View className="height"></View>
      <View className="cardbox">
        <View className="at-row at-row__justify--between at-row--wrap">
          {arr.map((item) => (
            <View key={item.name} className="at-col at-col-6">
              <View className="card">
                <AtIcon
                  prefixClass="iconfont"
                  size="40"
                  value={item.icon}
                  className="at-icon icontransfrom"
                  color="#4897ff"
                ></AtIcon>
                <View className="iconbname"> {item.name}</View>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View className="hbottom"></View>
    </View>
  );
}
