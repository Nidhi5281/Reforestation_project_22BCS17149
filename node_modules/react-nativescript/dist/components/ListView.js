import * as console from "../shared/Logger";
import * as React from "react";
import { render as RNSRender, unmountComponentAtNode, NSVRoot } from "../index";
/**
 * A React wrapper around the NativeScript ListView component.
 * @see https://docs.nativescript.org/ui/ns-ui-widgets/list-view
 * @module ui/list-view/list-view
 */
export class _ListView extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.argsViewToRootKeyAndRef = new Map();
        this.roots = new Set();
        /**
         * ListView code-behind:
         * @see https://github.com/NativeScript/nativescript-sdk-examples-js/blob/master/app/ns-ui-widgets-category/list-view/code-behind/code-behind-ts-page.ts
         * ListView item templates:
         * @see https://medium.com/@alexander.vakrilov/faster-nativescript-listview-with-multiple-item-templates-8f903a32e48f
         * Cell state in ListView:
         * @see https://medium.com/@alexander.vakrilov/managing-component-state-in-nativescript-listview-b139e45d899b
         * @see https://github.com/NativeScript/nativescript-angular/issues/1245#issuecomment-393465035
         * loadMoreItems:
         * @see https://github.com/NativeScript/nativescript-sdk-examples-js/blob/master/app/ns-ui-widgets-category/list-view/events/events-ts-page.ts
         */
        this.defaultOnItemLoading = (args) => {
            const { logLevel, onCellRecycle, onCellFirstLoad } = this.props._debug;
            const { items, itemTemplateSelector } = this.props;
            const item = _ListView.isItemsSource(items) ? items.getItem(args.index) : items[args.index];
            const template = itemTemplateSelector
                ? typeof itemTemplateSelector === "string"
                    ? itemTemplateSelector
                    : itemTemplateSelector(item, args.index, items)
                : null;
            const cellFactory = template === null
                ? this.props.cellFactory
                : this.props.cellFactories
                    ? this.props.cellFactories.get(template).cellFactory
                    : this.props.cellFactory;
            if (typeof cellFactory === "undefined") {
                console.warn(`ListView: No cell factory found, given template ${template}!`);
                return;
            }
            let view = args.view;
            if (!view) {
                const rootKeyAndRef = this.renderNewRoot(item, cellFactory);
                args.view = rootKeyAndRef.nativeView;
                /* Here we're re-using the ref - I assume this is best practice. If not, we can make a new one on each update instead. */
                this.argsViewToRootKeyAndRef.set(args.view, rootKeyAndRef);
                if (onCellFirstLoad)
                    onCellFirstLoad(rootKeyAndRef.nativeView);
            }
            else {
                console.log(`[ListView] existing view: `, view);
                if (onCellRecycle)
                    onCellRecycle(view);
                const { rootKey, nativeView } = this.argsViewToRootKeyAndRef.get(view);
                if (typeof rootKey === "undefined") {
                    console.error(`Unable to find root key that args.view corresponds to!`, view);
                    return;
                }
                if (!nativeView) {
                    console.error(`Unable to find ref that args.view corresponds to!`, view);
                    return;
                }
                // args.view = null;
                RNSRender(cellFactory(item), null, () => {
                    // console.log(`Rendered into cell! detachedRootRef:`);
                }, rootKey);
            }
        };
        this.renderNewRoot = (item, cellFactory) => {
            const node = this.getNativeView();
            if (!node) {
                throw new Error("Unable to get ref to ListView");
            }
            console.log(`[ListView] no existing view.`);
            const rootKey = `ListView-${node._domId}-${this.roots.size.toString()}`;
            const root = new NSVRoot();
            RNSRender(cellFactory(item), root, () => {
                // console.log(`Rendered into cell! ref:`);
            }, rootKey);
            this.roots.add(rootKey);
            return {
                rootKey,
                nativeView: root.baseRef.nativeView
            };
        };
        this.state = {
            nativeCells: {},
            nativeCellToItemIndex: new Map(),
            itemIndexToNativeCell: props._debug.logLevel === "debug" ? new Map() : undefined,
        };
    }
    getNativeView() {
        const ref = (this.props.forwardedRef || this.myRef);
        return ref.current ? ref.current.nativeView : null;
    }
    componentDidMount() {
        const node = this.getNativeView();
        if (!node) {
            console.warn(`React ref to NativeScript View lost, so unable to set item templates.`);
            return;
        }
        /* NOTE: does not support updating of this.props.cellFactories upon Props update. */
        if (this.props.cellFactories) {
            const itemTemplates = [];
            this.props.cellFactories.forEach((info, key) => {
                const { placeholderItem, cellFactory } = info;
                itemTemplates.push({
                    key,
                    createView: () => {
                        console.log(`[ListView] item template "${key}"`);
                        const rootKeyAndRef = this.renderNewRoot(placeholderItem, cellFactory);
                        this.argsViewToRootKeyAndRef.set(rootKeyAndRef.nativeView, rootKeyAndRef);
                        return rootKeyAndRef.nativeView;
                    },
                });
            });
            node.itemTemplates = itemTemplates;
        }
    }
    componentWillUnmount() {
        this.roots.forEach(root => unmountComponentAtNode(root));
    }
    static isItemsSource(arr) {
        /**
         * Same implementation as used in official ListPicker component:
         * @see https://github.com/NativeScript/NativeScript/blob/b436ecde3605b695a0ffa1757e38cc094e2fe311/tns-core-modules/ui/list-picker/list-picker-common.ts#L74
         */
        return typeof arr.getItem === "function";
    }
    render() {
        console.log(`ListView's render()`);
        const _a = this.props, { 
        // Only used by the class component; not the JSX element.
        forwardedRef, children, _debug, cellFactories, cellFactory } = _a, rest = __rest(_a, ["forwardedRef", "children", "_debug", "cellFactories", "cellFactory"]);
        if (children) {
            console.warn("Ignoring 'children' prop on ListView; not supported.");
        }
        return (React.createElement("listView", Object.assign({}, rest, { onItemLoading: this.defaultOnItemLoading, ref: forwardedRef || this.myRef })));
    }
}
_ListView.defaultProps = {
    _debug: {
        logLevel: "info",
        onCellFirstLoad: undefined,
        onCellRecycle: undefined,
    },
};
export const ListView = React.forwardRef((props, ref) => {
    return React.createElement(_ListView, Object.assign({}, props, { forwardedRef: ref }));
});
//# sourceMappingURL=ListView.js.map