import { DeploymentConfig } from "./DeploymentConfig";
import { GraphQLClient } from "graphql-request";

export class DeploymentMutation {
	private cluster: string;
	private client: GraphQLClient;

	apply = (query: string) => this.client.request(query)

	createDeployment = (kobj: DeploymentConfig) => `
	mutation {
		createDeployment(
		  apiVersion: "${kobj.apiVersion}",
		  cluster: "${this.cluster}",
		  metadata: {
			name: "${kobj.metadata.name}",
			labels: {
			  app:"${kobj.labels.app}"
			},
			namespace: "${kobj.metadata.namespace}",
		  },
		  spec: {
			replicas:${kobj.spec.replicas},
			selector: {
			  matchLabels: {
				app: "${kobj.spec.selector.matchLabels.app}"
			  }
			},
			template: {
			  metadata:{
				name: "${kobj.metadata.name}",
	  
			  },
			  spec: {
				ports:{
				  containerPort: "${kobj.spec.template.spec.ports.containerPort}"
				},
				name:"${kobj.spec.template.spec.name}",
				image:"${kobj.spec.template.spec.image}",
				env: "${kobj.env}"
			  }
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
