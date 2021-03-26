import {KubeApi} from "../kube-api";
import {autobind} from "../../utils";
import {KubeObject} from "../kube-object";
import {apiApps} from "../index";
import {IAffinity} from "../workload-kube-object";
import {IPodContainer} from "./pods.api";

@autobind()
export class ZookeeperCluster extends KubeObject {
    static kind = "ZookeeperCluster";
    spec: {
        replicas: number,
        image: {
            repository?: string,
            tag?: string,
            pullPolicy?: string
        }
        ports?: IContainerPort[],
        pod?: IPodPolicy,
        storageType?: string,
        persistence?: {
            reclaimPolicy?: string,
            spec?:{
                accessModes?: string[];
                storageClassName?: string;
                selector?: {
                    matchLabels?: {
                        release?: string;
                    };
                    matchExpressions?: {
                        key?: string;
                        operator?: string;
                        values?: string[];
                    }[];
                };
                resources?: {
                    requests?: {
                        storage?: string;
                    };
                };
            },
            annotations?: object,
        },
        ephemeral?: {
            emptydirvolumesource?: {
                medium?: string,
                sizeLimit?: string,
            }
        },
        config?: object,
        domainName?: string,
        kubernetesClusterDomain?: string,
        containers?: IPodContainer[],
        volumes?: object[],
        probes?: {
            readinessProbe: IProbe,
            livenessProbe: IProbe,
        },
    }

}

export interface IContainerPort {
    name?: string,
    hostPort?: string,
    containerPort?: string,
    protocol?: string,
    hostIP?: string,
}

export interface IPodPolicy {
    Labels?: Map<string,string>,
    nodeSelector?: object,
    affinity?: IAffinity,
    resources?: object,
    tolerations?: IToleration[],
    env?: IEnv,
    annotations?: Map<string,string>,
    securityContext?: object,
    terminationGracePeriodSeconds?: number,
    serviceAccountName?: string,
    imagePullSecrets?: {
        name: string
    },
}

export interface IEnv {
    name?: string,
    value?: string,
    valueFrom?: string,
}

export interface IProbe {
    initialDelaySeconds?: number,
    periodSeconds?: number,
    failureThreshold?: number,
    successThreshold?: number,
    timeoutSeconds?: number,
}

interface IToleration {
    key?: string;
    operator?: string;
    value?: string,
    effect?: string;
    tolerationSeconds?: number;
}


export const zookeeperClusterApi = new KubeApi<ZookeeperCluster>({
    kind: ZookeeperCluster.kind,
    apiBase: "/apis/zookeeper.pravega.io/v1beta1/zookeeperclusters",
    isNamespaced: true,
    objectConstructor: ZookeeperCluster,
    request: apiApps,
});

export const defaultZookeeperCluster = {
    // apiVersion: "zookeeper.pravega.io/v1beta1",
    // kind: "ZookeeperCluster",
    metadata:{
        name: "",
    },
    spec: {
        replicas: 3,
        image: {
            pullPolicy: "Always",
            repository: "yametech/zookeeper",
            tag: "latest",
        },
        storageType: "persistence",
        persistence: {
            reclaimPolicy: "Retain",
            spec: {
                accessModes: ["ReadWriteOnce"],
                resources: {
                    requests: {
                        storage: "5Gi"
                    }
                }

            }
        },
    },

}