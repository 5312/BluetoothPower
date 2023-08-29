import Taro from "@tarojs/taro";
import { AtIcon } from "taro-ui";
import { View, Text, Image } from "@tarojs/components";
import { useState, useEffect } from "react";
import { useLoad } from "@tarojs/taro";
import { strToData } from "../..//util/util";

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
  const [d_data, setDdata] = useState<string>(""); //设备名称

  const [notify, setNotify] = useState<NofityData>({
    voltage: "未知",
    current: "未知",
    discharge_state: "未知",
    chip_temp: "未知",
    output_voltage: "未知",
    output_power: "未知",
    charge_discharge: 0,
    battery_capacity: "未知",
    battery_cycles: "未知",
    battery_percentage: "未知",
    temperature: "未知",
  }); // 数据
  const [settingList, setSettingList] = useState([
    { icon: "dianchi", sub: "电池状态", type: 1 },
    { icon: "chongdianzhong", sub: "充电MOS", type: 0 },
  ]); //设备名称
  type SettingList = {
    img?: any;
    name: string;
    unit?: string;
    value: string | number;
  };
  const [setting3, setSetting3] = useState<SettingList[]>([
    { img: dianyaDisabled, name: "电池电压", value: 31.52, unit: "V" },
    { img: dianliu, name: "电池温度", value: "36", unit: "℃" },
    { img: gl, name: "电池容量", value: 10000, unit: "wh" },
    { img: gdy, name: "充放状态", value: 4, unit: "" },
    { img: dy, name: "充放电流", value: 1, unit: "A" },
    { img: pjdy, name: "充放功率", value: 1, unit: "W" },
    { img: yc, name: "A口", value: "1/5", unit: "" },
    { img: zxh, name: "C口", value: "4/5", unit: "" },
    { img: wendu, name: "系统温度", value: 1, unit: "°C" },
    { img: xtdy, name: "循环次数", value: 1, unit: "次" },
    { img: xtdl, name: "电池健康", value: "良", unit: "" },
  ]);

  const data: any = Taro.getCurrentInstance(); //.router.params;
  const route = data.router.params;
  const devicesData = JSON.parse(route.devicesData);
  const name: string = devicesData.name;

  useLoad(() => {
    setNotify(strToData(route.notify));
    setDdata(name);
  });
  useEffect(() => {
    // console.log("::", notify);
    setSettingList((Current) => {
      return [
        { icon: "dianchi", sub: "电池状态", type: 1 },
        { icon: "chongdianzhong", sub: "充电MOS", type: 0 },
      ];
    });
  }, [notify]);

  const devicesArray = [
    { name: "刀片电池", label: "电池类型" },
    { name: "15小时", label: "运行时间" },
    { name: "V1.0", label: "软件版本号" },
    { name: "AD15SDA518", label: "硬件版本号" },
  ];

  const settingList2 = [
    { icon: "dianchi-didianliang", sub: "放电MOS", type: 0 },
    // { icon: "vlb", sub: "均衡状态", type: 0 },
  ];

  function toindex() {
    Taro.redirectTo({
      url: "/pages/index/index",
    });
  }

  function toSetting() {
    Taro.navigateTo({
      url: "/pages/parameters/parameters",
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
              <Text className="device">{d_data}</Text>
            </View>
          </View>
          <View className="list-text" onClick={toindex}>
            <AtIcon
              prefixClass="iconfont"
              value="chongdianzhuang"
              size="18"
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
                  {/* <View className="soc">SOC</View> */}
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
            <View className="setting" onClick={toSetting}>
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
              <View className="name">{item.name}:</View>
              <View className="value">
                <Text className="name">{item.value}</Text>
                <Text className="unit">{item.unit}</Text>
              </View>
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
