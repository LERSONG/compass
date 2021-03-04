import "./job.scss"

import * as React from "react";
import {observer} from "mobx-react";
import {Redirect, Route, Switch} from "react-router";
import {RouteComponentProps} from "react-router-dom";
import {Trans} from "@lingui/macro";
import {MainLayout, TabRoute} from "../layout/main-layout";
import {cronJobsRoute, cronJobsURL, jobsRoute, jobsURL,} from "./job.route";
import {namespaceStore} from "../+namespaces/namespace.store";
import {Jobs} from "../+job-jobs";
import {CronJobs} from "../+job-cronjobs";

interface Props extends RouteComponentProps {
}

@observer
export class Job extends React.Component<Props> {
  static get tabRoutes(): TabRoute[] {
    const query = namespaceStore.getContextParams();
    let items = [
      {
        title: <Trans>Jobs</Trans>,
        component: Jobs,
        url: jobsURL({ query }),
        path: jobsRoute.path,
      },
      {
        title: <Trans>CronJobs</Trans>,
        component: CronJobs,
        url: cronJobsURL({ query }),
        path: cronJobsRoute.path,
      },
    ]

    return items
  };

  render() {
    const tabRoutes = Job.tabRoutes;
    return (
      <MainLayout className="Workloads" tabs={tabRoutes}>
        <Switch>
          {tabRoutes.map((route, index) => <Route key={index} {...route} />)}
          <Redirect to={jobsURL({ query: namespaceStore.getContextParams() })} />
        </Switch>
      </MainLayout>
    )
  }
}