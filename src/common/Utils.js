import _ from 'lodash';
// import * as XLSX from 'xlsx/xlsx.mjs';

export function formatCurrency(
  amount = 0,
  decimalCount = 0,
  decimal = '.',
  thousands = ',',
) {
  try {
    let currency = amount;
    // Parse sang số có số lượng hàng thập phân bằng 'decimalCount'
    currency = _.round(currency, decimalCount);

    // Parse sang format tiền
    currency = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    })
      .format(amount)
      .replaceAll(/(\$)+|(\.00)+/g, '');

    // Thay dấu hàng nghìn
    currency = _.join(
      _.map(currency.split(','), (item) => {
        // Thay dấu hàng thập phân
        if (_.includes(item, '.')) {
          return item.replace('.', decimal);
        }
        return item;
      }),
      thousands,
    );

    return currency;
  } catch (e) {
    console.error(e);
    return amount;
  }
}

// export const exportExcel = async (headers, rows, fileName, hasSTT = true) => {
//   let headerLabel = headers.map((element) => {
//     return element.label;
//   });
//   let headerKey = headers.map((element) => {
//     return element.key;
//   });
//   let headerCol = headers.map((element) => {
//     if (element.cols != undefined) {
//       return { wch: element.cols };
//     }
//   });

//   let listData = rows.map((element, index) => {
//     let tempData = {};
//     headerKey.forEach((key) => {
//       if (element[key]) {
//         tempData[key] = element[key] + '';
//       } else {
//         tempData[key] = element[key];
//       }
//     });
//     if (hasSTT) {
//       tempData.stt = index + 1;
//     }
//     return tempData;
//   });
//   console.log(rows);
//   console.log('headerCol:::', headerCol);
//   const worksheet = XLSX.utils.json_to_sheet(listData);
//   const workbook = XLSX.utils.book_new();
//   const createTime = genDateFileName();
//   XLSX.utils.book_append_sheet(workbook, worksheet, 'List Data');

//   /* fix headers */
//   XLSX.utils.sheet_add_aoa(worksheet, [headerLabel], {
//     origin: 'A1',
//   });

//   worksheet['!cols'] = headerCol;

//   /* create an XLSX file and try to save to Presidents.xlsx */
//   XLSX.writeFile(workbook, fileName + '_' + createTime + '.xlsx');
// };
export const genDateFileName = () => {
  var today = new Date();
  var day = today.getDate() + '';
  var month = today.getMonth() + 1 + '';
  var year = today.getFullYear() + '';
  var hour = today.getHours() + '';
  var minutes = today.getMinutes() + '';
  var seconds = today.getSeconds() + '';

  day = checkZero(day);
  month = checkZero(month);
  year = checkZero(year);
  hour = checkZero(hour);
  minutes = checkZero(minutes);
  seconds = checkZero(seconds);

  return day + month + year + '_' + hour + minutes + seconds;
};
function checkZero(data) {
  if (data.length == 1) {
    data = '0' + data;
  }
  return data;
}
