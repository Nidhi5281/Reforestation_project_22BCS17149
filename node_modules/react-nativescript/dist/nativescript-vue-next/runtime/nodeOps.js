import { NSVComment, NSVElement, NSVRoot, NSVText } from './nodes';
/**
 * An implementation of RendererOptions from '@vue/runtime-core'.
 * @see https://github.com/vuejs/vue-next/blob/e56d33edb1d42b4957a28538cd8d6302685072ac/packages/runtime-core/src/renderer.ts#L83
 */
export const nodeOps = {
    createRoot() {
        return new NSVRoot();
    },
    createComment(text) {
        return new NSVComment(text);
    },
    createElement(type, isSVG = false) {
        return new NSVElement(type);
    },
    createText(text) {
        return new NSVText(text);
    },
    nextSibling(node) {
        return node.nextSibling;
    },
    parentNode(node) {
        return node.parentNode;
    },
    insert(child, parent, anchor = null) {
        if (anchor !== null) {
            parent.insertBefore(child, anchor);
        }
        else {
            parent.appendChild(child);
        }
    },
    remove(el) {
        if (el.parentNode != null) {
            el.parentNode.removeChild(el);
        }
    },
    setElementText(node, text) {
        node.text = text;
    },
    setText(node, text) {
        node.text = text;
    },
    setScopeId(el, id) {
        el.setAttribute(id, '');
    }
};
// TODO: patchProp() as separate function
//# sourceMappingURL=nodeOps.js.map