import { GraphQLClient } from "graphql-request";

export class DeploymentMutation {
	private cluster: string;
	private client: GraphQLClient;

	apply = (query: string) => this.client.request(query)

	deploy = () => `
	mutation {
		deploy(cluster: "${this.cluster}")
	  }
	`;

	constructor(cluster: string, ep: string) {
		this.cluster = cluster;
		this.client = new GraphQLClient(ep);
	}
}
