import { View, Icon, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import "./devicesList.less";

export default function DevicesList() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  return (
    <View className="card">
      <View className="card-top">
        <View>
          <Text>设备一(已连接)</Text>
        </View>
        <View>
          <Icon size="60" type="success" />
        </View>
      </View>
      <View className="card-center-icon"></View>
      <View className="card-bottom-icon"></View>
    </View>
  );
}
