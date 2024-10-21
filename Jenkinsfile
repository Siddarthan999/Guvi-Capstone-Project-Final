pipeline {
    agent any

    tools { 
        nodejs 'node'
    }

    environment {
        DOCKERHUB_CREDENTIALS = credentials('siddarthan5-dockerhub')
        DOCKER_IMAGE = "siddarthan5/capstone-node-project-final"
        DOCKER_TAG = "latest"
        DEPLOYMENT_NAME = "capstone-node-deployment"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/Siddarthan999/Guvi-Capstone-Project-Final.git']])
            }
        }
        stage('Build App') {
            steps {
                bat 'npm install'
            }
        }
        stage('Code Quality') {
            steps {
                bat 'npm run lint'
            }
        }
        stage('Testing') {
            steps {
                bat 'npm test'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    try {
                        bat """
                            docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} .
                        """
                    } catch (Exception e) {
                        echo "Docker image build failed: ${e.message}"
                        currentBuild.result = 'FAILURE'
                        error("Stopping pipeline due to Docker build failure.")
                    }
                }
            }
        }
        stage('Push Docker Image to DockerHub') {
            steps {
                script {
                    // Log in to DockerHub using credentials stored in Jenkins
                    bat """
                        docker login -u ${DOCKERHUB_CREDENTIALS_USR} -p ${DOCKERHUB_CREDENTIALS_PSW}
                    """
                    // Push the Docker image to DockerHub
                    bat """
                        docker push ${DOCKER_IMAGE}:${DOCKER_TAG}
                    """
                }
            }
        }
        stage('Deploy to Minikube') {
            steps {
                withKubeConfig(caCertificate: '', clusterName: 'minikube', contextName: 'minikube', credentialsId: 'minikube-jenkins-secret', namespace: 'default', restrictKubeConfigAccess: false, serverUrl: 'https://127.0.0.1:64594') {
                    script {
                        try {
                            // Apply the deployment configuration
                            bat 'kubectl apply -f deployment.yml'
                            
                            // Wait for the deployment to be ready
                            bat "kubectl rollout status deployment/${DEPLOYMENT_NAME}"

                            // Update the image to the new version (e.g., v2)
                            bat "kubectl set image deployments/${DEPLOYMENT_NAME} capstone-nodeserver=${DOCKER_IMAGE}"

                            // Check the status of the new Pods
                            bat 'kubectl get pods'
                            
                            // Apply the service configuration
                            bat 'kubectl apply -f service.yml'
        
                            // Get the pods status
                            def podsStatus = bat(script: 'kubectl get pods --no-headers', returnStdout: true).trim()
                            echo "Pods status: ${podsStatus}"
        
                            // Get the service details
                            def svcDetails = bat(script: 'kubectl get svc --no-headers', returnStdout: true).trim()
                            echo "Service details: ${svcDetails}"


                            // Verify that the service is running
                            bat "kubectl describe services/node-service"

                            // Check the rollout status
                            bat "kubectl rollout status deployments/${DEPLOYMENT_NAME}"

                            // Check the current image version
                            bat 'kubectl describe pods'

                        } catch (Exception e) {
                            echo "Deployment failed: ${e.message}"
                            currentBuild.result = 'FAILURE'
                            
                            // Rollback to the previous version on failure
                            echo "Rolling back deployment..."
                            bat "kubectl rollout undo deployments/${DEPLOYMENT_NAME}"
                            
                            error("Stopping pipeline due to deployment failure.")
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline completed.'
            bat 'docker logout'
            echo 'Visit http://localhost:5000'
        }
        success {
            echo 'All stages completed successfully, Docker image pushed to DockerHub and deployed to Minikube!'
        }
        failure {
            echo 'One or more stages failed.'
             withKubeConfig(caCertificate: '', clusterName: 'minikube', contextName: 'minikube', credentialsId: 'minikube-jenkins-secret', namespace: 'default', restrictKubeConfigAccess: false, serverUrl: 'https://127.0.0.1:64594') {
                    script {
                        echo "Rolling back deployment..."
                        bat "kubectl rollout undo deployments/${DEPLOYMENT_NAME}"
                    }
            }
        }
    }
}
