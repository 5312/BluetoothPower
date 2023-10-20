import Taro from "@tarojs/taro";

import { View, Picker, Text } from "@tarojs/components";
import moment from "moment";
import { AtList, AtListItem, AtButton } from "taro-ui";
import "./parameters.less";
import { useState } from "react";
import { get as getGlobalData } from "../global_data";

function stringToBytes(str) {
  var array = new Uint8Array(str.length);
  for (var i = 0, l = str.length; i < l; i++) {
    array[i] = str.charCodeAt(i);
  }
  return array.buffer;
}

export default function Parameters() {
  const [selector] = useState(["主题一", "主题二", "主题三"]);
  const [selectorChecked, setselectorChecked] = useState("主题一");

  function onChange(e) {
    setselectorChecked(selector[e.detail.value]);
  }

  const [dateSel, setDateSel] = useState("");
  function getTime() {
    const time = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    setDateSel(time);
  }
  setInterval(() => {
    getTime();
  }, 100);

  const [array] = useState([30, 60, 90, 120]);
  const [btsleeptime, setBtsleeptime] = useState(30);

  function onbtsleeptimeChange(e) {
    setBtsleeptime(array[e.detail.value]);
  }

  function save() {
    const theme = selector.findIndex((item) => item == selectorChecked);

    const eventParams = {
      btthem: theme + 1,
      btyear: moment(new Date()).format("YYYY"),
      btmon: moment(new Date()).format("MM"),
      btday: moment(new Date()).format("DD"),
      bthour: moment(new Date()).format("HH"),
      btmin: moment(new Date()).format("mm"),
      btsec: moment(new Date()).format("ss"),
      btweek: moment(new Date()).format("d"),
      btsleeptime: btsleeptime,
    };
    console.log(eventParams);
    // 向蓝牙设备发送一个0x00的16进制数据
    let buffer = stringToBytes(JSON.stringify(eventParams)); // new ArrayBuffer();

    console.log(buffer);

    const { deviceId, serviceId, characteristicId } = getGlobalData("ID");
    console.log("deviceId", deviceId);
    console.log("serviceId", serviceId);
    console.log("characteristicId", characteristicId);
    Taro.writeBLECharacteristicValue({
      // 这里的 deviceId 需要在 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
      deviceId,
      // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
      serviceId,
      // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
      characteristicId,
      // 这里的value是ArrayBuffer类型
      value: buffer,
      success: function (res) {
        console.log("writeBLECharacteristicValue success", res.errMsg);
      },
    });
  }
  function cancel() {
    // 在C页面内 navigateBack，将返回A页面
    Taro.navigateBack({
      delta: 1,
    });
  }
  return (
    <View>
      <Picker mode="selector" range={selector} onChange={onChange}>
        <AtList>
          <AtListItem title="显示主题" extraText={selectorChecked} />
        </AtList>
      </Picker>
      <View className="myItem">
        <View className="item-content">时间校准</View>
        <View className="item-extra">{dateSel}</View>
      </View>
      {/*  <AtList>
        <AtListItem
          title="休眠时间(秒)"
          note="范围:0-65535，-1不休眠"
          extraText="30"
        />
      </AtList> */}
      <Picker mode="selector" range={array} onChange={onbtsleeptimeChange}>
        <AtList>
          <AtListItem title="休眠时间" extraText={`${btsleeptime}`} />
        </AtList>
      </Picker>
      <View className="btnGroup">
        <AtButton type="primary" onClick={save}>
          确认
        </AtButton>
        <AtButton type="secondary" onClick={cancel}>
          取消
        </AtButton>
      </View>
    </View>
  );
}
