import { View } from "@tarojs/components";
import { AtIcon, AtSwitch, AtGrid } from "taro-ui";
import "./parameters.less";

/* import gprs from "../../assets/settingicon/GPRS参数.png";
import other from "../../assets/settingicon/其他参数.png";
import changjia from "../../assets/settingicon/厂家参数.png";
import junheng from "../../assets/settingicon/均衡参数.png";
import kuaisushetting from "../../assets/settingicon/快速设置.png";
import quanxian from "../../assets/settingicon/权限校验.png";
import wendu from "../../assets/settingicon/温度参数.png";
import dianya from "../../assets/settingicon/电压参数.png";
import dianchi from "../../assets/settingicon/电池包参数.png";
import dinaliu from "../../assets/settingicon/电流参数.png";
import sys from "../../assets/settingicon/系统参数.png"; */
export default function Parameters() {
  /* switch click */
  function handleChange() {}
  const arr: IconList[] = [
    { name: "权限效验", icon: "quanxian" /* icon: gprs  */ },
    { name: "快速设置", icon: "shezhi" /* icon: other  */ },
    { name: "电压参数", icon: "dianya" /* icon: changjia */ },
    { name: "温度参数", icon: "wendu" /*  icon: junheng  */ },
    { name: "电流参数", icon: "dianliu" /* icon: kuaisushetting  */ },
    { name: "均衡参数", icon: "vlb" /*  icon: quanxian  */ },
    { name: "电池包参数", icon: "dianchibao" /* icon: wendu  */ },
    { name: "系统参数", icon: "xitong" /* icon: dianya */ },
    { name: "其他参数", icon: "shezhi-xitongshezhi" /* icon: dianchi */ },
    { name: "厂家参数", icon: "cailiaochangjia" /* icon: dinaliu  */ },
    { name: "GPRS参数", icon: "GPRS" /*  icon: sys  */ },
  ];
  return (
    <View>
      <View className="height"></View>
      <View className="cardbox">
        <View className="at-row at-row__justify--between at-row--wrap">
          {/* <View className="at-col at-col-5">左右排列</View> */}
          {/* <View className="at-col at-col-5">Between</View> */}
          {arr.map((item) => (
            <View className="at-col at-col-6">
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
      <View className="cardbox">
        <View className="shadwbox flex">
          <View className="flex">
            <AtIcon
              prefixClass="iconfont"
              value="dianchi-didianliang"
              size="18"
              className="at-icon icontransfrom"
              color="#4897ff"
            ></AtIcon>
            <View>放电MOS</View>
          </View>
          <View className="sbg">
            <AtSwitch checked={true} onChange={handleChange} />
          </View>
        </View>
        <View className="shadwbox flex">
          <View className="flex">
            <AtIcon
              prefixClass="iconfont"
              value="chongdianzhong"
              size="20"
              className="at-icon"
            ></AtIcon>
            <View>充电MOS</View>
          </View>
          <View>
            <AtSwitch onChange={handleChange} />
          </View>
        </View>
        <View className="shadwbox flex">
          <View className="flex">
            <AtIcon
              prefixClass="iconfont"
              value="dianchi-didianliang"
              size="18"
              className="at-icon icontransfrom"
              color="#4897ff"
            ></AtIcon>
            <View>放电MOS</View>
          </View>
          <View>
            <AtSwitch checked={true} onChange={handleChange} />
          </View>
        </View>
        <View className="shadwbox flex">
          <View className="flex">
            <AtIcon
              prefixClass="iconfont"
              value="chongdianzhong"
              size="20"
              className="at-icon"
            ></AtIcon>
            <View>充电MOS</View>
          </View>
          <View>
            <AtSwitch onChange={handleChange} />
          </View>
        </View>
      </View>
      <View className="hbottom"></View>
    </View>
  );
}
