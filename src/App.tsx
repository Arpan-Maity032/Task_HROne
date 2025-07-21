import React, { useState } from "react";
import { JsonEditor } from "./components/JsonEditor";
import "./styles/App.css"

const App: React.FC = () => {
  const [data, setData] = useState({});

  const setValueAtPath = (obj: any, path: string[], value: any) => {
    if (path.length === 0) {
      return value;
    }

    const copy = structuredClone(obj);
    let temp = copy;
    for (let i = 0; i < path.length - 1; i++) {
      temp = temp[path[i]];
    }
    if (typeof value === "function") {
      temp[path[path.length - 1]] = value(temp[path[path.length - 1]]);
    } else {
      temp[path[path.length - 1]] = value;
    }
    return copy;
  };

  const handleChangeAtPath = (path: string[], value: any) => {
    const updated = setValueAtPath(data, path, value);
    setData(updated);
  };

  return (
    <div className="App" style={{ padding: "2rem" }}>
      <h2>JSON Editor</h2>
      <div className="input"><JsonEditor data={data} onChangeAtPath={handleChangeAtPath}/></div>
      <pre className="json">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default App;