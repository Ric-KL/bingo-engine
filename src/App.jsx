import "./App.css";
import { useState } from "react";
import { open } from "@tauri-apps/api/dialog"
import { readTextFile } from "@tauri-apps/api/fs"
import { Store } from "@tauri-apps/plugin-store"

function App() {

  const store = new Store("store.bin")

  async function initStore() {
    await store.set("init", { value: true })
  }

  async function initVerify() {
    let val = await store.get("init")
    return val
  }

  initStore()
  console.log(`initStore: ${initVerify()}`)

  const readFileContents = async () => {
    try {
      const selectedPath = await open({
        multiple: false,
        title: "Select json File",
        defaultPath: "./src/data",
      });

      if (!selectedPath) { return }

      let strData = await readTextFile(selectedPath);
      let dataObj = JSON.parse(strData);
      let data = dataObj.data
      let name = selectedPath.split("\\").splice(-1, 1)[0]
      console.log(name)

      if (data.length < 24) {
        alert("Invalid Data File")
        return
      }

      setFileName(name)
      setDataPool(data)

    } catch (error) {
      alert("Invalid Data File")
      console.log(error)
    }
  }

  function generateBoard() {
    let masterData = dataPool.map(x => x);
    const masterKeys = Object.keys(boardEntries);
    let exportObj = {};

    masterKeys.forEach(x => {
      let index = Math.floor(Math.random() * masterData.length)
      exportObj[[x]] = masterData[index];
      masterData.splice(index, 1)
    })

    setBoardEntries(exportObj)
    resetBoard()
  }

  let [dataPool, setDataPool] = useState([])

  let [fileName, setFileName] = useState([])

  let [boardState, setBoardState] = useState({
    "1-1": false,
    "1-2": false,
    "1-3": false,
    "1-4": false,
    "1-5": false,

    "2-1": false,
    "2-2": false,
    "2-3": false,
    "2-4": false,
    "2-5": false,

    "3-1": false,
    "3-2": false,
    "3-3": true,
    "3-4": false,
    "3-5": false,

    "4-1": false,
    "4-2": false,
    "4-3": false,
    "4-4": false,
    "4-5": false,

    "5-1": false,
    "5-2": false,
    "5-3": false,
    "5-4": false,
    "5-5": false,
  })

  let [boardEntries, setBoardEntries] = useState({
    "1-1": "1-1",
    "1-2": "1-2",
    "1-3": "1-3",
    "1-4": "1-4",
    "1-5": "1-5",

    "2-1": "2-1",
    "2-2": "2-2",
    "2-3": "2-3",
    "2-4": "2-4",
    "2-5": "2-5",

    "3-1": "3-1",
    "3-2": "3-2",
    "3-4": "3-4",
    "3-5": "3-5",

    "4-1": "4-1",
    "4-2": "4-2",
    "4-3": "4-3",
    "4-4": "4-4",
    "4-5": "4-5",

    "5-1": "5-1",
    "5-2": "5-2",
    "5-3": "5-3",
    "5-4": "5-4",
    "5-5": "5-5",
  })

  function updateCellClick() {
    let key = event.target.id
    setBoardState(prevObj => {
      return (
        {
          ...prevObj,
          [key]: !prevObj[[key]]
        }
      )
    })
  }

  function resetBoard() {
    setBoardState(prevObj => {
      let newObj = {}
      for (const [key, value] of Object.entries(prevObj)) {
        if (key == "3-3") {
          newObj[[key]] = true
        }
        else {
          newObj[[key]] = false
        }
      }
      return newObj
    })
  }

  return (
    <div className="main-container">
      <div className="options-top-container">
        <div className="options-container bounds">

        </div>
        <div className="options-container bounds">
          <div className="file-selector-button" onClick={readFileContents}>
            <h2>{`Selected: ${fileName == "" ? "Select File" : fileName}`}</h2>
          </div>
        </div>
        <div className="options-container reset-generate-options">
          <div className="generate-sheet-button" onClick={generateBoard}>
            <h2>Generate</h2>
          </div>
          <div className="reset-board-button" onClick={resetBoard}>
            <h2>R</h2>
          </div>
        </div>
      </div>
      <div className="bingo-container">
        <div className="bingo-board-container">

          <div className="bingo-row row-1">
            <div id="1-1" className="bingo-cell" style={{ "backgroundColor": boardState["1-1"] ? "green" : "whitesmoke" }} onClick={updateCellClick}>
              <p>
                {boardEntries["1-1"]}
              </p>
            </div>
            <div id="1-2" className="bingo-cell" style={{ "backgroundColor": boardState["1-2"] ? "green" : "whitesmoke" }} onClick={updateCellClick}>
              <p>
                {boardEntries["1-2"]}
              </p>
            </div>
            <div id="1-3" className="bingo-cell" style={{ "backgroundColor": boardState["1-3"] ? "green" : "whitesmoke" }} onClick={updateCellClick}>
              <p>
                {boardEntries["1-3"]}
              </p>
            </div>
            <div id="1-4" className="bingo-cell" style={{ "backgroundColor": boardState["1-4"] ? "green" : "whitesmoke" }} onClick={updateCellClick}>
              <p>
                {boardEntries["1-4"]}
              </p>
            </div>
            <div id="1-5" className="bingo-cell" style={{ "backgroundColor": boardState["1-5"] ? "green" : "whitesmoke" }} onClick={updateCellClick}>
              <p>
                {boardEntries["1-5"]}
              </p>
            </div>
          </div>

          <div className="bingo-row row-2">
            <div id="2-1" className="bingo-cell" style={{ "backgroundColor": boardState["2-1"] ? "green" : "whitesmoke" }} onClick={updateCellClick}>
              <p>
                {boardEntries["2-1"]}
              </p>
            </div>
            <div id="2-2" className="bingo-cell" style={{ "backgroundColor": boardState["2-2"] ? "green" : "whitesmoke" }} onClick={updateCellClick}>
              <p>
                {boardEntries["2-2"]}
              </p>
            </div>
            <div id="2-3" className="bingo-cell" style={{ "backgroundColor": boardState["2-3"] ? "green" : "whitesmoke" }} onClick={updateCellClick}>
              <p>
                {boardEntries["2-3"]}
              </p>
            </div>
            <div id="2-4" className="bingo-cell" style={{ "backgroundColor": boardState["2-4"] ? "green" : "whitesmoke" }} onClick={updateCellClick}>
              <p>
                {boardEntries["2-4"]}
              </p>
            </div>
            <div id="2-5" className="bingo-cell" style={{ "backgroundColor": boardState["2-5"] ? "green" : "whitesmoke" }} onClick={updateCellClick}>
              <p>
                {boardEntries["2-5"]}
              </p>
            </div>
          </div>

          <div className="bingo-row row-3">
            <div id="3-1" className="bingo-cell" style={{ "backgroundColor": boardState["3-1"] ? "green" : "whitesmoke" }} onClick={updateCellClick}>
              <p>
                {boardEntries["3-1"]}
              </p>
            </div>
            <div id="3-2" className="bingo-cell" style={{ "backgroundColor": boardState["3-2"] ? "green" : "whitesmoke" }} onClick={updateCellClick}>
              <p>
                {boardEntries["3-2"]}
              </p>
            </div>
            <div id="3-3" className="bingo-cell" style={{ "backgroundColor": boardState["3-3"] ? "green" : "whitesmoke" }}>
              <p>
                Free Space
              </p>
            </div>
            <div id="3-4" className="bingo-cell" style={{ "backgroundColor": boardState["3-4"] ? "green" : "whitesmoke" }} onClick={updateCellClick}>
              <p>
                {boardEntries["3-4"]}
              </p>
            </div>
            <div id="3-5" className="bingo-cell" style={{ "backgroundColor": boardState["3-5"] ? "green" : "whitesmoke" }} onClick={updateCellClick}>
              <p>
                {boardEntries["3-5"]}
              </p>
            </div>
          </div>

          <div className="bingo-row row-4">
            <div id="4-1" className="bingo-cell" style={{ "backgroundColor": boardState["4-1"] ? "green" : "whitesmoke" }} onClick={updateCellClick}>
              <p>
                {boardEntries["4-1"]}
              </p>
            </div>
            <div id="4-2" className="bingo-cell" style={{ "backgroundColor": boardState["4-2"] ? "green" : "whitesmoke" }} onClick={updateCellClick}>
              <p>
                {boardEntries["4-2"]}
              </p>
            </div>
            <div id="4-3" className="bingo-cell" style={{ "backgroundColor": boardState["4-3"] ? "green" : "whitesmoke" }} onClick={updateCellClick}>
              <p>
                {boardEntries["4-3"]}
              </p>
            </div>
            <div id="4-4" className="bingo-cell" style={{ "backgroundColor": boardState["4-4"] ? "green" : "whitesmoke" }} onClick={updateCellClick}>
              <p>
                {boardEntries["4-4"]}
              </p>
            </div>
            <div id="4-5" className="bingo-cell" style={{ "backgroundColor": boardState["4-5"] ? "green" : "whitesmoke" }} onClick={updateCellClick}>
              <p>
                {boardEntries["4-5"]}
              </p>
            </div>
          </div>

          <div className="bingo-row row-5">
            <div id="5-1" className="bingo-cell" style={{ "backgroundColor": boardState["5-1"] ? "green" : "whitesmoke" }} onClick={updateCellClick}>
              <p>
                {boardEntries["5-1"]}
              </p>
            </div>
            <div id="5-2" className="bingo-cell" style={{ "backgroundColor": boardState["5-2"] ? "green" : "whitesmoke" }} onClick={updateCellClick}>
              <p>
                {boardEntries["5-2"]}
              </p>
            </div>
            <div id="5-3" className="bingo-cell" style={{ "backgroundColor": boardState["5-3"] ? "green" : "whitesmoke" }} onClick={updateCellClick}>
              <p>
                {boardEntries["5-3"]}
              </p>
            </div>
            <div id="5-4" className="bingo-cell" style={{ "backgroundColor": boardState["5-4"] ? "green" : "whitesmoke" }} onClick={updateCellClick}>
              <p>
                {boardEntries["5-4"]}
              </p>
            </div>
            <div id="5-5" className="bingo-cell" style={{ "backgroundColor": boardState["5-5"] ? "green" : "whitesmoke" }} onClick={updateCellClick}>
              <p>
                {boardEntries["5-5"]}
              </p>
            </div>
          </div>

        </div>
      </div>
      <div className="options-bottom-container">
        <div className="options-container bounds">

        </div>
        <div className="options-container bounds">

        </div>
        <div className="options-container bounds">

        </div>
      </div>
    </div>
  );
}

export default App;
