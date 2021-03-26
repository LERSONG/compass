import {RouteProps} from "react-router";
import {buildURL} from "../../navigation";
import {Apps} from "./apps";

export const appsRoute: RouteProps = {
  get path() {
    return Apps.tabRoutes.map(({ path }) => path).flat()
  }
};

export const appsURL = buildURL(appsRoute.path);
