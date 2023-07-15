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
    ,
    {
        name : "jwb" , 
        type : "fbxmodel" , 
        path : "/models/jw/BlueLabel_Lowpoly_fbx.fbx" , 
    }
    ,
    {
        name : "b_color" , 
        type : "texture" , 
        path : "/models/jw/lambert1_Base_color_1001.png" , 
    }
    ,
    {
        name : "rough" , 
        type : "texture" , 
        path : "/models/jw/lambert1_Roughness_1001.png" , 
    }
    ,
    {
        name : "metallic" , 
        type : "texture" , 
        path : "/models/jw/lambert1_Metallic_1001.png" , 
    }
    ,
]

export default AssetsArray ; 