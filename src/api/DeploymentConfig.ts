import { ApiObjectConfig } from "./ApiObjectConfig";
import { Metadata } from "./Metadata";

export class envdata {
    name?: string;
    value?: string;
}

export declare class DeploymentConfig extends ApiObjectConfig {
	labels: { [key: string]: string };
	//TODO: chagne tooproper type
	metadata: Metadata;
	// spec: DeploymentSpecInput;
	spec: any;
	env?: Array<envdata>;
}
