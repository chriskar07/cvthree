import './style.css'
import * as THREE from'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';
import { HDRCubeTextureLoader } from 'three/addons/loaders/HDRCubeTextureLoader.js';

const params = {
  envMap: 'HDR',
  roughness: 0.0,
  metalness: 0.0,
  exposure: 1.0,
  debug: false
};


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 68, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({antialias: true, 
canvas : document.querySelector('#bg'),

});


//scene background color
scene.background = new THREE.Color( 0xFFFFFFF );
//scene.fog = new THREE.FogExp2( 0xfffff2, 0.1 );


//controls distance
const controls = new OrbitControls( camera, renderer.domElement );
controls.minDistance = 1;
				controls.maxDistance = 5;



renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth , window.innerHeight );
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
//camera.position.setZ(5);
//camera.position.setY(1.5);


//BOx
const boxWidth = 1;
const boxHeight = 1;
const boxDepth = 1;
const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

const material = new THREE.MeshStandardMaterial( {
  color: 0x44aa88,
  metalness: params.metalness,
  roughness: params.roughness
} );

const cube = new THREE.Mesh(geometry, material);
cube.position.set( 4, 1, 0 );
scene.add(cube);

//box end


//glb load
const loader = new GLTFLoader();


loader.load( './puff.glb', function ( gltf ) {
	const modela = gltf.scene;
  scene.add( modela );
console.log(modela);
  modela.traverse(function (node){
    if (node.isMesh)
    node.castShadow = true;
});

}, undefined, function ( error ) {

	console.error( error );

} );

// plane field
const plane = new THREE.Mesh(
  new THREE.PlaneGeometry( 40, 40 ),
  new THREE.MeshPhongMaterial( { color: 0xFFFAFA, specular: 0xFFFAFA } )
);
plane.rotation.x = - Math.PI / 2;
plane.position.y = 0;
scene.add( plane );

plane.receiveShadow = true;

//light settings
  const color = 0xF9F6EE ;
  const intensity = 10;
  const light = new THREE.DirectionalLight();
  light.position.set(0.5, 0.5, 0.5);
  const ambientlight = new THREE.AmbientLight(color, intensity);
  ambientlight.position.set(1, 1, 1);
  scene.add(light,ambientlight);

//grid helper
  const gridhelper = new THREE.GridHelper();
  scene.add(gridhelper);
  
  controls.update();
  

  
  

controls.enabled = true; // Disable OrbitControls
 

  function animate() {

    requestAnimationFrame( animate );
  
    // required if controls.enableDamping or controls.autoRotate are set to true
    controls.update();
    renderer.render( scene, camera );
    
  }

animate();

