import "./overview.scss"

import React from "react";
import {observable, when} from "mobx";
import {observer} from "mobx-react";
import {OverviewStatuses} from "./overview-statuses";
import {RouteComponentProps} from "react-router";
import {IWorkloadsOverviewRouteParams} from "../+workloads";
import {eventStore} from "../+events/event.store";
import {podsStore} from "../+orchestration-pods/pods.store";
import {deploymentStore} from "../+orchestration-deployments/deployments.store";
import {daemonSetStore} from "../+orchestration-daemonsets/daemonsets.store";
import {statefulSetStore} from "../+orchestration-statefulsets/statefulset.store";
import {replicaSetStore} from "../+orchestration-replicasets/replicasets.store";
import {enhanceStatefulSetStore} from "../+enhancedorchestration-enhancestatefulsets/enhancestatefulset.store"
import {stoneStore} from "../+enhancedorchestration-stones/stones.store"
import {waterStore} from "../+enhancedorchestration-waters/waters.store"
import {jobStore} from "../+job-jobs/job.store";
import {cronJobStore} from "../+job-cronjobs/cronjob.store";
import {Spinner} from "../spinner";
import {Events} from "../+events";

interface Props extends RouteComponentProps<IWorkloadsOverviewRouteParams> {
}

@observer
export class WorkloadsOverview extends React.Component<Props> {
  @observable isReady = false;
  @observable isUnmounting = false;

  async componentDidMount() {
    const stores = [
      podsStore,
      deploymentStore,
      daemonSetStore,
      statefulSetStore,
      replicaSetStore,
      jobStore,
      cronJobStore,
      eventStore,
      enhanceStatefulSetStore,
      stoneStore,
      waterStore,
    ];
    this.isReady = stores.every(store => store.isLoaded);
    if (!this.isReady) {
      await Promise.all(stores.map(store => store.loadAll()));
      this.isReady = true;
    }
    const unsubscribeList = stores.map(store => store.subscribe());
    await when(() => this.isUnmounting);
    unsubscribeList.forEach(dispose => dispose());
  }

  componentWillUnmount() {
    this.isUnmounting = true;
  }

  renderContents() {
    if (!this.isReady) {
      return <Spinner center />
    }
    return (
      <>
        <OverviewStatuses />
        <Events
          compact
          hideFilters
          className="box grow"
        />
      </>
    )
  }

  render() {
    return (
      <div className="WorkloadsOverview flex column gaps">
        {this.renderContents()}
      </div>
    )
  }
}