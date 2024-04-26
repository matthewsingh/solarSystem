
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GUI } from './node_modules/dat.gui/build/dat.gui.module.js';


let scene, camera, renderer, controls, skybox;
let moon, sun, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune;
let planet_sun_label;

let moon_orbit_radius = 5
let mercury_orbit_radius = 50
let venus_orbit_radius = 60
let earth_orbit_radius = 70
let mars_orbit_radius = 80
let jupiter_orbit_radius = 100
let saturn_orbit_radius = 120
let uranus_orbit_radius = 140
let neptune_orbit_radius = 160

const speed = {
moon_revolution_speed : 2,
mercury_revolution_speed : 2,
venus_revolution_speed : 1.5,
earth_revolution_speed : 1,
mars_revolution_speed : 0.8,
jupiter_revolution_speed : 0.7,
saturn_revolution_speed : 0.6,
uranus_revolution_speed : 0.5,
neptune_revolution_speed : 0.4,
}


/*let mercury_revolution_speed = 2
let venus_revolution_speed = 1.5
let earth_revolution_speed = 1
let mars_revolution_speed = 0.8
let jupiter_revolution_speed = 0.7
let saturn_revolution_speed = 0.6
let uranus_revolution_speed = 0.5
let neptune_revolution_speed = 0.4*/

/*
var raycaster = new THREE.Raycaster();

document.addEventListener('mousedown', onMouseDown);

function onMouseDown(event){
  const coords = new THREE.Vector2(
    ( event.clientX / window.clientWidth ) * 2 - 1,
    -(( event.clientY / window.clientHeight ) * 2 + 1), 
    );

    raycaster.setFromCamera(coords, camera);

    const intersections = raycaster.intersectObjects(scene.children, true);

    if (intersections.length > 0) {
      const selectedObject = intersections[0].object;
      const color = new THREE.Color(Math.random(), Math.random(), Math.random());
      selectedObject.material.color = color;
      console.log(`${selectedObject.name} was clicked!`);
      console.log("hello");
    }
}
*/

/////////////////USE FOR ASSIGNMENT 2////////////////////////
/*
function createMaterialArray() {
  const skyboxImagepaths = ['../img/skybox/space_ft.png', '../img/skybox/space_bk.png', '../img/skybox/space_up.png', '../img/skybox/space_dn.png', '../img/skybox/space_rt.png', '../img/skybox/space_lf.png']
  const materialArray = skyboxImagepaths.map((image) => {
    let texture = new THREE.TextureLoader().load(image);
    return new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
  });
  return materialArray;
}
*/

/*   //////////////////Use For Assignment 2////////////////////////

function setSkyBox() {
  const materialArray = createMaterialArray();
  let skyboxGeo = new THREE.BoxGeometry(1000, 1000, 1000);
  skybox = new THREE.Mesh(skyboxGeo, materialArray);
  scene.add(skybox);
}*/


function loadPlanetTexture(texture, radius, widthSegments, heightSegments, meshType) {
  const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
  const loader = new THREE.TextureLoader();
  const planetTexture = loader.load(texture);
  const material = meshType == 'standard' ? new THREE.MeshStandardMaterial({ map: planetTexture }) : new THREE.MeshBasicMaterial({ map: planetTexture });

  const planet = new THREE.Mesh(geometry, material);

  return planet
}


function createOrbitRing(innerRadius) {
  let outerRadius = innerRadius - 0.1
  let thetaSegments = 100
  const geometry = new THREE.RingGeometry(innerRadius, outerRadius, thetaSegments);
  const material = new THREE.MeshBasicMaterial({ color: '#ffffff', side: THREE.DoubleSide });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh)
  mesh.rotation.x = Math.PI / 2
  return mesh;

}


function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  ///////////////Use for Assignment 2///////////////////////

  //setSkyBox();
  // moon = loadPlanetTexture("img/moon.jpg", 1, 100, 100, 'standard')
  // earth = loadPlanetTexture("../img/earth_hd.jpg", 4, 100, 100, 'standard');
  // sun = loadPlanetTexture("../img/sun_hd.jpg", 20, 100, 100, 'basic');
  // mercury = loadPlanetTexture("../img/mercury_hd.jpg", 2, 100, 100, 'standard');
  // venus = loadPlanetTexture("../img/venus_hd.jpg", 3, 100, 100, 'standard');
  // mars = loadPlanetTexture("../img/mars_hd.jpg", 3.5, 100, 100, 'standard');
  // jupiter = loadPlanetTexture("../img/jupiter_hd.jpg", 10, 100, 100, 'standard');
  // saturn = loadPlanetTexture("../img/saturn_hd.jpg", 8, 100, 100, 'standard');
  // uranus = loadPlanetTexture("../img/uranus_hd.jpg", 6, 100, 100, 'standard');
  // neptune = loadPlanetTexture("../img/neptune_hd.jpg", 5, 100, 100, 'standard');
  
  var moonPivot = new THREE.Object3D();

  //Function Call to load planet meshes and textures
  moon = loadPlanetTexture("img/white.jpg", 0.7, 100, 100, 'standard')
  earth = loadPlanetTexture("img/white.jpg", 4, 100, 100, 'standard');
  sun = loadPlanetTexture("img/white.jpg", 20, 100, 100, 'basic');
  mercury = loadPlanetTexture("img/white.jpg", 2, 100, 100, 'standard');
  venus = loadPlanetTexture("img/white.jpg", 3, 100, 100, 'standard');
  mars = loadPlanetTexture("img/white.jpg", 3.5, 100, 100, 'standard');
  jupiter = loadPlanetTexture("img/white.jpg", 10, 100, 100, 'standard');
  saturn = loadPlanetTexture("img/white.jpg", 8, 100, 100, 'standard');
  uranus = loadPlanetTexture("img/white.jpg", 6, 100, 100, 'standard');
  neptune = loadPlanetTexture("img/white.jpg", 5, 100, 100, 'standard');

  // ADD PLANETS TO THE SCENE
  scene.add(moon);
  scene.add(earth);
  earth.add(moonPivot);
  moonPivot.add(moon);
  scene.add(sun);
  scene.add(mercury);
  scene.add(venus);
  scene.add(mars);
  scene.add(jupiter);
  scene.add(saturn);
  scene.add(uranus);
  scene.add(neptune);

  const sunLight = new THREE.PointLight(0xffffff, 2, 0); // White light, intensity 1, no distance attenuation
  sunLight.position.copy(sun.position); // Position the light at the Sun's position
  scene.add(sunLight);

  // Rotation orbit
  createOrbitRing(mercury_orbit_radius)
  createOrbitRing(venus_orbit_radius)
  createOrbitRing(earth_orbit_radius)
  createOrbitRing(mars_orbit_radius)
  createOrbitRing(jupiter_orbit_radius)
  createOrbitRing(saturn_orbit_radius)
  createOrbitRing(uranus_orbit_radius)
  createOrbitRing(neptune_orbit_radius)


  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  renderer.domElement.id = "c";
  controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 12;
  controls.maxDistance = 1000;

  camera.position.z = 100;
}


function planetRevolver(time, speed, planet, orbitRadius, planetName) {

  let orbitSpeedMultiplier = 0.001;
  const planetAngle = time * orbitSpeedMultiplier * speed;
  planet.position.x = sun.position.x + orbitRadius * Math.cos(planetAngle);
  planet.position.z = sun.position.z + orbitRadius * Math.sin(planetAngle);
}




function animate(time) {
  requestAnimationFrame(animate);

  // Rotate the planets
  const rotationSpeed = 0.005;
  moon.rotation.y += rotationSpeed;
  earth.rotation.y += rotationSpeed;
  sun.rotation.y += rotationSpeed;
  mercury.rotation.y += rotationSpeed;
  venus.rotation.y += rotationSpeed;      
  mars.rotation.y += rotationSpeed;
  jupiter.rotation.y += rotationSpeed;
  saturn.rotation.y += rotationSpeed;
  uranus.rotation.y += rotationSpeed;
  neptune.rotation.y += rotationSpeed;

  planetRevolver(time, speed.moon_revolution_speed, moon, moon_orbit_radius, 'moon')
  planetRevolver(time, speed.mercury_revolution_speed, mercury, mercury_orbit_radius, 'mercury')
  planetRevolver(time, speed.venus_revolution_speed, venus, venus_orbit_radius, 'venus')
  planetRevolver(time, speed.earth_revolution_speed, earth, earth_orbit_radius, 'earth')
  planetRevolver(time, speed.mars_revolution_speed, mars, mars_orbit_radius, 'mars')
  planetRevolver(time, speed.jupiter_revolution_speed, jupiter, jupiter_orbit_radius, 'jupiter')
  planetRevolver(time, speed.saturn_revolution_speed, saturn, saturn_orbit_radius, 'saturn')
  planetRevolver(time, speed.uranus_revolution_speed, uranus, uranus_orbit_radius, 'uranus')
  planetRevolver(time, speed.neptune_revolution_speed, neptune, neptune_orbit_radius, 'neptune')

  controls.update();
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onWindowResize, false);

//add gui as controls
const gui = new GUI({autoplace: false, width: 350});

gui.domElement.id = 'gui';
gui_container.appendChild(gui.domElement);

const guiFolder = gui.addFolder('revolution speed') 
guiFolder.add(speed, 'mercury_revolution_speed', 0, 5).listen();
guiFolder.add(speed, 'venus_revolution_speed', 0, 5).listen();
guiFolder.add(speed, 'earth_revolution_speed', 0, 5).listen();
guiFolder.add(speed, 'mars_revolution_speed', 0, 5).listen();
guiFolder.add(speed, 'jupiter_revolution_speed', 0, 5).listen();
guiFolder.add(speed, 'saturn_revolution_speed', 0, 5).listen();
guiFolder.add(speed, 'uranus_revolution_speed', 0, 5).listen();
guiFolder.add(speed, 'neptune_revolution_speed', 0, 5).listen();

//function to add a button that will set all the planet revolution speed back to default
var obj = { 'Set Speed To Default':function(){ 
  speed.mercury_revolution_speed = 2;
  setInterval(() => speed.mercury_revolution_speed, 2);
  
  speed.venus_revolution_speed = 1.5;
  setInterval(() => speed.venus_revolution_speed, 1.5);
  
  speed.earth_revolution_speed = 1;
  setInterval(() => speed.earth_revolution_speed, 1);

  speed.mars_revolution_speed = 0.8;
  setInterval(() => speed.mars_revolution_speed, 0.8);

  speed.jupiter_revolution_speed = 0.7;
  setInterval(() => speed.jupiter_revolution_speed, 0.7);

  speed.saturn_revolution_speed = 0.6;
  setInterval(() => speed.saturn_revolution_speed, 0.6);

  speed.uranus_revolution_speed = 0.5;
  setInterval(() => speed.uranus_revolution_speed, 0.5);

  speed.neptune_revolution_speed = 0.4;
  setInterval(() => speed.neptune_revolution_speed, 0.4);
 }};

guiFolder.add(obj,'Set Speed To Default');
//guiFolder.open();


init();
animate(0); // Initialize with time 0