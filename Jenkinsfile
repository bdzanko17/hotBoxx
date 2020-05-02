pipeline {
environment {
registry = "bdzanko17/hotboxx"
registryCredential = 'dockerhub_id'
dockerImage = ''
}
agent any
stages {
stage('Cloning our Git') {
steps {
git 'https://github.com/bdzanko17/hotBoxx'
}
}
stage('Building our image') {
steps{
script {
dockerImage = docker.build registry + ":$BUILD_NUMBER"
}
}
}
stage('Deploy our image') {
steps{
script {
docker.withRegistry( '', registryCredential ) {
dockerImage.push()
}
}
}
}
stage('Cleaning up') {
steps{
sh "docker run -p 4000:4000 -d bdzanko17/hotboxx:{$BUILD_NUMBER}"
sh "docker rmi $registry:$BUILD_NUMBER"
}
}
}
} 