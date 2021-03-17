import {KubeObjectStore} from "../../kube-object.store";
import {autobind} from "../../utils";
import {apiManager} from "../../api/api-manager";
import {CephRBDStorage, cephRBDStorageApi} from "../../api/endpoints/ceph-rbd-storage.api";

@autobind()
export class CephRbdStorageStore extends KubeObjectStore<CephRBDStorage> {
  api = cephRBDStorageApi
}

export const cephRBDStorageStore = new CephRbdStorageStore();
apiManager.registerStore(cephRBDStorageApi, cephRBDStorageStore);
