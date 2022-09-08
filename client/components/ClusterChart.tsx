import * as React from "react";
import { ClusterChartProps } from "../Types";
import ClusterChartCard from "./ClusterChartCard";

const ClusterChart = (props: ClusterChartProps): JSX.Element => {
  const names: string[] = ["Clusters", "Nodes", ",Pods", "Deployments"];
  const clusterCards: JSX.Element[] = [];

  clusterCards.push(
    <ClusterChartCard
      title={names[1]}
      name={props.Clusters.name}
      usage={props.Clusters.usage}
      request={props.Clusters.request}
      limit={props.Clusters.limit}
      click={props.click}
    />
  );
  clusterCards.push(
    <ClusterChartCard
      title={names[2]}
      name={props.Nodes.name}
      usage={props.Nodes.usage}
      request={props.Nodes.request}
      limit={props.Nodes.limit}
      click={props.click}
    />
  );
  clusterCards.push(
    <ClusterChartCard
      title={names[3]}
      name={props.Pods.name}
      usage={props.Pods.usage}
      request={props.Pods.request}
      limit={props.Pods.limit}
      click={props.click}
    />
  );
  clusterCards.push(
    <ClusterChartCard
      title={names[4]}
      name={props.Deployments.name}
      usage={props.Deployments.usage}
      request={props.Deployments.request}
      limit={props.Deployments.limit}
      click={props.click}
    />
  );

  return <div id="cluster-chart">{clusterCards}</div>;
};

export default ClusterChart;

// // {
// //   "status": "success",
// //   "data": {
// //       "resultType": "matrix",
// //       "result": [
// //           {
// //               "metric": {
// //                   "pod": "nodejs-guestbook-backend-c9b7887f9-npzrr"
// //               },
// //               "values": [
// //                   [
// //                       1662461863.033,
// //                       "73625600"
// //                   ],
// //                   [
// //                       1662483463.033,
// //                       "73273344"
// //                   ],
// //                   [
// //                       1662505063.033,
// //                       "73986048"
// //                   ]
// //               ]
// //           },
// //           {
// //               "metric": {
// //                   "pod": "nodejs-guestbook-frontend-74f496b5cd-8x7pv"
// //               },
// //               "values": [
// //                   [
// //                       1662461863.033,
// //                       "65695744"
// //                   ],
// //                   [
// //                       1662483463.033,
// //                       "69201920"
// //                   ],
// //                   [
// //                       1662505063.033,
// //                       "60035072"
// //                   ]
// //               ]
// //           },
// //           {
// //               "metric": {
// //                   "pod": "nodejs-guestbook-mongodb-77c9c685d7-wlqsl"
// //               },
// //               "values": [
// //                   [
// //                       1662461863.033,
// //                       "133152768"
// //                   ],
// //                   [
// //                       1662483463.033,
// //                       "134103040"
// //                   ],
// //                   [
// //                       1662505063.033,
// //                       "133865472"
// //                   ]
// //               ]
// //           }
// //       ]
// //   }
// // }
