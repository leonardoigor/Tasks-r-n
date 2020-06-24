/* eslint-disable no-sparse-arrays */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {ImageBackground, Text, StyleSheet, View} from 'react-native';
import backgroundImage from '../../assets/assets/imgs/login.jpg';
import commonStyles from '../commonStyles';
import AuthInputs from '../components/AuthInputs';
import {server, showError, showSuccess} from '../common';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import Axios from 'axios';
import asyncStorage from '@react-native-community/async-storage';

class Auth extends Component {
  componentDidMount() {
    this.rotationAnime();
  }

  state = {
    email: 'igor_mendonca@outlook.com.br',
    password: '123456',
    name: '',
    comfirmPassword: '',
    stateNew: false,
    entening: false,
    grau: 0,
  };

  signinOrSignup = () => {
    if (this.state.stateNew) {
      this.singnup();
    } else {
      this.singnin();
    }
  };
  singnin = async () => {
    this.setState({entening: true});

    try {
      const res = await Axios.post(`${server}signin`, {
        email: this.state.email,
        password: this.state.password,
      });

      asyncStorage.setItem('userData', JSON.stringify(res.data));

      Axios.defaults.headers.common.Authorization = `bearer ${res.data.token}`;

      this.props.navigation.navigate('Home', res.data);
    } catch (error) {
      showError(error.response.data);
    }
    this.setState({entening: false});
  };
  singnup = async () => {
    this.setState({entening: true});
    Axios.post(`${server}signup`, {
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
      comfirmPassword: this.state.comfirmPassword,
    })
      .then(r => {
        // showSuccess('Usuário cadastrado', r);
        this.setState({stateNew: false});
      })
      .catch(e => showError(e.config));
    this.setState({entening: false});
  };
  rotationAnime = () => {
    let velocity = 800;
    let grau = 0;
    setInterval(() => {
      grau >= 360 ? (grau = 0) : (grau = grau);
      grau++;
      this.setState({grau});
    }, velocity);
  };

  render() {
    const validations = [];
    validations.push(this.state.email && this.state.email.includes('@'));
    validations.push(this.state.password && this.state.password.length >= 6);
    if (this.state.stateNew) {
      validations.push(this.state.comfirmPassword);
      validations.push(this.state.comfirmPassword === this.state.password);
      validations.push(this.state.name && this.state.name.trim().length >= 3);
    }

    const validForm = validations.reduce((t, a) => t && a);

    return (
      <ImageBackground source={backgroundImage} style={styles.background}>
        <Text style={styles.title}>Tasks</Text>
        <View style={styles.formContainer}>
          <Text style={styles.subTitle}>
            {this.state.stateNew ? 'Crie a sua conta' : 'Informe seus dados'}
          </Text>

          {this.state.stateNew && (
            <AuthInputs
              icon="user"
              placeholder="Nome"
              value={this.state.name}
              style={styles.input}
              onChangeText={name => this.setState({name})}
            />
          )}
          <AuthInputs
            icon="at"
            placeholder="E-mail"
            value={this.state.email}
            style={styles.input}
            onChangeText={email => this.setState({email})}
          />

          <AuthInputs
            icon="lock"
            placeholder="Senha"
            value={this.state.password}
            style={styles.input}
            onChangeText={password => this.setState({password})}
            secureTextEntry={true}
          />
          {this.state.stateNew && (
            <AuthInputs
              icon="asterisk"
              placeholder="Confirmar Senha"
              value={this.state.comfirmPassword}
              style={styles.input}
              onChangeText={comfirmPassword => this.setState({comfirmPassword})}
              secureTextEntry={true}
            />
          )}
          <TouchableOpacity onPress={this.signinOrSignup} disabled={!validForm}>
            <View
              style={[
                styles.button,
                validForm ? {} : {backgroundColor: '#AAA'},
              ]}>
              {this.state.entening ? (
                <Icon
                  name="spinner"
                  style={[
                    {color: commonStyles.colors.secondary},
                    {marginRight: 10},
                    {transform: [{rotate: `${this.state.grau} deg`}]},
                  ]}
                />
              ) : (
                false
              )}
              <Text style={styles.buttonText}>
                {this.state.stateNew ? 'Registrar' : 'Entrar'}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{padding: 10}}
            onPress={() => this.setState({stateNew: !this.state.stateNew})}>
            <Text style={styles.buttonText}>
              {this.state.stateNew
                ? 'Já possui conta?'
                : 'Ainda não possui conta?'}
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

export default Auth;
let grau = 0;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 70,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subTitle: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  formContainer: {
    backgroundColor: 'rgba(0,0,0,.8)',
    padding: 20,
    width: '90%',
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#080',
    padding: 10,
    alignItems: 'center',
    borderRadius: 7,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: commonStyles.colors.secondary,
    fontFamily: commonStyles.fontFamily,
    fontWeight: 'bold',
  },
});
