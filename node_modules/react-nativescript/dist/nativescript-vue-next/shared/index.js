import { Trace } from '@nativescript/core';
export function debug(s, category = Trace.categories.Debug) {
    Trace.write(s, category, Trace.messageType.log);
}
export const isOn = (key) => key.startsWith('on');
//# sourceMappingURL=index.js.map