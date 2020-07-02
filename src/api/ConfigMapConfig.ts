import { ApiObjectConfig } from "./ApiObjectConfig";
import { Metadata } from "./Metadata";
import { Hashdata } from "./Hashdata";

export declare class ConfigMapConfig extends ApiObjectConfig {
	//TODO: chagne tooproper type
	metadata: Metadata;
	data?: Array<Hashdata>;
}
