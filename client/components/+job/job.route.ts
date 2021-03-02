import {RouteProps} from "react-router"
import {Job} from "./job";
import {buildURL} from "../../navigation";

export const jobRoute: RouteProps = {
  get path() {
    return Job.tabRoutes.map(({path}) => path).flat()
  }
}

// Routes
export const jobsRoute: RouteProps = {
  path: "/job-jobs"
}
export const cronJobsRoute: RouteProps = {
  path: "/job-cron-jobs"
}


// Route params
export interface IJobsRouteParams {
}

export interface ICronJobsRouteParams {
}


// URL-builders
export const jobsURL = buildURL<IJobsRouteParams>(jobsRoute.path)
export const cronJobsURL = buildURL<ICronJobsRouteParams>(cronJobsRoute.path)