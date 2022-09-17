import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const LandingPage = ():JSX.Element => {
  const [namespaces, setNamespaces] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    window.api.getNamespaces()
      .then((data) => {setNamespaces(data)})
      .catch((err:Error) => {console.log('An error occurred in LandingPage in function useEffect() for namespaces')
    });
  }, [namespaces]);

  const handleNamespaceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    localStorage.setItem('namespace', e.target.value);
    navigate('/home');
  }

  return (
      <div id="landing-container">
        <form id="namespace-selector-form">
          <h2>Choose a namespace to get started</h2>
          <select name="namespace-select" 
                  id="selector-namespace" 
                  defaultValue={""}
                  onChange={e => {handleNamespaceChange(e)}}
                  >
            <option value="" disabled hidden>Choose a namespace</option>
            {namespaces.map((namespace) => <option value={namespace}>{namespace}</option>)}
          </select>
        </form>
        <img id="logo" src="./assets/logo.png" alt="" />
      </div>
  );
};

export default LandingPage;
