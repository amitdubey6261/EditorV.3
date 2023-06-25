import * as THREE from 'three' ; 
import Experience from "./Experience";

class Helper{
    experience : Experience ; 
    canvas : HTMLCanvasElement ; 
    scene : THREE.Scene ; 
    gridHelper : THREE.GridHelper ;
    axesHelper : THREE.AxesHelper ;  

    constructor(){
        this.experience = new Experience() ; 
        this.canvas = this.experience.canvas ; 
        this.scene = this.experience.scene ;
        
        this.setHelper() ; 
    }

    setHelper(){
        this.gridHelper = new THREE.GridHelper( 100 , 100 ); 
        this.axesHelper = new THREE.AxesHelper( 50 ) ; 
        this.scene.add( this.gridHelper ) ; 
        this.scene.add( this.axesHelper );
    }
}

export default Helper ; 