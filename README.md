## Installation of Client

Follow these steps to get the app up and running on your local machine:

## Prerequisites

Make sure you have the following installed:

- Node.js
- npm (usually comes with Node.js installation)
- Git

### To navigate to the project directory, use:

```bash
cd client
```

### To install dependencies, use:

```bash
npm install
```

### To run the project, use:

```bash
npm run dev
```
## Guide for using Kuberenetes

### Go to client
```bash
cd client
```

### Build the image 
```bash
docker build -t mihirvir10/client-m .
```

### Push the image
```bash
docker push mihirvir10/client-m
```

### Go to infra/k8s directory

# Apply the kubernetes file 
```bash
kubectl apply -f client-depl.yaml
```

## After applying to acccess the client from external source you need to do the following

### using docker desktop kubernetes
```localhost:<nodeport>```


### using minikube

get the minikube ip
```bash
minikube service client-service
```
