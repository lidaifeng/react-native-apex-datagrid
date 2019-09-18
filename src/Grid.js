/* @flow */

import React from 'react';
import { SectionList, View, Text } from 'react-native';
import Row from './Row';
import Paging from './widget/Paging';

class Grid extends React.Component {
  props: {
    data: Array<any>,
    children?: ReactElement<any>,
    rowStyle?: any,
    onNextPage?: Function,
    loading?: boolean,
    fullyLoaded?: boolean,
    autoPaging?: boolean,
    onEndReached?: (info: {distanceFromEnd: number}) => void,
    isClassify?: boolean,
    formatData?: (data: Array<any>) => Array<any>
  };

  static defaultProps = {
    autoPaging: true,
  };

  componentWillMount() {
    if (this.props.autoPaging) {
      this._onEndReached({ distanceFromEnd: 0 });
    }
  }

  _renderItem = (info: Object) => {
    return (
      <Row info={info} style={this.props.rowStyle}>
        {this.props.children}
      </Row>
    );
  }

  _onEndReached = (info: {distanceFromEnd: number}) => {
    const { fullyLoaded, loading, autoPaging, onNextPage, onEndReached } = this.props;
    if (!fullyLoaded && !loading && autoPaging && onNextPage) {
      onNextPage();
    }
    onEndReached && onEndReached(info);
  }

  render() {
    const {
      data,
      onNextPage,
      loading,
      fullyLoaded,
      isClassify,
      formatData,
      ...other
    } = this.props;

    const footerCpt = onNextPage ?
      () => (<Paging
        loading={loading}
        fullyLoaded={fullyLoaded}
        onNextPage={onNextPage}
      />) : null;

    let result = data
    if(isClassify && formatData && data.length){
      result = formatData(data);
    }
    
    return (
      <SectionList
        windowSize={3}
        onEndReachedThreshold={0.01}
        {...other}
        onEndReached={this._onEndReached}
        sections={isClassify ? result : [{data: result,key:''}]}
        renderItem={this._renderItem}
        ListFooterComponent={footerCpt}
      />
    );
  }
}

export default Grid;
