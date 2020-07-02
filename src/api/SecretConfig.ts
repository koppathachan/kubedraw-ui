import { ApiObjectConfig } from "./ApiObjectConfig";
import { Metadata } from "./Metadata";
import { Hashdata } from "./Hashdata";

export declare class SecretConfig extends ApiObjectConfig {
	//TODO: chagne tooproper type
	metadata: Metadata;
	type: string;
	data: Array<Hashdata>;
}
