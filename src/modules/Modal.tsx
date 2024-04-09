import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Animated,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';

import {produce} from 'immer';

import closeIcon from '../assets/icon_close_modal.png';

export default ({
  visible,
  hideModal,
  saveData,
  modalInfo,
}: {
  visible: boolean;
  hideModal: () => void;
  saveData: (type: string, item: any) => void;
  modalInfo: any;
}) => {
  const initState = {
    name: '',
    username: '',
    password: '',
  };
  const [accountType, setAccountType] = useState('game');
  const [accountInfo, setAccountInfo] = useState(initState);

  const AccountTypeList = [
    {
      title: ' 游戏',
      type: 'game',
    },
    {
      title: ' 平台',
      type: 'platform',
    },
    {
      title: ' 银行卡',
      type: ' bank',
    },
    {
      title: ' 其它',
      type: ' other',
    },
  ];

  useEffect(() => {
    setAccountInfo(modalInfo.accountInfo);
    setAccountType(modalInfo.type);
  }, [modalInfo]);

  const updateAccountInfo = useCallback(
    (type: string, text: string) => {
      const nextState = produce(accountInfo, draft => {
        draft[type] = text;
      });
      setAccountInfo(nextState);
    },
    [accountInfo],
  );
  const renderTitle = () => {
    const styles = StyleSheet.create({
      titleLayout: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
      },
      titleTxt: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
      },
      closeBtn: {
        position: 'absolute',
        right: 6,
      },
      closeImg: {
        width: 28,
        height: 28,
      },
    });

    return (
      <View style={styles.titleLayout}>
        <Text style={styles.titleTxt}>
          {modalInfo.edit ? '编辑账号' : '添加账号'}
        </Text>
        <TouchableOpacity style={styles.closeBtn} onPress={hideModal}>
          <Image style={styles.closeImg} source={closeIcon} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderAccountType = () => {
    const styles = StyleSheet.create({
      accountLayout: {},
      accountTxt: {
        color: '#666',
      },
      navLayout: {
        flexDirection: 'row',
        marginTop: 8,
      },
      nav: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#666',
        paddingVertical: 8,
        paddingHorizontal: 12,
      },
      navTxt: {
        textAlign: 'center',
        fontSize: 16,
      },
      activeNav: {
        backgroundColor: '#3050ff',
      },
      activeNavTxt: {
        color: '#fff',
      },
      leftBorderRadiusNav: {
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
      },
      rightBorderRadiusNav: {
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
      },
    });

    const composeNavStyle = StyleSheet.compose(styles.nav, styles.activeNav);
    const activeNavStyle = StyleSheet.compose(
      styles.navTxt,
      styles.activeNavTxt,
    );

    return (
      <View style={styles.accountLayout}>
        <Text style={styles.accountTxt}>账号类型</Text>
        <View style={styles.navLayout}>
          {AccountTypeList.map((item, index) => (
            <TouchableOpacity
              style={[
                item.type === accountType ? composeNavStyle : styles.nav,
                {
                  borderTopLeftRadius: index === 0 ? 8 : 0,
                  borderBottomLeftRadius: index === 0 ? 8 : 0,
                  borderTopRightRadius:
                    index === AccountTypeList.length - 1 ? 8 : 0,
                  borderBottomRightRadius:
                    index === AccountTypeList.length - 1 ? 8 : 0,
                },
              ]}
              key={index}
              onPress={() => setAccountType(item.type)}>
              <Text
                style={
                  item.type === accountType ? activeNavStyle : styles.navTxt
                }>
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const renderAccountInfo = () => {
    const styles = StyleSheet.create({
      textInput: {
        paddingHorizontal: 12,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        fontSize: 18,
      },
      titleTxt: {
        marginVertical: 12,
        color: '#666',
      },
    });
    return (
      <View>
        <>
          <Text style={styles.titleTxt}>账户名称</Text>
          <TextInput
            style={styles.textInput}
            value={accountInfo?.name}
            onChangeText={text => updateAccountInfo('name', text)}
          />
        </>
        <>
          <Text style={styles.titleTxt}>账号</Text>
          <TextInput
            style={styles.textInput}
            value={accountInfo?.username}
            onChangeText={text => updateAccountInfo('username', text)}
          />
        </>
        <>
          <Text style={styles.titleTxt}>密码</Text>
          <TextInput
            style={styles.textInput}
            value={accountInfo?.password}
            onChangeText={text => updateAccountInfo('password', text)}
          />
        </>
      </View>
    );
  };

  const handleSaveBtn = () => {
    saveData(accountType, accountInfo);
  };
  return (
    <Modal
      transparent={true}
      statusBarTranslucent
      visible={visible}
      animationType="fade">
      <KeyboardAvoidingView
        style={styles.root}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.content}>
          {renderTitle()}
          {renderAccountType()}
          {renderAccountInfo()}
          <TouchableOpacity style={styles.saveBtn} onPress={handleSaveBtn}>
            <Text style={styles.saveTxt}>保存</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#00000060',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingTop: 16,
  },
  saveBtn: {
    marginVertical: 24,
    backgroundColor: '#3050ff',
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
  },
  saveTxt: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
