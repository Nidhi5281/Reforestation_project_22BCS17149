declare let validateDOMNesting: (childTag: string | undefined | void | null, childText: string | undefined | void | null, ancestorInfo: AncestorInfo | undefined | void | null) => AncestorInfo | void;
declare let updatedAncestorInfo: (oldInfo: AncestorInfo | undefined | void | null, tag: string) => void;
declare type AncestorInfoTagObj = {
    tag: string;
};
interface AncestorInfo {
    current: null | AncestorInfoTagObj;
    formTag: null | AncestorInfoTagObj;
    aTagInScope: null | AncestorInfoTagObj;
    buttonTagInScope: null | AncestorInfoTagObj;
    nobrTagInScope: null | AncestorInfoTagObj;
    pTagInButtonScope: null | AncestorInfoTagObj;
    listItemTagAutoclosing: null | AncestorInfoTagObj;
    dlItemTagAutoclosing: null | AncestorInfoTagObj;
}
export { updatedAncestorInfo, validateDOMNesting };
