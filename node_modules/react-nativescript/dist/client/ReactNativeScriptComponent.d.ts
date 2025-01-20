import { Type, Instance, Container, HostContext } from "../shared/HostConfigTypes";
export declare function setInitialProperties(domElement: Instance, tag: Type, rawProps: Object, rootContainerElement: Container, hostContext: HostContext): void;
export declare function setInitialDOMProperties(tag: Type, domElement: Instance, rootContainerElement: Container, nextProps: Object, isCustomComponentTag: boolean, hostContext: HostContext): void;
export declare function updateDOMProperties(instance: Instance, updatePayload: Array<any>, wasCustomComponentTag: boolean, isCustomComponentTag: boolean, hostContext: HostContext): void;
export declare function diffProperties(domElement: Instance, tag: Type, lastRawProps: object, nextRawProps: object, rootContainerElement: Container): null | Array<any>;
export declare function updateProperties(instance: Instance, updatePayload: Array<any>, type: Type, lastRawProps: any, nextRawProps: any, hostContext: HostContext): void;
