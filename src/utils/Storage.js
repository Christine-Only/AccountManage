import AsyncStorage from '@react-native-async-storage/async-storage';

import gameIcon from '../assets/icon_game.png';
import platformIcon from '../assets/icon_platform.png';
import bankIcon from '../assets/icon_bank.png';
import otherIcon from '../assets/icon_other.png';

const DATA = [
  {
    title: '游戏',
    index: 0,
    type: 'game',
    data: [
      {
        name: 'QQSpped',
        username: 'qsq12345',
        password: '12345699',
      },
      {
        name: '王者荣耀',
        username: 'qsq1234',
        password: '0000123456000',
      },
      {
        name: '绝地求生',
        username: 'qsq1234569',
        password: '000012345600',
      },
    ],
    icon: gameIcon,
  },
  {
    title: '平台',
    type: 'platform',
    index: 1,
    data: [
      {
        name: 'QQSpped',
        username: 'qsq123456',
        password: '123456',
      },
    ],
    icon: platformIcon,
  },
  {
    title: '银行卡',
    type: ' bank',
    index: 2,
    data: [
      {
        name: '招商银行',
        username: 'qsq123456',
        password: '123456',
      },
    ],
    icon: bankIcon,
  },
  {
    title: '其他',
    type: ' other',
    index: 3,
    data: [
      {
        name: '其他',
        username: 'qsq123456',
        password: '123456',
      },
    ],
    icon: otherIcon,
  },
];

export const save = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('sectionData', jsonValue);
  } catch (err) {
    console.log('err: ', err);
  }
};

export const load = async key => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : DATA;
  } catch (err) {
    console.log('err: ', err);
  }
};
