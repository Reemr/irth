/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// Import and set up the Buffer polyfill
import {Buffer} from 'buffer';
global.Buffer = Buffer;

AppRegistry.registerComponent(appName, () => App);
