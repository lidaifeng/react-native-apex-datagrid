// @flow

import React from 'react';
import { Text } from 'react-native';

class LineNumbers extends React.Component {
  props: {
    index: number,
    style: any,
  };

  shouldComponentUpdate(nextProps: {index: number}) {
    return this.props.index !== nextProps.index;
  }

  render() {
    const { index, style } = this.props;
    return (
      <Text
        style={[styles.lineNumberText, style]}
        numberOfLines={1}
      >
        {index + 1}
      </Text>
    );
  }
}

const styles = {
  lineNumberText: {
    width: 30,
    marginRight: 10,
    textAlign: 'right',
    color: 'rgba(0, 0, 0, 0.3)',
    alignSelf: 'center',
  },
};

export default LineNumbers;
