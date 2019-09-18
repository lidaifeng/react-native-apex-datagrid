datagrid for react-native
=====

## 概述

[react-native-apex-datagrid](https://github.com/glinjy/react-native-apex-datagrid.git)是一套表格组件库，包含pullrefresh, listpaging, column render等特性。

## 预览

<img src='https://raw.githubusercontent.com/glinjy/react-native-apex-datagrid/master/assets/grid.png' width='320' alt='preview' />

## 使用

如果你只是想用列表渲染你需要的内容：

```js
import React from 'react';
import { View, Text } from 'react-native';
import { Grid } from 'react-native-apex-datagrid';

class GridUsage extends React.Component {
  render() {
    return (
      <Grid data={[1, 2, 3]}>
        <MyColumn />
      </Grid>
    );
  }
}

function MyColumn({ item }: {item: number}) {
  return (
    <View style={styles.column}>
      <Text style={styles.text}>
        {item}
      </Text>
    </View>
  );
}

const styles = {
  column: {
    flex: 1,
    margin: 10,
    backgroundColor: '#333',
  },
  text: {
    fontSize: 20,
    padding: 20,
    color: 'white',
    textAlign: 'center',
  },
};
```

又或者你需要用到分页：

```js
import React from 'react';
import { PageGrid, LineNumbers } from 'react-native-apex-datagrid';

class PageGridUsage extends React.Component {
  render() {
    return (
      <PageGrid
        autoPaging={true}
        loader={loadRequest}
        parser={parseResponse}
      >
        <LineNumbers />
        <YourColumn />
      </PageGrid>
    );
  }
}

function loadRequest(page: number): Promise<Object> {
  // 加载请求
}

function parseResponse(response: Object)
  : { items: Array<any>, total: number } {
  // 返回解析结果，必须符合特定的格式
}

```

- demo请看 [/examples/](https://github.com/glinjy/react-native-apex-datagrid/tree/master/examples/).

## TODO

- 标题栏
- 排序
- 筛选
- 编辑
