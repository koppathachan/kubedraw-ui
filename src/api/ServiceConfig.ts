import {ApiObjectConfig} from "./ApiObjectConfig";
import {Metadata} from "./Metadata";
// import {ServiceSpecInput} from "./ServiceSpecInput";

export declare class ServiceConfig extends ApiObjectConfig {
    //TODO: chagne tooproper type
    metadata: Metadata;
    spec: any;
}
