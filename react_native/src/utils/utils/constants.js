import {Dimensions} from 'react-native';
import {normalize} from './fontSize';

export const {height, width} = Dimensions.get('window');
const φ = (1 + Math.sqrt(3)) / 2;

export const MIN_HEADER_HEIGHT = 60;
export const MAX_HEADER_HEIGHT = 135;
export const HEADER_DELTA = MAX_HEADER_HEIGHT - MIN_HEADER_HEIGHT;

export const WIDTH_BUTTON = Math.round(Dimensions.get('window').width) - 120;

export const FONT_FAMILY_BOLD = 'Ubuntu-Bold';
export const FONT_FAMILY_MEDIUM = 'Ubuntu-Medium';
export const FONT_FAMILY_REGULAR = 'Ubuntu-Regular';

export const PRERENDER = {};
export const SEX = [
  {
    label: 'Masculino',
    value: 'm',
  },
  {
    label: 'Feminino',
    value: 'f',
  },
  {
    label: 'Outro',
    value: 'o',
  },
];
export const SIZES = {
  size_400: normalize(400),
  size_360: normalize(360),
  size_270: normalize(270),
  size_240: normalize(240),
  size_220: normalize(220),
  size_180: normalize(180),
  size_160: normalize(160),
  size_150: normalize(150),
  size_140: normalize(140),
  size_130: normalize(130),
  size_120: normalize(120),
  size_112: normalize(112),
  size_110: normalize(110),
  size_108: normalize(108),
  size_104: normalize(104),
  size_100: normalize(100),
  size_90: normalize(90),
  size_84: normalize(84),
  size_78: normalize(78),
  size_74: normalize(74),
  size_72: normalize(72),
  size_80: normalize(80),
  size_70: normalize(70),
  size_68: normalize(68),
  size_60: normalize(60),
  size_58: normalize(58),
  size_56: normalize(56),
  size_54: normalize(54),
  size_52: normalize(52),
  size_50: normalize(50),
  size_48: normalize(48),
  size_44: normalize(44),
  size_40: normalize(40),
  size_38: normalize(38),
  size_36: normalize(36),
  size_34: normalize(34),
  size_32: normalize(32),
  size_30: normalize(30),
  size_28: normalize(28),
  size_26: normalize(26),
  size_25: normalize(25),
  size_24: normalize(24),
  size_22: normalize(22),
  size_20: normalize(20),
  size_18: normalize(18),
  size_17: normalize(17),
  size_16: normalize(16),
  size_15: normalize(15),
  size_14: normalize(14),
  size_13: normalize(13),
  size_12: normalize(12),
  size_11: normalize(11),
  size_10: normalize(10),
  size_9: normalize(9),
  size_8: normalize(8),
  size_7: normalize(7),
  size_6: normalize(6),
  size_5: normalize(5),
  size_4: normalize(4),
};

export const MODAL_HEIGHT_AUTH =
  SIZES.size_38 +
  SIZES.size_40 +
  SIZES.size_40 +
  SIZES.size_40 +
  SIZES.size_40 +
  SIZES.size_40 +
  SIZES.size_20 +
  SIZES.size_20 +
  SIZES.size_38 +
  SIZES.size_28 +
  SIZES.size_40 +
  SIZES.size_38 +
  SIZES.size_20 +
  SIZES.size_30;

export const COLORS = {
  black: '#161E28',
  bg: '#F4F4F6',
  red2: '#F97575',
  red: '#d64541',
  default: '#73C2F1',
  blue: '#24A1E9',
  gray: '#B4B4B6',
  gray2: '#85868A',
  purple: '#6C21E9',
  black: '#000000',
  red: '#F44336',
  winter: '#E00061',
  green: '#00b16a',
  gray_web: '#85868A',
  silver_chalice: '#B4B4B6',
  light_gray: '#CCCCCC',
  platinum: '#EBEBED',
  carolina_blue: '#23A0E9',
  maya_blue: '#23A0E9',
  cultured: '#F9F9F9',
  violet_blue: '#3C469E',
  cornflower_blue: '#778CEF',
  magnolia: '#EDF0FD',
  yellow_orange: '#FFA944',
  seashell: '#FFF9F2',
  trypan_blue: '#260D9E',
  han_purple: '#5635E1',
  fandango_pink: '#E74D82',
  fire_opal: '#F35843',
  salmon: '#FD746A',
  misty_rose: '#FDE3E3',
  tuquoise: '#67D7C7',
  tuquoise_over: '#67D2dd',
  alice_blue: '#ECF8FF',
  plump_purple: '#673EC1',
  marjorelle_blue: '#7C4AEC',
  blue_violet: '#7F39F4',
  gradient_blue_violet: ['#7F39F4', '#4E0BC1'],
  // gradient_blue: linear-gradient(90deg, #6ABFF0 0%, #23A0E9 0.40%, #0085FF 100%);
  // gradient_purple: linear-gradient(90deg, #CB00FF 0%, #CB00FF 0.01%, #9300B8 100%);
  // gradient_yellow: linear-gradient(90deg, #FFD35C 0%, #FFD35C 0.01%, #FF9503 100%);
  // gradient_orange: linear-gradient(90deg, #FB862A 0%, #FB862A 0.01%, #F06B05 100%);
  gradient_winter_sky: ['#FF006E', '#E00061'],
  // gradient_blue_pigment: linear-gradient(90deg, #342E94 0%, #342E94 0.01%, #211D5E 100%);
  // gradient_violet: linear-gradient(90deg, #7F39F4 0%, #7F39F4 0.01%, #4E0BC1 100%);
  // gradient_turquoise: linear-gradient(90deg, #67D7C7 0%, #67D7C7 0.01%, #2FB19E 100%);
  // gradient_blue_green: linear-gradient(90deg, #2AC0CB 0%, #2AC0CB 0.01%, #197278 100%);
  gradient_middle_grey: ['#8A817C', '#463F3A'],
  gradient_card: ['#3e1fb3', '#b571d2'],
  gradient_logo: ['#924ABA', '#260D9E'],
  // gradient_magnolia: linear-gradient(90deg, #EDF0FD 0%, #EDF0FD 0.01%, #DAE0FB 100%);
  // gradient_gray: linear-gradient(90deg, #CCCCCC80 0%, #CCCCCC80 0.01%, #CCCCCC80 100%);
  // gradient_fire_opal: linear-gradient(90deg, #F35843 0%, #F35843 0.01%, #FD746A 100%);
};

export const EMAIL_TEST = 'Email Inválido';
export const REQUIRED_TEST = 'Campo Obrigatório';
export const SIZE_MAX = 'Tamanho Maximo Excedido';
export const SIZE_MIN = 'Tamanho Minimo Necessário';
export const EMAIL_CONFIRM_TEST = 'E-email nao coincide';
export const CARD_TEST = 'Cartão Inválido';
export const CPF_TEST = 'CPF Inválido';

export const TABS = [
  {name: 'Todos', anchor: 0},
  {name: 'Marcados', anchor: 0},
];

export const EVENTS = {
  status: 'success',
  data: {
    organize: [
      {
        sku: 'asda',
        file: 'https://s3-alpha-sig.figma.com/img/b10b/a3a4/6130b4b91cc41eb82a2307efdb9c9229?Expires=1605484800&Signature=Ei8dYCS4HMalW8EuzNeGgT~32iHgShV4pXNVJdbYPQuUIR7WiKEzs92TBpR0PJ8MiMBL6nLaphmZYQQ-jZEEjiuHknTFENxf~a7OP~3hLSap5WknI1wdgUqSm9UCUYZHp611g5sfgi8fUNkkGeXUa-0r2x-TNC4gcvKIgOmN8E89Ir6LV5XwkczzfBpBhuL8XumWLxggH-GaPevU5KypKe06usLPiVakSJNGnVVJ~e9VMirSiQvhQT4aBpat04CIjsaNrz9Y9mat8KcUyQYzU1zTEMaOCfBaFAdOD-1wyMyYt6lBljd7FaBsXxRSynyuY~~~uuLTQYX-BC1wYugY0w__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
      },
      {
        sku: 'asda2',
        file: 'https://s3-alpha-sig.figma.com/img/b10b/a3a4/6130b4b91cc41eb82a2307efdb9c9229?Expires=1605484800&Signature=Ei8dYCS4HMalW8EuzNeGgT~32iHgShV4pXNVJdbYPQuUIR7WiKEzs92TBpR0PJ8MiMBL6nLaphmZYQQ-jZEEjiuHknTFENxf~a7OP~3hLSap5WknI1wdgUqSm9UCUYZHp611g5sfgi8fUNkkGeXUa-0r2x-TNC4gcvKIgOmN8E89Ir6LV5XwkczzfBpBhuL8XumWLxggH-GaPevU5KypKe06usLPiVakSJNGnVVJ~e9VMirSiQvhQT4aBpat04CIjsaNrz9Y9mat8KcUyQYzU1zTEMaOCfBaFAdOD-1wyMyYt6lBljd7FaBsXxRSynyuY~~~uuLTQYX-BC1wYugY0w__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
      },
      {
        sku: 'asda3',
        file: 'https://s3-alpha-sig.figma.com/img/b10b/a3a4/6130b4b91cc41eb82a2307efdb9c9229?Expires=1605484800&Signature=Ei8dYCS4HMalW8EuzNeGgT~32iHgShV4pXNVJdbYPQuUIR7WiKEzs92TBpR0PJ8MiMBL6nLaphmZYQQ-jZEEjiuHknTFENxf~a7OP~3hLSap5WknI1wdgUqSm9UCUYZHp611g5sfgi8fUNkkGeXUa-0r2x-TNC4gcvKIgOmN8E89Ir6LV5XwkczzfBpBhuL8XumWLxggH-GaPevU5KypKe06usLPiVakSJNGnVVJ~e9VMirSiQvhQT4aBpat04CIjsaNrz9Y9mat8KcUyQYzU1zTEMaOCfBaFAdOD-1wyMyYt6lBljd7FaBsXxRSynyuY~~~uuLTQYX-BC1wYugY0w__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
      },
      {
        sku: 'asda4',
        file: 'https://s3-alpha-sig.figma.com/img/b10b/a3a4/6130b4b91cc41eb82a2307efdb9c9229?Expires=1605484800&Signature=Ei8dYCS4HMalW8EuzNeGgT~32iHgShV4pXNVJdbYPQuUIR7WiKEzs92TBpR0PJ8MiMBL6nLaphmZYQQ-jZEEjiuHknTFENxf~a7OP~3hLSap5WknI1wdgUqSm9UCUYZHp611g5sfgi8fUNkkGeXUa-0r2x-TNC4gcvKIgOmN8E89Ir6LV5XwkczzfBpBhuL8XumWLxggH-GaPevU5KypKe06usLPiVakSJNGnVVJ~e9VMirSiQvhQT4aBpat04CIjsaNrz9Y9mat8KcUyQYzU1zTEMaOCfBaFAdOD-1wyMyYt6lBljd7FaBsXxRSynyuY~~~uuLTQYX-BC1wYugY0w__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
      },
      {
        sku: 'asda6',
        file: 'https://s3-alpha-sig.figma.com/img/b10b/a3a4/6130b4b91cc41eb82a2307efdb9c9229?Expires=1605484800&Signature=Ei8dYCS4HMalW8EuzNeGgT~32iHgShV4pXNVJdbYPQuUIR7WiKEzs92TBpR0PJ8MiMBL6nLaphmZYQQ-jZEEjiuHknTFENxf~a7OP~3hLSap5WknI1wdgUqSm9UCUYZHp611g5sfgi8fUNkkGeXUa-0r2x-TNC4gcvKIgOmN8E89Ir6LV5XwkczzfBpBhuL8XumWLxggH-GaPevU5KypKe06usLPiVakSJNGnVVJ~e9VMirSiQvhQT4aBpat04CIjsaNrz9Y9mat8KcUyQYzU1zTEMaOCfBaFAdOD-1wyMyYt6lBljd7FaBsXxRSynyuY~~~uuLTQYX-BC1wYugY0w__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
      },
      {
        sku: 'asda77',
        file: 'https://s3-alpha-sig.figma.com/img/b10b/a3a4/6130b4b91cc41eb82a2307efdb9c9229?Expires=1605484800&Signature=Ei8dYCS4HMalW8EuzNeGgT~32iHgShV4pXNVJdbYPQuUIR7WiKEzs92TBpR0PJ8MiMBL6nLaphmZYQQ-jZEEjiuHknTFENxf~a7OP~3hLSap5WknI1wdgUqSm9UCUYZHp611g5sfgi8fUNkkGeXUa-0r2x-TNC4gcvKIgOmN8E89Ir6LV5XwkczzfBpBhuL8XumWLxggH-GaPevU5KypKe06usLPiVakSJNGnVVJ~e9VMirSiQvhQT4aBpat04CIjsaNrz9Y9mat8KcUyQYzU1zTEMaOCfBaFAdOD-1wyMyYt6lBljd7FaBsXxRSynyuY~~~uuLTQYX-BC1wYugY0w__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
      },
      {
        sku: 'asda7',
        file: 'https://s3-alpha-sig.figma.com/img/b10b/a3a4/6130b4b91cc41eb82a2307efdb9c9229?Expires=1605484800&Signature=Ei8dYCS4HMalW8EuzNeGgT~32iHgShV4pXNVJdbYPQuUIR7WiKEzs92TBpR0PJ8MiMBL6nLaphmZYQQ-jZEEjiuHknTFENxf~a7OP~3hLSap5WknI1wdgUqSm9UCUYZHp611g5sfgi8fUNkkGeXUa-0r2x-TNC4gcvKIgOmN8E89Ir6LV5XwkczzfBpBhuL8XumWLxggH-GaPevU5KypKe06usLPiVakSJNGnVVJ~e9VMirSiQvhQT4aBpat04CIjsaNrz9Y9mat8KcUyQYzU1zTEMaOCfBaFAdOD-1wyMyYt6lBljd7FaBsXxRSynyuY~~~uuLTQYX-BC1wYugY0w__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
      },
    ],
    recents: [
      {
        _id: '5f9043e755a6d47c424a914d',
        descriptionsmall:
          'Para celebrar o período mais charmoso do ano, os mineiros do SKANK são a grande atração do Secreto de Natal. A banda desembarca no Bella Vista, dia 21 de dezembro, às 20h, com o último show da turnê “Os três primeiros”, celebrando os primeiros álbuns',
        description:
          '<article rel="nofollow noopener noreferrer"><div><p>“Algo parecido” que não nos deixa \nmentir. A inédita é a primeira canção da discografia oficial do Skank \ncom letra e música de Samuel.</p><p><br></p><p>Vem brindar o Natal com a gente?</p><p><br></p><p><strong>*Ingresso Social</strong> - Obrigatório 1kg de alimento não perecível para validar sua meia entrada</p></div> </article><p><b><span>Classificação:</span></b><span> 18 anos</span></p><p><br></p><p><br></p>',
        name: 'Secreto de Natal',
        sku: 'Secreto_de_Natal',
        datestart: '2020-12-22T00:00:00.000Z',
        dateend: '2020-12-22T10:00:00.000Z',
        startTime: '2020-12-22T00:00:00.000Z',
        endTime: '2020-12-22T10:00:00.000Z',
        type: {
          type: 'Festas e Show',
          _id: '5f5d1c548d017112e7b20b37',
        },
        location: {
          namefull:
            "R. Henriqueto Cardinale, 121 - Olhos D'Água, Belo Horizonte - MG, 30390-082, Brasil",
          city: {city: 'Belo Horizonte'},
        },
        file: {
          location:
            'https://seuingresso-dev.s3.sa-east-1.amazonaws.com//organize/5f85cf98f0eb0351b14b7fa3/events/Jgj5TTlO2ZHPFRUaof42n.png',
          thumb: '',
          thumbsmall: '',
        },
      },
      {
        _id: '5f875c38f0eb0351b14b7fa8',
        descriptionsmall:
          'Em um mundo em que buscamos nada menos do que o extraordinário, surge uma nova possibilidade e a realidade toma proporções gigantescas, onde TUDO é FABULOSO! Welcome To Fabulous Vegas!\n',
        description:
          '<div>✦31/05✦</div><div>Marília Mendonça</div><div>Hugo &amp; Guilherme</div><div>Matheus Ianc</div><div><br></div><div>CLASSIFICAÇÃO: 18 ANOS</div>',
        name: 'Marilia Mendonça',
        sku: 'Marilia_Mendonça',
        datestart: '2020-12-11T04:00:00.000Z',
        dateend: '2020-12-11T14:00:00.000Z',
        startTime: '2020-12-11T04:00:00.000Z',
        endTime: '2020-12-11T14:00:00.000Z',
        type: {
          type: 'Festas e Show',
          _id: '5f5d1c548d017112e7b20b37',
        },
        location: {
          namefull:
            "R. Henriqueto Cardinale, 121 - Olhos D'Água, Belo Horizonte - MG, 30390-082, Brasil",
          city: {city: 'Belo Horizonte'},
        },
        file: {
          location:
            'https://seuingresso-dev.s3.sa-east-1.amazonaws.com//organize/5f85cf98f0eb0351b14b7fa3/events/Ows_nysIFyMDOP07JgEZu.png',
          thumb: '',
          thumbsmall: '',
        },
      },
      {
        _id: '5f875c38f0eb0351b142b7fa8',
        descriptionsmall:
          'Em um mundo em que buscamos nada menos do que o extraordinário, surge uma nova possibilidade e a realidade toma proporções gigantescas, onde TUDO é FABULOSO! Welcome To Fabulous Vegas!\n',
        description:
          '<div>✦31/05✦</div><div>Marília Mendonça</div><div>Hugo &amp; Guilherme</div><div>Matheus Ianc</div><div><br></div><div>CLASSIFICAÇÃO: 18 ANOS</div>',
        name: 'Marilia Mendonça',
        sku: 'Marilia_Mendonça',
        datestart: '2020-12-11T04:00:00.000Z',
        dateend: '2020-12-11T14:00:00.000Z',
        startTime: '2020-12-11T04:00:00.000Z',
        endTime: '2020-12-11T14:00:00.000Z',
        type: {
          type: 'Festas e Show',
          _id: '5f5d1c548d017112e7b20b37',
        },
        location: {
          namefull:
            "R. Henriqueto Cardinale, 121 - Olhos D'Água, Belo Horizonte - MG, 30390-082, Brasil",
          city: {city: 'Belo Horizonte'},
        },
        file: {
          location:
            'https://seuingresso-dev.s3.sa-east-1.amazonaws.com//organize/5f85cf98f0eb0351b14b7fa3/events/Ows_nysIFyMDOP07JgEZu.png',
          thumb: '',
          thumbsmall: '',
        },
      },
      {
        _id: '5f875c38f0eb0251b142b7fa8',
        descriptionsmall:
          'Em um mundo em que buscamos nada menos do que o extraordinário, surge uma nova possibilidade e a realidade toma proporções gigantescas, onde TUDO é FABULOSO! Welcome To Fabulous Vegas!\n',
        description:
          '<div>✦31/05✦</div><div>Marília Mendonça</div><div>Hugo &amp; Guilherme</div><div>Matheus Ianc</div><div><br></div><div>CLASSIFICAÇÃO: 18 ANOS</div>',
        name: 'Marilia Mendonça',
        sku: 'Marilia_Mendonça',
        datestart: '2020-12-11T04:00:00.000Z',
        dateend: '2020-12-11T14:00:00.000Z',
        startTime: '2020-12-11T04:00:00.000Z',
        endTime: '2020-12-11T14:00:00.000Z',
        type: {
          type: 'Festas e Show',
          _id: '5f5d1c548d017112e7b20b37',
        },
        location: {
          namefull:
            "R. Henriqueto Cardinale, 121 - Olhos D'Água, Belo Horizonte - MG, 30390-082, Brasil",
          city: {city: 'Belo Horizonte'},
        },
        file: {
          location:
            'https://seuingresso-dev.s3.sa-east-1.amazonaws.com//organize/5f85cf98f0eb0351b14b7fa3/events/Ows_nysIFyMDOP07JgEZu.png',
          thumb: '',
          thumbsmall: '',
        },
      },
    ],
    day: [],
    liked: [
      {
        _id: '5f9043e755a6d47c424a914d',
        descriptionsmall:
          'Para celebrar o período mais charmoso do ano, os mineiros do SKANK são a grande atração do Secreto de Natal. A banda desembarca no Bella Vista, dia 21 de dezembro, às 20h, com o último show da turnê “Os três primeiros”, celebrando os primeiros álbuns',
        description:
          '<article rel="nofollow noopener noreferrer"><div><p>“Algo parecido” que não nos deixa \nmentir. A inédita é a primeira canção da discografia oficial do Skank \ncom letra e música de Samuel.</p><p><br></p><p>Vem brindar o Natal com a gente?</p><p><br></p><p><strong>*Ingresso Social</strong> - Obrigatório 1kg de alimento não perecível para validar sua meia entrada</p></div> </article><p><b><span>Classificação:</span></b><span> 18 anos</span></p><p><br></p><p><br></p>',
        name: 'Secreto de Natal',
        sku: 'Secreto_de_Natal',
        datestart: '2020-12-22T00:00:00.000Z',
        dateend: '2020-12-22T10:00:00.000Z',
        startTime: '2020-12-22T00:00:00.000Z',
        endTime: '2020-12-22T10:00:00.000Z',
        type: {
          type: 'Festas e Show',
          _id: '5f5d1c548d017112e7b20b37',
        },
        location: {
          namefull:
            "R. Henriqueto Cardinale, 121 - Olhos D'Água, Belo Horizonte - MG, 30390-082, Brasil",
          city: {city: 'Belo Horizonte'},
        },
        file: {
          location:
            'https://seuingresso-dev.s3.sa-east-1.amazonaws.com//organize/5f85cf98f0eb0351b14b7fa3/events/Jgj5TTlO2ZHPFRUaof42n.png',
          thumb: '',
          thumbsmall: '',
        },
      },
      {
        _id: '5f875c38f0eb0351b14b7fa8',
        descriptionsmall:
          'Em um mundo em que buscamos nada menos do que o extraordinário, surge uma nova possibilidade e a realidade toma proporções gigantescas, onde TUDO é FABULOSO! Welcome To Fabulous Vegas!\n',
        description:
          '<div>✦31/05✦</div><div>Marília Mendonça</div><div>Hugo &amp; Guilherme</div><div>Matheus Ianc</div><div><br></div><div>CLASSIFICAÇÃO: 18 ANOS</div>',
        name: 'Marilia Mendonça',
        sku: 'Marilia_Mendonça',
        datestart: '2020-12-11T04:00:00.000Z',
        dateend: '2020-12-11T14:00:00.000Z',
        startTime: '2020-12-11T04:00:00.000Z',
        endTime: '2020-12-11T14:00:00.000Z',
        type: {
          type: 'Festas e Show',
          _id: '5f5d1c548d017112e7b20b37',
        },
        location: {
          namefull:
            "R. Henriqueto Cardinale, 121 - Olhos D'Água, Belo Horizonte - MG, 30390-082, Brasil",
          city: {city: 'Belo Horizonte'},
        },
        file: {
          location:
            'https://seuingresso-dev.s3.sa-east-1.amazonaws.com//organize/5f85cf98f0eb0351b14b7fa3/events/Ows_nysIFyMDOP07JgEZu.png',
          thumb: '',
          thumbsmall: '',
        },
      },
    ],
  },
};
