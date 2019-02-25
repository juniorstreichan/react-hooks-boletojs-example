import React, { useState } from "react";
import "./App.css";
import * as Boleto from "boleto.js";

function App() {
  const [code, setCode] = useState("");
  return (
    <div className="App">
      <h1>Boleto.js React Hooks example</h1>
      <input
        type="text"
        style={{
          width: "80%",
          height: "2em",
          textAlign: "center",
          fontSize: "1em"
        }}
        placeholder="[ Digite o número do boleto aqui ]"
        onChange={e => setCode(e.target.value)}
      />
      {code && <Ticket code={code} />}
    </div>
  );
}

function Button(props) {
  return (
    <button style={{ padding: "5px", minWidth: "40px" }} {...props}>
      {props.children}
    </button>
  );
}

function Ticket({ code }) {
  try {
    const boleto = new Boleto(code);
    const [percentBarcode, setBarCodeZoom] = useState(100);

    return (
      <div style={{ padding: "2em", margin: "1em", border: "1px solid black" }}>
        <table>
          <tbody>
            <tr>
              <td style={{ textAlign: "right" }}>Banco:</td>
              <td style={{ textAlign: "left" }}>
                <b>{boleto.bank()}</b>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "right" }}>Valor:</td>
              <td style={{ textAlign: "left" }}>
                <b>{boleto.prettyAmount()}</b>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "right" }}>Data de validade:</td>
              <td style={{ textAlign: "left" }}>
                <b>{boleto.expirationDate().toLocaleDateString()}</b>
              </td>
            </tr>
          </tbody>
        </table>
        <hr />
        <p>Zoom {percentBarcode}%</p>
        <Button
          disabled={percentBarcode <= 20}
          onClick={() => setBarCodeZoom(percentBarcode - 5)}
        >
          -
        </Button>
        <Button
          disabled={percentBarcode === 100}
          onClick={() => setBarCodeZoom(100)}
        >
          [ 100% ]
        </Button>
        <Button
          disabled={percentBarcode === 100}
          onClick={() => setBarCodeZoom(percentBarcode + 5)}
        >
          +
        </Button>
        <hr />
        <div
          style={{ width: `${percentBarcode}%` }}
          dangerouslySetInnerHTML={{ __html: boleto.toSVG() }}
        />
        <p>{boleto.barcode()}</p>
      </div>
    );
  } catch (error) {
    return <p style={{ color: "red" }}>Invalid bank slip number</p>;
  }
}

export default App;
