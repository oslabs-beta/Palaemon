import * as cp from 'child_process';


const response = cp.execSync('kubectl get events --all-namespaces', {encoding: 'utf-8'});




const test = new Date();
const testCopy = new Date(test.getTime());
console.log(testCopy);
testCopy.setHours(testCopy.getHours() - 24);
console.log('START', testCopy.toISOString());
console.log('END', new Date().toISOString());

// {
//   "status": "success",
//   "data": {
//       "resultType": "matrix",
//       "result": [
//           {
//               "metric": {
//                   "pod": "nodejs-guestbook-backend-c9b7887f9-npzrr"
//               },
//               "values": [
//                   [
//                       1662461863.033,
//                       "73625600"
//                   ],
//                   [
//                       1662483463.033,
//                       "73273344"
//                   ],
//                   [
//                       1662505063.033,
//                       "73986048"
//                   ]
//               ]
//           },
//           {
//               "metric": {
//                   "pod": "nodejs-guestbook-frontend-74f496b5cd-8x7pv"
//               },
//               "values": [
//                   [
//                       1662461863.033,
//                       "65695744"
//                   ],
//                   [
//                       1662483463.033,
//                       "69201920"
//                   ],
//                   [
//                       1662505063.033,
//                       "60035072"
//                   ]
//               ]
//           },
//           {
//               "metric": {
//                   "pod": "nodejs-guestbook-mongodb-77c9c685d7-wlqsl"
//               },
//               "values": [
//                   [
//                       1662461863.033,
//                       "133152768"
//                   ],
//                   [
//                       1662483463.033,
//                       "134103040"
//                   ],
//                   [
//                       1662505063.033,
//                       "133865472"
//                   ]
//               ]
//           }
//       ]
//   }
// }

// const hi1: bigint = BigInt(10);
// const hi2: bigint = 100000n

const time = 1662461863.033 * 1000;
console.log(new Date(time));
