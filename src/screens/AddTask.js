import React from 'react';
import {
  Modal,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  Text,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import 'moment/locale/pt-br';
import commonStyles from '../commonStyles';

const initialState = {desc: '', date: new Date(), showDatePicker: false};
export default class AddTask extends React.Component {
  state = {...initialState};

  DateTimePicker = () => {
    let datePicker = (
      <DateTimePicker
        mode="date"
        value={this.state.date}
        onChange={(_, date) =>
          this.setState({
            date,
            showDatePicker: false,
          })
        }
      />
    );
    const dateString = moment(this.state.date).format(
      'dddd D [de] MMMM [de] YYYY',
    );
    if (Platform.OS === 'android') {
      datePicker = (
        <View>
          <TouchableOpacity
            onPress={() => this.setState({showDatePicker: true})}>
            <Text style={styles.date}>{dateString}</Text>
          </TouchableOpacity>
          {this.state.showDatePicker && datePicker}
        </View>
      );
    }
    return datePicker;
  };

  save = () => {
    const newTask = {
      desc: this.state.desc,
      estimateAt: moment(this.state.date).format('YYYY-MM-DD'),
    };

    this.props.onSave && this.props.onSave(newTask);
    this.setState({...initialState});
  };
  render() {
    return (
      <Modal
        transparent={true}
        visible={this.props.isVisible}
        onRequestClose={this.props.onCancel}
        animationType="slide">
        <TouchableWithoutFeedback onPress={this.props.onCancel}>
          <View style={styles.overLay} />
        </TouchableWithoutFeedback>
        <View style={styles.container}>
          <Text style={styles.header}> Nova Tarefa</Text>
          <TextInput
            style={styles.input}
            placeholder="Descrição!!"
            value={this.state.desc}
            onChangeText={desc => this.setState({desc})}
          />
          {this.DateTimePicker()}
          <View style={styles.buttons}>
            <TouchableOpacity onPress={this.props.onCancel}>
              <Text style={styles.button}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.save}>
              <Text style={styles.button}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={this.props.onCancel}>
          <View style={styles.overLay} />
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  overLay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.7)',
  },
  container: {
    backgroundColor: '#FFF',
  },
  header: {
    fontFamily: commonStyles.fontFamily,
    backgroundColor: commonStyles.colors.today,
    color: commonStyles.colors.secondary,
    textAlign: 'center',
    padding: 15,
    fontSize: 15,
  },
  input: {
    fontFamily: commonStyles.fontFamily,
    height: 40,
    margin: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#e3e3e3',
    borderRadius: 6,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    margin: 20,
    marginRight: 30,
    color: commonStyles.colors.today,
  },
  date: {
    fontFamily: commonStyles.fontFamily,
    fontSize: 20,
    marginLeft: 15,
  },
});
