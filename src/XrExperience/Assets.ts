export interface AssetT{
    name : string ; 
    type : string ; 
    path : string ; 
}

const AssetsArray : AssetT[] = [
    {
        name : "newBox", 
        type : "glbmodel", 
        path : "/models/newBox.glb", 
    }
    ,
    {
        name : "jwp", 
        type : "glbmodel", 
        path : "/models/jwp.glb", 
    }
    ,
    {
        name : 'bottle' , 
        type : "glbmodel",
        path : "/models/bottle.glb"
    }
]

export default AssetsArray ; 