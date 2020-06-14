import SearchContainer from "../flightSearch/containers/searchContainer";
import ErrorNotFound from "../common/NotFound/notFound";
import { RouteConfigInterface } from "./model";
import { applicationPath } from "../../config/routePath";

export const routes: RouteConfigInterface[] = [
    {
        path: applicationPath.Home,
        component: SearchContainer,
        childRoutes: [],
    },
    {
        path: applicationPath.Unknown,
        component: ErrorNotFound,
        childRoutes: [],
    },
];
