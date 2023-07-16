export interface AssetT{
    name : string ; 
    type : string ; 
    path : string ; 
}

const AssetsArray : AssetT[] = [
    {
        name : "test", 
        type : "glbmodel", 
        path : "/models/tetst.glb", 
    }
    ,
    {
        name : "jwp", 
        type : "glbmodel", 
        path : "/models/jwp.glb", 
    }
]

export default AssetsArray ; 