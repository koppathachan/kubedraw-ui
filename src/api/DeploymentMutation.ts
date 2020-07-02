import { DeploymentConfig } from "./DeploymentConfig";
import { GraphQLClient } from "graphql-request";

export class DeploymentMutation {
	private cluster: string;
	private client: GraphQLClient;

	apply = (query: string) => this.client.request(query)

	createDeployment = (kobj: DeploymentConfig) => `
	mutation {
		createDeployment(apiVersion: "${kobj.apiVersion}", cluster: "${this.cluster}",
		metadata: {name: "${kobj.metadata.name}", namespace: "${kobj.metadata.namespace}"}) {
			apiVersion,
			kind
		}
	  }
	`;

	constructor(cluster: string, ep: string) {
		this.cluster = cluster;
		this.client = new GraphQLClient(ep);
	}
}
