import { RouteProps } from "react-router"
import { appsRoute } from "../+apps/apps.route";
import { buildURL } from "../../navigation";

export const helmChartsRoute: RouteProps = {
  path: "/apps-charts/:repo?/:chartName?"
}

export interface IHelmChartsRouteParams {
  chartName?: string;
  repo?: string;
}

export const helmChartsURL = buildURL<IHelmChartsRouteParams>(helmChartsRoute.path)