# Step 1) Create A Server

- Lunch a EC2 Server
- Create a iAm User with the access of
  - AdministratorAccess
  - IAMFullAccess
  - AmazonVPCFullAccess
  - AmazonEC2FullAccess
  - AWSCloudFormationFullAccess
  - AmazonEBSCSIDriverPolicy

---

# Step 2) Install Some package

- AWS CLI
- Install Kubectl
- Install eksctl

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

-> aws configure

- Set the Role of IAM user in the server

---

# Create A eks cluster

- Create THe Cluster without node group

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

- Create IAM Service Account for EBS CSI Driver

```
eksctl create iamserviceaccount \
  --region ap-south-1 \
  --name ebs-csi-controller-sa \
  --namespace kube-system \
  --cluster cluster1 \
  --attach-policy-arn arn:aws:iam::aws:policy/service-role/AmazonEBSCSIDriverPolicy \
  --approve \
  --override-existing-serviceaccounts
```

---

- Deploy Add-ons

```
kubectl apply -k "github.com/kubernetes-sigs/aws-ebs-csi-driver/deploy/kubernetes/overlays/stable/ecr/?ref=release-1.11"
```

- Check if EBS CSI Controller is running
  -> kubectl -n kube-system get pods | grep ebs

---

- Create A Storage Class (ebs-sc.yaml)

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

- To Check The StorageClass
  -> kubectl get pv

---

- Create A Persistence Volume Claim (ebs-pvc.yaml)

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

- To Check the PersistentVolimeClaim
  -> kubectl get pvc
  -> kubectl describe pvc ebs-pvc

---

- Create A dataBase Deployment (Deployment.yaml)

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mongo
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mongo
  template:
    metadata:
      labels:
        app: mongo
    spec:
      containers:
        - name: mongo
          image: mongo:7
          env:
            - name: MONGO_INITDB_ROOT_USERNAME
              value: "admin"
            - name: MONGO_INITDB_ROOT_PASSWORD
              value: "password"
          volumeMounts:
            - mountPath: /data/db
              name: mongo-volume
      volumes:
        - name: mongo-volume
          persistentVolumeClaim:
            claimName: ebs-pvc

```

- Check The Pods
  -> kubectl get pods

---

- Create A Server to access the mongodb Pod

```
apiVersion: v1
kind: Service
metadata:
  name: mongo-service
  labels:
    app: mongo
spec:
  type: NodePort
  selector:
    app: mongo
  ports:
    - port: 27017
      targetPort: 27017
      nodePort: 32000
```
