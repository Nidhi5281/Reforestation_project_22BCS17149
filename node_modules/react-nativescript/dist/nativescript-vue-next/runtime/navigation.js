class RNSNavigationOptionsManager {
    constructor() {
        this.defaultOptions = {
        // Fall back to NativeScript Core internal defaults.
        };
        this.pendingOptions = null;
    }
    getPendingOptions() {
        return this.pendingOptions;
    }
    push(options) {
        this.pendingOptions = options;
    }
    pop() {
        const pendingOptions = this.pendingOptions;
        this.pendingOptions = null;
        return pendingOptions;
    }
}
export const __unstable__forwardNavOpts = new RNSNavigationOptionsManager();
/**
  * TODO: Implement. The goBack() API is a bit more annoying to work with, as it requires you
  * to specify the target BackStackEntry that you're trying to navigate back to.
  *
 */
// export const backwardNavOpts = new RNSNavigationOptionsManager();
//# sourceMappingURL=navigation.js.map