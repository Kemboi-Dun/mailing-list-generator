import React from "react";

const FileDrag_and_drop = () => {
  const handleDragEnter = () => {};

  const handleDragLeave = () => {};
  const handleDragOver = () => {};
  const handleSubmit = () => {};
  const handleDrop = () => {};
  const handleChange = () => {};
  const openFileExplorer = () => {};

  return (
    <div>
      <form
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        onDrop={handleDrop}
      >
        <input
          type="file"
          placeholder="fileInput"
          className="hidden"
          //   ref={inputRef}
          onChange={handleChange}
          accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
        />

        <span>
          Drag and Drop files or{" "}
          <p onClick={openFileExplorer}>
            <u>Select Files</u>
          </p>{" "}
          to upload
        </span>
      </form>
    </div>
  );
};

export default FileDrag_and_drop;
