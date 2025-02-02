# Insights Chrome

The "wrapper" around your application!

Insights Chrome provides:

- Standard header and navigation
- Base CSS/style
- A JavaScript library for interacting with Insights Chrome

For more detailed information about chrome and what it provides, [look through the detailed documentation](https://github.com/redhatinsights/insights-chrome/tree/master/docs).

## Beta usage

You can include/use chrome in your development project by running the [insights-proxy](https://github.com/RedHatInsights/insights-proxy) in front of your application and using the following HTML template.

```html
<!doctype html>
<html>
  <head>
    <!-- your own HEAD tags -->
    <esi:include src="/@@env/chrome/snippets/head.html" />
  </head>
  <body>
    <esi:include src="/@@env/chrome/snippets/body.html"/>
  </body>
</html>
```

Then, render your application to the "root" element. With React, for instance:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import getBaseName from './Utilities/getBaseName';

ReactDOM.render(
    <Router basename={ getBaseName(window.location.pathname) }>
        <App />
    </Router>,

    document.getElementById('root')
);
```

## Javascript API

Insights Chrome comes with a Javacript API that allows applications to control navigation, global filters, etc.

```js
    // initialize chrome
    insights.chrome.init();

    // identify yourself (the application). This tells Chrome which global navigation element should be active
    insights.chrome.identifyApp('advisor');
```

## Running the build

There is numerous of task for building this application. You can run individual tasks or run them in batch to build the
entire app or to watch files.

### Individual tasks

To run each task you have to first install dependencies `npm install` and then you are free to use any task as you wish.
If you want to watch file changes for each build just pass `-- -w` to specific task (this is not applicable to
`npm run build:js:watch` because it's somewhat specific).

1. Building of styles

    ```bash
    > npm run build:sass
    ```

2. Building of javascripts

    ```bash
    > npm run build:js
    ```

3. Building of javascripts and watching files when they change

    ```bash
    > npm run watch:js
    ```

4. Building of HTML partials

    ```bash
    > npm run build:pug
    ```

5. Running tests

    ```bash
    > npm run test
    ```

### Specific tasks

1. Run build of whole application just once

    ```bash
    > npm run build
    ```

2. Watching file changes and trigger build every time something changes

    ```bash
    > npm run start
    ```

## Running chrome locally

1. Install all dependencies

    ```bash
    > npm install
    ```

2. Run dev command in watch mode

    ```bash
    > npm run dev
    ```

3. Open browser at `https://stage.foo.redhat.com:1337/`.

Where `SPANDX_CONFIG` can be any config for your application (here is an example for [insights-frontend-starter-app](https://github.com/RedHatInsights/insights-frontend-starter-app)), just make sure your application is running `npm start` in said application.

After permorming these tasks you can access `ci.foo.redhat.com:1337/{bundle}/{app}`, where bundle and app are defined in your `local-frontend.js` and observe changes as you save them.

### Shape of SPANDX_CONFIG

You can have custom spandx config with all frontend apps specified if you want to, the `.js` file just have to export `routes` object with at least 2 paths

`Example local-frontend.js file` (aka spandx config)

```js
/*global module*/

const SECTION = 'insights';
const APP_ID = 'starter';
const FRONTEND_PORT = 8002;
const routes = {};

routes[`/beta/${SECTION}/${APP_ID}`] = { host: `https://localhost:${FRONTEND_PORT}` };
routes[`/${SECTION}/${APP_ID}`]      = { host: `https://localhost:${FRONTEND_PORT}` };
routes[`/beta/apps/${APP_ID}`]       = { host: `https://localhost:${FRONTEND_PORT}` };
routes[`/apps/${APP_ID}`]            = { host: `https://localhost:${FRONTEND_PORT}` };

module.exports = { routes };
```

## LocalStorage Debugging

There are some localStorage values for you to enable debuging information or enable some values that are in experimental state. If you want to enable them call `const iqe = insights.chrome.enable.iqe()` for instance to enable such service. This function will return callback to disable such feature so calling `iqe()` will remove such item from localStorage.

Available function:

- `iqe` - to enable some iqe functions for QE purposes
- `invTags` - to enable experimental tags in inventory
- `jwtDebug` - to enable debugging of JWT
- `remediationsDebug` - to enable debug buttons in remediations app
- `shortSession` - to enable short session in order to test automatic logouts
- `forcePendo` - to force Pendo initializtion
- `appFilter` - to enable new application filter in any environment

## Futher reading

More detailed documentation can be found in the [docs section](https://github.com/redhatinsights/insights-chrome/tree/master/docs)
