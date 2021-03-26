import {RouteProps} from "react-router"
import {buildURL} from "../../navigation";
import {appsRoute} from "../+apps/apps.route";

export const zookeeperClusterRoute: RouteProps = {
  path:  "/apps-zookeeper-cluster"
}

export interface IZookeeperClusterRouteParams {
}

export const zookeeperClusterURL = buildURL<IZookeeperClusterRouteParams>(zookeeperClusterRoute.path);
