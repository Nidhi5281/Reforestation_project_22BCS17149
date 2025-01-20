import * as React from 'react';
import * as ReactNativeScript from 'react-nativescript';
import { MainStack } from './components/MainStack';

// Disable development mode
Object.defineProperty(global, '__DEV__', { value: false });

// Initialize the app
ReactNativeScript.start(React.createElement(MainStack, {}, null));