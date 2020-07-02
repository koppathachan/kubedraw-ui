import { NamespaceConfig } from "./NamepaceConfig";
import { GraphQLClient } from "graphql-request";

export class ConfigMapMutation {
	private cluster: string;
	private client: GraphQLClient;

	apply = (query: string) => this.client.request(query)

	createNamespace = (kobj: NamespaceConfig) => `
	mutation {
		createNamespace(apiVersion: "${kobj.apiVersion}", cluster: "${this.cluster}",
        metadata: {name: "${kobj.metadata.name}"}, 
        data: [{"name" : "kube"}, {"test": "tested"}]) {
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
