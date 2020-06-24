import {Alert, Platform} from 'react-native';

const server =
  Platform.OS === 'android'
    ? 'http://192.168.1.103:3000/'
    : 'http://10.0.2.2:3000';

function showError(err) {
  console.log(err);

  Alert.alert('Ocorreu um problema!', `Mensagem: ${err}`);
}
function showSuccess(msg) {
  Alert.alert('sucessos!', `Mensagem: ${msg}`);
}

export {server, showError, showSuccess};
