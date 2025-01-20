/**
 * A reimplementation of React Native Screens for React NativeScript.
 * @see https://github.com/software-mansion/react-native-screens/blob/73959abc975b5718e683d39f1452ec0bb4d5f475/src/screens.native.js
 */
import * as React from 'react';
import { PropsWithChildren } from 'react';
import { RNSStyle, PageAttributes, FlexboxLayoutAttributes, NavigationButtonAttributes, ActionBarAttributes, ActionItemAttributes } from "react-nativescript";
import { NavigatedData, Color } from "@nativescript/core";
declare type NativeSyntheticEvent<T> = any;
declare type NativeTouchEvent = any;
export declare function enableScreens(shouldEnableScreens?: boolean): void;
export declare function screensEnabled(): boolean;
export declare type StackPresentationTypes = 'push' | 'modal' | 'transparentModal' | 'fullScreenModal' | 'formSheet';
export declare type StackAnimationTypes = 'default' | 'fade' | 'flip' | 'none';
export interface ScreenProps extends PageAttributes {
    active?: 0 | 1;
    onComponentRef?: (view: any) => void;
    children?: React.ReactNode;
    /**
     *@description A callback that gets called when this screen begins to be dismissed by hardware back (on Android) or dismiss gesture (swipe back or down).
     */
    onWillDisappear?: (args: NavigatedData) => void;
    /**
     *@description A callback that gets called when this screen disappears completely.
     */
    onDidDisappear?: (args: NavigatedData) => void;
    /**
     *@description A callback that gets called when this screen begins to be appear.
     */
    onWillAppear?: (args: NavigatedData) => void;
    /**
     *@description A callback that gets called when this screen appears completely.
     */
    onDidAppear?: (args: NavigatedData) => void;
    /**
     * @type "push" – the new screen will be pushed onto a stack which on iOS means that the default animation will be slide from the side, the animation on Android may vary depending on the OS version and theme.
     * @type "modal" – the new screen will be presented modally. In addition this allow for a nested stack to be rendered inside such screens
     * @type "transparentModal" – the new screen will be presented modally but in addition the second to last screen will remain attached to the stack container such that if the top screen is non opaque the content below can still be seen. If "modal" is used instead the below screen will get unmounted as soon as the transition ends.
     */
    stackPresentation: StackPresentationTypes;
    /**
     *@description Allows for the customization of how the given screen should appear/dissapear when pushed or popped at the top of the stack. The followin values are currently supported:
     *  @type "default" – uses a platform default animation
     *  @type "fade" – fades screen in or out
     *  @type "flip" – flips the screen, requires stackPresentation: "modal" (iOS only)
     *  @type "none" – the screen appears/dissapears without an animation
     */
    stackAnimation?: StackAnimationTypes;
    /**
     * @description When set to false the back swipe gesture will be disabled when the parent Screen is on top of the stack. The default value is true.
     */
    gestureEnabled?: boolean;
    style?: RNSStyle;
}
export declare type ScreenContainerProps = FlexboxLayoutAttributes;
export interface ScreenStackProps extends FlexboxLayoutAttributes {
    transitioning?: number;
    progress?: number;
    /**
     * @description A callback that gets called when the current screen finishes its transition.
     */
    onFinishTransitioning?: (e: NativeSyntheticEvent<NativeTouchEvent>) => void;
}
export interface ScreenStackHeaderConfigProps extends FlexboxLayoutAttributes {
    /**
     *@description String that representing screen title that will get rendered in the middle section of the header. On iOS the title is centered on the header while on Android it is aligned to the left and placed next to back button (if one is present).
     */
    title?: string;
    /**
     *@description When set to true the header will be hidden while the parent Screen is on the top of the stack. The default value is false.
     */
    hidden?: boolean;
    /**
     *@description Controls the color of items rendered on the header. This includes back icon, back text (iOS only) and title text. If you want the title to have different color use titleColor property.
     */
    color?: string;
    /**
     *@description Customize font family to be used for the title.
     */
    titleFontFamily?: string;
    /**
     *@description Customize the size of the font to be used for the title.
     */
    titleFontSize?: number;
    /**
     *@description Allows for setting text color of the title.
     */
    titleColor?: string;
    /**
     *@description Controls the color of the navigation header.
     */
    backgroundColor?: string;
    /**
     * @description Boolean that allows for disabling drop shadow under navigation header. The default value is true.
     */
    hideShadow?: boolean;
    /**
     * @description If set to true the back button will not be rendered as a part of navigation header.
     */
    hideBackButton?: boolean;
    /**
     * @description Whether to show the back button with a custom left side of the header.
     */
    backButtonInCustomView?: boolean;
    /**
     * @host (iOS only)
     * @description When set to true, it makes native navigation bar on iOS semi transparent with blur effect. It is a common way of presenting navigation bar introduced in iOS 11. The default value is false
     */
    translucent?: boolean;
    /**
     * @host (iOS only)
     * @description Allows for controlling the string to be rendered next to back button. By default iOS uses the title of the previous screen.
     */
    backTitle?: string;
    /**
     * @host (iOS only)
     * @description Allows for customizing font family to be used for back button title on iOS.
     */
    backTitleFontFamily?: string;
    /**
     * @host (iOS only)
     * @description Allows for customizing font size to be used for back button title on iOS.
     */
    backTitleFontSize?: number;
    /**
     * @host (iOS only)
     * @description When set to true it makes the title display using the large title effect.
     */
    largeTitle?: boolean;
    /**
     * @host (iOS only)
     * @description Customize font family to be used for the large title.
     */
    largeTitleFontFamily?: string;
    /**
     * @host (iOS only)
     * @description Customize the size of the font to be used for the large title.
     */
    largeTitleFontSize?: number;
    /**
     *@description Controls the color of the navigation header when the edge of any scrollable content reaches the matching edge of the navigation bar.
     */
    largeTitleBackgroundColor?: string;
    /**
     * @description Boolean that allows for disabling drop shadow under navigation header when the edge of any scrollable content reaches the matching edge of the navigation bar.
     */
    largeTitleHideShadow?: boolean;
    /**
     * @host (iOS only)
     * @description Customize the color to be used for the large title. By default uses the titleColor property.
     */
    largeTitleColor?: string;
    /**
     * Pass HeaderLeft, HeaderRight and HeaderTitle
     */
    children?: React.ReactNode;
}
interface NativeScreenState {
    onscreen: boolean;
}
/**
 * @see https://github.com/software-mansion/react-native-screens/blob/master/src/screens.web.js
 * @see https://docs.nativescript.org/ui/components/page#page-events
 */
export declare class NativeScreen extends React.Component<ScreenProps, NativeScreenState> {
    private readonly ref;
    constructor(props: ScreenProps);
    private readonly onNavigatingFrom;
    private readonly onNavigatingTo;
    private readonly onNavigatedFrom;
    private readonly onNavigatedTo;
    render(): JSX.Element;
}
interface StackHeaderConfigProps extends PropsWithChildren<ActionBarAttributes> {
    style?: RNSStyle;
}
export declare const ScreenStackHeaderConfig: (props: StackHeaderConfigProps) => JSX.Element;
interface ScreenStackHeaderBackButtonImageProps extends PropsWithChildren<NavigationButtonAttributes> {
    style?: RNSStyle;
}
export declare const ScreenStackHeaderBackButtonImage: (props: ScreenStackHeaderBackButtonImageProps) => JSX.Element;
interface ScreenStackHeaderRightViewProps extends PropsWithChildren<ActionItemAttributes> {
    tintColor?: string | Color;
    style?: RNSStyle;
}
export declare const ScreenStackHeaderRightView: (props: ScreenStackHeaderRightViewProps) => JSX.Element;
interface ScreenStackHeaderLeftViewProps extends PropsWithChildren<ActionItemAttributes> {
    tintColor?: string | Color;
    style?: RNSStyle;
}
export declare const ScreenStackHeaderLeftView: (props: ScreenStackHeaderLeftViewProps) => JSX.Element;
interface ScreenStackHeaderCenterViewProps extends PropsWithChildren<FlexboxLayoutAttributes> {
    tintColor?: string | Color;
    style?: RNSStyle;
}
export declare const ScreenStackHeaderCenterView: (props: ScreenStackHeaderCenterViewProps) => JSX.Element;
export declare const Screen: typeof NativeScreen;
export declare const ScreenContainer: React.ElementType<JSX.IntrinsicElements["flexboxLayout"]>;
export declare const NativeScreenContainer: React.ElementType<JSX.IntrinsicElements["flexboxLayout"]>;
export declare const ScreenStack: React.ElementType<JSX.IntrinsicElements["frame"]>;
export {};
