import * as React from "react";
import { useState } from "react";

function exists(arr, n) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][0] == n) {
      return true;
    }
  }
  return false;
}

function getDup(arr) {
  let dup = [];
  for (let i = 0; i < arr.length; i++) {
    if (exists(dup, arr[i])) {
      for (let n = 0; n < dup.length; n++) {
        if (dup[n][0] == arr[i]) {
          dup[n][1]++;
        }
      }
    } else {
      dup.push([arr[i], 1]);
    }
  }

  for (let j = 0; j < dup.length; j++) {
    console.log(dup[j]);
  }
}

export default function Home() {
  let arr = ["a", "b", "c", "c"];

  getDup(arr);
  const [bgColor, setBgColor] = useState("blue");
  return (
    <>
      <h1>Title</h1>
      <button
        className={{ color: "red" }}
        onClick={() => {
          setBgColor("red");
        }}
      >
        Click Me
      </button>
    </>
  );
}
