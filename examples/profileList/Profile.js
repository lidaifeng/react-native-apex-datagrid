// @flow

import React from 'react';
import { View, Text } from 'react-native';
import type { Profile as ProfileT } from './loadRequest';

class Profile extends React.Component {
  props: {
    item: ProfileT,
  };

  // 实现该方法可以提高列表性能
  shouldComponentUpdate(nextProps: Object) {
    return nextProps.item !== this.props.item;
  }

  render() {
    const { item } = this.props;
    return (
      <View style={styles.profile}>
        <Text>id: {item.id}</Text>
        <Text>name: {item.name}</Text>
        <Text>email: {item.email}</Text>
        <Text>phone: {item.phone}</Text>
      </View>
    );
  }
}

const styles = {
  profile: {
    flex: 1,
    marginTop: 15,
    padding: 10,
    borderLeftWidth: 4,
    borderLeftColor: 'rgb(232, 189, 54)',
    backgroundColor: 'rgb(252, 251, 245)',
  },
};

export default Profile;
