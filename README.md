# COMP41720-Distributed Systems-Group - 19


## Github Link

https://github.com/MihirVir/distributed-computing

## Report Link

https://docs.google.com/document/d/1mXdZri6jRNGjl3tnv9xitVzOJXsQ2QZ6cSfAtF0UXQI/edit

## Video Link
https://www.youtube.com/watch?v=-vYRQ_9RgiU


# Installation Guide

Follow these steps to get the app up and running on machine:

## Prerequisites

Make sure you have the following installed:

- Docker Desktop
- Git
- docker desktop kubernetes [Settings -> Kubernetes -> Apply and Restart]
- make sure you have enough resources allocated to your kubernetes cluster
     - Go to docker desktop [settings -> resources]
     - List of resources which you need to run the application
            - 6 VCPUs
            - 6500 Memory
            - Disksize 200G+ 
            - swap 2GB
- minikube
# Method 1
## Using Docker Desktop Kubernetes 
- Go to Project root directory
- Assuming you are using docker desktop kubernetes you will need to apply the following command to enable ingress-nginx-controller in your machine to make sure the load balancer
  is working correctly
  ```bash
    kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.2/deploy/static/provider/cloud/deploy.yaml
  ```
  You will see many kubernetes objects getting created in your terminal
- After running the above command, type the following command to spin up all the services
  ```bash
      kubectl apply -f /infra/k8s/
  ```
  the above command will create all the necessary kubernetes objects for you
- Now, after applying the following command you will need to wait for about 4 - 10 minutes this is becuase the data processing jobs are running in the background
- To check all the necessary data are inserted in the mongo database you need to type the following commands
    ```bash
      kubectl get pods
    ```
    after typing this you will get list of pods one of them will be named as this init-airline1-db-q8t4p [q8t4p is variable might be something else on your machine]
    To check the logs of this job you need the type
  ```bash
    kubectl logs <init-airline-1-db-pod_name>
  ```
  You should see the following at the logs if the event is completed 
  Inserted 2256 flight records into the database.
  Successfully triggered the flight info API.
- After seeing the above log statements you can access the Application via this link
    http://localhost/
# Method 2 
## Using minikube
- Make sure you have 6 CPUs, 6500 memory and 200G+ disk size
- write the following command to start minikube
  ```bash
       minikube start --cpus 6 --memory 6200 --disk-size=200G
  ```
- After this enable ingress on minikube. To do that paste the command below 
  ```bash
       minikube addons enable ingress
  ```
- Paste teh following command to spin all the services up
  ```bash
       kubectl apply -f infra/k8s/
  ```
- wait for 10-15 minutes to make sure all the services are successfully running
  ```bash
       kubectl get pods
  ```
  use the above command to check all the pods are running
- use the following command to start the application
  ```bash
       minikube tunnel
  ```
  now, you can access the application using this url http://localhost/
