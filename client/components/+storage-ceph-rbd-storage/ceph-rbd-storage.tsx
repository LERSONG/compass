import "./ceph-rbd-storage.scss"

import * as React from "react";
import {RouteComponentProps} from "react-router-dom";
import {observer} from "mobx-react";
import {Trans} from "@lingui/macro";
import {KubeObjectMenu, KubeObjectMenuProps} from "../kube-object/kube-object-menu";
import {KubeObjectListLayout} from "../kube-object";
import {ICephRBDStorageRouteParams} from "./ceph-rbd-storage.route";
import {apiManager} from "../../api/api-manager";
import {AddCephRBDStorageDialog} from "./add-cephrbdstorage-dialog";
import {secretsStore} from "../+config-secrets/secrets.store";
import {cephRBDStorageStore} from "./ceph-rbd-storage.store";
import {CephRBDStorage, cephRBDStorageApi} from "../../api/endpoints/ceph-rbd-storage.api";

enum sortBy {
    name = "name",
    age = "age",
    provisioner = "provision",
    reclaimPolicy = "reclaim",
}

interface Props extends RouteComponentProps<ICephRBDStorageRouteParams> {
}

@observer
export class CephRBDStorages extends React.Component<Props> {
    render() {
        return (
            <>
                <KubeObjectListLayout
                    className="CephRBDStorages"
                    store={cephRBDStorageStore} isClusterScoped
                    dependentStores={[secretsStore]}
                    sortingCallbacks={{
                        [sortBy.name]: (item: CephRBDStorage) => item.getName(),
                        [sortBy.age]: (item: CephRBDStorage) => item.getAge(false),
                        [sortBy.provisioner]: (item: CephRBDStorage) => item.spec.provisioner,
                        [sortBy.reclaimPolicy]: (item: CephRBDStorage) => item.spec.reclaimPolicy,
                    }}
                    searchFilters={[
                        (item: CephRBDStorage) => item.getSearchFields(),
                        (item: CephRBDStorage) => item.spec.provisioner,
                    ]}
                    renderHeaderTitle={<Trans>Ceph RBD Storages</Trans>}
                    renderTableHeader={[
                        { title: <Trans>Name</Trans>, className: "name", sortBy: sortBy.name },
                        { title: <Trans>Namespace</Trans>, className: "Namespace" },
                        { title: <Trans>Provisioner</Trans>, className: "provisioner", sortBy: sortBy.provisioner },
                        {
                            title: <Trans>Reclaim Policy</Trans>,
                            className: "reclaim-policy",
                            sortBy: sortBy.reclaimPolicy
                        },
                        { title: <Trans>Age</Trans>, className: "age", sortBy: sortBy.age },
                    ]}
                    renderTableContents={(cephRBDStorage: CephRBDStorage) => [
                        cephRBDStorage.getName(),
                        cephRBDStorage.getNs(),
                        cephRBDStorage.spec.provisioner,
                        cephRBDStorage.getReclaimPolicy(),
                        cephRBDStorage.getAge(),
                    ]}
                    renderItemMenu={(item: CephRBDStorage) => {
                        return <CephRBDStorageMenu object={item} />
                    }}
                    addRemoveButtons={{
                        addTooltip: <Trans>Add CephRBDStorage</Trans>,
                        onAdd: () => AddCephRBDStorageDialog.open(),
                    }}
                />
                <AddCephRBDStorageDialog />
            </>
        )
    }
}

export function CephRBDStorageMenu(props: KubeObjectMenuProps<CephRBDStorage>) {
    const { object, toolbar } = props;
    return (
        <KubeObjectMenu {...props} >
        </KubeObjectMenu>
    )
}

apiManager.registerViews(cephRBDStorageApi, {
    Menu: CephRBDStorageMenu,
})