import React from "react";
import cx from "classnames";

const progressLabels = {
  pending: "Waiting...",
  uploading: "Uploading...",
  success: "Finished",
  failure: "Upload failed!!"
};

function ProgressBar({ progress, state = "pending" }) {
  const _progress = state === "success" ? 100 : progress;

  return (
    <div
      className={cx("progress", {
        "progress--pending": state === "pending",
        "progress--uploading": state === "uploading",
        "progress--success": state === "success",
        "progress--failure": state === "failure"
      })}
    >
      <div className="bar" style={{ width: `${_progress}%` }}>
        <span>{progressLabels[state]} </span>
      </div>
    </div>
  );
}

export default ProgressBar;
