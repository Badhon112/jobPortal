- Service Cluster for EKS CBS DRIVER
  -> Set the role

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

aws eks create-addon \
 --cluster-name cluster1 \
 --addon-name aws-ebs-csi-driver \
 --service-account-role-arn arn:aws:iam::891377331253:role/AmazonEKS_EBS_CSI_Driver_Role \
 --region ap-south-1

-

Check the describe of this addon

```
aws eks describe-addon   --cluster-name cluster1   --addon-name aws-ebs-csi-driver   --region ap-south-1

```

If status is active then we can go else check

```
 kubectl get pods -n kube-system -w
```

---

# First adon

```
aws eks create-addon \
  --cluster-name cluster1 \
  --addon-name aws-ebs-csi-driver \
  --service-account-role-arn arn:aws:iam::<ACCOUNT_ID>:role/AmazonEKS_EBS_CSI_Driver_Role \
  --region ap-south-1
```

# Create IAM role

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

---

aws sts get-caller-identity

---

eksctl create iamserviceaccount \
 --cluster cluster1 \
 --namespace kube-system \
 --name ebs-csi-controller-sa \
 --attach-policy-arn arn:aws:iam::aws:policy/service-role/AmazonEBSCSIDriverPolicy \
 --approve \
 --role-name AmazonEKS_EBS_CSI_Driver_Role \
 --region ap-south-1

---

aws eks create-addon \
 --cluster-name cluster1 \
 --addon-name aws-ebs-csi-driver \
 --service-account-role-arn arn:aws:iam::891377331253:role/AmazonEKS_EBS_CSI_Driver_Role \
 --region ap-south-1

---

aws eks describe-addon \
 --cluster-name cluster1 \
 --addon-name aws-ebs-csi-driver \
 --region ap-south-1

---

kubectl get pods -n kube-system | grep ebs
