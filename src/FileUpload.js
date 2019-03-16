import React from "react";
import ProgressBar from "./ProgressBar";
import ClippyBtn from "./ClippyBtn";
import { formatSize, uploadFile } from "./utils";
import Clipboard from "react-clipboard.js";

// config variables
const stage = "dev";
const region = "eu-west-1";
const bucket = `sweepbright-images-presets-${stage}`;
const presetNames = [
  "thumbnail",
  "homepage_cover",
  "agency_website_company_logo"
];

function getKey(file, { type = "original", preset } = {}) {
  return `${
    type === "original" ? "originals" : `resized/${preset}`
  }/${file.name.replace(" ", "+")}`;
}

function getImageLink(file, options) {
  return `https://s3-${region}.amazonaws.com/${bucket}/${getKey(
    file,
    options
  )}`;
}

// when used as static website hosting, we can use this url
// instead

function getWebsiteImageLink(file, options) {
  return `http://${bucket}.s3-website-${region}.amazonaws.com/${getKey(
    file,
    options
  )}`;
}

function FileUpload({ file }) {
  const [state, setState] = React.useState("pending");
  const [progres, setProgress] = React.useState(0);
  const [showDetails, setShowDetails] = React.useState(false);
  const [preset, setPreset] = React.useState("thumbnail");

  React.useEffect(
    () => {
      uploadFile(file, uploadProgress => {
        setState("uploading");
        setProgress(uploadProgress);
      })
        .then(() => {
          setState("success");
        })
        .catch(err => {
          setState("failure");
        });
    },
    [file]
  );

  return (
    <li>
      <div className="overview-block">
        <div className="before">
          <span className="size">{formatSize(file.size)} </span>
          {file.name}
        </div>
        <ProgressBar progress={progres} state={state} />
        <div className="after">
          {state === "success" && (
            <a href={getImageLink(file)} target="_blank">
              Open
            </a>
          )}

          {state === "success" && (
            <button className="details" onClick={() => setShowDetails(s => !s)}>
              Toggle Details
            </button>
          )}
        </div>
      </div>
      {showDetails ? (
        <div className="details-block">
          <img src={getImageLink(file)} />
          <div className="path_row">
            <p>{`BASE_PATH/originals/${file.name}`}</p>{" "}
            <Clipboard
              component="button"
              data-clipboard-text={getImageLink(file)}
              className="copy-clipboard-btn"
            >
              <ClippyBtn />
            </Clipboard>
          </div>
          <div className="path_row">
            <p>
              {`BASE_PATH/resized/`}
              <select
                value={preset}
                onChange={evt => {
                  setPreset(evt.target.value);
                }}
              >
                {presetNames.map(presetName => (
                  <option value={presetName} key={presetName}>
                    {presetName}
                  </option>
                ))}
              </select>
              {`/${file.name}`}
            </p>
            <Clipboard
              component="button"
              data-clipboard-text={getImageLink(file, {
                type: "resized",
                preset
              })}
              className="copy-clipboard-btn"
            >
              <ClippyBtn />
            </Clipboard>
          </div>
        </div>
      ) : null}
    </li>
  );
}

export default FileUpload;
