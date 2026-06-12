const k8s = require('@kubernetes/client-node');

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const appsV1Api = kc.makeApiClient(k8s.AppsV1Api);
const coreV1Api = kc.makeApiClient(k8s.CoreV1Api);

const createDeployment = async (
    name,
    image,
    replicas = 1
) => {
    const deploymentManifest = {
        apiVersion: "apps/v1",
        kind: "Deployment",
        metadata: {
            name
        },
        spec: {
            replicas,
            selector: {
                matchLabels: {
                    app: name
                }
            },
            template: {
                metadata: {
                    labels: {
                        app: name
                    }
                },
                spec: {
                    containers: [
                        {
                            name,
                            image,
                            ports: [
                                {
                                    containerPort: 80
                                }
                            ]
                        }
                    ]
                }
            }
        }
    };

    return await appsV1Api.createNamespacedDeployment({
        namespace: "default",
        body: deploymentManifest
    });
};

const getDeployments = async () => {
    const response =
        await appsV1Api.listNamespacedDeployment({
            namespace: "default"
        });

    return response.items.map((deployment) => ({
        name: deployment.metadata.name,
        replicas: deployment.spec.replicas,
        image:
            deployment.spec.template.spec.containers[0].image,
    }));
};

const getPods = async() =>{
    const response =await coreV1Api.listNamespacedPod({
        namespace:"default",
    });
    return response.items.map((pod)=>({
        name:pod.metadata.name,
        namespace:pod.metadata.namespace,
        status:pod.status.phase,
        podIP:pod.status.podIP,

    }));


}

module.exports = {
    createDeployment,
    getDeployments,
    getPods,
};