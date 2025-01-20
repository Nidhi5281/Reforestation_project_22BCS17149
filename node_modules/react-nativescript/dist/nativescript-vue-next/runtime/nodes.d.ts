import { NSVViewMeta } from './registry';
import { ELEMENT_REF } from './runtimeHelpers';
import { ViewBase, Style, EventData } from '@nativescript/core';
export declare const enum NSVNodeTypes {
    TEXT = "text",
    ELEMENT = "element",
    COMMENT = "comment",
    ROOT = "root"
}
export declare const enum NSVViewFlags {
    NONE = 0,
    SKIP_ADD_TO_DOM = 1,
    CONTENT_VIEW = 2,
    LAYOUT_VIEW = 4,
    NO_CHILDREN = 8
}
export interface INSVNode {
    /**
     * Used to give a hint to nodeOps about how this node should be appended into its parent.
     * Relevant for cases such as RadSideDrawer, which have 'mainContent' and 'drawerContent'.
     */
    nodeRole?: string;
    nodeId: number;
    nodeType: NSVNodeTypes;
    text: string | undefined;
    parentNode: INSVElement | null;
    childNodes: INSVNode[];
    firstChild: INSVNode | null;
    lastChild: INSVNode | null;
    prevSibling: INSVNode | null;
    nextSibling: INSVNode | null;
}
export interface INSVElement<T extends ViewBase = any> extends INSVNode {
    tagName: string;
    meta: NSVViewMeta;
    style: Style | string;
    eventListeners: Map<string, (args: EventData) => void>;
    addEventListener(event: string, handler: any, options?: AddEventListenerOptions): void;
    removeEventListener(event: string, handler?: any): void;
    dispatchEvent(event: string): void;
    nativeView: (T) & {
        [ELEMENT_REF]: INSVElement<T>;
    };
    getAttribute(name: string): unknown;
    setAttribute(name: string, value: unknown): void;
    removeAttribute(name: string): void;
    insertBefore(el: INSVNode, anchor?: INSVNode | null): void;
    appendChild(el: INSVNode): void;
    removeChild(el: INSVNode): void;
}
export declare abstract class NSVNode implements INSVNode {
    protected constructor(nodeType: NSVNodeTypes);
    nodeRole?: string;
    nodeId: number;
    nodeType: NSVNodeTypes;
    protected _text: string | undefined;
    get text(): string | undefined;
    set text(t: string | undefined);
    parentNode: INSVElement | null;
    childNodes: INSVNode[];
    nextSibling: INSVNode | null;
    prevSibling: INSVNode | null;
    get firstChild(): INSVNode;
    get lastChild(): INSVNode;
    toString(): string;
}
export declare class NSVElement<T extends ViewBase = ViewBase> extends NSVNode implements INSVElement {
    private readonly _tagName;
    private readonly _nativeView;
    private _meta;
    constructor(tagName: string);
    get tagName(): string;
    get nativeView(): T;
    get style(): Style | string;
    set style(inlineStyle: Style | string);
    get text(): string | undefined;
    set text(t: string | undefined);
    get meta(): NSVViewMeta;
    /**
     * We keep references to the event listeners so that the RNS HostConfig can remove any attached event listener if it needs to replace it.
     */
    private _eventListeners?;
    get eventListeners(): Map<string, (args: EventData) => void>;
    addEventListener(event: string, handler: any, options?: AddEventListenerOptions): void;
    removeEventListener(event: string, handler?: any): void;
    dispatchEvent(event: string): void;
    getAttribute(name: string): unknown;
    setAttribute(name: string, value: unknown): void;
    removeAttribute(name: string): void;
    insertBefore(el: INSVNode, anchor?: INSVNode | null): void;
    appendChild(el: INSVNode): void;
    removeChild(el: INSVNode): void;
    private addChild;
    updateText(): void;
    toString(): string;
}
export declare class NSVComment extends NSVNode {
    constructor(text: string);
    toString(): string;
}
export declare class NSVText extends NSVNode {
    constructor(text: string);
    toString(): string;
}
export declare class NSVRoot<T extends ViewBase = ViewBase> extends NSVNode {
    baseRef?: NSVElement<T>;
    constructor();
    setBaseRef(el: INSVNode | null): void;
    toString(): string;
}
