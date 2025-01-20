/**
 * A reimplementation of React Native Screens for React NativeScript.
 * @see https://github.com/software-mansion/react-native-screens/blob/73959abc975b5718e683d39f1452ec0bb4d5f475/src/screens.native.js
 */
import * as React from 'react';
let ENABLE_SCREENS = true;
export function enableScreens(shouldEnableScreens = true) {
    ENABLE_SCREENS = shouldEnableScreens;
}
export function screensEnabled() {
    return ENABLE_SCREENS;
}
/**
 * @see https://github.com/software-mansion/react-native-screens/blob/master/src/screens.web.js
 * @see https://docs.nativescript.org/ui/components/page#page-events
 */
export class NativeScreen extends React.Component {
    constructor(props) {
        super(props);
        // Strictly, this is an NSVElement<Page>, but I'm hitting a TSC error – probably a @nativescript/core version mismatch in my dependencies.
        this.ref = React.createRef();
        // 1
        this.onNavigatingFrom = (args) => {
            var _a, _b;
            (_b = (_a = this.props).onWillDisappear) === null || _b === void 0 ? void 0 : _b.call(_a, args); // √
        };
        // 2
        this.onNavigatingTo = (args) => {
            var _a, _b;
            // Checking whether our ref is still populated avoids "Can't perform a React state update on an unmounted component."
            if (this.ref.current) {
                this.setState({ onscreen: true });
            }
            (_b = (_a = this.props).onWillAppear) === null || _b === void 0 ? void 0 : _b.call(_a, args);
        };
        // 3
        this.onNavigatedFrom = (args) => {
            var _a, _b;
            (_b = (_a = this.props).onDidDisappear) === null || _b === void 0 ? void 0 : _b.call(_a, args);
            // Checking whether our ref is still populated avoids "Can't perform a React state update on an unmounted component."
            if (this.ref.current) {
                this.setState({ onscreen: false });
            }
        };
        // 4
        this.onNavigatedTo = (args) => {
            var _a, _b;
            (_b = (_a = this.props).onDidAppear) === null || _b === void 0 ? void 0 : _b.call(_a, args);
        };
        this.state = {
            onscreen: props.active === 1,
        };
    }
    render() {
        const _a = this.props, { active, gestureEnabled, style } = _a, rest = __rest(_a, ["active", "gestureEnabled", "style"]);
        // console.log(`[NativeScreen] ENABLE_SCREENS && !active ${ENABLE_SCREENS && !active}`);
        return (React.createElement("page", Object.assign({ ref: this.ref, enableSwipeBackNavigation: gestureEnabled, onNavigatingTo: this.onNavigatingTo, onNavigatedTo: this.onNavigatedTo, onNavigatedFrom: this.onNavigatedFrom, onNavigatingFrom: this.onNavigatingFrom, style: Object.assign(Object.assign({}, style), (ENABLE_SCREENS && !active && !this.state.onscreen ?
                {
                    visibility: 'collapse' // Because `display: 'none'` doesn't exist in NativeScript
                } :
                {})) }, rest)));
    }
}
const styles = {
    headerSubview: {
    // position: 'absolute',
    // top: 0,
    // right: 0,
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    left: {
    // position: 'absolute',
    // left: 0,
    // top: 0,
    // bottom: 0,
    // justifyContent: 'center',
    // alignItems: 'flex-start',
    },
    right: {
    // position: 'absolute',
    // right: 0,
    // top: 0,
    // bottom: 0,
    // justifyContent: 'center',
    // alignItems: 'flex-end',
    },
    headerCenterView: {
        width: "100%",
        height: "100%",
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
};
export const ScreenStackHeaderConfig = (props) => {
    const { style = {}, } = props;
    return (React.createElement("actionBar", Object.assign({ nodeRole: "actionBar", style: style }, props)));
};
export const ScreenStackHeaderBackButtonImage = (props) => {
    const { style = {}, } = props;
    return (React.createElement("navigationButton", Object.assign({ nodeRole: "navigationButton", style: style }, props)));
};
export const ScreenStackHeaderRightView = (props) => {
    const { tintColor, style = {}, children, } = props;
    return (React.createElement("actionItem", { nodeRole: "actionItems", ios: { position: "right", systemIcon: undefined }, android: { position: "popup", systemIcon: undefined }, style: Object.assign(Object.assign({}, style), { backgroundColor: tintColor }) }, children));
};
export const ScreenStackHeaderLeftView = (props) => {
    const { tintColor, style = {}, children, } = props;
    return (React.createElement("actionItem", { nodeRole: "actionItems", ios: { position: "left", systemIcon: undefined }, 
        // Note: Android does not support actionItems on left, to my understanding.
        android: { position: "popup", systemIcon: undefined }, style: Object.assign(Object.assign({}, style), { backgroundColor: tintColor }) }, children));
};
export const ScreenStackHeaderCenterView = (props) => {
    const { tintColor, style = {}, children, } = props;
    return (React.createElement("flexboxLayout", Object.assign({ nodeRole: "titleView" }, props, { style: Object.assign(Object.assign(Object.assign({}, styles.headerCenterView), style), { backgroundColor: tintColor }) }), children));
};
export const Screen = NativeScreen;
export const ScreenContainer = "flexboxLayout";
export const NativeScreenContainer = "flexboxLayout";
// ScreenStack contains any number of Screen components.
export const ScreenStack = "frame";
//# sourceMappingURL=screens.js.map