import "./App.css";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";

function App() {
  let [pinCode, setPinCode] = useState("");

  let [loading, setLoading] = useState(false);

  let [nameData, setNameData] = useState([]);

  const getData = () => {
    setLoading(true);
    axios
      .get(`https://api.postalpincode.in/pincode/${pinCode}`)
      .then((reponse) => {
        let data = reponse.data;
        if (data !== undefined) {
          setNameData(data[0].PostOffice);
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    console.log(nameData);
  }, [nameData]);

  useEffect(() => {
    if (pinCode) {
      console.log("here");
      // getData()
    }
  }, [pinCode]);

  useEffect(() => {
    let getPostalCode = setTimeout(() => {
      if (pinCode) {
        console.log("here");
        // setLoading(true);
        // getData();
      }
    }, 1000);

    return () => clearTimeout(getPostalCode);
  }, [pinCode]);

  return (
    <div className="App">
      <div className="pincodeInputContainer">
        <input
          placeholder="Search Postal-Code Here... "
          type="search"
          onChange={(event) => {
            setPinCode(event.target.value);
          }}
        ></input>
        <button className="enterButton" onClick={getData}>
          Enter
        </button>
      </div>

      {loading ? (
        <div>
          <ClipLoader color={"#65edf1"} loading={loading} size={50} />
        </div>
      ) : (
        <div className="table_Container">
          <table>
            <thead>
              <tr>
                <th>Branch</th>
                <th>PostalName</th>
                <th>PinCode</th>
                <th>State</th>
                <th>Country</th>
              </tr>
            </thead>

            <tbody>
              {nameData?.map((data, index) => {
                return (
                  <tr key={index}>
                    <td>{data?.BranchType}</td>
                    <td>{data?.Name}</td>
                    <td>{data?.Pincode}</td>
                    <td>{data?.State}</td>
                    <td>{data?.Country}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot></tfoot>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
