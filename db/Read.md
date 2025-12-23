Create A Policy in AWS Policy Custom Policy

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ec2:AttachVolume",
        "ec2:CreateSnapshot",
        "ec2:CreateTags",
        "ec2:CreateVolume",
        "ec2:DeleteSnapshot",
        "ec2:DeleteTags",
        "ec2:DeleteVolume",
        "ec2:DescribeInstances",
        "ec2:DescribeSnapshots",
        "ec2:DescribeTags",
        "ec2:DescribeVolumes",
        "ec2:DetachVolume"
      ],
      "Resource": "*"
    }
  ]
}
```

Name THis as Amazon_EBS_CSI_Driver

and Set this to the user

---

### Step-03: Get the IAM role Worker Nodes using and Associate this policy to that role

```
# Get Worker node IAM Role ARN
kubectl -n kube-system describe configmap aws-auth

# from output check rolearn
rolearn: arn:aws:iam::180789647333:role/eksctl-cluster1-nodegroup-eksdemo1-NodeInstanceRole-CiagrIE5WH0q

```

- eksctl-cluster1-nodegroup-eksdemo1-NodeInstanceRole-CiagrIE5WH0q
- In this role in aws attach the policy of Amazon_EBS_CSI_Driver

### Step-04: Deploy Amazon EBS CSI Driver

- Verify kubectl version, it should be 1.14 or later

```
kubectl version --client --short
```

- Deploy Amazon EBS CSI Driver

```
# Install kustomize
curl -s "https://raw.githubusercontent.com/kubernetes-sigs/kustomize/master/hack/install_kustomize.sh" | bash
kustomize /usr/local/bin/
kustomize version

# Deploy EBS CSI Driver
git clone https://github.com/kubernetes-sigs/aws-ebs-csi-driver.git
kustomize build . | kubectl apply -f -


# Verify ebs-csi pods running
kubectl get pods -n kube-system
```
