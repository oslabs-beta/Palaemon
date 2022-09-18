import { ClusterChartCardProps } from '../Types';

const ClusterChartCard = (props: ClusterChartCardProps): JSX.Element => {

    const squares: JSX.Element[] = [];
    const colors: string[] = ['#69B34C', '#ACB334', '#FAB733', '#FF8E15', '#FF4E11', '#FF0D0D', '#363636']

    let index: number = 0;

    for (let i = 0; i < props.data.length; i++) {
        let usage: number = props.data[i].usage - props.data[i].request;
        let limit: number = props.data[i].limit - props.data[i].request;
        if (usage < 0) index = 0;
        else if (usage < 0.2 * limit) index = 1;
        else if (usage < 0.4 * limit) index = 2;
        else if (usage < 0.6 * limit) index = 3;
        else if (usage < 0.8 * limit) index = 4;
        else if (props.data[i].unit === undefined || props.data[i].unit=== null) index = 6;
        else index = 5;
        squares.push(
            <svg 
            onClick={(e: any) => props.click(e, props.data[i])}
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