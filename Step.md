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

---

- Set A iAM user with this 5 acces in aws

  - AdministratorAccess
  - IAMFullAccess
  - AmazonVPCFullAccess
  - AmazonEC2FullAccess
  - AWSCloudFormationFullAccess
  - AmazonEBSCSIDriverPolicy

---

- Create A Cluster

```
# Create Cluster
eksctl create cluster --name=cluster1 \
                      --region=ap-south-1  \
                      --zones=ap-south-1a,ap-south-1b,ap-south-1c\
                      --without-nodegroup
# Get List of clusters
eksctl get clusters
```

---

- Create & Associate IAM OIDC Provider for our EKS Cluster

```
eksctl utils associate-iam-oidc-provider \
    --region ap-south-1 \
    --cluster cluster1 \
    --approve
```

---

- Create Node Group with additional Add-Ons in Public Subnets

```
# Create Public Node Group
eksctl create nodegroup --cluster=cluster1 \
                       --region=ap-south-1  \
                       --name=eksdemo1-ng-public2 \
                       --node-type=t3.medium \
                       --nodes=1 \
                       --nodes-min=1 \
                       --nodes-max=2 \
                       --node-volume-size=20
# Check The Nodes
kubectl get nodes
kubectl get svc
```

---

- Service Cluster for EKS CBS DRIVER
- first role then adon

-> permision

```
eksctl create iamserviceaccount \
  --name ebs-csi-controller-sa \
  --namespace kube-system \
  --cluster cluster1 \
  --attach-policy-arn arn:aws:iam::aws:policy/service-role/AmazonEBSCSIDriverPolicy \
  --approve \
  --role-only \
  --role-name AmazonEKS_EBS_CSI_Driver_Role \
  --region ap-south-1
```

-> create-addon

```
aws eks create-addon \
  --cluster-name cluster1 \
  --addon-name aws-ebs-csi-driver \
  --region ap-south-1
```

-> ebs-sc.yaml

```
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: ebs-sc
provisioner: ebs.csi.aws.com
volumeBindingMode: WaitForFirstConsumer
reclaimPolicy: Delete
allowVolumeExpansion: true
parameters:
  type: gp3
  fsType: ext4

```

-> ebs-pvc.yaml

```
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: ebs-pvc
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: ebs-sc
  resources:
    requests:
      storage: 5Gi

```

```
eksctl create iamserviceaccount \
  --name ebs-csi-controller-sa \
  --namespace kube-system \
  --cluster cluster1 \
  --attach-policy-arn arn:aws:iam::aws:policy/service-role/AmazonEBSCSIDriverPolicy \
  --approve \
  --region ap-south-1
```

---

- Delete this Cluster

```
# Delete EKSCTL
$ eksctl delete cluster --name cluster1 --region ap-south-1
```

docker build -t jobportalbackend:v1 .
docker build -t jobportalfrontend:v1 .

```
mongodb://admin:password@65.0.135.227:32000/
```

---

apt install gitleaks

---

sudo apt-get install wget gnupg
wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | gpg --dearmor | sudo tee /usr/share/keyrings/trivy.gpg > /dev/null
echo "deb [signed-by=/usr/share/keyrings/trivy.gpg] https://aquasecurity.github.io/trivy-repo/deb generic main" | sudo tee -a /etc/apt/sources.list.d/trivy.list
sudo apt-get update
sudo apt-get install trivy

---

Docker Environment Variable

--env / -e /--env-file

docker run --env variable=value image

Now lets inject this file into our Docker Container:
-> docker run --env-file .env image
