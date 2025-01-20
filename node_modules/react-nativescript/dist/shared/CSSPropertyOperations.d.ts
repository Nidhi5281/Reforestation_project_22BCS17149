import { Instance } from "../shared/HostConfigTypes";
import { rnsDeletedPropValue } from "../client/magicValues";
import { RNSStyle } from "../shared/NativeScriptJSXTypings";
export declare type StyleUpdates = {
    [P in keyof RNSStyle]: RNSStyle[P] | typeof rnsDeletedPropValue;
};
/**
 * Sets the value for multiple styles on a node.  If a value is specified as
 * '' (empty string), the corresponding style property will be unset.
 *
 * @param {DOMElement} instance
 * @param {object} styles
 */
export declare function setValueForStyles(instance: Instance, styles: StyleUpdates): void;
