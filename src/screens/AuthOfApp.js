import React, {Component} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import Axios from 'axios';
import asyncStorage from '@react-native-community/async-storage';

class authOrApp extends Component {
  state = {};
  async componentDidMount() {
    const userDataJson = await asyncStorage.getItem('userData');
    let userData = null;
    try {
      userData = JSON.parse(userDataJson);
    } catch (error) {
      console.log('ok');
    }
    if (userData && userData.token) {
      Axios.defaults.headers.common.Authorization = `bearer ${userData.token}`;

      this.props.navigation.navigate('Home', userData);
    } else {
      this.props.navigation.navigate('Auth');
    }
  }
  render() {
    return (
      <View style={styles.constainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

export default authOrApp;
const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});
