import { AppRegistry } from 'react-native';
import App from './App';

// Native owns the application navigation stack. This registry is intentionally
// a feature entry point so the same JS runtime can host more RN roots later.
AppRegistry.registerComponent('OdyAppFeature', () => App);
