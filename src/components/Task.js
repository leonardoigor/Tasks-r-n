/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import commonStyles from '../commonStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import 'moment/locale/pt-br';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

export default props => {
  const doneOrNotStyle =
    props.doneAt !== null ? {textDecorationLine: 'line-through'} : {};

  const date = props.doneAt ? props.doneAt : props.estimateAt;

  const formattedDate = moment(date)
    .locale('pt-br')
    .format('dddd D [de] MMMM');

  const getRightContent = () => {
    return (
      <TouchableOpacity
        onPress={() => props.onDelete && props.onDelete(props._id)}
        style={styles.right}>
        <Icon name="trash" size={30} color="#fff" />
      </TouchableOpacity>
    );
  };

  const getLeftContent = () => {
    return (
      <View style={styles.left}>
        <Icon name="trash" size={30} color="#fff" style={styles.excludeIcon} />
        <Text style={styles.excludeText}>Excluir</Text>
      </View>
    );
  };

  return (
    <Swipeable
      renderRightActions={getRightContent}
      renderLeftActions={getLeftContent}
      onSwipeableLeftOpen={() => props.onDelete && props.onDelete(props._id)}>
      <View style={[styles.container]}>
        <TouchableWithoutFeedback
          style={{paddingLeft: 20}}
          onPress={() => props.ontoggleTask(props._id)}>
          <View style={styles.checkContainer}>
            {getCheckView(props.doneAt)}
          </View>
        </TouchableWithoutFeedback>
        <View>
          <Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text>
          <Text
            style={[
              styles.date,
              {
                color: props.doneAt
                  ? commonStyles.colors.DateComplete
                  : commonStyles.colors.subtext,
                fontWeight: props.doneAt ? 'bold' : '100',
              },
            ]}>
            {formattedDate}
          </Text>
        </View>
      </View>
    </Swipeable>
  );
};
function getCheckView(doneAt) {
  if (doneAt !== null) {
    return (
      <View style={styles.done}>
        <Icon name="check" size={20} color="#fff" />
      </View>
    );
  } else {
    return <View style={styles.pedding} />;
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderColor: '#AAA',
    borderBottomWidth: 1,
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#FFF',
  },
  checkContainer: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  pedding: {
    height: 25,
    width: 25,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#555',
  },
  done: {
    height: 25,
    width: 25,
    borderRadius: 13,
    borderWidth: 1,
    backgroundColor: '#4D7031',
    justifyContent: 'center',
    alignItems: 'center',
  },
  desc: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.mainText,
    fontSize: 15,
    marginLeft: 10,
  },
  date: {
    fontFamily: commonStyles.fontFamily,
    marginLeft: 10,
    fontSize: 12,
  },
  right: {
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
  },
  left: {
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  excludeText: {
    fontFamily: commonStyles.fontFamily,
    color: '#fff',
    fontSize: 20,
    margin: 10,
  },
  excludeIcon: {
    marginLeft: 10,
  },
});
