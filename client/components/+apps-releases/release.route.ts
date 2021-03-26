import {RouteProps} from "react-router"
import {buildURL} from "../../navigation";

export const releaseRoute: RouteProps = {
  path: "/apps-releases/:namespace?/:name?"
}

export interface IReleaseRouteParams {
  name?: string;
  namespace?: string;
}

export const releaseURL = buildURL<IReleaseRouteParams>(releaseRoute.path);
