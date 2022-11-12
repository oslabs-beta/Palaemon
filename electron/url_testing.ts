const PROM_URL = 'http://127.0.0.1:9090/api/v1/';
const parentNode = 'parentNode';
const startTime = 'startTime';
const endTime = 'endTime';
const interval = 'interval';

const nodeCPUQuery = `${PROM_URL}query_range?query=
sum(rate(container_cpu_usage_seconds_total{node="${parentNode}",image=""}[5m])) by (node)
&start=${startTime}&end=${endTime}&step=${interval}`;

const nodeCPUQueryURL = new URL('/query_range',PROM_URL)

nodeCPUQueryURL.searchParams

const newParams = new URLSearchParams()

nodeCPUQueryURL.searchParams.append('query',`sum(rate(container_cpu_usage_seconds_total{node="${parentNode}",image=""}[5m])) by (node)
&start=${startTime}&end=${endTime}&step=${interval}`)

// nodeCPUQueryURL.searchParams = newParams

console.log(nodeCPUQueryURL)
console.log(nodeCPUQueryURL.href)
12
console.log('#' + Math.floor(Math.random() * 16777215).toString(16))

//add comment