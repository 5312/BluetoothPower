import Taro from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import React, { useState } from "react";
import { strToData } from "../..//util/util";
import "./devicesList.less";

import blueTooth from "../../assets/bluetooth.png";
import wifi from "../../assets/wifi.png";

import blueTooth1 from "../../assets/bluetooth1.png";
import wifi1 from "../../assets/wifi1.png";

import dianyaDisabled from "../../assets/dianya-disabled.png";
import dianliu from "../../assets/dianya-copy.png";
import dianchi from "../../assets/dianchi.png";
import wendu from "../../assets/wendu.png";

type DevicesProps = {
  devicesData: Devices;
  stopBluetoothDevicesDiscovery: Function;
};
type OmitInformation = {
  voltage: string; //电压
  current: string; //电流
  charge_discharge: ChargeDischarge; // 充放电状态
  battery_percentage: string; // 百分比
  temperature: string; // 温度
};
const DevicesList: React.FC<DevicesProps> = (props) => {
  const [state, setState] = useState<string>("未连接"); // 连接状态
  const [omitInformation, setOmitInformation] = useState<OmitInformation>({
    voltage: "未知",
    current: "未知",
    charge_discharge: 8, // 充放电状态
    battery_percentage: "未知",
    temperature: "未知",
  }); // 连接状态

  const [notify, setNotify] = useState<string>("");

  const { devicesData, stopBluetoothDevicesDiscovery } = props;
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
    // 停止搜索
    stopBluetoothDevicesDiscovery();

    Taro.createBLEConnection({
      deviceId,
      success: () => {
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
  // 断开连接显示
  function onBleConnectState() {
    //监听蓝牙连接状态
    Taro.onBLEConnectionStateChange(function (res) {
      if (!res.connected) {
        setState("未连接");
      }
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
      deviceId: id,
      serviceId: sid,
      success: function (res) {
        const characteristics = res.characteristics;
        const receive = characteristics[0].uuid; //  "6E400003-B5A3-F393-E0A9-E50E24DCCA9E";
        // const send = "6E400002-B5A3-F393-E0A9-E50E24DCCA9E"; //characteristics[1].uuid;
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
              setNotify(resultString);
              setOmitInformation(strToData(resultString));
            });
          },
        });
      },
    });
  }
  return (
    <View className="card" onClick={toDetail}>
      <View className="position-num">
        <Text>{omitInformation.battery_percentage}%</Text>
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
              <View>
                电压: <Text>{omitInformation.voltage}</Text>
              </View>
            </View>
            <View className="icontext">
              <Image src={dianliu}></Image>
              <View>
                电流: <Text>{omitInformation.current}</Text>
              </View>
            </View>
            <View className="icontext itbottom">
              <Image src={dianchi}></Image>
              <View>
                状态:{" "}
                <Text>
                  {omitInformation.charge_discharge == 4
                    ? "充电"
                    : omitInformation.charge_discharge == 8
                    ? "放电"
                    : "闲"}{" "}
                </Text>
              </View>
            </View>
            <View className="icontext itbottom">
              <Image src={wendu}></Image>
              <View>
                温度: <Text>{omitInformation.temperature}</Text>
              </View>
            </View>
          </View>
        </View>
        <View className="deviceBg"></View>
      </View>
    </View>
  );
};

export default DevicesList;
