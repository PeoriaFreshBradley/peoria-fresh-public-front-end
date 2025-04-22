// THIS FILE SHOULD NEVER APPEAR IN PRODUCTION
// it's used to update the database with changes made to the trimmed_food.csv in the src folder
// it can safely be deleted.

import React, { useEffect, useRef } from "react";
import { instance as axios } from "axios-instance";
import APIURL from "../APIURL";

const ProduceGenerator = () => {
  const myForm = useRef(null);
  const csvFile = useRef(null);

  function csvToArray(str, delimiter = ",") {
    // slice from start of text to the first \n index
    // use split to create an array from string by delimiter
    const headers = str.slice(0, str.indexOf("\n")).split(delimiter);

    // slice from \n index + 1 to the end of the text
    // use split to create an array of each csv value row
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");

    // Map the rows
    // split values from each row into an array
    // use headers.reduce to create an object
    // object properties derived from headers:values
    // the object passed as an element of the array
    const arr = rows.map(function (row) {
      const values = row.split(delimiter);
      const el = headers.reduce(function (object, header, index) {
        object[header] = values[index];
        return object;
      }, {});
      return el;
    });

    // return the array
    return arr;
  }

  const submitFn = (e) => {
    e.preventDefault();
    const input = csvFile.current.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      const text = e.target.result;
      const data = csvToArray(text);

      data.forEach((entry, idx) => {
        // const growingZone = entry.growingZone.toString();
        // let combine = false;
        // let newGrowingZone = [];
        // growingZone.split("").forEach((str, idx) => {
        //   if (combine) {
        //     newGrowingZone.push(
        //       Number(`${growingZone[idx - 1]}${growingZone[idx]}`)
        //     );
        //     combine = false;
        //   } else if (str === '1' && idx < growingZone.length - 1) {
        //     const next = growingZone[idx + 1];
        //     if (next <= str) combine = true;
        //     else newGrowingZone.push(Number(str));
        //   }
        //   else newGrowingZone.push(Number(str));
        // });
        // newGrowingZone = JSON.stringify(newGrowingZone);
        // console.log(newGrowingZone, typeof newGrowingZone)
        //   const queryTxt =
        //     entry.filtertxt || entry?.name?.replace(/ /g, "-")?.replace(/"/g, "");
        //   const type = entry.type.replace(/(\r\n|\n|\r)/gm, "");

        //   setTimeout(() => {
        //     axios
        //       .get(`https://openfarm.cc/api/v1/crops?filter=${queryTxt}`)
        //       .then((resp) => {
        //         if (resp.data.data.length > 0 && resp.data.included.length > 0) {
        //           const response = resp.data.data[0];
        //           const imgData = resp.data.included[0].attributes;
        const produce = {
          name: entry.name,
          // description: response.attributes.description || "",
          // type: type,
          // difficulty: entry.difficulty,
          // weeks: Number.isNaN(Number(entry.weeks))
          //   ? 0
          //   : Number(entry.weeks),
          // growingZone: newGrowingZone,
          // otherNames: response?.attributes.common_names || [],
          // season: entry.season,
          // harvestStart: entry.harvestStart,
          // harvestEnd: entry.harvestEnd,
          // smallPhotoURL: entry.newPhoto || imgData.small_url || "",
          // largePhotoURL: entry.newPhoto || imgData.large_url || "",
          // unitMultiplier: Number(entry.unitMultiplier)
        };
        //           // const otherNames = response?.attributes.common_names || [];
        //           // console.log(otherNames)
        //           // otherNames.forEach((name) => {
        //           //   axios.post(`${APIURL}/produce-names`, {
        //           //     name,
        //           //     produce: { id: entry.id },
        //           //   });
        //           // });
        const id =
          // location.hostname === "localhost" ||
          // location.hostname.includes("peoria-fresh-staging")
          //   ? idx + 1
          //   :
             entry.id;
        console.log("uploading ", produce, id);
        axios.patch(`${APIURL}/produce/${id}`, produce);

        //           axios.post(`${APIURL}/produce`, produce);
        //         }
        //       });
        //   }, 5000 * (idx + 1));
      });
    };

    reader.readAsText(input);
  };

  useEffect(() => {
    if (myForm.current) {
      myForm.current.addEventListener("submit", submitFn, { once: true });
    } else {
      console.log("myForm.current is null");
    }
    return () => {
      myForm.current.removeEventListener("submit", submitFn);
    };
  }, []);

  return (
    <React.Fragment>
      <div className="ProduceGenerator">
        <form id="myForm" ref={myForm}>
          <input type="file" id="csvFile" ref={csvFile} accept=".csv" />
          <br />
          <button type="submit" onClick={submitFn}>
            Submit
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default ProduceGenerator;
