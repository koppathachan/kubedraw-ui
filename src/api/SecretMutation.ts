import { SecretConfig } from "./SecretConfig";
import { GraphQLClient } from "graphql-request";

export class SecretMutation {
	private cluster: string;
	private client: GraphQLClient;

	apply = (query: string) => this.client.request(query)

	createSecret = (kobj: SecretConfig) => `
	mutation {
		createSecret(apiVersion: "${kobj.apiVersion}", cluster: "${this.cluster}",
        metadata: {name: "${kobj.metadata.name}"}, 
        type: "secret",
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
