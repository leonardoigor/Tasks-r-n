import React from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import commonStyles from '../commonStyles';

export default props => {
  const getColor = () => {
    switch (props.dayAhead) {
      case 0:
        return commonStyles.colors.today;
      case 1:
        return commonStyles.colors.tomorrow;

      case 7:
        return commonStyles.colors.week;

      default:
        return commonStyles.colors.mounth;
    }
  };
  return (
    <View>
      <TouchableOpacity
        style={[styles.addButton, {backgroundColor: getColor()}]}
        activeOpacity={0.7}
        onPress={props.ShowAddTasks}>
        <Icon name="plus" size={20} color={commonStyles.colors.secondary} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    width: 50,
    height: 50,
    right: 30,
    bottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
});
