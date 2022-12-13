export default class LocalService {
  getDateString(value) {
    const tarih = new Date(value);

    let gun = tarih.getDate();
    let ay = tarih.getMonth();
    let yil = tarih.getFullYear();

    return gun + "-" + (ay + 1) + "-" + yil;
  }

  getStringDate(value) {
    const tarih = value.split("-");

    let gun = tarih[0];
    let ay = tarih[1];
    let yil = tarih[2];

    const newDate = new Date(yil, ay - 1, gun);
    return newDate;
  }

  getDataTableSum(data, columns) {
    const values = [];
    for (let col in columns) {
      let deger = 0;
      let key = columns[col];
      for (let key in data) {
        deger += data[key].columns[col];
      }

      const value = {
        key: key,
        value: deger,
      };

      values.push(value);
    }

    return values;
  }
}
