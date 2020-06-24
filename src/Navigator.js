import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import Auth from './screens/auth';
import TaskList from './screens/TaskList';
// import {createDrawerNavigator} from 'react-navigation-drawer';
import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import Menu from './screens/Menu';
import commonStyles from './commonStyles';
import authOrApp from './screens/AuthOfApp';

const menuConfig = {
  initialRouteName: 'Today',
  contentComponent: Menu,
  contentOptions: {
    labelStyle: {
      fontFamily: commonStyles.fontFamily,
      fontWeight: 'normal',
      fontSize: 20,
    },
    activeLabelStyle: {
      color: '#080',
      fontWeight: 'bold',
    },
  },
};

const menuRoutes = {
  Today: {
    name: 'Today',
    screen: props => <TaskList title="Hoje" dayAhead={0} {...props} />,
    navigationOptions: {
      title: 'Hoje',
    },
  },
  Tomorrow: {
    name: 'Tomorrow',
    screen: props => <TaskList title="Amanhã" dayAhead={1} {...props} />,
    navigationOptions: {
      title: 'Amanhã',
    },
  },
  Week: {
    name: 'Week',
    screen: props => <TaskList title="Semana" dayAhead={7} {...props} />,
    navigationOptions: {
      title: 'Semana',
    },
  },
  Mouth: {
    name: 'Mês',
    screen: props => <TaskList title="Mês" dayAhead={30} {...props} />,
    navigationOptions: {
      title: 'Mês',
    },
  },
};
const menuNavigator = createDrawerNavigator(menuRoutes, menuConfig);

const mainRoutes = {
  AuthOfApp: {
    name: 'AuthOfApp',
    screen: authOrApp,
  },
  Auth: {
    name: 'Auth',
    screen: Auth,
  },
  Home: {
    name: 'Home',
    screen: menuNavigator,
  },
};

const MainNavigator = createSwitchNavigator(mainRoutes, {
  initialRouteName: 'AuthOfApp',
});

const t = createAppContainer(MainNavigator);

export default t;
console.disableYellowBox = true;
