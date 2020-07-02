export class BackendObject {
    serviceName?: string;
    servicePort?: number;
}

export class PathObject {
    path?: string;
    backend?: Array<BackendObject>;
}

export class HttpObject {
    paths?: Array<PathObject>;
}

export class Rule{
    host?: string;
    http?: HttpObject;
}

export class IngressSpecInput {
    rules?: Array<Rule>;
}