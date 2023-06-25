import * as THREE from 'three';

import {EventEmitter} from 'events'
import { ARButton } from 'three/examples/jsm/webxr/ARButton.js';
import Experience from './Experience';
import Camera from './Camera';
import Resources from './Resources';
import Sizes from './Sizes';

class XRExperience extends EventEmitter {
    experience: Experience;
    camera: Camera;
    resources: Resources;
    scene: THREE.Scene;
    canvas: HTMLCanvasElement;
    sizes: Sizes;
    renderer: THREE.WebGLRenderer;
    hitTestSourceRequested: boolean;
    reticle: THREE.Mesh;
    hitTestSource: any;


    constructor() {
        super() ; 
        this.experience = new Experience();
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;

        this.setRenderer();
    }

    setRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true ,
        });


        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFShadowMap;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.75;
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);

        document.body.appendChild( ARButton.createButton( this.renderer , { requiredFeatures: [ 'hit-test' ] } ) );

        this.init() ;
        this.animate() ; 

    }

    init(){
        this.scene.add( this.resources.items.michelle.scene )
    }
    
    animate(){

        const render = ( timestamp: any , frame: any) =>{
            console.log( timestamp , frame ) ; 
            this.renderer.render( this.scene , this.camera.perspectiveCamera );
        }

        this.renderer.setAnimationLoop( render ) ; 
        this.emit('update') ; 
    }
    


    resize() {
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
    }

}

export default XRExperience; 