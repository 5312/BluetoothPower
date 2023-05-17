import { View, Text } from "@tarojs/components";
import DevicesList from "../components/devicesList";
import { useLoad } from "@tarojs/taro";
import Taro from "@tarojs/taro";
import "./index.less";

// 判断系统蓝牙是否打开
function isOpenBlueth() {
  const res = Taro.getSystemInfoSync();
  return res.bluetoothEnabled;
}

// 初始化蓝牙
async function bluetoothStar() {
  if (!isOpenBlueth()) {
    Taro.showModal({
      title: "提示",
      content: "请打开蓝牙后重试",
      success: function (res) {
        if (res.confirm) {
          Taro.navigateTo({
            url: "/pages/index/index",
          });
        } else if (res.cancel) {
          console.log("用户点击取消");
        }
      },
    });
    return;
  }
  let res;
  try {
    const { errMsg } = await Taro.openBluetoothAdapter();
    res = errMsg;
  } catch (e) {
    Taro.showToast({
      title: e.errMsg,
      icon: "none",
      duration: 2000,
    });
  }
  // 微信小程序蓝牙未打开
  if (Taro.getEnv() === "WEAPP" && res !== "openBluetoothAdapter:ok") {
    // TODO 没有打开蓝牙，需要提示用户打开
    Taro.showToast({
      title: "蓝牙未打开",
      icon: "none",
      duration: 2000,
    });
  }

  await Taro.getLocation({});
  const data: any = await Taro.startBluetoothDevicesDiscovery({});
  console.log(data);
  if (data.isDiscovering || data) {
    onDiscoveryBLE();
  }
}
// 搜索蓝牙 -- 微信 支付宝搜索蓝牙设备并连接
async function onDiscoveryBLE() {
  let { devices } = await Taro.getBluetoothDevices();
  //这里打印出设备列表，方便查看设备信息
  console.log("devices", devices);
  Taro.stopBluetoothDevicesDiscovery();
}
bluetoothStar();

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  const devicesArray = [1, 2, 3];
  return (
    <View className="index">
      <View className="topHeight"></View>
      <View className="title">
        <Text className="hi">Hi~ !</Text>
        <View>
          <Text className="welcome">欢迎使用菠萝储能BMS</Text>
        </View>
      </View>
      {/* <Image className="headerimg" src={namedPng}></Image> */}
      <View className="headerimg"></View>
      {devicesArray.map((item) => (
        <View>
          <DevicesList />
          <View className="height"></View>
        </View>
      ))}
    </View>
  );
}
