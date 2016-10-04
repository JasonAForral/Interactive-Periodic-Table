"use strict";

(() => {
  const {
  Face3,
  Geometry,
  Matrix3,
  Matrix4,
  Object3D,
  Vector3,
  Vector4,
} = THREE,
container = document.getElementById('container')

let url = "http://tsinoyboi.github.io/scripts/periodicTableSimple.json";
let body = document.body;
let tableDOM = []

function addElement (elementData, index) {
  let div = document.createElement('div');
  div.textContent = elementData.symbol;
  div.style.display = 'inline-block'
  div.style.width = 40
  div.style.height = 60
  div.style.position = 'absolute'
  div.style.left = elementData.group * 40
  div.style.top = elementData.period * 60
  body.appendChild(div)
  tableDOM[index] = div
}

function load (table) {
  //console.log()
  //table = JSON.parse(table)
  console.table(table)
  
  table.forEach(addElement)



  //console.log(tableDOM[0])
  
}


function getJSON(url, callback) {
let xhr = new XMLHttpRequest();
xhr.onload = function () { 
callback(JSON.parse(this.response)) 
};
xhr.open("GET", url, true);
xhr.send();
}

getJSON(url, load)


})()