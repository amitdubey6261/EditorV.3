import * as THREE from 'three';

import { EventEmitter } from 'events'
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
    controller: any;


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
        this.setRenderer();
    }

    setRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true,
        });


        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFShadowMap;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.75;
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);

        document.body.appendChild(ARButton.createButton(this.renderer, { requiredFeatures: ['hit-test'] }));

        this.init();
        this.animate();

    }

    init() {
        const geometry = new THREE.CylinderGeometry(0.1, 0.1, 0.2, 32).translate(0, 0.1, 0);
        const onSelect = () => {
            if (this.reticle.visible) {
                const material = new THREE.MeshPhongMaterial({ color: 0xffffff * Math.random() });
                const mesh = new THREE.Mesh(geometry, material);
                this.reticle.matrix.decompose(mesh.position, mesh.quaternion, mesh.scale);
                mesh.scale.y = Math.random() * 2 + 1;
                this.scene.add(mesh);
            }
        }

        this.controller = this.renderer.xr.getController(0);
        this.controller.addEventListener('select', onSelect);
        this.scene.add(this.controller);
        this.reticle = new THREE.Mesh(
            new THREE.RingGeometry(0.15, 0.2, 32).rotateX(- Math.PI / 2),
            new THREE.MeshBasicMaterial({ color : 0xff0000 })
        );

        this.reticle.matrixAutoUpdate = false;
        this.reticle.visible = false;
        this.scene.add(this.reticle);


    }

    animate() {

        const render = (timeStamp: number, frame: XRFrame) => {
            console.warn(timeStamp);

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