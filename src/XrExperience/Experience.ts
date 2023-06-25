import AssetsArray, { AssetT } from './Assets';
import Camera from './Camera';
import Environment from './Environment';
import Helper from './Helper';
import Controllers from './OrbitControlls';
import Resources from './Resources';
import Sizes from './Sizes';
import XRExperience from './XRExperience';
import * as THREE from 'three' ; 

class Experience{
    static instance : Experience ; 
    canvas : HTMLCanvasElement ;
    scene : THREE.Scene ;  
    XrExp : XRExperience ; 
    sizes : Sizes ; 
    resources : Resources ; 
    assets : AssetT[] ; 
    camera : Camera ; 
    helper : Helper ; 
    controllers : Controllers ; 
    environment : Environment ; 

    constructor( canvas?: HTMLCanvasElement ){
        if( Experience.instance ){
            return Experience.instance ; 
        }
        else{
            Experience.instance = this ;  
            if( canvas != undefined ){
                this.canvas = canvas ;
                this.scene = new THREE.Scene()  ; 
                this.sizes = new Sizes() ; 
                this.resources = new Resources(AssetsArray) ; 
                this.camera = new Camera() ; 
                this.helper = new Helper() ; 
                this.controllers = new Controllers() ; 
                
                this.resources.on('ready' , ()=>{
                    this.environment = new Environment() ; 
                    this.XrExp = new XRExperience() ; 
                })

                this.sizes.on('resize' , ()=>{
                    this.camera.resize() ; 
                    if( this.XrExp ) this.XrExp.resize() ; 
                })

                this.XrExp.on('update' , ()=>{
                    this.update() ; 
                })
            }
        }
    }

    update(){
        if( this.controllers ) this.controllers.update() ; 
    }
}

export default Experience ; 