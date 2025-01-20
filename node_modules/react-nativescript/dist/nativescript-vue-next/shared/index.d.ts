import { Trace } from '@nativescript/core';
declare type DebugCategory = string | typeof Trace.categories;
export declare function debug(s: any, category?: DebugCategory): void;
export declare const isOn: (key: string) => boolean;
export {};
