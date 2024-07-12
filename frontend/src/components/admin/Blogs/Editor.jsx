import React, { useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Editor = () => {
  const quillRef = useRef(null);

  useEffect(() => {
    const editor = quillRef.current.getEditor();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        // Handle mutations here if needed
        console.log("Mutation observed:", mutation.type);
      });
    });

    const editorElement = editor.root;
    observer.observe(editorElement, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <ReactQuill
      ref={quillRef}
      theme="snow"
      modules={{ toolbar: true }}
      formats={["bold", "italic", "underline", "link"]}
      placeholder="Write something amazing..."
    />
  );
};

export default Editor;
