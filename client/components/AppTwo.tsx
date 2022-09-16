import Graph from "./Graph"

import { useState, useEffect } from 'react';
import ChartGrid from "./ChartGrid";

const AppTwo = () => {

    return (
        <>
            <h1> THIS IS GRAPHS! Only kind people can see it.</h1>
            <div id="contents"></div>
            <div id="left-side">
                <p>texst</p>
            </div>
            <div id="chartarea">
              <ChartGrid />
            </div>

        </>
    )
}

export default AppTwo