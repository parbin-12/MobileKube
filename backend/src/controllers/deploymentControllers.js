const kubernetesService = require('../services/kubernetesService');

const createDeployments = async(req,res)=>{
    try{
        const {name,image,replicas} = req.body;
        const deployment = await kubernetesService.createDeployment(name,image,replicas);
        res.status(201).json({
            success: true,
            deployment
        });
    }catch(err){
        res.status(500).json({
            success:false,
            message: err.message
        });
    }
};

const getDeployments = async (req,res)=>{
    try{
        const deployments = await kubernetesService.getDeployments();
        res.status(200).json({
            success:true,
            count: deployments.length,
            deployments

        });

    } catch(err) {
        res.status(500).json({

            success:false,
            message:err.message
        });

    }
};


const deleteDeployments = async(req,res)=>{
    try{
        const { name }=req.params;
        await kubernetesService.deleteDeployments(name);
        res.status(200).json({
            success: true,
            message: `${name} deleted successfully`
        });


    } catch(err){
        res.status(500).json({
            success:false,
            message: err.message
        })
    }
};


//get all pods

const getPods = async(req,res)=>{
    try{
        const pods = await kubernetesService.getPods();
        res.status(200).json({
            success: true,
            pods
        });
        
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

//get single pod status

const getPodStatus = async(req,res)=>{
    try{
        const {name} =req.params;
        const pods = await kubernetesService.getPodStatus(name);
        res.status(201).json({
            success:true,
            pods
        });

    } catch(err){
        res.status(500).json({
            success:false,
            message: err.message
        });
    }
};

module.exports ={
    getDeployments,
    deleteDeployments,
    createDeployments,
    getPods,
    getPodStatus
};