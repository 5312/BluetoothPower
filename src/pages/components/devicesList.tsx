import Taro from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import React, { useState } from "react";
import { strToData } from "../..//util/util";
import "./devicesList.less";
import blueTooth from "../../assets/bluetooth.png";
import blueTooth1 from "../../assets/bluetooth1.png";

import dianyaDisabled from "../../assets/dianya-disabled.png";
import dianliu from "../../assets/dianya-copy.png";
import dianchi from "../../assets/dianchi.png";
import wendu from "../../assets/wendu.png";

import { set as setGlobalData } from "../global_data";

type DevicesProps = {
  devicesData: Devices;
  stopBluetoothDevicesDiscovery: Function;
};

const DevicesList: React.FC<DevicesProps> = (props) => {
  const [state, setState] = useState<string>("未连接"); // 连接状态
  const [omitInformation, setOmitInformation] = useState<NofityData>({
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
    bat_cir: 0,
    name: "",
  }); // 连接状态

  const { devicesData, stopBluetoothDevicesDiscovery } = props;
  const deviceId: string = devicesData.deviceId;

  function toDetail() {
    // 停止搜索
    stopBluetoothDevicesDiscovery();
    var encodedData = encodeURI(JSON.stringify(devicesData));

    if (state == "已连接") {
      Taro.navigateTo({
        url: `/pages/detail/detail?devicesData=${encodedData} `,
      });
      return;
    }
    Taro.showLoading({
      title: "开始连接",
    });

    Taro.createBLEConnection({
      deviceId,
      success: () => {
        onBleConnectState(); //监听蓝牙连接状态
        getBLEDeviceServices(deviceId); //获取蓝牙设备所有 service（服务）
        setState("已连接");

        Taro.showToast({
          title: "连接成功",
          icon: "success",
          duration: 3000,
        });
      },
      fail: function (res) {
        console.log("连接蓝牙设备失败", res);
        Taro.showToast({
          title: "连接蓝牙设备失败",
          icon: "error",
          duration: 2000,
        });
      },
      complete() {
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
        const receive = characteristics[0].uuid;

        console.log("read03---", characteristics[0].properties.read);
        console.log("read02---", characteristics[1].properties.read);
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
              // console.log("数据", JSON.parse(resultString));
              setGlobalData("notify", strToData(resultString));
              setGlobalData("ID", {
                deviceId: id,
                serviceId: sid,
                characteristicId: characteristics[1].uuid, // write 特征值
              });
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
        <Text>{omitInformation.bat_per}%</Text>
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
          </View>
          <View className="card-bottom-icon">
            <View className="icontext">
              <Image src={dianyaDisabled}></Image>
              <View>
                电压: <Text>{(omitInformation.bat_V * 1).toFixed(2)}</Text>
              </View>
            </View>
            <View className="icontext">
              <Image src={dianliu}></Image>
              <View>
                电流: <Text>{(omitInformation.bat_A * 1).toFixed(2)}</Text>
              </View>
            </View>
            <View className="icontext itbottom">
              <Image src={dianchi}></Image>
              <View>
                状态:{" "}
                <Text>
                  {omitInformation.A_C == 4
                    ? "充电"
                    : omitInformation.A_C == 8
                    ? "放电"
                    : "闲"}{" "}
                </Text>
              </View>
            </View>
            <View className="icontext itbottom">
              <Image src={wendu}></Image>
              <View>
                温度: <Text>{(omitInformation.ic_temp * 1).toFixed(2)}</Text>
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
