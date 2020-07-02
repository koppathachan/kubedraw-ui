import { IngressConfig } from "./IngressConfig";
import { GraphQLClient } from "graphql-request";

export class IngressMutation {
	private cluster: string;
	private client: GraphQLClient;

	apply = (query: string) => this.client.request(query)

	createIngress = (kobj: IngressConfig) => `
	mutation{
		createIngress(
		  apiVersion : "${kobj.apiVersion}",
		  cluster: "${this.cluster}",
		  metadata: {name: "${kobj.metadata.name}"},
		  spec: "${kobj.spec}"
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
