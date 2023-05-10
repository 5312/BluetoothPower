import { View, Text, Image } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";

import "./devicesList.less";

import blueTooth from "../../assets/bluetooth.png";
import wifi from "../../assets/wifi.png";
import dianyaDisabled from "../../assets/dianya-disabled.png";
import dianliu from "../../assets/dianya-copy.png";
import dianchi from "../../assets/dianchi.png";
import wendu from "../../assets/wendu.png";

export default function DevicesList() {
  useLoad(() => {
    console.log("Page loaded.");
  });
  return (
    <View className="card">
      <View className="position-num">
        <Text>70%</Text>
      </View>
      <View className="card-top">
        <View>
          <Text className="deviceName">设备一(已连接)</Text>
        </View>
        <View>
          <View className="iconright at-icon at-icon-chevron-right"></View>
        </View>
      </View>
      <View className="card-center-flex">
        <View className="card-center">
          <View className="card-center-icon">
            <Image src={blueTooth}></Image>
            <Image src={wifi} className="wifi"></Image>
          </View>
          <View className="card-bottom-icon">
            <View className="icontext">
              <Image src={dianyaDisabled}></Image>
              <Text>电压: 36V</Text>
            </View>
            <View className="icontext">
              <Image src={dianliu}></Image>
              <Text>电流: 0.2A</Text>
            </View>
            <View className="icontext itbottom">
              <Image src={dianchi}></Image>
              <Text>状态: 正常</Text>
            </View>
            <View className="icontext itbottom">
              <Image src={wendu}></Image>
              <Text>温度: 23℃</Text>
            </View>
          </View>
        </View>
        <View className="deviceBg">{/* <Image src={devices}></Image> */}</View>
      </View>
    </View>
  );
}
