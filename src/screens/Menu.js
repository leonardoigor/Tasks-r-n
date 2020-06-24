import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {DrawerItems} from 'react-navigation-drawer';
import commonStyles from '../commonStyles';
import {Gravatar} from 'react-native-gravatar';
import axios from 'axios';
import asyncStore from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

export default props => {
  const styles = StyleSheet.create({
    header: {
      borderBottomWidth: 1,
      borderColor: '#DDD',
    },
    avatar: {
      width: 60,
      height: 60,
      borderWidth: 3,
      borderRadius: 30,
      margin: 10,
      backgroundColor: '#222',
    },
    title: {
      color: '#000',
      fontFamily: commonStyles.fontFamily,
      fontSize: 30,
      paddingTop: 30,
      padding: 10,
    },
    userInfo: {marginLeft: 10},
    name: {
      fontFamily: commonStyles.fontFamily,

      marginBottom: 10,
      fontSize: 20,
    },
    email: {
      fontFamily: commonStyles.fontFamily,
      fontSize: 15,
      color: commonStyles.colors.subtext,
      marginBottom: 10,
    },
    logoutIcon: {
      margin: 10,
      marginBottom: 10,
    },
  });

  const getColor = () => {
    switch (props.activeItemKey) {
      case 'Today':
        return commonStyles.colors.today;
      case 'Tomorrow':
        return commonStyles.colors.tomorrow;

      case 'Week':
        return commonStyles.colors.week;

      default:
        return commonStyles.colors.mounth;
    }
  };
  const logout = () => {
    delete axios.defaults.headers.common.Authorization;
    asyncStore.removeItem('userData');
    props.navigation.navigate('AuthOfApp');
  };

  return (
    <ScrollView>
      <View>
        <View style={styles.header}>
          <Text style={styles.title}>Tasks</Text>
          <Gravatar
            style={styles.avatar}
            options={{
              email: props.navigation.getParam('email'),
              secure: true,
            }}
          />
          <View style={styles.userInfo}>
            <Text style={styles.name}>{props.navigation.getParam('name')}</Text>
            <Text style={styles.email}>
              {props.navigation.getParam('email')}
            </Text>
          </View>
          <TouchableOpacity onPress={() => logout()}>
            <View style={styles.logoutIcon}>
              <Icon name="sign-out" size={30} color="#800" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <DrawerItems {...props} />
    </ScrollView>
  );
};
