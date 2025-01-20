/// <reference types="react" />
import { Route } from '@react-navigation/core';
import { FrameNavigationOptions } from '../types';
declare type Props = FrameNavigationOptions & {
    route: Route<string>;
};
export default function HeaderConfig(props: Props): JSX.Element;
export {};
