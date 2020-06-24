/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  Platform,
  Alert,
} from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';
import Icon from 'react-native-vector-icons/FontAwesome';
import commonStyles from '../commonStyles';
import Task from '../components/Task';
import AddTask from './AddTask';
import asyncStorage from '@react-native-community/async-storage';
import {server, showError} from '../common';
import Axios from 'axios';
import {dateCompare} from '../components/DateCompare';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AddButton from '../components/AddButton';

import TodayImage from '../../assets/assets/imgs/today.jpg';
import TomorrowImage from '../../assets/assets/imgs/tomorrow.jpg';
import WeekImage from '../../assets/assets/imgs/week.jpg';
import MounthImage from '../../assets/assets/imgs/month.jpg';

const initialState = {
  showDoneTasks: true,
  visibleTask: [],
  showAddTask: false,
  tasks: [],
};

class TaskList extends Component {
  state = {...initialState};
  componentDidMount = async () => {
    const stateString = await asyncStorage.getItem('Taskstate');
    const state = JSON.parse(stateString) || initialState;
    this.setState({showDoneTasks: this.state.showDoneTasks}, this.filterTasks);
    this.filterTasks();
    this.loadTasks();
  };
  pedding = task => task.doneAt === null;
  ocult = task => task.doneAt !== null;

  filterTasks = () => {
    let visibleTask = null;
    if (this.state.showDoneTasks) {
      visibleTask = [...this.state.tasks];
    } else {
      visibleTask = this.state.tasks.filter(this.pedding);
    }
    this.setState({visibleTask});
    asyncStorage.setItem(
      'Taskstate',
      JSON.stringify({
        showDoneTasks: this.state.showDoneTasks,
      }),
    );
  };
  toggleFilter = () => {
    this.setState({showDoneTasks: !this.state.showDoneTasks}, this.filterTasks);
  };

  loadTasks = async () => {
    try {
      const maxDate = moment()
        .add({day: this.props.dayAhead})
        .format('YYYY-MM-DD');

      const res = await Axios.get(`${server}tasks?date=${maxDate}`);

      this.setState(
        {tasks: dateCompare(res, maxDate, this.props.title)},
        this.filterTasks,
      );
    } catch (error) {
      showError(error.response.data);
    }
  };

  toggleTask = async taskID => {
    try {
      await Axios.put(`${server}tasks/${taskID}/Toggle`);
      await this.loadTasks();
    } catch (error) {
      showError({error});
    }
  };
  deleteTask = async id => {
    try {
      await Axios.delete(`${server}tasks/${id}`);
      await this.loadTasks();
    } catch (error) {
      showError(error);
    }
  };

  addTask = async newTask => {
    if (!newTask.desc || !newTask.desc.trim()) {
      Alert.alert('Dadps Invalidos', 'descrição nao informada');
      return;
    }
    try {
      await Axios.post(`${server}tasks`, {
        desc: newTask.desc,
        estimateAt: newTask.estimateAt,
      });

      this.setState({showAddTask: false}, this.loadTasks);
    } catch (error) {
      showError(error);
    }
  };

  getImage = () => {
    switch (this.props.dayAhead) {
      case 0:
        return TodayImage;
      case 1:
        return TomorrowImage;

      case 7:
        return WeekImage;

      default:
        return MounthImage;
    }
  };

  render() {
    const today = moment()
      .locale('pt-br')
      .format('dddd,D [de] MMMM');
    return (
      <View style={styles.container}>
        <AddTask
          isVisible={this.state.showAddTask}
          onCancel={() => this.setState({showAddTask: false})}
          onSave={this.addTask}
        />
        <ImageBackground style={styles.backgroud} source={this.getImage()}>
          <View style={styles.iconBar}>
            <TouchableOpacity
              onPress={() => this.props.navigation.openDrawer()}
              style={[{alignItems: 'center'}]}>
              <Icon
                size={20}
                color={commonStyles.colors.secondary}
                name={'bars'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.toggleFilter}
              style={{alignItems: 'center'}}>
              <Icon
                size={20}
                color={commonStyles.colors.secondary}
                name={!this.state.showDoneTasks ? 'eye-slash' : 'eye'}
              />
              <Text style={{color: commonStyles.colors.secondary}}>
                {!this.state.showDoneTasks
                  ? this.state.tasks.filter(this.ocult).length
                  : null}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.titleBar}>
            <Text style={styles.title}>{this.props.title}</Text>
            <Text style={styles.subtitle}>{today}</Text>
          </View>
        </ImageBackground>
        <View style={styles.taskList}>
          <FlatList
            data={this.state.visibleTask}
            renderItem={({item}) => (
              <Task
                {...item}
                ontoggleTask={() => this.toggleTask(item._id)}
                onDelete={() => this.deleteTask(item._id)}
              />
            )}
            keyExtractor={item => `${item._id}`}
          />
        </View>
        <AddButton
          ShowAddTasks={() => this.setState({showAddTask: true})}
          dayAhead={this.props.dayAhead}
        />
      </View>
    );
  }
}

export default TaskList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroud: {
    flex: 3,
  },
  taskList: {
    flex: 7,
  },
  titleBar: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  title: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 50,
    marginLeft: 20,
    marginBottom: 20,
  },
  subtitle: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 30,
  },
  iconBar: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-between',
    marginTop: Platform.OS === 'ios' ? 40 : 10,
  },
});
