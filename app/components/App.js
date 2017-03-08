import React, {Component, PropTypes as T} from 'react';
import {render} from 'react-dom';
import {Container} from 'flux/utils';
import ExchangeRateResultStore from '../stores/ExchangeRateResultStore';

class App extends Component {

  constructor() {
    super(...arguments);
  }

  render() {
    return (
      <div>
        hi
      </div>
    );
  }
}

App.propTypes = {
  children: T.object,
};

App.getStores = () => ([
  ExchangeRateResultStore
]);

/*eslint no-unused-vars: 0*/
App.calculateState = (prevState) => {
  return {
    results: ExchangeRateResultStore.getState()
  };
};

export default Container.create(App);


