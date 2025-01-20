import { INSVElement, INSVNode, NSVRoot } from './nodes';
/**
 * An implementation of RendererOptions from '@vue/runtime-core'.
 * @see https://github.com/vuejs/vue-next/blob/e56d33edb1d42b4957a28538cd8d6302685072ac/packages/runtime-core/src/renderer.ts#L83
 */
export declare const nodeOps: {
    readonly createRoot: () => NSVRoot;
    readonly createComment: (text: string) => INSVNode;
    readonly createElement: (type: string, isSVG?: boolean) => INSVElement;
    readonly createText: (text: string) => INSVNode;
    readonly nextSibling: (node: INSVNode) => INSVNode | null;
    readonly parentNode: (node: INSVNode) => INSVElement | null;
    readonly insert: (child: INSVNode, parent: INSVElement, anchor?: INSVNode | null) => void;
    readonly remove: (el: INSVElement) => void;
    readonly setElementText: (node: INSVElement, text: string) => void;
    readonly setText: (node: INSVNode, text: string) => void;
    readonly setScopeId: (el: INSVElement, id: string) => void;
};
export declare type NSVNodeOps = typeof nodeOps;
