import "./ceph-rbd-storage-details.scss";

import * as React from "react";
import startCase from "lodash/startCase";
import {t, Trans} from "@lingui/macro";
import {DrawerItem, DrawerTitle} from "../drawer";
import {Badge} from "../badge";
import {KubeEventDetails} from "../+events/kube-event-details";
import {observer} from "mobx-react";
import {KubeObjectDetailsProps} from "../kube-object";
import {_i18n} from "../../i18n";
import {apiManager} from "../../api/api-manager";
import {KubeObjectMeta} from "../kube-object/kube-object-meta";
import {CephRBDStorage, cephRBDStorageApi} from "../../api/endpoints/ceph-rbd-storage.api";

interface Props extends KubeObjectDetailsProps<CephRBDStorage> {
}

@observer
export class CephRBDStorageDetails extends React.Component<Props> {
  render() {
    const { object: cephRBDStorage } = this.props;
    if (!cephRBDStorage) return null;
    return (
      <div className="CephRBDStorageDetails">
        <KubeObjectMeta object={cephRBDStorage}/>

        <DrawerItem name={<Trans>StorageClassName</Trans>}>
            {cephRBDStorage.spec.storageClassName}
        </DrawerItem>
        {cephRBDStorage.spec.provisioner && (
          <DrawerItem name={<Trans>Provisioner</Trans>} labelsOnly>
            <Badge label={cephRBDStorage.spec.provisioner}/>
          </DrawerItem>
        )}
        <DrawerItem name={<Trans>Volume Binding Mode</Trans>}>
          {cephRBDStorage.getVolumeBindingMode()}
        </DrawerItem>
        <DrawerItem name={<Trans>Reclaim Policy</Trans>}>
          {cephRBDStorage.getReclaimPolicy()}
        </DrawerItem>

        {cephRBDStorage.spec.mountOptions && (
          <DrawerItem name={<Trans>Mount Options</Trans>}>
            {cephRBDStorage.spec.mountOptions.join(", ")}
          </DrawerItem>
        )}
        {cephRBDStorage.spec.parameters && (
          <>
            <DrawerTitle title={_i18n._(t`Parameters`)}/>
            {
              Object.entries(cephRBDStorage.spec.parameters).map(([name, value]) => (
                <DrawerItem key={name + value} name={startCase(name)}>
                  {value}
                </DrawerItem>
              ))
            }
          </>
        )}

        <KubeEventDetails object={cephRBDStorage}/>
      </div>
    );
  }
}

apiManager.registerViews(cephRBDStorageApi, {
  Details: CephRBDStorageDetails
})