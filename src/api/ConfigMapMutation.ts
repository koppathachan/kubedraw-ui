import { ConfigMapConfig } from "./ConfigMapConfig";
import { GraphQLClient } from "graphql-request";

export class ConfigMapMutation {
	private cluster: string;
	private client: GraphQLClient;

	apply = (query: string) => this.client.request(query)

	createConfigmap = (kobj: ConfigMapConfig) => `
	mutation{
		createConfigmap(
		  apiVersion : "${kobj.apiVersion}",
		  cluster: "${this.cluster}",
		  metadata: {name: "${kobj.metadata.name}"},
		  data: "${kobj.data}"
		){
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
