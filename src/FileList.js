import React from "react";
import FileUpload from "./FileUpload";

function FileList({ files = [] }) {
  return (
    <section className="files">
      <ul>
        {files.map((file, idx) => {
          return <FileUpload file={file} key={idx} />;
        })}
      </ul>
    </section>
  );
}

export default FileList;
