import { ApiObjectConfig } from "./ApiObjectConfig";
import { Metadata } from "./Metadata";
// import {DeploymentSpecInput} from "./DeploymentSpecInput";

export declare class DeploymentConfig extends ApiObjectConfig {
	labels: { [key: string]: string };
	//TODO: chagne tooproper type
	metadata: Metadata;
	// spec: DeploymentSpecInput;
	spec: any;
}
