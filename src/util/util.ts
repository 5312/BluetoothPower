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
  const array = str.split("/");
  const data: NofityData = {
    voltage: array[0],
    current: array[1],
    discharge_state: array[2],
    chip_temp: array[3],
    output_voltage: array[4],
    output_power: array[5],
    charge_discharge: Number(array[6]),
    battery_capacity: array[7],
    battery_cycles: array[8],
    battery_percentage: array[9],
    temperature: array[10],
  };

  return data;
}
