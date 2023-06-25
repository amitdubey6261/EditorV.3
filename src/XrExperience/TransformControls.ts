import * as THREE from 'three' ; 
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js' ; 
import Experience from './Experience';

class _TransformControls{
    experience : Experience ; 
    camera : THREE.PerspectiveCamera ; 
    scene : THREE.Scene ; 
    canvas : HTMLCanvasElement ; 
    currentCamera : THREE.PerspectiveCamera;
    control : TransformControls ;
    renderer : THREE.WebGLRenderer ;    

    constructor(){
        this.experience = new Experience() ; 
        this.scene = this.experience.scene ; 
        this.camera = this.experience.camera.perspectiveCamera ; 
        this.currentCamera = this.camera ; 
        this.canvas = this.experience.canvas ;
        this.renderer = this.experience.XrExp.renderer ;  

        this.init() ; 
    }

    init(){
        this.control = new TransformControls( this.currentCamera , this.canvas ) ;

    }
}

export default _TransformControls ; 