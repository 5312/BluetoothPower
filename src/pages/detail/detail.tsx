import Taro from "@tarojs/taro";
import { AtIcon } from "taro-ui";
import { View, Text, Image } from "@tarojs/components";
import { useState, useEffect } from "react";
import { useLoad } from "@tarojs/taro";

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

import { get as getGlobalData } from "../global_data";

//设备名称
type SettingList = {
  img?: any;
  name: string;
  unit?: string;
  value: string | number;
};

export default function Detail() {
  const [d_data, setDdata] = useState<string>(); //设备名称

  const [notify, setNotify] = useState<NofityData>({
    bat_V: 0,
    bat_A: 0,
    A_C: 0,
    ic_temp: 0,
    sys_outinv: 0,
    sys_w: 0,
    sys: 0,
    bat_m: 0,
    bat_per: 4,
    bat_ntc: 0,
    software: 0,
    hardware: 0,
    bat_health: 0,
    name: "",
  });

  const [settingList] = useState([
    { icon: "dianchi", sub: "电池状态", type: 1 },
  ]);

  const [devicesArray, setDevicesArray] = useState<any[]>([]);

  const [setting3, setSetting3] = useState<SettingList[]>([]);

  const data: any = Taro.getCurrentInstance(); //.router.params;
  const route = data.router.params;

  var devicesData = decodeURI(route.devicesData);
  const name: string = JSON.parse(devicesData).name;

  useLoad(() => {
    setDdata(name);
    console.log("globlea", getGlobalData("notify"));
    const globaldata = getGlobalData("notify");
    if (globaldata) {
      setNotify(globaldata);
    }
  });

  useEffect(() => {
    console.log("effect-notify", notify);
    setDevicesArray(() => {
      return [
        { name: "三元锂", label: "电池类型" },
        { name: "已连接", label: "连接状态" },
        { name: notify.software, label: "软件版本号" },
        { name: notify.hardware, label: "硬件版本号" },
      ];
    });

    const cfA = notify.sys_w / notify.sys_outinv;

    const status = notify.sys == 4 ? "放电" : notify.sys == 8 ? "充电" : "闲";

    const a = notify.A_C == "1/5" ? "ON" : "OFF";
    const c = notify.A_C == "4/5" ? "ON" : "OFF";
    setSetting3(() => {
      return [
        {
          img: dianyaDisabled,
          name: "电池电压",
          value: notify.bat_V.toFixed(2),
          unit: "V",
        },
        {
          img: dianliu,
          name: "电池温度",
          value: notify.ic_temp.toFixed(1),
          unit: "℃",
        },
        {
          img: gl,
          name: "电池容量",
          value: notify.bat_m.toFixed(2),
          unit: "wh",
        },
        { img: gdy, name: "充放状态", value: status, unit: "" },
        { img: dy, name: "充放电流", value: cfA, unit: "A" },
        { img: pjdy, name: "充放功率", value: notify.sys_w, unit: "W" },
        { img: yc, name: "A口", value: a, unit: "" },
        { img: zxh, name: "C口", value: c, unit: "" },
        {
          img: wendu,
          name: "系统温度",
          value: notify.bat_ntc.toFixed(1),
          unit: "°C",
        },
        { img: xtdy, name: "循环次数", value: notify.bat_cir, unit: "次" },
        { img: xtdl, name: "电池健康", value: notify.bat_health, unit: "" },
        {
          img: xtdl,
          name: "系统电压",
          value: notify.sys_outinv.toFixed(2),
          unit: "",
        },
      ];
    });
  }, [notify]);

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
          </View>
          <View className="echartsBox">
            <View className="echarts">
              <View className="outline">
                <View className="inline">
                  <View className="soc"></View>
                  <View className="title">{notify.bat_per}%</View>
                  <View className="subtitle">
                    剩余: {notify.bat_m.toFixed(2)}wH
                  </View>
                </View>
                <View className="left_box">
                  <View className="left"></View>
                </View>
                <View className="right_box">
                  <View className="right"></View>
                </View>
              </View>
            </View>
            <View className="e-title">
              总容量:{(notify.bat_m / (notify.bat_per / 100)).toFixed(2)}
              wH
            </View>
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
