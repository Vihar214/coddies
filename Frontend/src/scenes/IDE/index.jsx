import React, { useEffect, useRef, useState } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/clike/clike";
import CodeMirror from "codemirror";
import jsPDF from "jspdf";

const Ide = () => {
  const editorRef = useRef(null);
  const [lang, setLang] = useState("C");

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = CodeMirror.fromTextArea(
        document.getElementById("code"),
        {
          mode: "text/x-c++src",
          theme: "dracula",
          autoCloseBrackets: true,
          autoCloseQuotes: true,
        }
      );
    }
  }, []);
  const handleSave = () => {
    const codeToSave = editorRef.current.getValue();
    const langExtension = {
      C: "c",
      Java: "java",
      Python: "py",
    }[lang];
    const blob = new Blob([codeToSave], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `code.${langExtension}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    const response = await fetch("http://localhost:3000/compilecode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    console.log(responseData);
    if (responseData.output) {
      document.getElementById("output").value = responseData.output;
    } else {
      document.getElementById("output").value = responseData.error;
    }
  };
  const handleLangChange = (e) => {
    setLang(e.target.value);
    if (e.target.value === "C") {
      editorRef.current.setOption("mode", "text/x-c++src");
    } else if (e.target.value === "Java") {
      editorRef.current.setOption("mode", "text/x-java");
    } else if (e.target.value === "Python") {
      editorRef.current.setOption("mode", "text/x-python");
    }
  };

  const handlePDF = () => {
    const pdf = new jsPDF();
    const code = editorRef.current.getValue();
    const output = document.getElementById("output").value;
    pdf.text("Code:", 10, 10);
    pdf.text(code, 10, 20);
    pdf.text("Output:", 10, 50);
    pdf.text(output, 10, 60);
    pdf.save("code.pdf");
  };

  return (
    <div>
      <center>
        <h1>Online IDE</h1>
        <form
          id="myform"
          name="myform"
          method="post"
          action="http://localhost:3000/compilecode"
          onSubmit={handleSubmit}
        >
          <textarea rows="10" cols="100" id="code" name="code"></textarea>
          <br />
          <h3>Input</h3>
          <textarea rows="10" cols="100" id="input" name="input"></textarea>
          <h3>output</h3>
          <textarea rows="10" cols="100" id="output" name="output"></textarea>
          <br />
          Language :
          <select name="lang" onChange={handleLangChange}>
            <option value="C">C</option>
            <option value="Java">Java</option>
            <option value="Python">Python</option>
          </select>
          Compile With Input :
          <input type="radio" name="inputRadio" id="inputRadio" value="true" />
          yes
          <input type="radio" name="inputRadio" id="inputRadio" value="false" />
          No
          <br />
          <input type="submit" value="submit" name="submit" />
          <button type="button" onClick={handleSave}>
            Save
          </button>
          <button type="button" onClick={handlePDF}>
            Download PDF
          </button>
        </form>
      </center>
    </div>
  );
};

export default Ide;
