# PROJECT TITLE
Automated CI/CD Pipeline for a Web Application

# OBJECTIVE
Set up a fully automated Continuous Integration and Continuous Deployment (CI/CD) pipeline to test, build, and deploy a Node.js web application to a container orchestration platform.

# Key Tools
* **Web Application:** Node.js
* **Version Control:** Git, GitHub
* **CI/CD:** Jenkins or GitHub Actions
* **Containerization:** Docker
* **Orchestration:** Kubernetes (Minikube)
* **Cloud:** Local Environment

# Docker Commands
```
docker build -t siddarthan5/capstone-node-project .
docker images
docker run -d -p 3000:3000 siddarthan5/capstone-node-project
docker ps
docker container ls
docker container stop IdValue
docker rm -f <container-id>
docker push siddarthan5/capstone-node-project:latest
```
# Kubernetes (Minikube) Commands
```
minikube start
docker context use default
minikube status
minikube dashboard

kubectl apply -f deployment.yml
kubectl apply -f service.yml
kubectl get pods
kubectl get deployments
kubectl get pods
minikube service <service-name>

minikube ip
```
# Connect to a Kubernetes Cluster and execute kubectl commands in Jenkins Pipeline
```
kubectl create sa jenkins
kubectl create clusterrolebinding jenkins --clusterrole=cluster-admin --serviceaccount=default:jenkins
kubectl create token jenkins
kubectl config view
kubectl port-forward svc/node-service 5000:5000
```

# Steps to Install Prometheus
```
choco install kubernetes-helm
helm version

helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
helm install prometheus prometheus-community/prometheus
kubectl expose service prometheus-server --type=NodePort --target-port=9090 --name=prometheus-server-ext
minikube service prometheus-server-ext
```

# Steps to install Grafana
```
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update
helm install grafana stable/grafana
kubectl expose service grafana --type=NodePort --target-port=3000 --name=grafana-ext
minikube service grafana-ext
```

# Port forwarding commands
```
kubectl port-forward svc/node-service 5000:5000
kubectl port-forward svc/prometheus-server 5001:80
kubectl port-forward svc/grafana 5002:80
```