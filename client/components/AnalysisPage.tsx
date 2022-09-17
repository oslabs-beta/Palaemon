import Graph from './Graph';

import { useState, useEffect } from 'react';
import ChartGrid from './ChartGrid';
import { AnalysisPageProps } from '../Types';

const AnalysisPage = (props: AnalysisPageProps) => {
  const { analyze, setAnalyze } = props;
  console.log('ANA', analyze);
  const addedOOMKills = analyze.map(oomkill => {
    console.log('OOMKILLS', oomkill);
    return (
      <option value="${}">{`Pod: ${oomkill.podName} Terminated At: ${oomkill.started}`}</option>
    );
  });

  return (
    <>
      <h1> THIS IS GRAPHS! Only kind people can see it.</h1>
      <div id="contents"></div>
      <div id="left-side">
        <select>{addedOOMKills}</select>
      </div>
      <div id="chartarea">
        <ChartGrid />
      </div>
    </>
  );
};

export default AnalysisPage;
