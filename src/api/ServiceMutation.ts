import {ServiceConfig} from "./ServiceConfig";
import {GraphQLClient} from "graphql-request";

export class ServiceMutation {
	private cluster: string;
	private client: GraphQLClient;

	apply = (query: string) => this.client.request(query)

	createService = (kobj: ServiceConfig) => `
	mutation {
		createService(
		  apiVersion: "${kobj.apiVersion}",
		  cluster: "${this.cluster}",
		  metadata: {
			name: "${kobj.metadata.name}",
			labels: {
			  app:"${kobj.metadata.labels?.app}"
			},
			namespace: "${kobj.metadata.namespace}",
			annotations: [
			  {key: "sf", value:"asdf"}
			]
		  },
		  spec: {
			selector: {
				app: "${kobj.spec.selector.app}"
			},
			ports: {
					port: ${kobj.spec.ports.port},
					targetPort: ${kobj.spec.ports.targetPort},
					protocol: ""
				}
		  }
		) {
		  kind,
		  metadata {
			name,
			labels {app}
		  }
		}
	  }
	`;

	constructor(cluster: string, ep: string) {
		this.cluster = cluster;
		this.client = new GraphQLClient(ep);
	}
}
