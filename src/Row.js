// @flow

import React from 'react';
import { View } from 'react-native';

type Props = {
  info: {
    item: any,
    index: number,
  },
  children?: ReactElement<any>,
  style?: any,
};

class Row extends React.Component {
  props: Props;

  renderColumn = (child: ReactElement<any>, index: number) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        ...this.props.info,
        key: index,
      });
    }
    return null;
  }

  render() {
    const columns = React.Children.map(this.props.children, this.renderColumn);

    if (columns == null) {
      return null;
    }
    if (columns.length === 1) {
      return columns[0];
    }
    return (
      <View style={[styles.row, this.props.style]}>
        {columns}
      </View>
    );
  }
}

const styles = {
  row: {
    paddingHorizontal: 15,
    flexDirection: 'row',
  },
};

export default Row;
