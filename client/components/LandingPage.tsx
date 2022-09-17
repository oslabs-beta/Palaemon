import { useState, useEffect } from "react";
import { ClusterChartProps, SvgInfo, ModalProps, Lulu } from "../Types";

const LandingPage = ():JSX.Element => {

  const getNamespaces = async () => {
    const namespaces = await window.api.getNamespaces();
    console.log('I am namespaces ', namespaces);
  }

  getNamespaces();

  return (
      <div id="landing-container">
        <form id="namespace-selector-form">
          <h2>Choose a namespace to get started</h2>
          <select name="namespace-select" id="selector-namespace" defaultValue={""}>
            <option value="" disabled hidden>Choose a namespace</option>
            <option value=""></option>
          </select>
        </form>
        <img id="logo" src="./assets/logo.png" alt="" />
      </div>
  );
};

export default LandingPage;
