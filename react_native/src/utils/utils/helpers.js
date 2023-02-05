import CurrencyFormatter from 'currency-formatter';
import Validator from 'card-validator';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {cpf, cnpj} from 'cpf-cnpj-validator';

dayjs.extend(customParseFormat);
export const sliceString = (max = 16, title = '', suffix = '...') => {
  return title.length > max ? `${title.slice(0, max)}${suffix}` : title;
};

export const urlRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;
export const linkedinRegex = /linkedin\.com\/(in|company)\/[A-z0-9_-]+/gi;

export const normalizeString = string => {
  return string
    .split('')
    .map(
      function(letter) {
        const i = this.accents.indexOf(letter);
        return i !== -1 ? this.out[i] : letter;
      }.bind({
        accents:
          'ÀÁÂÃÄÅĄàáâãäåąßÒÓÔÕÕÖØÓòóôõöøóÈÉÊËĘèéêëęðÇĆçćÐÌÍÎÏìíîïÙÚÛÜùúûüÑŃñńŠŚšśŸÿýŽŻŹžżź',
        out:
          'AAAAAAAaaaaaaaBOOOOOOOOoooooooEEEEEeeeeeeCCccDIIIIiiiiUUUUuuuuNNnnSSssYyyZZZzzz',
      }),
    )
    .join('')
    .replace(' ', '');
};

export const convertToNumber = data => {
  return typeof data === 'string'
    ? parseFloat(
        data
          .replace(',', '#')
          .replace(/R\$\s|[.]/g, '')
          .replace('#', '.'),
      )
    : data;
};

export const dateValidator = value => {
  const date = dayjs(value, 'DD/MM/YYYY');

  if (date.isValid()) {
    const age = dayjs().diff(date, 'year');
    if (age < 14) {
      return false;
    }
    return true;
  }
  return false;

  return false;
};
export const cardValidator = value => {
  const numberValidation = Validator.number(value);
  return numberValidation.isPotentiallyValid;
};

export const converToCurrency = (data, currency = null) => {
  const v = convertToNumber(data);

  return CurrencyFormatter.format(v, {
    locale: currency || 'pt-BR',
  });
};
export const cpfValidator = value => {
  return cpf.isValid(value);
};
export const numberFormat = (num, digits) => {
  const si = [
    {value: 1, symbol: ''},
    {value: 1e3, symbol: 'k'},
    {value: 1e6, symbol: 'M'},
    {value: 1e9, symbol: 'G'},
    {value: 1e12, symbol: 'T'},
    {value: 1e15, symbol: 'P'},
    {value: 1e18, symbol: 'E'},
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;

  let i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol;
};

export const flatColor = h => {
  const PHI = 0.618033988749895;
  let s;
  let v;
  let hue;
  if (h === undefined) {
    hue = Math.floor(Math.random() * (360 - 0 + 1) + 0) / 360;
    h = (hue + hue / PHI) % 360;
  } else h /= 360;
  v = Math.floor(Math.random() * (100 - 20 + 1) + 20);
  s = (v - 10) / 100;
  v /= 100;

  let r;
  let g;
  let b;
  let i;
  let f;
  let p;
  let q;
  let t;
  i = Math.floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0:
      (r = v), (g = t), (b = p);
      break;
    case 1:
      (r = q), (g = v), (b = p);
      break;
    case 2:
      (r = p), (g = v), (b = t);
      break;
    case 3:
      (r = p), (g = q), (b = v);
      break;
    case 4:
      (r = t), (g = p), (b = v);
      break;
    case 5:
      (r = v), (g = p), (b = q);
      break;
  }
  r = Math.round(r * 255);
  g = Math.round(g * 255);
  b = Math.round(b * 255);

  const finalColor = `#${((1 << 24) + (r << 16) + (g << 8) + b)
    .toString(16)
    .slice(1)}`;

  return finalColor;
};
