node {
    def app

    stage('Clone repository') {
        /* Let's make sure we have the repository cloned to our workspace */

        checkout scm
    }

    stage('Build image') {
        /* This builds the actual image; synonymous to
         * docker build on the command line */
        app = docker.build("bdzanko17/hotboxx")
    }

    stage('Push image') {
        /* Finally, we'll push the image with two tags:
         * First, the incremental build number from Jenkins
         * Second, the 'latest' tag.
         * Pushing multiple tags is cheap, as all the layers are reused. */
        docker.withRegistry('https://registry.hub.docker.com/repository/docker/bdzanko17/hotboxx', 'dockerhub_id') {
            app.push("${env.BUILD_NUMBER}")
            app.push("latest")
        }
    
    }

    stage('Run Container'){
     def dockerstop = 'sudo docker stop chat_box'
     def dockerRun = 'sudo docker run --name chat_box -p 4000:4000 -d  bdzanko17/hotboxx'
     sshagent(['dev-server']) {
       sh "ssh -o StrictHostKeyChecking=no ubuntu@3.83.157.49 ${dockerstop}"
       sh "ssh -o StrictHostKeyChecking=no ubuntu@3.83.157.49 ${dockerRun}"
     }
   }
}