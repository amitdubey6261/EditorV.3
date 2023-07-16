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
]

export default AssetsArray ; 