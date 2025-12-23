- Lunch a EC2 with the role of accessing

  - AdministratorAccess
  - IAMFullAccess
  - AmazonVPCFullAccess
  - AmazonEC2FullAccess
  - AWSCloudFormationFullAccess

- Install 3 Package eksctl, kubectl, AWS CLI

```
# Install AWS CLI
sudo apt update
sudo apt install -y unzip curl
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
aws --version

# Install Kubectl

curl -o kubectl https://amazon-eks.s3.us-west-2.amazonaws.com/1.19.6/2021-01-05/bin/linux/amd64/kubectl
chmod +x ./kubectl
sudo mv ./kubectl /usr/local/bin
kubectl version --short --client

# Install eksctl

curl --silent --location "https://github.com/weaveworks/eksctl/releases/latest/download/eksctl_$(uname -s)_amd64.tar.gz" | tar xz -C /tmp
sudo mv /tmp/eksctl /usr/local/bin
eksctl version
```

- AWS Configure

```
aws configure
```

- Create EKS Cluster using eksctl

```
# Create Cluster
eksctl create cluster --name=<nameofthatcluster> \
                      --region=<eu-north-1>  \
                      --zones=<eu-north-1a>, <eu-north-1b>, <eu-north-1c> \
                      --without-nodegroup

# Get List of clusters
eksctl get clusters
```

- Create & Associate IAM OIDC Provider for our EKS Cluster

```
# Template
eksctl utils associate-iam-oidc-provider \
    --region <region-code> \
    --cluster <cluter-name> \
    --approve

# Replace with region & cluster name
eksctl utils associate-iam-oidc-provider \
    --region eu-north-1 \
    --cluster nameofthatcluster \
    --approve
```

- Create Node Group with additional Add-Ons in Public Subnets

```
# Create Public Node Group
eksctl create nodegroup --cluster=cluster1 \
                       --region=ap-south-1  \
                       --name=eksdemo1-ng-public1 \
                       --node-type=t3.medium \
                       --nodes=1 \
                       --nodes-min=1 \
                       --nodes-max=2 \
                       --node-volume-size=20
# Check The Nodes
$ Kubectl get nodes
$ Kubectl get svc
```

- Delete CKS CLUSTER

```
# Delete EKSCTL
$ eksctl delete cluster --name cluster1 --region ap-south-1
```
