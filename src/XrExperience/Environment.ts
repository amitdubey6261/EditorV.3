import Experience from "./Experience";
import * as THREE from 'three' ;

class Environment{
    experience : Experience ; 
    scene : THREE.Scene ; 
    constructor(){
        this.experience = new Experience() ; 
        this.scene = this.experience.scene ;
        
        this.setEnvLight() ; 
    }

    setEnvLight(){
        const light: THREE.DirectionalLight = new THREE.DirectionalLight(0xffffff , 2) ; 
        const light2: THREE.DirectionalLight = new THREE.DirectionalLight(0xffffff , 2) ; 
        light.position.set( 10 , 10 , 0 ) ;
        light2.position.set( 0 , 10 , 10 ) ;
        this.scene.add( light ) ;  
        this.scene.add( light2 ) ;  
    }
}

export default Environment ; 