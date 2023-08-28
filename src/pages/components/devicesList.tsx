import Taro from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import { useState } from "react";

import "./devicesList.less";

import blueTooth from "../../assets/bluetooth.png";
import wifi from "../../assets/wifi.png";

import blueTooth1 from "../../assets/bluetooth1.png";
import wifi1 from "../../assets/wifi1.png";

import dianyaDisabled from "../../assets/dianya-disabled.png";
import dianliu from "../../assets/dianya-copy.png";
import dianchi from "../../assets/dianchi.png";
import wendu from "../../assets/wendu.png";

// ArrayBuffer转16进制字符串示例
function ab2hex(buffer) {
  let hexArr = Array.prototype.map.call(new Uint8Array(buffer), function (bit) {
    return ("00" + bit.toString(16)).slice(-2);
  });
  return hexArr.join("");
}

export default function DevicesList(prop) {
  const [state, setState] = useState<string>("未连接");
  const [notify, setNotify] = useState<string>();

  useLoad(() => {
    console.log("Page loaded.");
  });
  const devicesData = prop.devicesData;
  const deviceId: string = devicesData.deviceId;

  function toDetail() {
    if (state == "已连接") {
      Taro.navigateTo({
        url: `/pages/detail/detail?devicesData=${JSON.stringify(
          devicesData
        )}&notify=${notify}`,
      });
      return;
    }
    Taro.showLoading({
      title: "开始连接",
    });
    Taro.createBLEConnection({
      deviceId, // 搜索到设备的 deviceId
      success: () => {
        console.log("连接成功");
        setState("已连接");
        onBleConnectState(); //监听蓝牙连接状态
        getBLEDeviceServices(deviceId); //获取蓝牙设备所有 service（服务）
      },
      fail: function (res) {
        console.log("连接蓝牙设备失败", res);
      },
      complete: function () {
        Taro.hideLoading();
      },
    });
  }

  function onBleConnectState() {
    //监听蓝牙连接状态
    Taro.onBLEConnectionStateChange(function (res) {
      // 该方法回调中可以用于处理连接意外断开等异常情况
      console.log(
        `device ${res.deviceId} state has changed, connected: ${res.connected}`
      );
    });
  }

  function getBLEDeviceServices(id: string) {
    Taro.getBLEDeviceServices({
      deviceId: id,
      success: function (res) {
        console.log("device services:", res.services);
        getBLEDeviceCharacteristics(deviceId, res.services[0].uuid);
      },
    });
  }
  /**蓝牙设备characteristic(特征值)信息 */
  function getBLEDeviceCharacteristics(id: string, sid: string) {
    Taro.getBLEDeviceCharacteristics({
      // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
      deviceId: id,
      // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
      serviceId: sid,
      success: function (res) {
        //console.log("device getBLEDeviceCharacteristics:", res.characteristics);
        const characteristics = res.characteristics;
        const receive = characteristics[0].uuid; //  "6E400003-B5A3-F393-E0A9-E50E24DCCA9E";
        const send = "6E400002-B5A3-F393-E0A9-E50E24DCCA9E"; //characteristics[1].uuid;
        // console.log("read03---", characteristics[0].properties.read);
        // console.log("read02---", characteristics[1].properties.read);
        Taro.notifyBLECharacteristicValueChange({
          state: true, // 启用 notify 功能
          deviceId: id,
          serviceId: sid,
          characteristicId: receive,
          success: function (res) {
            console.log("notify success", res);
            Taro.onBLECharacteristicValueChange(function (res) {
              const arrayBuffer = res.value;
              // 将 ArrayBuffer 转换为 Uint8Array
              const uint8Array = new Uint8Array(arrayBuffer);
              // 将 Uint8Array 转换为字符串
              const resultString = String.fromCharCode.apply(null, uint8Array);
              console.log(resultString); // 输出: "Hello"
            });
          },
        });
      },
    });
  }
  return (
    <View className="card" onClick={toDetail}>
      <View className="position-num">
        <Text>70%</Text>
      </View>
      <View className="card-top">
        <View>
          <Text className="deviceName">
            {devicesData.name == "" ? devicesData.deviceId : devicesData.name}(
            {state})
          </Text>
        </View>
        <View>
          <View className="iconright at-icon at-icon-chevron-right"></View>
        </View>
      </View>
      <View className="card-center-flex">
        <View className="card-center">
          <View className="card-center-icon">
            <Image src={state == "已连接" ? blueTooth : blueTooth1}></Image>
            <Image
              src={state == "已连接" ? wifi : wifi1}
              className="wifi"
            ></Image>
          </View>
          <View className="card-bottom-icon">
            <View className="icontext">
              <Image src={dianyaDisabled}></Image>
              <Text>电压: 未知</Text>
            </View>
            <View className="icontext">
              <Image src={dianliu}></Image>
              <Text>电流: 未知</Text>
            </View>
            <View className="icontext itbottom">
              <Image src={dianchi}></Image>
              <Text>状态: 未知</Text>
            </View>
            <View className="icontext itbottom">
              <Image src={wendu}></Image>
              <Text>温度: 未知</Text>
            </View>
          </View>
        </View>
        <View className="deviceBg"></View>
      </View>
    </View>
  );
}
