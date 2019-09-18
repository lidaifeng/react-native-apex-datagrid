// @flow

import React from 'react';
import { PageGrid, LineNumbers } from '../../index';
import Profile from './Profile';
import loadRequest from './loadRequest';
import parseResponse from './parseResponse';

class ProfileList extends React.Component {
  render() {
    return (
      <PageGrid
        keyExtractor={(item: Object) => item.id}
        loader={loadRequest}
        parser={parseResponse}
        rowStyle={styles.row}
      >
        <LineNumbers />
        <Profile />
      </PageGrid>
    );
  }
}

const styles = {
  row: {
    paddingHorizontal: 0,
    paddingRight: 15,
  },
};

export default ProfileList;
