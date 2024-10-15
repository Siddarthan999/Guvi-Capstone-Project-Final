pipeline {
    agent any

    tools { 
        nodejs 'node'
    }

    environment {
        DOCKERHUB_CREDENTIALS = credentials('shafeeq2804-dockerhub')
        DOCKER_IMAGE = "shafeeq2804/capstone-node-project"
        DOCKER_TAG = "latest"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/Siddarthan999/Guvi-Capstone-Project-9.git']])
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
                    bat """
                        docker build -t ${DOCKER_IMAGE} .
                    """
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
    }

    post {
        always {
            echo 'Pipeline completed.'
            bat 'docker logout'
        }
        success {
            echo 'All stages completed successfully, Docker image pushed to DockerHub and deployed to Minikube!'
        }
        failure {
            echo 'One or more stages failed.'
        }
    }
}