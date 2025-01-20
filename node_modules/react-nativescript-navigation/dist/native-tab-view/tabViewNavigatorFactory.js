/**
 * Created by following the React Navigation docs.
 * @see https://reactnavigation.org/docs/custom-navigators/
 */
import * as React from 'react';
import { createNavigatorFactory, useNavigationBuilder, TabRouter, TabActions, } from '@react-navigation/core';
function TabViewNavigator(_a) {
    var { initialRouteName, backBehavior, children, screenOptions, style } = _a, rest = __rest(_a, ["initialRouteName", "backBehavior", "children", "screenOptions", "style"]);
    const { state, navigation, descriptors } = useNavigationBuilder(TabRouter, {
        initialRouteName,
        backBehavior,
        children,
        screenOptions,
    });
    // console.log(`[TabNavigator] render`);
    return (React.createElement("tabView", Object.assign({}, rest, { style: Object.assign({ width: "100%", height: "100%" }, style), selectedIndex: state.index, 
        // onSelectedIndexChange={(args) => {
        //   console.log(`[Tabs.onSelectedIndexChange] ${args.oldValue} -> ${args.value}`);
        // }}
        /**
         * Firing the navigation event upon onSelectedIndexChanged handles both the case of
         * tapping the target TabStripItem and swiping between TabContentItems.
         *
         * There is also onSelectedIndexChange (the Property change event) which fires afterward.
         * I think either work fine; would have to closely inspect the implementation to say more.
         */
        onSelectedIndexChanged: (args) => {
            // console.log(`[Tabs.onSelectedIndexChanged] ${args.oldIndex} -> ${args.newIndex}`);
            const route = state.routes[args.newIndex];
            const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
            });
            // console.log(`[Tabs.onSelectedIndexChanged] emitted event`, event);
            if (!event.defaultPrevented) {
                navigation.dispatch(Object.assign(Object.assign({}, TabActions.jumpTo(route.name)), { target: state.key }));
            }
        } }), state.routes.map(route => {
        const routeOptions = descriptors[route.key].options;
        return (React.createElement("tabViewItem", { key: route.key, nodeRole: "items", title: routeOptions.title || route.name, iconSource: routeOptions.iconSource }, descriptors[route.key].render()));
    })));
}
export default createNavigatorFactory(TabViewNavigator);
//# sourceMappingURL=tabViewNavigatorFactory.js.map