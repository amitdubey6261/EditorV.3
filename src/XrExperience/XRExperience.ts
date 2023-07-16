import * as THREE from 'three';

import { EventEmitter } from 'events'
import { ARButton } from 'three/examples/jsm/webxr/ARButton.js';
import {TransformControls} from 'three/examples/jsm/controls/TransformControls.js' ; 
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
    controller: any;
    model : any ; 
    animations : any ; 
    mixer : any ; 
    clock : THREE.Clock ; 
    model2 : any ; 
    // tControls : TransformControls ; 


    constructor() {
        super();
        this.experience = new Experience();
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;

        this.hitTestSource = null ; 
        this.hitTestSourceRequested = false ;  
        this.clock = new THREE.Clock() ;
        this. prepareModel() ; 
        // this.setTControls() ; 
        this.setRenderer();
    }

    setTControls(){
        const tControls = new TransformControls( this.camera.perspectiveCamera , this.canvas ); 
        window.addEventListener('keydown' , (e)=>{
            switch( e.code ){
                case 'keyG':
                    tControls.setMode('translate');
                    break ; 
                case 'KeyR':
                    tControls.setMode('rotate');
                    break ; 
                case 'KeyS':
                    tControls.setMode('scale') ; 
                    break ; 
            }
        })

        const model = this.resources.items.jwb ; 
        tControls.attach(model)
        this.scene.add(model)
        this.scene.add(tControls)
    }

    setRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true,
        });

        this.renderer.domElement.addEventListener('touchstart' , (e)=>{
            e.preventDefault();
        })

        this.renderer.xr.enabled = true; 
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFShadowMap;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.75;
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);

        const btn = ARButton.createButton(this.renderer, { requiredFeatures: ['hit-test'] }) ; 
        btn.style.backgroundColor = 'black' ; 
        btn.style.color = 'white' ;
        document.body.appendChild(btn) ;  

        this.init();
        this.animate();

    }

    prepareModel(){
        const orimodel = this.resources.items.test ; 
        this.model = this.resources.items.test.scene ;
        this.model.scale.set(0.001, 0.001, 0.001);
        console.log(this.model) 
        this.animations = orimodel.animations ;

        this.mixer = new THREE.AnimationMixer(this.model) ; 
        // const clip1 = THREE.AnimationClip.findByName(this.animations , 'low_polyAction') ; 
        const clip2 = THREE.AnimationClip.findByName(this.animations , 'polySurface13_lowAction') ; 
        const clip3 = THREE.AnimationClip.findByName(this.animations , 'ArmatureAction') ; 
        // const clip4 = THREE.AnimationClip.findByName(this.animations , 'jwnAction.001') ; 
        // const clip5 = THREE.AnimationClip.findByName(this.animations , 'jwnAction.004') ; 
        // const clip6 = THREE.AnimationClip.findByName(this.animations , 'jwnAction.005') ; 

        const action2 = this.mixer.clipAction(clip2);
        const action3 = this.mixer.clipAction(clip3);

        action2.play() ; //bottle animation
        action3.play() ; //crdbrrd animation .
    }

    init() {
        const onSelect = () => {
            if (this.reticle.visible) {
                const group = new THREE.Group() ; 
                const tControls = new TransformControls( this.camera.perspectiveCamera , this.canvas ); 
                window.addEventListener('keydown' , (e)=>{
                    switch( e.code ){
                        case 'keyG':
                            tControls.setMode('translate');
                            break ; 
                        case 'KeyR':
                            tControls.setMode('rotate');
                            break ; 
                        case 'KeyS':
                            tControls.setMode('scale') ; 
                            break ; 
                    }
                })
        
                this.model2 = this.resources.items.jwp.scene ; 
                group.add(this.model) ; 
                group.add(this.model2) ; 
                // group.add(model3) ; 
                this.reticle.matrix.decompose(this.model.position, this.model.quaternion, this.model.scale);
                // tControls.attach(model);
                this.scene.add(this.model);
                this.scene.add(this.model2);
                this.scene.add(group);
            }
        }

    
        this.controller = this.renderer.xr.getController(0);
        this.controller.addEventListener('select', onSelect);
        this.scene.add(this.controller);
        this.reticle = new THREE.Mesh(
            new THREE.RingGeometry(0.15, 0.2, 32).rotateX(- Math.PI / 2),
            new THREE.MeshStandardMaterial({ color : 0xffffff , opacity : 0.5 })
        );

        this.reticle.matrixAutoUpdate = false; 
        this.reticle.visible = false;
        this.scene.add(this.reticle);


    }

    animate() {

        const render = (timeStamp: number, frame: XRFrame) => {
            if(timeStamp){}

            if (frame) {
                const referenceSpace = this.renderer.xr.getReferenceSpace();
                const session = this.renderer.xr.getSession();

                if (session && session.requestHitTestSource) {
                    if (this.hitTestSourceRequested === false) {
                        session.requestReferenceSpace('viewer')
                            .then((referenceSpace) => {
                                console.log( session.requestHitTest );
                                if (session.requestHitTestSource) {
                                    session.requestHitTestSource({ space: referenceSpace })?.then((source) => {
                                        this.hitTestSource = source;
                                    })
                                }
                            })
                        session.addEventListener('end', () => {
                            this.hitTestSourceRequested = false;
                            this.hitTestSource = null;
                        })

                        this.hitTestSourceRequested = true;
                    }

                    if( this.hitTestSource ){
                        const hitTestResults = frame.getHitTestResults( this.hitTestSource );
                        if( hitTestResults.length ){
                            const hit = hitTestResults[0] ; 
                            this.reticle.visible = true ; 
                            if( referenceSpace ){
                                this.reticle.matrix.fromArray( hit?.getPose(referenceSpace)?.transform.matrix ?? [0] ); 
                            }
                        }
                        else{
                            this.reticle.visible = false ; 
                        }
                    }
                }
            }

            if( this.model2 && this.model ){
                this.model2.position.copy(this.model.position);
            }

            let mixerUpdateDelta = this.clock.getDelta();

            if( this.mixer ){
                this.mixer.update(mixerUpdateDelta);
            }

            this.renderer.render(this.scene, this.camera.perspectiveCamera);
            this.emit('update');
        }


        this.renderer.setAnimationLoop(render);
    }



    resize() {
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
    }

}

export default XRExperience; 