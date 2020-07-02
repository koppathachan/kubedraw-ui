import { IngressConfig } from "./IngressConfig";
import { GraphQLClient } from "graphql-request";

export class IngressMutation {
	private cluster: string;
	private client: GraphQLClient;

	apply = (query: string) => this.client.request(query)

	createIngress = (kobj: IngressConfig) => `
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
