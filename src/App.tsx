import React from "react";
import ListComponent from "./components/ListComponent";
import StarBackground from "./components/StarBackground";

const App: React.FC = () => {
  return (
    <div >
      <StarBackground />
      <h1>Список элементов с бесконечным скроллом</h1>
      <ListComponent />
    </div>
  );
};

export default App;
