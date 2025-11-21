
export function numberCurrencyID(value: any) {
  return `Rp. ${(parseFloat(value) || 0).toLocaleString('id-ID')}`;
}
export function formatThousand(value: any, maxAfterComma: number = 2) {
  return `${(parseFloat(value) || 0).toLocaleString('id-ID', {
    maximumFractionDigits: maxAfterComma,
  })}`;
}
export function formatPercentage(value: any, maxAfterComma: number = 1) {
  return `${(parseFloat(value) || 0).toLocaleString('id-ID', {
    maximumFractionDigits: maxAfterComma,
  })}`;
}

export function localeFormatter(data: any) {
  data = parseFloat(data);
  return data ? data.toLocaleString('id-ID') : 0; //, { style: 'currency', currency: 'IDR' }
}

export const decimalNumberFormat = (number: any, afterComma: number = 1) => {
  return number ? number.toFixed(afterComma) : 0;
};

const sufixes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
export const getBytes = (bytes: any) => {
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return (
    (!bytes && '0 Bytes') ||
    (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sufixes[i]
  );
};

export const transformNumber = (val: any, language?: any) => {
  return Math.abs(Number(val)) >= 1.0e12
    ? (Math.abs(Number(val)) / 1.0e12).toFixed(1) + (language === 'id' ? ' Triliun' : ' T')
    : Math.abs(Number(val)) >= 1.0e9
      ? (Math.abs(Number(val)) / 1.0e9).toFixed(1) + (language === 'id' ? ' Milliar' : ' B')
      : Math.abs(Number(val)) >= 1.0e6
        ? (Math.abs(Number(val)) / 1.0e6).toFixed(1) + (language === 'id' ? ' Juta' : ' M')
        : Math.abs(Number(val)) >= 1.0e3
          ? (Math.abs(Number(val)) / 1.0e3).toFixed(1) + (language === 'id' ? ' Ribu' : ' K')
          : Math.abs(Number(val)).toFixed(0);
};

export const transformNumberV2 = (val: any, language?: any) => {
  return Math.abs(Number(val)) >= 1.0e12
    ? (Math.abs(Number(val)) / 1.0e12).toFixed(1) + (language === 'id' ? ' T' : ' T')
    : Math.abs(Number(val)) >= 1.0e9
      ? (Math.abs(Number(val)) / 1.0e9).toFixed(1) + (language === 'id' ? ' M' : ' B')
      : Math.abs(Number(val)) >= 1.0e6
        ? (Math.abs(Number(val)) / 1.0e6).toFixed(1) + (language === 'id' ? ' J' : ' M')
        : Math.abs(Number(val)) >= 1.0e3
          ? (Math.abs(Number(val)) / 1.0e3).toFixed(1) + (language === 'id' ? ' R' : ' K')
          : Math.abs(Number(val)).toFixed(0);
};