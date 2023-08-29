type Devices = {
  RSSI: number;
  advertisData: ArrayBuffer;
  advertisServiceUUIDs: string[];
  connectable: boolean;
  deviceId: string;
  localName: string;
  name: string;
  serviceData: Object;
};

type ChargeDischarge = 4 | 8 | number;
// 4.12/0.00/0/33.58/3.82/0.00/0/36.12/0/96/30.47
type NofityData = {
  voltage: string;
  current: string;
  discharge_state: string;
  chip_temp: string;
  output_voltage: string; // 输入/输出 电压
  output_power: string; //  输入/输出 功率
  charge_discharge: ChargeDischarge; // 充放电状态
  battery_capacity: string;
  battery_cycles: string; // 电池循环次数
  battery_percentage: string; // 电池电量百分比
  temperature: string; // 温度
};
