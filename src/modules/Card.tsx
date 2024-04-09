import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  SectionList,
  Image,
  TouchableOpacity,
  LayoutAnimation,
  Alert,
} from 'react-native';

import Modal from './Modal';

import gameIcon from '../assets/icon_game.png';
import platformIcon from '../assets/icon_platform.png';
import bankIcon from '../assets/icon_bank.png';
import otherIcon from '../assets/icon_other.png';
import arrowIcon from '../assets/icon_arrow.png';
import addIcon from '../assets/icon_add.png';
import {produce} from 'immer';
const initState = {
  name: '',
  username: '',
  password: '',
};

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

export default ({showPassword}: {showPassword: boolean}) => {
  const [arrowState, setArrowState] = useState(new Array(4).fill(false));
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    accountInfo: initState,
    type: 'game',
    edit: false,
    idx: -1,
  });

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(DATA);
  }, []);

  const handleArrow = useCallback(
    (index: number) => {
      const newArrowList = [...arrowState];
      newArrowList[index] = !newArrowList[index];
      setArrowState(newArrowList);
    },
    [arrowState],
  );

  const hideModal = useCallback(() => {
    setShowModal(false);
    setModalInfo({
      accountInfo: initState,
      type: 'game',
      edit: false,
      idx: -1,
    });
  }, []);

  const saveData = useCallback(
    (type: string, itemData: any) => {
      const nextState = produce(data, draft => {
        const {idx, edit} = modalInfo;

        if (edit) {
          draft.find(item => item.type === type)?.data.splice(idx, 1, itemData);
        } else {
          draft.find(item => item.type === type)?.data.push(itemData);
        }
      });
      setData(nextState);
      LayoutAnimation.easeInEaseOut();
      hideModal();
    },
    [data, hideModal, modalInfo],
  );

  const handleEdit = (item: any, type: string, idx: number) => {
    console.log('idx: ', idx);
    setShowModal(true);
    setModalInfo({accountInfo: item, type, edit: true, idx});
  };

  const deleteAccount = (type: string, index: number) => {
    const nextState = produce(data, draft => {
      const list = draft.find(
        (item: {type: string}) => item.type === type,
      )?.data;
      list.splice(index, 1);
    });
    setData(nextState);
  };

  const renderItem = ({item, section, index}) => {
    if (!arrowState[section.index]) {
      return null;
    }
    return (
      <View style={styles.item}>
        <TouchableOpacity
          onPress={() => handleEdit(item, section.type, index)}
          onLongPress={() => {
            const buttons = [
              {text: '取消', onPress: () => {}},
              {text: '确定', onPress: () => deleteAccount(section.type, index)},
            ];
            Alert.alert('提示', `确定删除「${item.name}」账号吗？`, buttons);
          }}>
          <Text style={styles.name}>{item.name}</Text>
          <View style={styles.info}>
            <Text
              style={styles.username}
              numberOfLines={1}
              ellipsizeMode="tail">
              账号：{item.username}
            </Text>
            <Text
              style={styles.password}
              numberOfLines={1}
              ellipsizeMode="tail">
              密码：{showPassword ? item.password : '********'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderSectionHeader = ({section: {title, icon, index}}) => (
    <View style={styles.header}>
      <View style={styles.leftHeader}>
        <Image style={styles.headerIcon} source={icon} />
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          handleArrow(index);
          LayoutAnimation.easeInEaseOut();
        }}>
        <Image
          style={
            arrowState[index]
              ? styles.arrow
              : [styles.arrow, styles.collapseArrow]
          }
          source={arrowIcon}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <SectionList
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        sections={data}
        keyExtractor={(item, index) => item.name + index}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
      />
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => {
          setShowModal(true);
        }}>
        <Image source={addIcon} />
      </TouchableOpacity>
      <Modal
        visible={showModal}
        hideModal={hideModal}
        saveData={saveData}
        modalInfo={modalInfo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingBottom: 60,
  },
  listContainer: {
    paddingHorizontal: 12,
  },
  item: {
    borderWidth: 1,
    borderColor: '#F5F5F5',
    backgroundColor: 'white',
    paddingBottom: 24,
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  name: {
    fontSize: 20,
    color: '#666',
    fontWeight: '700',
  },
  info: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 48,
    overflow: 'hidden',
  },
  username: {
    fontSize: 16,
  },
  password: {
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: 'white',
    padding: 12,
    marginTop: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  headerIcon: {
    width: 30,
    height: 30,
    marginRight: 12,
  },
  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrow: {
    width: 20,
    height: 20,
  },
  addBtn: {
    position: 'absolute',
    bottom: 100,
    right: 30,
  },
  collapseArrow: {
    transform: [{rotate: '270deg'}],
  },
});
