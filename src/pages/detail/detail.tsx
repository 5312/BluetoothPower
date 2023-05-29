import Taro from "@tarojs/taro";
import { AtIcon } from "taro-ui";
import { View, Text, Image } from "@tarojs/components";
import "./detail.less";

import devices from "../../assets/devices.png";
import dianyaDisabled from "../../assets/dianya-disabled.png";
import dianliu from "../../assets/dianya-copy.png";
import gl from "../../assets/gl.png";
import gdy from "../../assets/gdy.png";
import dy from "../../assets/dy.png";
import pjdy from "../../assets/pjdy.png";
import yc from "../../assets/yc.png";
import zxh from "../../assets/zxh.png";
import wendu from "../../assets/wendu.png";
import xtdy from "../../assets/xtdy.png";
import xtdl from "../../assets/xtdl.png";
import cd from "../../assets/cd.png";

export default function Detail() {
  const devicesArray = [
    { name: "刀片电池", label: "电池类型" },
    { name: "15小时", label: "运行时间" },
    { name: "V1.0", label: "软件版本号" },
    { name: "AD15SDA518", label: "硬件版本号" },
  ];
  const settingList = [
    { icon: "dianchi", sub: "电池状态", type: 1 },
    { icon: "dianliang_huaban", sub: "电池状态", type: 0 },
    { icon: "chongdianzhong", sub: "充电MOS", type: 0 },
    { icon: "chongdianzhong", sub: "充电MOS", type: 1 },
  ];
  const settingList2 = [
    { icon: "dianliang_huaban", sub: "放电MOS", type: 0 },
    { icon: "dianliang_huaban", sub: "放电MOS", type: 1 },
    { icon: "fuzaijunheng", sub: "均衡状态", type: 0 },
    { icon: "fuzaijunheng", sub: "均衡状态", type: 1 },
  ];
  const setting3 = [
    { img: dianyaDisabled, sub: "电池状态", type: 0 },
    { img: dianliu, sub: "电流", value: "36A" },
    { img: gl, sub: "功率", value: 0 },
    { img: gdy, sub: "最高电压", value: 1 },
    { img: dy, sub: "最低电压", value: 1 },
    { img: pjdy, sub: "平均电压", value: 1 },
    { img: yc, sub: "压差", value: 1 },
    { img: zxh, sub: "总循环", value: 1 },
    { img: wendu, sub: "电池温度", value: 1 },
    { img: xtdy, sub: "系统电压", value: 1 },
    { img: xtdl, sub: "系统电流", value: 1 },
    {
      img: cd,
      sub: "充电电流",
      value: 1,
    },
  ];

  function toindex() {
    Taro.redirectTo({
      url: "/pages/index/index",
    });
  }
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
          <View className="list-text" onClick={toindex}>
            <AtIcon
              prefixClass="iconfont"
              value="chongdianzhuang"
              size="20"
              color="#fff"
            ></AtIcon>
            <Text>设备列表</Text>
          </View>
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
                  <AtIcon
                    prefixClass="iconfont"
                    value={item.icon}
                    size="20"
                    className="at-icon"
                    color={item.type ? "#fff" : "#4897ff"}
                  ></AtIcon>
                  <View className="sub">{item.sub}</View>
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
                  <AtIcon
                    prefixClass="iconfont"
                    value={item.icon}
                    size="20"
                    className="at-icon"
                    color={item.type ? "#fff" : "#4897ff"}
                  ></AtIcon>
                  <View className="sub">{item.sub}</View>
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
        <View className="settinglist">
          {setting3.map((item, i) => (
            <View className=" settingitem" key={i}>
              <Image className="iconimg" src={item.img}></Image>
              <View className="name">{item.sub}:</View>
              <View>36V</View>
            </View>
          ))}
        </View>
      </View>
      <View className="mess">
        <View className="card mt w-2 h-32">
          <View className="card-top">
            <View>
              <View className="deviceName">
                <View className="rectangle"></View>
                <Text className="d_name">保护信息</Text>
              </View>
            </View>
          </View>
        </View>
        <View className="card mt w-2 h-32">
          <View className="card-top">
            <View>
              <View className="deviceName">
                <View className="rectangle"></View>
                <Text className="d_name">告警信息</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View className="bottom"></View>
    </View>
  );
}
