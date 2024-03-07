import React, { useEffect, useRef } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/clike/clike";
import CodeMirror from "codemirror";

const Ide = () => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = CodeMirror.fromTextArea(
        document.getElementById("code"),
        {
          mode: "text/x-c++src",
          theme: "dracula",
          lineNumbers: true,
          autoCloseBrackets: true,
        }
      );
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    // Send AJAX request
    fetch("/compilecode", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to compile code");
        }
      })
      .then((data) => {
        // Update the output textarea with the received data
        const outputValue = data.output || "";
        document.getElementById("output").value = outputValue;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <form id="myform" name="myform" onSubmit={handleSubmit} className="m-3">
        <div className="flex justify-between mb-2 bg-gray-800 rounded p-2">
          <select
            name="lang"
            className="form-select w-1/4"
            id="inlineFormSelectPref"
          >
            <option value="C">C</option>
            <option value="C++">C++</option>
            <option value="Python">Python</option>
          </select>
          <div>
            <button type="button" className="btn btn-success">
              Coddies
            </button>
            <input
              id="run"
              className="btn btn-success ml-2"
              type="submit"
              value="submit"
              name="submit"
            />
          </div>
        </div>
        <textarea
          type="text"
          id="code"
          className="form-control h-64 w-full mt-2 border rounded"
          aria-label="Code"
          name="code"
        ></textarea>
        <div className="flex flex-col mt-4">
          <label htmlFor="input" className="text-light">
            Input
          </label>
          <textarea
            type="text"
            id="input"
            className="form-control h-24 border rounded"
            aria-label="Input"
            rows="4"
            name="input"
          ></textarea>
        </div>
        <div className="flex flex-col mt-4">
          <label htmlFor="output" className="text-light">
            Output
          </label>
          <textarea
            type="text"
            id="output"
            className="form-control h-24 border rounded"
            aria-label="Output"
            rows="4"
            readOnly
          ></textarea>
        </div>
        <div className="flex items-center mt-2">
          <input
            className="form-check-input mr-2"
            type="radio"
            name="inputRadio"
            id="inputYes"
            value="true"
          />
          <label className="form-check-label mr-4" htmlFor="inputYes">
            {" "}
            Yes{" "}
          </label>
          <input
            className="form-check-input mr-2"
            type="radio"
            name="inputRadio"
            id="inputNo"
            value="false"
            defaultChecked
          />
          <label className="form-check-label" htmlFor="inputNo">
            {" "}
            No{" "}
          </label>
        </div>
      </form>
    </div>
  );
};

export default Ide;
