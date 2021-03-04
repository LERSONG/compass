import "./enhancedorchestration.scss"

import * as React from "react";
import store from "store";
import {observer} from "mobx-react";
import {Redirect, Route, Switch} from "react-router";
import {RouteComponentProps} from "react-router-dom";
import {Trans} from "@lingui/macro";
import {MainLayout, TabRoute} from "../layout/main-layout";
import {
  enhanceStatefulsetsRoute,
  enhanceStatefulSetsURL,
  injectorsRoute,
  injectorURL,
  stonesRoute,
  stonesURL,
  watersRoute,
  watersURL,
} from "./enhancedorchestration.route";
import {namespaceStore} from "../+namespaces/namespace.store";
import {EnhanceStatefulSets} from "../+enhancedorchestration-enhancestatefulsets";
import {Stones} from "../+enhancedorchestration-stones";
import {Injectors} from "../+enhancedorchestration-injectors";
import {Waters} from "../+enhancedorchestration-waters"

interface Props extends RouteComponentProps {
}

@observer
export class EnhancedOrchestration extends React.Component<Props> {
  static get tabRoutes(): TabRoute[] {
    const query = namespaceStore.getContextParams();
    const userConfig = store.get('u_config')
    const isClusterAdmin = userConfig ? userConfig.isClusterAdmin : false
    let items: TabRoute[] = [
      {
        title: <Trans>Stones</Trans>,
        component: Stones,
        url: stonesURL({ query }),
        path: stonesRoute.path
      },
      {
        title: <Trans>StatefulSets*</Trans>,
        component: EnhanceStatefulSets,
        url: enhanceStatefulSetsURL({ query }),
        path: enhanceStatefulsetsRoute.path
      },
    ]

    if (isClusterAdmin) {
      items.push(
        {
          title: <Trans>Waters</Trans>,
          component: Waters,
          url: watersURL({ query }),
          path: watersRoute.path
        },
        {
          title: <Trans>Injectors</Trans>,
          component: Injectors,
          url: injectorURL({ query }),
          path: injectorsRoute.path
        },
      )
    }

    return items
  };

  render() {
    const tabRoutes = EnhancedOrchestration.tabRoutes;
    return (
      <MainLayout className="EnhanceOrchestration" tabs={tabRoutes}>
        <Switch>
          {tabRoutes.map((route, index) => <Route key={index} {...route} />)}
          <Redirect to={stonesURL({ query: namespaceStore.getContextParams() })} />
        </Switch>
      </MainLayout>
    )
  }
}