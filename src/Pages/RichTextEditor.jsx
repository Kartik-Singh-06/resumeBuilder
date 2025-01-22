import React, { useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnRedo,
  BtnStrikeThrough,
  BtnStyles,
  BtnUnderline,
  BtnUndo,
  Editor,
  EditorProvider,
  HtmlButton,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";

const RichTextEditor = ({onTextEditorChange}) => {
  const [value, setValue] = useState();

  return (
    <EditorProvider>
      <Editor
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onTextEditorChange(e)
        }}
        className="h-[15vh]"
      >
        <Toolbar>
          <BtnBold />
          <BtnItalic />
          <BtnStrikeThrough />
          <BtnUnderline />
          <Separator />
          <BtnRedo />
          <BtnUndo />
          <BtnNumberedList />
          <BtnBulletList />
        </Toolbar>
      </Editor>
    </EditorProvider>
  );
};

export default RichTextEditor;
