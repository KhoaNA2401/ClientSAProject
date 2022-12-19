import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const AppEchart = Loadable(lazy(() => import('./echarts/AppEchart')));

const chartsRoute = [{ path: '/charts/echarts', element: <AppEchart /> }];

export default chartsRoute;
