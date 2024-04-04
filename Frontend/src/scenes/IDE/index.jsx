import React, { useEffect, useRef, useState } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/clike/clike";
import CodeMirror from "codemirror";

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
          height: "400px",
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

  const handlePDF = async () => {
    const code = editorRef.current.getValue();
    const input = document.getElementById("input").value;
    const output = document.getElementById("output").value;

    const response = await fetch("http://localhost:3000/generatepdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code, input, output }),
    });
  };

  return (
    <div>
      <div className="text-center my-5">
        <h2 className="text-4xl tracking-tight font-bold text-blue-800">
          Coddies
        </h2>
      </div>
      <form
        id="myform"
        name="myform"
        method="post"
        action="http://localhost:3000/compilecode"
        onSubmit={handleSubmit}
        className="w-full"
      >
        <div className="w-full my-2 flex flex-col items-center rounded-lg shadow md:flex-row bg-gray-100 ">
          <div className="mx-auto mb-2 text-xl font-bold text-center tracking-tight text-gray-600">
            Language :
            <select name="lang" onChange={handleLangChange}>
              <option value="C">C</option>
              <option value="Java">Java</option>
              <option value="Python">Python</option>
            </select>
          </div>
          <div className="mx-auto flex flex-col justify-between px-4 leading-normal">
            <div className="mb-3 font-normal text-gray-500">
              <div className="flex items-center text-gray-500">
                <span className="mr-2">Compile With Input :</span>
                <input
                  type="radio"
                  name="inputRadio"
                  id="inputRadio"
                  value="true"
                  className="form-radio h-4 w-4 text-blue-500"
                />{" "}
                <span className="mx-2">Yes</span>
                <input
                  type="radio"
                  name="inputRadio"
                  id="inputRadio"
                  value="false"
                  className="form-radio h-4 w-4 text-blue-500"
                />
                <span className="mx-2">No</span>
              </div>
            </div>
          </div>
          <div className="mx-auto flex flex-col justify-between py-2 leading-normal">
            <div className="font-normal text-gray-300">
              <div>
                <input
                  type="submit"
                  value="</>"
                  name="submit"
                  className="bg-blue-600 hover:bg-blue-800  font-bold mx-4 py-2 px-4 rounded-full"
                />
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-blue-600 hover:bg-blue-800  font-bold mx-4 py-2 px-4 rounded-full"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handlePDF}
                  className="bg-blue-600 hover:bg-blue-800 font-bold mx-4 py-2 px-4 rounded-full"
                >
                  PDF
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="row-span-2">
            <textarea id="code" name="code"></textarea>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Input</h3>
            <textarea
              id="input"
              name="input"
              className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              style={{ height: "200px" }}
            ></textarea>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Output</h3>
            <textarea
              id="output"
              name="output"
              className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              style={{ height: "200px" }}
            ></textarea>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Ide;
