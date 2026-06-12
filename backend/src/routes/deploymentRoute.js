const express = require("express");
const router = express.Router();

const deploymentController =
require("../controllers/deploymentControllers");


router.get("/deployments", deploymentController.getDeployments);
router.post("/deployments", deploymentController.createDeployments);
router.delete("/deployments/:name", deploymentController.deleteDeployments);


router.get("/pods", deploymentController.getPods);
router.get("/pods/:name", deploymentController.getPodStatus);

module.exports = router;