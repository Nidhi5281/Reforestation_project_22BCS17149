import { ReactNode, ClassAttributes } from "react";
import { ViewBase, Style } from "@nativescript/core";
import { NSVElement } from "../nativescript-vue-next/runtime/nodes";
/**
 * NativeScript's Style class is rather irregular. It embodies various properties used by:
 * - ViewBase: e.g. 'flexShrink' and 'flexGrow'; yet not 'row', nor 'column', nor 'dock', nor 'left', nor 'top'.
 * - View: e.g. 'height', 'width', 'scaleX' and many more.
 * - LayoutBase: e.g. 'paddingLeft'
 * - FlexboxLayout: e.g. 'flexDirection'
 * ... yet in most cases the typings do not fully match the implementation (the typings typically do not accept
 * string even though the implementation does – in fact, it's key to how NativeScript Core parses XML).
 *
 * Plugins may find need to implement new styles to NativeScript Core (e.g. as YogaLayout does, introducing
 * 'maxWidth' and more), so we expose RNSStyle as an interface rather than a type to allow augmentation of it.
 */
export declare type OptionalStyleAllowingString = {
    [P in keyof Style]?: string | Style[P];
};
export interface RNSStyle extends OptionalStyleAllowingString {
}
export interface NativeScriptAttributes<T extends ViewBase = ViewBase> extends ClassAttributes<NSVElement<T>> {
    nodeRole?: string;
    children?: ReactNode;
    style?: RNSStyle;
}
export declare type NativeScriptProps<P, T extends ViewBase = ViewBase> = NativeScriptAttributes<T> & P;
