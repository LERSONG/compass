import {RouteProps} from "react-router"
import {EnhancedOrchestration} from "./enhancedorchestration";
import {buildURL} from "../../navigation";

export const enhancedorchestrationRoute: RouteProps = {
  get path() {
    return EnhancedOrchestration.tabRoutes.map(({path}) => path).flat()
  }
}


export const stonesRoute: RouteProps = {
  path: "/stones"
}

export const enhanceStatefulsetsRoute: RouteProps = {
  path: "/enhancestatefulsets"
}

export const injectorsRoute: RouteProps = {
  path: "/injectors"
}

export const watersRoute: RouteProps = {
  path: "/waters"
}

export const deployRoute: RouteProps = {
  path: "/deploy"
}


export interface InjectorsRouteParams {
}

export interface IWatersRouteParams {
}

export interface IEnhanceStatefulSetsRouteParams {
}

export interface IJobsRouteParams {
}

export interface ICronJobsRouteParams {
}

export interface IStonesRouteParams {
}

// URL-builders
export const stonesURL = buildURL<IStonesRouteParams>(stonesRoute.path)
export const enhanceStatefulSetsURL = buildURL<IEnhanceStatefulSetsRouteParams>(enhanceStatefulsetsRoute.path)
export const injectorURL = buildURL<InjectorsRouteParams>(injectorsRoute.path)
export const watersURL = buildURL<IWatersRouteParams>(watersRoute.path)