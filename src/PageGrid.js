// @flow

import React from 'react';
import Grid from './Grid';

type State = {
  data?: Array<any>,
  page: number,
  loading: boolean,
  fullyLoaded: boolean,
  refreshing: boolean,
  error?: ?string,
};

class PageGrid extends React.Component {
  props: {
    data?: Array<any>,
    onDataChange?: (data: Array<any>) => void,
    loader: (page: number) => Promise<Object>,
    parser: (response: Object) => { items: Array<any>, total: number },
    children?: ReactElement<any>,
    autoPaging?: boolean,
    initPage?:number,
    isClassify?: boolean,
    formatData?: (data: Array<any>) => Array<any>
  };

  static defaultProps = {
    autoPaging: true,
    isClassify: false,
  };

  state: State = {
    data: [],
    page: this.props.initPage||0,
    loading: false,
    fullyLoaded: false,
    refreshing: false,
  };

  _isStateful(): boolean {
    return !this.props.data;
  }

  _onDataChange = (data: Array<any>) => {
    if (typeof this.props.onDataChange === 'function') {
      this.props.onDataChange(data);
    }
  }

  loadPage = async (
    page: number,
    processData: (data: Array<any>, items: Array<any>) => Array<any> = appendData,
  ) => {
    const { loader, parser } = this.props;
    try {
      const response = await loader(page);
      const { items, total } = parser(response);

      if (!Array.isArray(items) || total == null) {
        // eslint-disable-next-line
        console.warn('parser方法返回的数据格式错误，正确格式`{ items, total }`');
        return;
      }

      const prevData = this._isStateful() ? this.state.data : this.props.data;
      // $FlowFixMe
      const data = processData(prevData, items);
      const fullyLoaded = data.length === total;
      const nextState: State = {
        page,
        fullyLoaded,
        loading: false,
        refreshing: false,
        error: null,
      };
      if (this._isStateful()) {
        nextState.data = data;
      }
      this.setState(
        nextState,
        () => this._onDataChange(data),
      );
    } catch (err) {
      this.setState({
        loading: false,
        refreshing: false,
        error: err.message || err,
      });
    }
  }

  firstPage = ({
    clear = true,
    changing = 'loading',
  }: {
    clear?: boolean,
    changing?: 'refreshing' | 'loading',
  } = {}) => {
    if (this.state.refreshing || this.state.loading) return;
    const state = { [changing]: true };
    if (clear) {
      // $FlowFixMe
      state.data = [];
    }
    this.setState(state);
    this.loadPage(1, replaceData);
  }

  nextPage = () => {
    if (this.state.fullyLoaded || this.state.loading || this.state.refreshing) return;
    this.setState({ loading: true });
    this.loadPage(this.state.page + 1);
  }

  onRefresh = () => {
    this.firstPage({
      clear: false,
      changing: 'refreshing',
    });
  }

  render() {
    const { children, autoPaging, isClassify, formatData, ...other } = this.props;
    const data = this._isStateful() ? this.state.data : this.props.data;

    return (
      <Grid
        {...other}
        autoPaging={!this.state.error && autoPaging}
        data={data}
        refreshing={this.state.refreshing}
        onRefresh={this.onRefresh}
        onNextPage={this.nextPage}
        loading={this.state.loading}
        fullyLoaded={this.state.fullyLoaded}
        isClassify={isClassify}
        formatData={formatData}
      >
        {children}
      </Grid>
    );
  }
}

function appendData(data = [], items = []) {
  return items.length ? data.concat(items) : data;
}

function replaceData(data = [], items = []) {
  return items;
}

export default PageGrid;
