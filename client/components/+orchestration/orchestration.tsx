import "./orchestration.scss"

import * as React from "react";
import store from "store";
import {observer} from "mobx-react";
import {Redirect, Route, Switch} from "react-router";
import {RouteComponentProps} from "react-router-dom";
import {Trans} from "@lingui/macro";
import {MainLayout, TabRoute} from "../layout/main-layout";
import {
  daemonSetsRoute,
  daemonSetsURL,
  deploymentsRoute,
  deploymentsURL,
  podsRoute,
  podsURL,
  statefulSetsRoute,
  statefulSetsURL,
} from "./orchestration.route";
import {namespaceStore} from "../+namespaces/namespace.store";
import {Pods} from "../+orchestration-pods";
import {Deployments} from "../+orchestration-deployments";
import {DaemonSets} from "../+orchestration-daemonsets";
import {StatefulSets} from "../+orchestration-statefulsets";

interface Props extends RouteComponentProps {
}

@observer
export class Orchestration extends React.Component<Props> {
  static get tabRoutes(): TabRoute[] {
    const query = namespaceStore.getContextParams();
    const userConfig = store.get('u_config')
    const isClusterAdmin = userConfig ? userConfig.isClusterAdmin : false
    let items: TabRoute[] = [
      {
        title: <Trans>Pods</Trans>,
        component: Pods,
        url: podsURL({ query }),
        path: podsRoute.path
      },

    ]
    if (isClusterAdmin){
      items.push(
          {
            title: <Trans>DaemonSets</Trans>,
            component: DaemonSets,
            url: daemonSetsURL({ query }),
            path: daemonSetsRoute.path,
          },
          {
            title: <Trans>Deployments</Trans>,
            component: Deployments,
            url: deploymentsURL({ query }),
            path: deploymentsRoute.path,
          },
          {
            title: <Trans>StatefulSets</Trans>,
            component: StatefulSets,
            url: statefulSetsURL({ query }),
            path: statefulSetsRoute.path,
          },
      )
    }

    return items
  };

  render() {
    const tabRoutes = Orchestration.tabRoutes;
    return (
      <MainLayout className="Orchestration" tabs={tabRoutes}>
        <Switch>
          {tabRoutes.map((route, index) => <Route key={index} {...route} />)}
          <Redirect to={podsURL({ query: namespaceStore.getContextParams() })} />
        </Switch>
      </MainLayout>
    )
  }
}