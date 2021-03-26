import * as React from "react";
import {observer} from "mobx-react";
import {RouteComponentProps} from "react-router";
import {t, Trans} from "@lingui/macro";
import {KubeObjectListLayout, KubeObjectMenu, KubeObjectMenuProps} from "../kube-object";
import {apiManager} from "../../api/api-manager";
import {MenuItem} from "../menu";
import {Icon} from "../icon";
import {_i18n} from "../../i18n";
import {zookeeperClusterStore} from "./zookeeper-cluster.store";
import {ConfigZookeeperClusterDialog} from "./config-zookeeper-cluster-dialog";
import {ZookeeperCluster, zookeeperClusterApi} from "../../api/endpoints/zookeeper-cluster.api";
import {AddZookeeperClusterDialog} from "./add-zookeeper-cluster-dialog";
import {Link} from "react-router-dom";
import {stopPropagation} from "../../utils";
import Tooltip from "@material-ui/core/Tooltip";

enum sortBy {
  name = "name",
  namespace = "namespace",
  age = "age",
}

interface ZookeeperClusterProps {
}

interface Props extends RouteComponentProps<ZookeeperClusterProps> {
}

@observer
export class ZookeeperClusters extends React.Component<Props> {

  renderZookeeperClusterName(zookeeperCluster: ZookeeperCluster) {
    const name = zookeeperCluster.getName();
    return (
      <Link onClick={(event) => { stopPropagation(event); ConfigZookeeperClusterDialog.open(zookeeperCluster) }} to={null}>
        <Tooltip title={name} placement="top-start">
          <span>{name}</span>
        </Tooltip>
      </Link>
    );
  }

  render() {
    return (
      <>
        <KubeObjectListLayout
          onDetails={() => {
          }}
          className="ZookeeperClusters" store={zookeeperClusterStore}
          sortingCallbacks={{
            [sortBy.name]: (item: ZookeeperCluster) => item.getName(),
            [sortBy.namespace]: (item: ZookeeperCluster) => item.getNs(),
          }}
          searchFilters={[
            (item: ZookeeperCluster) => item.getSearchFields()
          ]}
          renderHeaderTitle={<Trans>ZookeeperClusters</Trans>}
          renderTableHeader={[
            {title: <Trans>Name</Trans>, className: "name", sortBy: sortBy.name},
            {title: <Trans>Replicas</Trans>, className: "replicas"},
            {title: <Trans>Namespace</Trans>, className: "namespace", sortBy: sortBy.namespace},
            {title: <Trans>Age</Trans>, className: "age", sortBy: sortBy.age},
          ]}
          renderTableContents={(zookeeperCluster: ZookeeperCluster) => [
            this.renderZookeeperClusterName(zookeeperCluster),
            zookeeperCluster.spec.replicas,
            zookeeperCluster.getNs(),
            zookeeperCluster.getAge(),
          ]}
          renderItemMenu={(item: ZookeeperCluster) => {
            return <ZookeeperClusterMenu object={item}/>
          }}
          addRemoveButtons={{
            onAdd: () => AddZookeeperClusterDialog.open(),
            addTooltip: <Trans>Create new ZookeeperCluster</Trans>
          }}
        />
        <ConfigZookeeperClusterDialog/>
        <AddZookeeperClusterDialog/>
      </>
    );
  }
}

export function ZookeeperClusterMenu(props: KubeObjectMenuProps<ZookeeperCluster>) {

  const {object, toolbar} = props;

  return (
    <KubeObjectMenu {...props}>
      <MenuItem onClick={() => ConfigZookeeperClusterDialog.open(object)}>
        <Icon material="sync_alt" title={_i18n._(t`Config`)} interactive={toolbar} />
        <span className="title"><Trans>Config</Trans></span>
      </MenuItem>
    </KubeObjectMenu>
  )
}

apiManager.registerViews(zookeeperClusterApi, {
  Menu: ZookeeperClusterMenu,
})
