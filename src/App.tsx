import React, { useEffect } from "react";
import "./App.css";
import { Layer } from "./components/Layer/Layer";
import { Canvas } from "./components/Canvas/Canvas";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
  loadData,
  selectItemLayers,
  selectError,
  selectErrorMessage,
  LayerType,
} from "./data/dataSlice";
import { changeDrawCanvasState } from "./components/Canvas/CanvasSlice";

function App() {
  const dispatch = useAppDispatch();
  const itemLayers = useAppSelector(selectItemLayers);

  function handleSaveImgCLick(): void {
    dispatch(changeDrawCanvasState(true));
  }

  useEffect(() => {
    dispatch(loadData());
  }, []);

  return (
    <div className="App">
      <header>
        <nav>
          <span className="logo">TiPi</span>
          <div className="links">
            <p>
              <a href="#main">About</a>
            </p>
            <p>
              <a href="#design">Design</a>
            </p>
            <p>
              <a href="#contact">Contact</a>
            </p>
          </div>
        </nav>
        <h1>A place where your dream design will come through.</h1>
        <p className="text">
          Our quick design app allows you to check some of the projects that our
          top designers prepared for you! You may find something you like, or it
          may inspire you to create your own custom made project of your dream
          kitchen!
        </p>
      </header>

      <main id="main">
        <div className="discription">
          <h2>Take your kitchen desing into your own hands!</h2>
          <p className="text">
            Each layer of our designing app represents a different aspect of
            your kitchen. Play around with the options presented to you to see
            what incredible design you can create on your own!
          </p>
        </div>

        {/* error message */}
        {/* {error && <Error error={errorMessage} />} */}

        <section id="design" className="design-selection-container">
          {itemLayers &&
            itemLayers.map((layer: LayerType) => (
              <Layer key={layer.order} layer={layer} />
            ))}
        </section>

        <section className="desigin-display-container">
          {/* Canvas with preview images */}
          {/* {!error && <Canvas />} */}
          <Canvas />
        </section>

        <section className="buttons-container">
          <div className="button-container">
            <h3>Not inspired yet?</h3>
            {/*  onClick={handleNewDesignsClick}*/}
            <p className="btn new-items-btn">Load new designs!</p>
          </div>
          {/* onClick={handleSaveImgCLick} */}
          <div className="button-container" onClick={handleSaveImgCLick}>
            <h3>Satysfied?</h3>
            <p className="btn save-design-btn">Save your design!</p>
          </div>
        </section>
      </main>
      <footer id="contact">
        <h3>Have any questiones or want to share ideas?</h3>
        <div className="contacts">
          <p>Email: example-email@.fakePortal.com</p>
          <p>Tel: xxxx-xxx-xxx</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
