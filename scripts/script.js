"use strict";

(() => {
  const {
    Scene,
    Face3,
    Geometry,
    Matrix3,
    Matrix4,
    Object3D,
    Vector3,
    Vector4,
  } = THREE,
    container = document.getElementById('container');

  let url = "https://tsinoyboi.github.io/Interactive-Periodic-Table/scripts/periodicTableSimple.json";
  //let body = document.body;
  let tableArray = []
  let tableObjects = new Object3D()

  let scene = new Scene();
  let camera = new THREE.PerspectiveCamera ( 75, window.innerWidth / window.innerHeight, 0.1, 1000)
  let renderer = new THREE.WebGLRenderer();
  renderer.setSize ( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  let defaultMat = new THREE.MeshBasicMaterial( {color: 0x336699} );
  let defaultGeo = new THREE.BoxGeometry( 0.9, 0.9, 0.1 );

  //let cube = new THREE.Mesh( defaultGeo, defaultMat)
  //scene.add( cube )
  scene.add( tableObjects )

  camera.position.z = 20;
  
  function addElement( elementData, index ) {
    // let div = document.createElement('div');
    // div.textContent = elementData.symbol;
    // div.style.display = 'inline-block'
    // div.style.width = 40
    // div.style.height = 60
    // div.style.position = 'absolute'
    // div.style.left = elementData.group * 40
    // div.style.top = elementData.period * 60
    // body.appendChild(div)
    // tableDOM[index] = div

    let obj = {
      //mesh = new THREE.boxGeometry()
      mesh: new THREE.Mesh ( defaultGeo, defaultMat )
    } 

    obj.mesh.position.x = elementData.group - 10
    obj.mesh.position.y = 5 - elementData.period

    tableObjects.add(obj.mesh)
    tableArray[index] = obj

  }

  function render() {
    requestAnimationFrame (render);
    renderer.render ( scene, camera )
  }

  function load(table) {
    //console.table(table)

    table.forEach(addElement)
    render()
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