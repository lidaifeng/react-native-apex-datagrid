// @flow

import React from 'react';
import { View, Text, TouchableHighlight, ActivityIndicator } from 'react-native';

class Paging extends React.Component {
  props: {
    loading: boolean,
    fullyLoaded: boolean,
    onNextPage: Function,
    loadMoreText?: string,
    loadingText?: string,
    noMoreText?: string,
    underlayColor?: string,
    style?: any,
  };

  static defaultProps = {
    loadMoreText: '更多...',
    loadingText: '正在加载...',
    noMoreText: '没有更多了',
    underlayColor: '#d3d3d3',
  };

  render() {
    const {
      loading,
      fullyLoaded,
      loadMoreText,
      loadingText,
      noMoreText,
      onNextPage,
      underlayColor,
    } = this.props;
    const pagingMsg = (
      <Text style={styles.message}>
        {fullyLoaded ? noMoreText : loadMoreText}
      </Text>
    );
    const spinner = <Spinner loadingText={loadingText} />;

    return (
      <TouchableHighlight
        disabled={loading || fullyLoaded}
        onPress={onNextPage}
        underlayColor={underlayColor}
      >
        <View style={[styles.paging, this.props.style]}>
          {loading ? spinner : pagingMsg}
        </View>
      </TouchableHighlight>
    );
  }
}

function Spinner(props: {
  loadingText?: string,
}) {
  return (
    <View style={styles.spinner}>
      <ActivityIndicator />
      <Text style={styles.loadingText}>
        {props.loadingText}
      </Text>
    </View>
  );
}

const styles = {
  paging: {
    paddingVertical: 20,
  },
  message: {
    fontSize: 15,
    letterSpacing: 1,
    textAlign: 'center',
  },
  spinner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 14,
    paddingLeft: 5,
  },
};

export default Paging;
