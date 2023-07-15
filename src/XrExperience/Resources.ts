import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js' ; 
import { FBXLoader  } from 'three/examples/jsm/loaders/FBXLoader.js';
import { DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader.js' ; 
import { EventEmitter } from 'events';
import { AssetT } from './Assets';
import Experience from './Experience';

interface loadersT{
    gltfLoader : GLTFLoader , 
    dracoLoader : DRACOLoader , 
    fbxLoader : FBXLoader ,  
}

export default class Resources extends EventEmitter{

    experience : Experience ;
    assets : AssetT[] ; 
    items : any ; 
    queue : number ;
    loaded : number ;
    loaders : loadersT ; 

    
    constructor( assets : AssetT[] ){
        super() ; 
        this.experience = new Experience() ; 
        this.assets = assets ; 

        this.items = {} ; 
        this.queue = this.assets.length ;
        this.loaded = 0 ;

        this.setLoaders() ;
        this.startloading();
    }

    setLoaders(){
        this.loaders = {
            gltfLoader : new GLTFLoader() , 
            dracoLoader : new DRACOLoader() , 
            fbxLoader : new FBXLoader()
        }

        this.loaders.dracoLoader.setDecoderPath("/draco/") ; 
        this.loaders.gltfLoader.setDRACOLoader( this.loaders.dracoLoader );
    }

    startloading(){
        for( const asset of this.assets ){
            if( asset.type == 'glbmodel'){
                this.loaders.gltfLoader.load( asset.path , ( file )=>{
                    this.singleAssetLoaded(asset , file) ;
                })
            }
            if( asset.type == 'fbxmodel'){
                this.loaders.fbxLoader.load(asset.path , (file)=>{
                    this.singleAssetLoaded(asset , file ) ; 
                })
            }
        }
    }

    singleAssetLoaded( asset : AssetT , file: any ){
        this.items[asset.name] = file ; 
        this.loaded += 1 ; 

        if( this.loaded == this.queue ){
            this.emit('ready') ; 
        }
    }
}