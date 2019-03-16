import React from "react";
import ReactDOM from "react-dom";
import UploadIcon from "./UploadIcon";
import FileList from "./FileList";
import Clipboard from "react-clipboard.js";
import "./styles.css";
import image from "./undraw_Outer_space_drqu.png";

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

function DropTarget({ onUplodFiles }) {
  function handleDrop(evt) {
    preventDefaults(evt);
    const files = Array.from(evt.dataTransfer.files);
    onUplodFiles(files);
  }
  function handleChange(evt) {
    const files = Array.from(evt.target.files);
    onUplodFiles(files);
  }

  return (
    <label
      className="target"
      onDrop={handleDrop}
      onDragEnter={preventDefaults}
      onDragOver={preventDefaults}
      htmlFor="fileInput"
    >
      <image className="icon">
        <UploadIcon />
      </image>
      <p>Drop your *.png or *.jpeg files here</p>
      <p>
        <small>Up to 20 images, max 5Mb each</small>
      </p>
      <input
        accept="image/*"
        id="fileInput"
        type="file"
        multiple="multiple"
        onChange={handleChange}
      />
    </label>
  );
}

const MAX_FILES = 10;
const MAX_FILESIZE = 20 * 1024 * 1024;

function validateFiles(files) {
  // maximum amount of files
  // maximun filesize
  return files.slice(0, MAX_FILES).filter(file => file.size < MAX_FILESIZE);
}

function App() {
  const [files, setFiles] = React.useState([]);

  function handleUploadFiles(files) {
    setFiles(validateFiles(files));
  }

  return (
    <div className="App">
      <header>
        <section className="upload">
          <DropTarget onUplodFiles={handleUploadFiles} />
        </section>
        {files.length > 0 ? <FileList files={files} /> : null}
      </header>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
