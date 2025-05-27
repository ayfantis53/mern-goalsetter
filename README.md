# Getting Started with Exercise-Tracker App
------------------------------------------------------------------------------------------------------------

* This project was created in reference to: 
    - Learn The MERN Stack - Express & MongoDB Rest API
        > [https://www.youtube.com/watch?v=-0exw-9YJBo&list=PLillGF-RfqbbQeVSccR9PGKHzPJSWqcsm&index=1]
    - Learn The MERN Stack - JWT Authentication
        > [https://www.youtube.com/watch?v=enopDSs3DRw&list=PLillGF-RfqbbQeVSccR9PGKHzPJSWqcsm&index=2]
    - Learn The MERN Stack - Frontend Authentication | Redux Toolkit
        > [https://www.youtube.com/watch?v=mvfsC66xqj0&list=PLillGF-RfqbbQeVSccR9PGKHzPJSWqcsm&index=3]
    - Learn The MERN Stack - Redux Goals & Deply
        > [https://www.youtube.com/watch?v=UXjMo25Nnvc&list=PLillGF-RfqbbQeVSccR9PGKHzPJSWqcsm&index=4]



------------------------------------------------------------------------------------------------------------
# Setting up Exercise-Tracker App
------------------------------------------------------------------------------------------------------------

* Dependencies.
    - Node.js
    - Express.js
    - Mongoose
    - DockerDesktop (Enable Kubernetes) 

* Initializing project folders and dependencies.
    * > FrontEnd Client.
        ### `cd client && npx create-react-app .`
        ### `npm i axios react-router-dom react-icons react-toastify react-redux @reduxjs/toolkit`
    * > Backend Server.
        ### `cd server && npm init -y`
        ### `npm i colors express cors mongoose dotenv bcryptjs jsonwebtoken express-async-handler && npm install -g nodemon`

* Setting up MongoAtlas DB.
   > Navigate to [https://cloud.mongodb.com/] and login.
   > Go to Clusters -> Collections -> Add my own data -> Create Collection .

* Setting up Docker.
    - Login.
        ### `docker login -u ${username}`
    - Docker cleanup commands.
        ### `docker rm -f $(docker ps -aq)`
        ### `docker image prune --all --force`
        ### `docker system prune`
   
* Connecting to Database.
    * > Go to Clusters -> Connect -> MongoDB for VS Code.
    * > Copy uri into var <ATLAS_URI> in .env file with extension [goalSetter?retryWrites=true&w=majority]
    * > In [k8s/secret.yml] need to update the <data.DBPASSWORD> to base-encoded64 <ATLAS_URI>
        ### `echo -n ${WORD} | base64` 
        - output of that command is the value of the secret.



------------------------------------------------------------------------------------------------------------
# Running Exercise-Tracker App locally
------------------------------------------------------------------------------------------------------------

* Debugging.
    > <Shift><Ctrl><J> to open browser console for debugging.

* Running project manually.
    > Open two terminals.
    ### `cd server && npm start`
    ### `cd client && npm start`

* Running project Docker.
    - Run project.
        * > On windows machine open DockerDesktop.
        * > navigate to [http://localhost:3050/] in browser after running compose.
            ### `docker-compose -f docker-compose.dev.yml up --detach`
            ### `docker-compose -f docker-compose.dev.yml down`

* Running project K8s.
    - Initiate K8s.
        * > Create repos [mern-goalsetter-client] and [mern-goalsetter-server] in Dockerhub before pushing. 
            images there. Need images in Dockerhub because thats where Kubernetes manifest files pull it from.
        * > Change routes in [./server/src/index.js]
            > `line 26`: take out the "/api"
            > `line 27`: take out the "/api"
        * > Build Images.
            ### `docker build -t ayfantis53/mern-goalsetter-client ./client`
            ### `docker build -t ayfantis53/mern-goalsetter-server ./server`
        * > Push to Dockerhub.
            ### `docker push ayfantis53/mern-goalsetter-client` 
            ### `docker push ayfantis53/mern-goalsetter-server` 
    - Run project.
        - Apply Ingress Controller from Kubernetes.
            ### `kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.12.2/deploy/static/provider/cloud/deploy.yaml`
        - Get rid of this validating webhook or our ingress service will not build.
            ### `kubectl delete -A ValidatingWebhookConfiguration ingress-nginx-admission`
        - Apply our Deployment files.
            ### `kubectl apply -f k8s/`
        > navigate to [127.0.0.1:8080] in browser.

    - Take down project.
        ### `kubectl delete -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.12.2/deploy/static/provider/cloud/deploy.yaml`
        ### `kubectl delete -f k8s/`



------------------------------------------------------------------------------------------------------------
# Running Exercise-Tracker App in Cloud (AWS)
------------------------------------------------------------------------------------------------------------
* Travis CI Setup.
    - [https://app.travis-ci.com/]
        * >  click "ayfantis53/mern-goalsetter" -> More Options -> Settings.
        * >  Goto "Environment Variables" and enter in all variables from [.env] files.
            - Enter in <DOCKER_ID> and <DOCKER_PASSWORD> with values also.
    - AWS Keys in Travis.
        * > Add <AWS_ACCESS_KEY> and paste IAM access key.
        * > Add <AWS_SECRET_KEY> and paste IAM secret key.

* ELB Deployment
    - Creating an EC2 IAM Profile.
        * > AWS Management Console.  ->  Search for `IAM` -> Click `IAM Service`.
            - Click `Roles` under `Access Management` in the left sidebar.
            - Click `Create Role`
                - Select `AWS Service` under `Trusted entity type`.
                - Select `EC2` under `common cases` then hit `next`.   
    - Creating Elastic Beanstalk Environment:
        * > AWS Management Console.  ->  Search for `Elastic Beanstalk` -> Click `Environment`.
        * > Create environment.
            - Application name     : `goalsetter`
            - Platform             : `Docker`
            - Presets              : `Single Instance(Free Tier)`
            - Click `Next`.
        * > Service Access configuration form.
            - Service Role         : `Create New Service role`.
            - Existing Service Role: `aws-elasticbeanstalk-service-role`.
            - EC2 Instance Role    : `aws-elasticbeanstalk-ec2-role`.
            - Click `Skip to Review` -> Click `Submit`.
        * > AWS Management Console.  ->  Search for `S3`.
            - Find and click the `elasticbeanstalk` bucket that was automatically created.
            - Click `Permissions` menu tab.
            - Find `Object Ownership` and click `Edit`.
                - Change `ACLs disabled` to `ACLs enabled`.
                - Change `Bucket Owner Preferred` to `Object Writer`.
                - Check box acknowledging the warning  ->  Click `Save Changes`. 
    - Create a Custom Security Group.
        * > AWS Management Console.  ->  Search for `VPC`.
            - `Security` Section in the left Sidebar -> Click `Create Security Groups`.
                - Set Description.
                - Set VPC to your default VPC.
                - click `Create Security Group`.
            - Click `Edit Inbound`.
                - Click `Add Rule`.
                - Set Port Range to `5432-6379`.
                - Click in box next to source and type `sg` into box. -> Select Security Group you just created.
                - Click `Save Rules button`.
    - Apply Security groups to ELB.
        * > AWS Management Console.  ->  Search for `Elastic Beanstalk`.
            - `Security` Section in the left Sidebar -> Click `Security Groups`.
                - Click `Environments` in the left sidebar.
                - Click `goalsetter-env`.
                - In left sidebar click `Configuration`.
                    - In `Instances` row click `Edit`.
                    - Scroll to `EC2 Security Groups` and tick box next to `goalsetter`.
                    - Click `Apply` and `Confirm`.
            - After all instances restart and go from `No Data` to `Severe`, will see green check under `Health`.
    - Setting environmental variables:
        * > AWS Management Console.  ->  Search for `Elastic Beanstalk`.
            - Click `Environments` in the left sidebar.
            - Click `goalsetter-env`.
            - In left sidebar click `Configuration`.
                - Go to `Updates, monitoring, and Logging` -> Click `Edit`.
                - Go to `Environment Properties` -> Click `Add environment property`.   
                    - Do this for all environment variables.
            - Click `Apply`.
            - After all instances restart and go from `No Data` to `Severe`, will see green check under `Health`.
    - IAM Keys for deployment
        * > AWS Management Console.  ->  Search for `IAM Security, Identity & Compliance Service`.
            - Click `Create Individual IAM Users` -> Click `Manage Users` -> Click `Add User`.
                - Name: `goalsetter`
                - Click `Next`   ->   Click `Attach Policies Directly`.
                - Search for `Beanstalk`.
                - Tick the box next to `AdministratorAccess-AWSElasticBeanstalk`.
                - Click `Next`   ->   Click `Create User`.
                - Select IAM user that was just created from the list of users.
                - Click `Security Credentials`.
                - Scroll down to `Access Keys`  ->  Click `Create Access Key`.
                - Select `Command Line Interface(CLI)`.
                - Tick `I understand...` box.   -> Click `Next`.
            - Copy or download the Access Key Id and Secret Access key to use in Travis Variable setup.
    - Important steps:
        > Set the security group in AWS to listen on ports 8080-9000
        > Set a bigger EC2 Instance t2-medium
        > Put EC2 Instances Ip address into MongoAtlas DB whitelist

* EKS Deployment
    - Important names and commands:
        > AWS_EKS_CLUSTER_NAME = eks-cluster
        > aws eks list-clusters --region us-east-2
        > aws eks update-kubeconfig --region us-east-2 --name eks-cluster
        > kubectl get svc



------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------