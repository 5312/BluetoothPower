export function inArray(arr, key, val) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][key] === val) {
      return i;
    }
  }
  return -1;
}

// ArrayBuffer转16进制字符串示例
export function ab2hex(buffer) {
  let hexArr = Array.prototype.map.call(new Uint8Array(buffer), function (bit) {
    return ("00" + bit.toString(16)).slice(-2);
  });
  return hexArr.join("");
}

export function strToData(str: string): NofityData {
  const array = JSON.parse(str);
  const data: NofityData = {
    bat_V: parseFloat(array.bat_V),
    bat_A: parseFloat(array.bat_A),
    A_C: array.A_C,
    ic_temp: parseFloat(array.ic_temp),
    sys_outinv: parseFloat(array.sys_outinv),
    sys_w: parseFloat(array.sys_w),
    sys: array.sys,
    bat_m: parseFloat(array.bat_m),
    bat_per: array.bat_per,
    bat_ntc: parseFloat(array.bat_ntc),
    software: array.software,
    hardware: array.hardware,
    bat_health: array.bat_health,
    name: array.name,
  };

  return data;
}
