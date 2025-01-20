/**
 * Originally reimplementation of React Native Screens for React NativeScript.
 * @see https://github.com/software-mansion/react-native-screens/blob/73959abc975b5718e683d39f1452ec0bb4d5f475/native-stack/navigators/createNativeStackNavigator.tsx
 *
 * Now (with the React Navigation version update) also based on these files (and of course our Tab Navigators):
 * @see https://github.com/react-navigation/react-navigation/blob/a35ac813b6b0816cef93b54792f2164f9b82d55e/packages/stack/src/navigators/createStackNavigator.tsx
 * @see https://github.com/react-navigation/react-navigation/blob/a35ac813b6b0816cef93b54792f2164f9b82d55e/packages/stack/src/types.tsx
 */
import * as React from 'react';
import { useNavigationBuilder, createNavigatorFactory, StackRouter, StackActions, } from '@react-navigation/core';
import { screensEnabled } from '../../react-nativescript-screens/screens';
import FrameNavigatorView from '../views/FrameNavigatorView';
function NativeStackNavigator(props) {
    if (!screensEnabled()) {
        throw new Error('Native stack is only available if React NativeScript Screens is enabled.');
    }
    const { initialRouteName, children, screenOptions } = props, rest = __rest(props, ["initialRouteName", "children", "screenOptions"]);
    const { state, descriptors, navigation } = useNavigationBuilder(StackRouter, {
        initialRouteName,
        children,
        screenOptions,
    });
    React.useEffect(() => navigation.addListener &&
        navigation.addListener('tabPress', (e) => {
            const isFocused = navigation.isFocused();
            // Run the operation in the next frame so we're sure all listeners have been run
            // This is necessary to know if preventDefault() has been called
            requestAnimationFrame(() => {
                if (state.index > 0 &&
                    isFocused &&
                    !e.defaultPrevented) {
                    // When user taps on already focused tab and we're inside the tab,
                    // reset the stack to replicate native behaviour
                    navigation.dispatch(Object.assign(Object.assign({}, StackActions.popToTop()), { target: state.key }));
                }
            });
        }), [navigation, state.index, state.key]);
    return (React.createElement(FrameNavigatorView, Object.assign({}, rest, { state: state, navigation: navigation, descriptors: descriptors })));
}
export default createNavigatorFactory(NativeStackNavigator);
//# sourceMappingURL=createNativeStackNavigator.js.map