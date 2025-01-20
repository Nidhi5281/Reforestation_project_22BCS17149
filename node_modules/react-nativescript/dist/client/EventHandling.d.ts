import { GestureTypes, Observable, EventData } from "@nativescript/core";
declare type GenericListener = (data: EventData) => void;
export declare function updateListener<T extends Observable>(node: T, eventName: string | GestureTypes, currentListener: GenericListener | undefined, incomingListener: GenericListener | undefined, eventLogName?: string): void;
export {};
