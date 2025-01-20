import { ViewBase as TNSViewBase } from '@nativescript/core';
import { NSVElement, NSVViewFlags } from './nodes';
export declare type NSVElementResolver = () => TNSViewBase;
export declare type NSVModelDescriptor = {
    prop: string;
    event: string;
};
export interface NSVViewMeta {
    viewFlags: NSVViewFlags;
    stackDepth?: number;
    nodeOps?: {
        insert(child: NSVElement, parent: NSVElement, atIndex?: number): void;
        remove(child: NSVElement, parent: NSVElement): void;
    };
    model?: NSVModelDescriptor;
    overwriteExisting?: boolean;
}
export interface NSVElementDescriptor {
    meta: NSVViewMeta;
    resolver?: NSVElementResolver;
}
export declare let defaultViewMeta: NSVViewMeta;
export declare function getViewMeta(elementName: string): NSVViewMeta;
export declare function getViewClass(elementName: string): any;
export declare function normalizeElementName(elementName: string): string;
export declare function registerElement(elementName: string, resolver?: NSVElementResolver, meta?: Partial<NSVViewMeta>): void;
export declare function isKnownView(elementName: string): boolean;
