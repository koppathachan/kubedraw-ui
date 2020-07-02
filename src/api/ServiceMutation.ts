import { ServiceConfig } from "./ServiceConfig";
import { GraphQLClient } from "graphql-request";

export class ServiceMutation {
	private cluster: string;
	private client: GraphQLClient;

	apply = (query: string) => this.client.request(query)

	createService = (kobj: ServiceConfig) => `
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
