pipeline {
    agent any

    stages {
        stage('clone code from github') {
            steps {
                echo 'cloning the code'
                git url:"https://github.com/AkashMondal0/next-chat.git",
                branch: "master"
            }
        }
        stage('login docker hub') {
            steps {
                echo 'login docker hub'
                withCredentials([usernamePassword(credentialsId: 'dockerHub', passwordVariable: 'dockerHubPass', usernameVariable: 'dockerHubUser')]){
                    sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPass}"
                }
            }
        }
        stage('build the app images') {
            steps {
                echo 'building the next-chat-app image'
                sh "docker build -t akashmondal0/next-chat:latest ."
            }
            steps {
                echo 'building the scoket-next-chat image'
                sh "cd socket-chat-api && docker build -t akashmondal0/socket-next-chat:latest ."
            }
        }
        stage('push docker hub') {
            steps {
                echo 'push next chat app image to docker hub'
                sh "docker push akashmondal0/next-chat:latest"
            }
            steps {
                echo 'push socket next chat app image to docker hub'
                sh "docker build -t akashmondal0/socket-next-chat:latest ."
            }
        }
        stage('deployment minikube') {
            steps {
                echo 'minikube start'
                sh "minikube start"
            }
            steps {
                echo 'configure mysql database deployment file'
                sh "cd kubernetes && cd mysql && kubectl apply -f mysql.yaml && kubectl apply -f mysql-vc.yaml && kubectl port-forward svc/mysql 3306:3306 --address 0.0.0.0"
            }
             steps {
                echo 'configure socket deployment file'
                sh "cd kubernetes && cd socket && kubectl apply -f socket.yaml && kubectl port-forward svc/socket 3003:3003 --address 0.0.0.0"
            }
             steps {
                echo 'configure app deployment file'
                sh "cd kubernetes && cd app && kubectl apply -f app.yaml && kubectl port-forward svc/next-chat 3000:3000 --address 0.0.0.0"
            }
        }
    }
}
