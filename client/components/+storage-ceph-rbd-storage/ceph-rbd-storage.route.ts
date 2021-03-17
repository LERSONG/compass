import {RouteProps} from "react-router"
import {buildURL} from "../../navigation";

export const cephRBDStorageRoute: RouteProps = {
  path: "/ceph-rbd-storage"
}

export interface ICephRBDStorageRouteParams {
}

export const cephRBDStorageURL = buildURL<ICephRBDStorageRouteParams>(cephRBDStorageRoute.path)

