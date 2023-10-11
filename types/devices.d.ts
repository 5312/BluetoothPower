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

/* 系统温度
系统电压
系统功率
A/C状态
电池容量
电池百分比
电池温度 */
type NofityData = {
  bat_V: number;
  bat_A: number;
  A_C: any;
  ic_temp: number;
  sys_outinv: number;
  sys_w: number;
  sys: number;
  bat_m: number;
  bat_per: number;
  bat_ntc: number;
  software: any; // 系统版本
  hardware: any; // 硬件版本
  bat_health: any; // 电池健康
  bat_cir: any; // 循环次数
  name: string;
};
