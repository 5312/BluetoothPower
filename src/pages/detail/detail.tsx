import { View, Text, Image } from "@tarojs/components";
import "./detail.less";

import devices from "../../assets/devices.png";
import dianyaDisabled from "../../assets/dianya-disabled.png";

export default function Detail() {
  const devicesArray = [
    { name: "刀片电池", label: "电池类型" },
    { name: "15小时", label: "运行时间" },
    { name: "V1.0", label: "软件版本号" },
    { name: "AD15SDA518", label: "硬件版本号" },
  ];
  const settingList = [
    { icon: "at-icon-settings", sub: "电池状态", type: 1 },
    { icon: "at-icon-settings", sub: "电池状态", type: 0 },
    { icon: "at-icon-settings", sub: "电池状态", type: 0 },
    { icon: "at-icon-settings", sub: "电池状态", type: 1 },
  ];
  const settingList2 = [
    { icon: "at-icon-settings", sub: "电池状态", type: 0 },
    { icon: "at-icon-settings", sub: "电池状态", type: 1 },
    { icon: "at-icon-settings", sub: "电池状态", type: 0 },
    { icon: "at-icon-settings", sub: "电池状态", type: 1 },
  ];
  return (
    <View>
      <View className="topHeight"></View>
      <View className="card">
        <View className="card-top">
          <View>
            <View className="deviceName">
              <View className="rectangle"></View>
              <Text className="d_name">设备名称:</Text>
              <Text className="device">设备1</Text>
            </View>
          </View>
          <View className="list-text"></View>
        </View>
        <View className="center">
          <Image className="img" src={devices}></Image>
          <View className="text">
            {devicesArray.map((item, i) => (
              <View className="label" key={i}>
                <View className="name">{item.name}</View>
                <View className="subname">{item.label}</View>
              </View>
            ))}
          </View>
        </View>
      </View>
      <View className="card mt">
        <View className="rowCenter">
          <View className="rowBoxList">
            <View className="flexrow">
              {settingList.map((item, i) => (
                <View
                  key={i}
                  className={`'cardbox' ${
                    item.type ? "activebgcolor" : "bgcolor"
                  }`}
                >
                  <View className="at-icon at-icon-settings"></View>
                  <View>电池状态</View>
                </View>
              ))}
            </View>
            <View className="flexrow">
              {settingList2.map((item, i) => (
                <View
                  key={i}
                  className={`'cardbox' ${
                    item.type ? "activebgcolor" : "bgcolor"
                  }`}
                >
                  <View className="at-icon at-icon-settings"></View>
                  <View>电池状态</View>
                </View>
              ))}
            </View>
          </View>
          <View className="echartsBox">
            <View className="echarts">
              <View className="outline">
                <View className="inline">
                  <View className="soc">SOC</View>
                  <View className="title">38%</View>
                  <View className="subtitle">剩余: 3800AH</View>
                </View>
                <View className="left_box">
                  <View className="left"></View>
                </View>
                <View className="right_box">
                  <View className="right"></View>
                </View>
              </View>
            </View>
            <View className="e-title">总容量: 10000AH</View>
          </View>
          <View className="end">
            <View className="setting">
              <View className="at-icon at-icon-settings"></View>
            </View>
          </View>
        </View>
      </View>
      <View className="card mt">
        <View>
          <View className="flex ">
            <Image src={dianyaDisabled}></Image>
            <View>总电压:</View>
            <View>36V</View>
          </View>
        </View>
      </View>
    </View>
  );
}
