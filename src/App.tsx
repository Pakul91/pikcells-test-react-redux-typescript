import React, { useEffect } from "react";
import "./sass/main.scss";
import { Layers } from "./sections/Layers/Layers";
import { Canvas } from "./sections/Canvas/Canvas";
import { Error } from "./components/Error/Error";
import { Header } from "./sections/Header/Header";
import { Description } from "./sections/Description/Description";
import { ActionButtons } from "./sections/ActionButtons/ActionButtons";
import { Footer } from "./sections/Footer/Footer";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { loadData, selectError, selectErrorMessage } from "./data/dataSlice";

function App() {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectError);
  const errorMessage = useAppSelector(selectErrorMessage);

  useEffect(() => {
    dispatch(loadData());
  }, []);

  return (
    <div className="App">
      <Header />
      <main id="main">
        <Description />
        {/* error message */}
        {error && <Error error={errorMessage} />}
        {/* Layers with items loaded from API */}
        {!error && <Layers />}
        {/* Canvas with preview images */}
        {!error && <Canvas />}
        {/* buttons to load new data or save img */}
        {!error && <ActionButtons />}
      </main>
      <Footer />
    </div>
  );
}

export default App;
