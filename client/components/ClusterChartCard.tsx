import * as React from 'react';
import { ClusterChartCardProps } from '../Types';


const ClusterChartCard = (props: ClusterChartCardProps): JSX.Element => {
    const squares: JSX.Element[] = [];
    const colors: string[] = ['#69B34C', '#ACB334', '#FAB733', '#FF8E15', '#FF4E11', '#FF0D0D']

    let index: number = 0;

    for (let i = 0; i < props.usage.length; i++) {
        let usage: number = props.request[i] - props.usage[i];
        let limit: number = props.limit[i] - props.request[i];
        if (usage < 0) index = 0;
        else if (usage < 0.2 * limit) index = 1;
        else if (usage < 0.4 * limit) index = 2;
        else if (usage < 0.6 * limit) index = 3;
        else if (usage < 0.8 * limit) index = 4;
        else if (usage < 1.0 * limit) index = 5;
        squares.push(
            <svg onClick={() => props.click(props.name[i])} >
                <rect width="10" height="10" rx="3" fill={colors[index]} />
            </svg>)
    }

    return (
        <div className='cluster-chart-card'>
            <span>{props.title}</span>
                {squares}
        </div>
    )
}

export default ClusterChartCard