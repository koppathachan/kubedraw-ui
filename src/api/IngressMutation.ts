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
		  metadata: {name: "${kobj.metadata.name}", namespace: "mynamespace"
			},
		  spec: {
              rules: [{
				host: "${kobj.spec.rules[0].host}",
				http: {
					paths: [
					{
						path: "${kobj.spec.rules[0].http?.paths[0].path}",
						backend: {
							serviceName: "${kobj.spec.rules[0].http?.paths[0].backend.serviceName}",
							servicePort: ${kobj.spec.rules[0].http?.paths[0].backend.servicePort}
						}
					}
					]
				}
              }]
          }
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
