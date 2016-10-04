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
  let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  let renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  let defaultMat = new THREE.MeshBasicMaterial({ color: 0x336699 });
  let defaultGeo = new THREE.BoxGeometry(0.9, 0.9, 0.1);

  let cameraRig = new Object3D();

  let stats = new Stats();
  stats.showPanel(0)
  stats.domElement.className = 'stats'
  document.body.appendChild(stats.domElement)
  //let controls = new THREE.OrbitControls ( camera, renderer.domElement )

  //let cube = new THREE.Mesh( defaultGeo, defaultMat)
  //scene.add( cube )
  scene.add(tableObjects)
  scene.add(cameraRig)

  camera.position.z = 15;
  cameraRig.add(camera)

  function addElement(elementData, index) {

    let obj = {
      geo: new THREE.BoxGeometry(0.9, 0.9, elementData.mol / 100),
      mat: new THREE.MeshBasicMaterial({ color: (index + 10) * 131586 }),//Math.floor(Math.random()*16777216)} ),
      //mesh: new THREE.Mesh(defaultGeo, obj.mat)
    }
    obj.mesh = new THREE.Mesh(obj.geo, obj.mat)
    obj.mesh.position.x = elementData.group - 9.5
    obj.mesh.position.z = elementData.mol / 200
    obj.mesh.position.y = 5 - elementData.period

    tableObjects.add(obj.mesh)
    tableArray[index] = obj

  }

  function render() {
    requestAnimationFrame(render);
    stats.begin();
    cameraRig.rotation.y -= 0.005
    renderer.render(scene, camera)
    stats.end();
  }

  function load(table) {
    //console.table(table)

    table.forEach(addElement)
    console.table(tableArray)
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