import * as React from 'react';
import { ClusterChartCardProps, ModalCard } from '../Types';


const ClusterChartCard = (props: ClusterChartCardProps): JSX.Element => {

    const openDetailsModal = (e: any, data: ModalCard): void => {
        const top = e.pageY;
        const left = e.pageX;
        props.click(data);
        // openModal(type, { top, left }, id);
    };





    const squares: JSX.Element[] = [];
    const colors: string[] = ['#69B34C', '#ACB334', '#FAB733', '#FF8E15', '#FF4E11', '#FF0D0D']

    let index: number = 0;

    for (let i = 0; i < props.usage.length; i++) {
        let usage: number = props.usage[i] - props.request[i];
        let limit: number = props.limit[i] - props.request[i];
        if (usage < 0) index = 0;
        else if (usage < 0.2 * limit) index = 1;
        else if (usage < 0.4 * limit) index = 2;
        else if (usage < 0.6 * limit) index = 3;
        else if (usage < 0.8 * limit) index = 4;
        else index = 5;
        squares.push(
            <svg onClick={(e: any) => openDetailsModal(e, {
                name: props.name[i],
                usage: props.usage[i],
                request: props.request[i],
                limit: props.limit[i]
            })}
                width={30} height={30} key={i + 1000} >
                <rect className='health-bar' width="30" height="30" rx="10" fill={colors[index]} />
            </svg>
        )
    }

    return (
        <div className='cluster-chart-card'>
            <span className='cluster-chart-names' >{props.title}</span>
            <div>
                {squares}
            </div>
        </div>
    )
}

export default ClusterChartCard