import { NavigationEntry } from "@nativescript/core";
export declare type RNSNavigationOptions = Pick<NavigationEntry, "animated" | "transition" | "transitioniOS" | "transitionAndroid" | "backstackVisible" | "clearHistory">;
declare class RNSNavigationOptionsManager {
    readonly defaultOptions: RNSNavigationOptions;
    private pendingOptions;
    getPendingOptions(): RNSNavigationOptions | null;
    push(options: RNSNavigationOptions | null): void;
    pop(): RNSNavigationOptions | null;
}
export declare const __unstable__forwardNavOpts: RNSNavigationOptionsManager;
export {};
/**
  * TODO: Implement. The goBack() API is a bit more annoying to work with, as it requires you
  * to specify the target BackStackEntry that you're trying to navigate back to.
  *
 */
