# 🐳 MobileKube — Docker / Kubernetes Control Center

> Manage your Kubernetes deployments and Docker containers from your Android or iPhone — built with React Native, runs everywhere.

---

## 📸 Screenshots

<p align="center">
  <img src="screenshot_home.png" width="22%" alt="Home Screen"/>
  <img src="screenshot_create.png" width="22%" alt="Create Deployment"/>
  <img src="screenshot_deployments.png" width="22%" alt="Deployments List"/>
  <img src="screenshot_pods.png" width="22%" alt="Pods"/>
</p>

<p align="center">
  &nbsp;&nbsp;&nbsp;Home&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  Create Deployment&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  Deployments List&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  Pods
</p>

---

## 📱 What is MobileKube?

**MobileKube** is a cross-platform mobile app built with **React Native** that runs on both iOS and Android. It lets you interact with a local Kubernetes cluster (Minikube) and Docker daemon directly from your phone using the **Kubernetes REST API**. No terminal. No laptop. Just tap.

### Features

- **Create Deployments** — specify a deployment name, Docker image, and replica count
- **View Deployments List** — see all running deployments with replica and image details
- **View Pods** — monitor pod names, statuses (`Running`, `Pending`, etc.) and IP addresses
- **Settings** — configure your cluster endpoint

---

## 🧠 Core Concepts Illustrated

### Docker vs Kubernetes

| Concept | What it does | In MobileKube |
|---|---|---|
| **Docker Image** | Packaged application (e.g. `nginx:latest`, `node:18`) | You specify the image when creating a deployment |
| **Container** | A running instance of a Docker image | Managed by Kubernetes, shown as Pods |
| **Pod** | Smallest Kubernetes unit — wraps one or more containers | Shown in the Pods screen with Status & IP |
| **Deployment** | Declares desired state — which image, how many replicas | Created & listed in the Deployments screen |
| **Replica** | Copies of a pod for availability/scaling | Set when creating a deployment |

### How a request flows

```
MobileKube App (iOS or Android)
        │
        │  HTTP REST API
        ▼
  Kubernetes API Server  (localhost:8001 via kubectl proxy)
        │
        ▼
  Kubernetes Scheduler
        │
        ▼
  Minikube Node
        │
        ▼
  Docker Runtime → Container (Pod)
```

---

## 🛠️ Prerequisites

You need the following running on the machine that hosts your cluster:

### 1. Docker Desktop
Docker Desktop provides the Docker Engine that Kubernetes uses as its container runtime.

- Download: https://www.docker.com/products/docker-desktop/
- After install, open Docker Desktop and confirm the whale icon appears in your system tray / menu bar
- Verify: `docker --version`

### 2. Minikube
Minikube runs a single-node Kubernetes cluster locally inside Docker Desktop.

- Install (macOS): `brew install minikube`
- Install (Windows): https://minikube.sigs.k8s.io/docs/start/
- Install (Linux): https://minikube.sigs.k8s.io/docs/start/
- Start the cluster: `minikube start --driver=docker`
- Verify: `minikube status`

### 3. kubectl
The Kubernetes CLI — needed to expose the API server to your app.

- Install (macOS): `brew install kubectl`
- Install (Windows): included with Docker Desktop
- Install (Linux): `sudo apt-get install -y kubectl`
- Verify: `kubectl version --client`

### 4. kubectl proxy (exposes the API to your app)
```bash
kubectl proxy --port=8001 --address='0.0.0.0' --accept-hosts='.*'
```
This opens `http://<your-machine-ip>:8001` as the Kubernetes API endpoint your mobile app connects to.

---

## 🚀 Setup Guide (Run on a New Machine)

### Step 1 — Install Docker Desktop
1. Download Docker Desktop from https://www.docker.com/products/docker-desktop/
2. Install and launch it
3. Enable Kubernetes inside Docker Desktop: **Settings → Kubernetes → Enable Kubernetes** (optional if using Minikube)

### Step 2 — Install and Start Minikube
```bash
# macOS
brew install minikube
minikube start --driver=docker

# Windows (PowerShell as Admin)
winget install minikube
minikube start --driver=docker

# Linux
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube
minikube start --driver=docker

# Confirm it's running (all platforms)
minikube status
# Expected output:
# minikube: Running
# cluster: Running
# kubectl: Correctly Configured
```

### Step 3 — Expose the Kubernetes API
```bash
kubectl proxy --port=8001 --address='0.0.0.0' --accept-hosts='.*'
```
Keep this terminal open. Your Kubernetes API is now accessible at `http://YOUR_LOCAL_IP:8001`.

Find your local IP:
```bash
# macOS/Linux
ifconfig | grep "inet " | grep -v 127.0.0.1

# Windows
ipconfig
```

### Step 4 — Configure MobileKube
1. Open the app and tap the ⚙️ Settings icon
2. Enter your machine's local IP and port, e.g. `http://192.168.1.100:8001`
3. Tap **Save**
4. Make sure your phone (Android or iPhone) is on the **same Wi-Fi network** as your machine

### Step 5 — Test It
1. Tap **Deployments List** — you should see any existing deployments
2. Tap **Create Deployment**, enter:
   - Name: `test-nginx`
   - Image: `nginx:latest`
   - Replicas: `1`
3. Tap **Pods** — you should see `test-nginx-xxxx` pod appear with status `Running`

---


## 💻 Local Development Setup

### Clone the repository

```bash
git clone https://github.com/parbin-12/MobileKube.git
cd MobileKube
```

---

### 🔵 Backend Setup

```bash
# Step 1 — navigate into the project
cd MobileKube

# Step 2 — go into backend
cd backend

# Step 3 — install dependencies
npm install

# Step 4 — start the backend server
node server.js
```

> Backend will start at `http://localhost:5000` (or whichever port is set in your `.env`)

---

### 🟠 Frontend Setup

Open a **new terminal**, then:

```bash
# Step 1 — navigate into the project
cd MobileKube

# Step 2 — go into frontend
cd frontend/MobileKube

# Step 3 — install dependencies
npm install

# Step 4 — run on iOS (macOS only)
npx react-native run-ios

# Step 4 — run on Android (emulator or physical device)
npx react-native run-android
```

> Make sure your backend server is running before launching the app.

---

### 📁 Project Structure

```
MobileKube/
├── backend/
│   ├── src/
│   │   ├── config/        ← db.js, kubernetes.js
│   │   ├── controllers/   ← auth, deployment, helm
│   │   ├── middleware/    ← auth, error
│   │   ├── models/        ← user, deployment
│   │   ├── routes/        ← auth, deployment, helm
│   │   └── services/      ← auth, helm, kubernetes
│   ├── server.js
│   └── package.json
└── frontend/
    └── MobileKube/        ← React Native app
        └── package.json
```

---

## 📡 API Endpoints Used

| Action | Method | Endpoint |
|---|---|---|
| List Deployments | GET | `/apis/apps/v1/namespaces/default/deployments` |
| Create Deployment | POST | `/apis/apps/v1/namespaces/default/deployments` |
| List Pods | GET | `/api/v1/namespaces/default/pods` |

---

## 🔧 Troubleshooting

**"Cannot connect to cluster"**
- Ensure `kubectl proxy` is running on the host machine
- Ensure your phone is on the same Wi-Fi network as the host machine
- Check firewall settings — port 8001 must be open
- On Windows, allow port 8001 through Windows Defender Firewall

**Pods stuck in `Pending`**
- Run `minikube status` to check the node is running
- Run `kubectl describe pod <pod-name>` for details
- Sometimes caused by resource constraints — try `minikube start --cpus=2 --memory=4096`

**Docker Desktop not starting**
- Ensure virtualization is enabled in BIOS (Windows)
- On macOS, try: `sudo softwareupdate --install-rosetta` (Apple Silicon)
- On Linux, ensure your user is in the `docker` group: `sudo usermod -aG docker $USER`

**Android — cleartext HTTP error**
- React Native on Android blocks plain HTTP by default; add `android:usesCleartextTraffic="true"` in `AndroidManifest.xml` or configure a `network_security_config.xml` scoped to your cluster IP for local development

---

## 🏗️ Tech Stack

- **Mobile** — React Native (iOS & Android from a single codebase)
- **Networking** — `fetch` API calling Kubernetes REST API
- **Container Runtime** — Docker Desktop
- **Cluster** — Minikube (single-node Kubernetes)
- **API Proxy** — kubectl proxy

---

## 💡 Why Build This?

Most Kubernetes tools require a laptop and a terminal. MobileKube proves that the Kubernetes API is just HTTP — if you can make a network request, you can control your cluster. Built with React Native, a single codebase runs on both Android and iOS, making it a great hands-on way to understand how Deployments, Pods, and the Docker runtime all fit together.

---

## 📄 License

MIT License — feel free to fork, extend, and learn from it.

---

> Built with ❤️ to make Kubernetes accessible from any device, anywhere.
