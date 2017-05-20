import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { SQUAD_COLUMNS } from 'shared/constants/table';
import { getSquads } from 'shared/utils/apiHelper';
import IndexTable from 'shared/components/indexTable/indexTable';

export default class SquadsTable extends Component {
  state = {
    squads: [],
    loggedIn: true
  }

  componentDidMount() {
    getSquads().then((data) => {
      this.setState({ squads: data });
    }).catch(this.setFetchError);
  }

  setFetchError = (err) => {
    const response = err.response;
    // The 500 means you the user is not a mentor, should
    // update that later
    if (response.status === 401 || response.status === 500) {
      this.setState({ loggedIn: false });
    }
  }

  rowClickHandler = (state, rowInfo) => ({
    onClick: () => {
      console.log('It was in this row:', rowInfo);
    }
  })

  render() {
    const { loggedIn, squads } = this.state;
    if (!loggedIn) {
      return <Redirect to="/login" />;
    }

    return (
      <IndexTable
        heading="Squads"
        data={squads}
        columns={SQUAD_COLUMNS}
        onRowClick={this.rowClickHandler}
      />
    );
  }
}