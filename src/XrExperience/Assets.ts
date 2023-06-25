export interface AssetT{
    name : string ; 
    type : string ; 
    path : string ; 
}

const AssetsArray : AssetT[] = [
    {
        name : "kira", 
        type : "glbmodel", 
        path : "/models/kira.glb", 
    }
    ,
    {
        name : "michelle",  
        type : "glbmodel",
        path : "/models/Michelle.glb",

    }
]

export default AssetsArray ; 