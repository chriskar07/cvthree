import './style.css'
import * as THREE from'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { HDRCubeTextureLoader } from 'three/addons/loaders/HDRCubeTextureLoader.js';
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader.js';



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 68, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({antialias: true, 
canvas : document.querySelector('#bg'),

});

renderer.shadowMap.enabled = true;




//scene background color
scene.background = new THREE.Color( 0xFFeeFF );
//scene.fog = new THREE.FogExp2( 0xfffff2, 0.1 );


//controls distance
const controls = new OrbitControls( camera, renderer.domElement );
controls.minDistance = 1;
controls.maxDistance = 105;



renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth , window.innerHeight );

//camera.position.setZ(5);
//camera.position.setY(1.5);


const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const spotLight = new THREE.SpotLight(0xFFFFFF);
scene.add(spotLight);
spotLight.position.set(-50, 50, 0);
spotLight.castShadow = true;
spotLight.angle = 0.2;

const sLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(sLightHelper);

//glb load
const loader = new GLTFLoader();


loader.load( './chair/scene.gltf', function ( gltf ) {
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


//light settings
 

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

