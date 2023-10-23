import { View, Text } from "@tarojs/components";
import DevicesList from "../components/devicesList";
import { useLoad, useUnload } from "@tarojs/taro";
import { useState } from "react";
import Taro from "@tarojs/taro";
import { AtFab } from "taro-ui";
import "./index.less";

import { inArray } from "../../util/util";

// 判断系统蓝牙是否打开
function isOpenBlueth(): boolean {
  const res = Taro.getSystemInfoSync();
  if (!res.bluetoothEnabled) {
    Taro.showModal({
      title: "提示",
      content: "请打开蓝牙后重试",
      success: function (res) {
        if (res.confirm) {
          Taro.showToast({
            title: "蓝牙未打开",
            icon: "none",
            duration: 2000,
          });
        } else if (res.cancel) {
          console.log("用户点击取消");
        }
      },
    });
    return false;
  }
  return true;
}

// 搜索蓝牙
function startBluetoothDevicesDiscovery() {
  Taro.showToast({
    title: "搜索蓝牙",
    icon: "success",
    duration: 3000,
  });
  Taro.startBluetoothDevicesDiscovery({
    allowDuplicatesKey: false,
    services: ["6E400001-B5A3-F393-E0A9-E50E24DCCA9E"],
    success: (res) => {
      console.log("startBluetoothDevicesDiscovery success", res);
    },
  });
}

export default function Index() {
  const [state, setState] = useState<Devices[]>([
    /* {
      name: "",
      deviceId: "",
      localName: "",
      RSSI: 0,
      advertisData: new ArrayBuffer(1),
      advertisServiceUUIDs: [],
      connectable: false,
      serviceData: {},
    }, */
  ]);
  const [fabIcon, setfabIcon] = useState("at-icon-streaming");
  const [scaning, changeScan] = useState(false);

  useLoad(() => {
    console.log("Page loaded.");
  });

  useUnload(() => {
    Taro.closeBluetoothAdapter({
      success: function (res) {
        console.log("蓝牙已关闭", res);
      },
    });
  });
  // 初始化蓝牙
  async function bluetoothStar() {
    if (!isOpenBlueth()) return;
    // 初始化蓝牙模块
    Taro.openBluetoothAdapter({
      success: function () {
        Taro.showToast({
          title: "蓝牙初始化成功",
          icon: "success",
          duration: 3000,
        });
        startBluetoothDevicesDiscovery();
        setfabIcon("at-icon-blocked");
        changeScan(true);
      },
      fail: function () {
        Taro.showToast({
          title: "请检测蓝牙权限与设置",
          icon: "error",
          duration: 3000,
        });
      },
    });
  }

  function ClickFunction() {
    if (scaning) {
      stopBluetoothDevicesDiscovery();
    } else {
      bluetoothStar();
    }
  }
  // 监听蓝牙
  Taro.onBluetoothDeviceFound((res) => {
    res.devices.forEach((device: Devices) => {
      if (!device.name && !device.localName) {
        return;
      }
      const foundDevices = state;
      const idx: number = inArray(foundDevices, "deviceId", device.deviceId);
      if (idx === -1) {
        setState((Current) => [...Current, device]);
      }
    });
  });
  function stopBluetoothDevicesDiscovery() {
    Taro.stopBluetoothDevicesDiscovery({
      success: function () {
        setfabIcon("at-icon-streaming");
        changeScan(false);
      },
    });
  }
  return (
    <View className="index">
      <View className="topHeight"></View>
      <View className="title">
        <Text className="hi">Hi~ !</Text>
        <View>
          <Text className="welcome">欢迎使用菠萝储能BMS</Text>
        </View>
      </View>
      <View className="btngroup">
        <AtFab size="small" onClick={ClickFunction}>
          <Text className={`at-fab__icon at-icon ${fabIcon}`}></Text>
        </AtFab>
      </View>
      <View className="headerimg"></View>
      {state.map((item, y) => (
        <View key={y}>
          <DevicesList
            devicesData={item}
            stopBluetoothDevicesDiscovery={stopBluetoothDevicesDiscovery}
          />
          <View className="height"></View>
        </View>
      ))}
    </View>
  );
}
