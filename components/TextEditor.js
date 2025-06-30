// components/TextEditor.jsx
import React, { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import {
  EditorState,
  ContentState,
  convertToRaw,
  convertFromHTML,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import style from "./textEditor.module.css";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function TextEditor({ onChange, initialContent = "" }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (initialContent) {
      const blocksFromHTML = htmlToDraft(initialContent);
      const contentState = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
    } else {
      setEditorState(EditorState.createEmpty());
    }
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditorChange = (state) => {
    setEditorState(state);
    const rawContentState = convertToRaw(state.getCurrentContent());
    const html = draftToHtml(rawContentState);
    onChange(html); // send HTML up to parent
  };

  return (
    <div className={style.textEditor}>
      <Editor
        wrapperClassName={style.wrapper}
        editorClassName={style.editor}
        toolbarClassName={style.toolbar}
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        toolbar={{
          options: ["inline", "blockType", "list", "link", "emoji", "image"],
        }}
      />
    </div>
  );
}
