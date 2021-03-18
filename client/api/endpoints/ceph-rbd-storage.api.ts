import {autobind} from "../../utils";
import {KubeObject} from "../kube-object";
import {KubeApi} from "../kube-api";
import {apiStorage} from "../index";

@autobind()
export class CephRBDStorage extends KubeObject {
  static kind = "CephRBDStorage"
  spec: {
    storageClassName?: string
    provisioner: string; // e.g. "storage.k8s.io/v1"
    mountOptions?: string[];
    volumeBindingMode: string;
    reclaimPolicy: string;
    parameters: {
      [param: string]: string; // every provisioner has own set of these parameters
    }
  }

  isDefault() {
    const annotations = this.metadata.annotations || {};
    return (
      annotations["storageclass.kubernetes.io/is-default-class"] === "true" ||
      annotations["storageclass.beta.kubernetes.io/is-default-class"] === "true"
    )
  }

  getVolumeBindingMode() {
    return this.spec.volumeBindingMode || "-"
  }

  getReclaimPolicy() {
    return this.spec.reclaimPolicy || "-"
  }
}

export const cephRBDStorageApi = new KubeApi({
  kind: CephRBDStorage.kind,
  apiBase: "/apis/yamecloud.io/v1/cephrbdstorages",
  isNamespaced: true,
  objectConstructor: CephRBDStorage,
  request: apiStorage,
});
