import { View, Text, Button } from "@tarojs/components";
import DevicesList from "../components/devicesList";
import { useLoad, useUnload } from "@tarojs/taro";
import { useState } from "react";
import Taro from "@tarojs/taro";
import "./index.less";

function inArray(arr, key, val) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][key] === val) {
      return i;
    }
  }
  return -1;
}

// 判断系统蓝牙是否打开
function isOpenBlueth() {
  const res = Taro.getSystemInfoSync();
  return res.bluetoothEnabled;
}
function startBluetoothDevicesDiscovery() {
  Taro.startBluetoothDevicesDiscovery({
    allowDuplicatesKey: false,
    //services: ["6E400001-B5A3-F393-E0A9-E50E24DCCA9E"], //6E400002-B5A3-F393-E0A9- E50E24DCCA9E
    success: (res) => {
      console.log("startBluetoothDevicesDiscovery success", res);
      // onBluetoothDeviceFound();
    },
  });
}
export default function Index() {
  const [state, setState] = useState<Object[]>([1]);
  useLoad(() => {
    console.log("Page loaded.");
  });
  // 初始化蓝牙
  async function bluetoothStar() {
    if (!isOpenBlueth()) {
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
      return;
    }
    // 初始化蓝牙模块
    Taro.openBluetoothAdapter({
      success: function (res) {
        console.log("openBluetoothAdapter success", res);
        startBluetoothDevicesDiscovery();
      },
    });
  }
  function stopBluetoothDevicesDiscovery() {
    Taro.stopBluetoothDevicesDiscovery();
    console.log(state);
  }

  useUnload(() => {
    Taro.closeBluetoothAdapter({
      success: function (res) {
        console.log("蓝牙已关闭", res);
      },
    });
  });

  Taro.onBluetoothDeviceFound((res) => {
    //  console.log("onBluetoothDeviceFound", res);
    res.devices.forEach((device) => {
      console.log("deviace", device);
      if (!device.name && !device.localName) {
        return;
      }
      const foundDevices = state;
      const idx = inArray(foundDevices, "deviceId", device.deviceId);
      if (idx === -1) {
        setState((Current) => [...Current, device]);
      }
    });
  });

  return (
    <View className="index">
      <View className="topHeight"></View>
      <View className="title">
        <Text className="hi">Hi~ !</Text>
        <View>
          <Text className="welcome">欢迎使用菠萝储能BMS</Text>
        </View>
      </View>
      <View>
        <Button onClick={bluetoothStar}>开始扫描</Button>
        <Button onClick={stopBluetoothDevicesDiscovery}>停止扫描</Button>
      </View>

      {/* <Image className="headerimg" src={namedPng}></Image> */}
      <View className="headerimg"></View>
      {state.map((item, y) => (
        <View key={y}>
          <DevicesList devicesData={item} />
          <View className="height"></View>
        </View>
      ))}
    </View>
  );
}
