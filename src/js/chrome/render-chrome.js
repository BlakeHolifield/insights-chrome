import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { spinUpStore } from '../redux-config';
import RootApp from '../App/RootApp';
import { isBeta } from '../utils';

import loadRemediations from '../remediations';
import { headerLoader } from '../App/Header';
import { loadModuesSchema } from '../redux/actions';

/**
 * This has to be posponed in order to let shared react modules to initialize
 */
window.insights.loadInventory = () => {
  console.log(
    'Do not use `loadInventory` anymore! We have async inventory https://github.com/RedHatInsights/frontend-components/blob/master/packages/components/src/Inventory/InventoryTable.js '
  );
};
window.insights.experimental.loadRemediations = () => {
  console.log(
    'Do not use `loadRemediations` anymore! We have FED modules for it - https://github.com/RedHatInsights/frontend-components/blob/master/packages/remediations/doc/remediations.md#hot-loading-the-wizard-directly'
  );
  return loadRemediations();
};

const App = () => {
  const modules = useSelector(({ chrome }) => chrome?.modules);
  const scalprumConfig = useSelector(({ chrome }) => chrome?.scalprumConfig);
  const documentTitle = useSelector(({ chrome }) => chrome?.documentTitle);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${window.location.origin}${isBeta() ? '/beta' : ''}/config/chrome/fed-modules.json?ts=${Date.now()}`, {
        headers: {
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
          Expires: '0',
        },
      })
      .then((response) => {
        dispatch(loadModuesSchema(response.data));
      });
  }, []);

  useEffect(() => {
    if (typeof documentTitle === 'string') {
      document.title = `${documentTitle} | console.redhat.com`;
    } else {
      document.title = `console.redhat.com`;
    }
  }, [documentTitle]);

  if (!modules || !scalprumConfig) {
    return null;
  }

  return <RootApp config={scalprumConfig} />;
};

function renderChrome() {
  const { store } = spinUpStore();
  const pageRoot = document.getElementById('chrome-entry');
  if (pageRoot) {
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      pageRoot
    );
  } else if (['landing', undefined].includes(store.getState()?.chrome?.appId)) {
    headerLoader();
  }
}

export default renderChrome;
