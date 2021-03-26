import {autobind} from "../../utils";
import {KubeObjectStore} from "../../kube-object.store";
import {apiManager} from "../../api/api-manager";
import {ZookeeperCluster, zookeeperClusterApi} from "../../api/endpoints/zookeeper-cluster.api";

@autobind()
export class ZookeeperClusterStore extends KubeObjectStore<ZookeeperCluster> {
  api = zookeeperClusterApi
}

export const zookeeperClusterStore = new ZookeeperClusterStore();
apiManager.registerStore(zookeeperClusterApi, zookeeperClusterStore);
