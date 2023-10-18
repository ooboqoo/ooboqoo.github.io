# Kubernetes

Kubernetes (K8s) is an open-source system for automating deployment, scaling, and management of containerized applications. It groups containers that make up an application into logical units for easy management and discovery.

Kubernetes 简称 K8s，是一个开源的 *集群管理* 系统，负责大规模集群的 *调度* 与管理，TCE 底层基于 K8s 进行集群实例管理。

如果没有 K8s，你需要自己控制：1）容器 containers 跑在哪一个节点 Node 或主机 Machine 上 2）各个 Node 之间如何通过网络 network 进行连接 3）如何将节点暴露到公网。如果你不想自己做，那么你可以通过配置几个 *YAML文件* 让 K8s 帮你完成。


## `kubectl` cheatsheet

```bash
$ kubectl apply -f deployment.yaml
# deployment.apps/hello-k8s created

$ kubectl scale deployment --replicas=1 hello-k8s
# deployment.apps/hello-k8s scaled

$ kubectl delete deployment hello-k8s
# deployment.apps "hello-k8s" deleted
```

```bash
$ kubectl apply -f service.yaml
# service/hello-k8s created

$ kubectl delete service hello-k8s
# service "hello-k8s" deleted
```


### Kubernetes Dashboard

https://github.com/kubernetes/dashboard/blob/master/README.md

```bash
# 安装应用
$ kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.6.1/aio/deploy/recommended.yaml

# 开启代理
$ kubectl proxy --port=9000

# 访问 Dashboard UI
$ open http://localhost:9000/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/
```



## 从 VM 到 容器

https://kubernetes.io/docs/concepts/overview/


## Cluster Architecture

<img src="https://upload.wikimedia.org/wikipedia/commons/b/be/Kubernetes.png" width="445" />

<img src="./images/k8s-cluster-archit.png" width="400" />

### Control Plane

The control plane's components make global decisions about the cluster.

Control plane components can be run on any machine in the cluster. However, for simplicity, set up scripts typically start all control plane components on the same machine, and do not run user containers on this machine.

* **kube-apiserver** serves the Kubernetes API using JSON over HTTP, which provides both the internal and external interface to Kubernetes.
* **etcd** is a persistent, lightweight, distributed, key-value data store used as Kubernetes' backing store for all cluster data.
* **kube-scheduler** selects on which node an unscheduled pod (the basic entity managed by the scheduler) runs, based on resource availability.
* **kube-controller-manager** runs controller processes. Logically, each controller is a separate process, but to reduce complexity, they are all compiled into a single binary and run in a single process.
* **cloud-controller-manager** embeds cloud-specific control logic

kube-controller
* 节点控制器（Node Controller）：负责在节点出现故障时进行通知和响应
* 任务控制器（Job Controller）：监测代表一次性任务的 Job 对象，然后创建 Pods 来运行这些任务直至完成
* 端点控制器（Endpoints Controller）：填充端点（Endpoints）对象（即加入 Service 与 Pod）
* 服务帐户和令牌控制器（Service Account & Token Controllers）：为新的命名空间创建默认帐户和 API 访问令牌

cloud-controller
* 节点控制器（Node Controller）：用于在节点终止响应后检查云提供商以确定节点是否已被删除
* 路由控制器（Route Controller）：用于在底层云基础架构中设置路由
* 服务控制器（Service Controller）：用于创建、更新和删除云提供商负载均衡器

### Nodes

Kubernetes runs your workload by placing containers into Pods to run on Nodes. A node may be a virtual or physical machine, depending on the cluster. Each node is managed by the control plane and contains the services necessary to run Pods. Typically you have several nodes in a cluster; in a resource-limited environment, you might have only one node.

* **kubelet** is an agent ensures that containers described in PodSpecs are running and healthy.
* **kube-proxy** is responsible for routing traffic to the appropriate container based on IP and port number.
* **container runtime** is the software that is responsible for running containers，supports containerd, CRI-O etc.

### Pods

Pod (容器组) 是 K8s 的最小调度单位，本质上是一组共享了某些资源的容器。

The basic scheduling unit in Kubernetes is a pod, which consists of one or more containers that are guaranteed to be co-located on the same node. Each pod in Kubernetes is assigned a unique IP address within the cluster. Within the pod, all containers can reference each other.

A pod can define a volume, such as a local disk directory or a network disk, and expose it to the containers in the pod. Pod 内声明共享同一个 Volume 进行容器间的文件共享，这也是 **sidecar** 的基本实现方式：在主容器外启动一个辅助容器，帮助实现一些独立于主容器外的工作。

Pod phase
* Pending - 该 Pod 已被 Kubernetes 集群接受，但一个或多个容器还未就绪
* Running - Pod 已绑定到一个节点，并且所有容器都已创建，且至少一个容器仍在运行
* Succeeded - Pod 中所有容器已成功终止，并且不会重新启动
* Failed - Pod 中所有容器均已终止，并且至少一个容器因故障而终止
* Unknown - 获取状态失败，一般为节点通信失败导致

Pod condition
* Pod Scheduled - 已将 Pod 调度到一个节点
* Container Ready - 准备好 Pod 中的所有容器
* Initialized - 所有初始化容器已成功启动
* Ready - Pod 能够处理请求，应将其添加到所有匹配服务的负载平衡池中


## Networking

https://kubernetes.io/docs/concepts/services-networking/

### K8s network model

集群中的每个 Pod 都会获得一个 IP 地址，可以被视做一台虚拟机或物理主机。

K8s 要求所有实现遵从：
* pods can communicate with all other pods on any other node without NAT
* agents on a node (e.g. system daemons, kubelet) can communicate with all pods on that node

K8s 网络解决了4个问题：
* Containers within a Pod use networking to communicate via loopback.
* Cluster networking provides communication between different Pods.
* The **Service** resource lets you expose an application running in Pods to be reachable from outside your cluster.
  - **Ingress** provides extra functionality specifically for exposing HTTP applications, websites and APIs.
* You can also use Services to publish services only for consumption inside your cluster.

### Services

Expose an application running in your cluster behind a single outward-facing endpoint.

### Endpoints

Pods expose themselves through *endpoints* to a service. A service expose an application running in your cluster behind a single outward-facing *endpoint*.

多个POD 共享 一组IP地址？

<img src="https://i.stack.imgur.com/9RyYS.png" height=250>

```bash
$ kubectl get endpoints
# NAME           ENDPOINTS                   AGE
# demo-service   10.1.0.25:80,10.1.0.26:80   3s
```


## 其他概念

https://kubernetes.io/docs/concepts/

### Volumes


### Namespaces


### 



## 实战

https://kubernetes.io/docs/reference/kubectl/

本地搭建一个 single-node cluster，包含 两个Nginx服务 + 一个负载均衡服务

1. 安装 Docker Desktop 并在 设置/Kubernetes 下打开「Enable Kubernetes」
2. 准备 deployment.yaml 和 service.yaml 配置文件
3. 然后执行以下操作

```bash
$ kubectl get nodes
# NAME             STATUS   ROLES           AGE   VERSION
# docker-desktop   Ready    control-plane   11h   v1.25.0

$ kubectl get all
# NAME                 TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
# service/kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP   2m51s

$ kubectl apply -f deployment.yaml
# deployment.apps/demo-deployment created

$ kubectl get pods
# NAME                               READY   STATUS    RESTARTS   AGE
# demo-deployment-5bcf7bd468-4gsqx   1/1     Running   0          41s
# demo-deployment-5bcf7bd468-9fbbr   1/1     Running   0          41s

$ kubectl apply -f service.yaml
# service/demo-service created

$ curl -I http://localhost:8086
# Nginx 正常响应，说明集群部署成功

$ kubectl get all
# NAME                                   READY   STATUS    RESTARTS   AGE
# pod/demo-deployment-5bcf7bd468-4gsqx   1/1     Running   0          4m38s
# pod/demo-deployment-5bcf7bd468-9fbbr   1/1     Running   0          4m38s
#
# NAME                   TYPE           CLUSTER-IP       EXTERNAL-IP   PORT(S)          AGE
# service/demo-service   LoadBalancer   10.101.186.192   localhost     8086:31026/TCP   3m2s
# service/kubernetes     ClusterIP      10.96.0.1        <none>        443/TCP          9m27s
#
# NAME                              READY   UP-TO-DATE   AVAILABLE   AGE
# deployment.apps/demo-deployment   2/2     2            2           4m38s
#
# NAME                                         DESIRED   CURRENT   READY   AGE
# replicaset.apps/demo-deployment-5bcf7bd468   2         2         2       4m38s

# 此时如果在 Docker 控制面板停掉一个 pod，很快 k8s 又会拉起一个补足
```

_deployment.yaml_

```yaml
kind: Deployment
apiVersion: apps/v1
metadata:
  name: demo-deployment
  labels:
    app: play-k8s
spec:
  replicas: 2  # replica 复制品
  selector:
    matchLabels:
      app: play-k8s
  template:
    metadata:
      labels:
        app: play-k8s
    spec:
      containers:
        - name: nginx
          image: nginx:latest
          ports:
            - containerPort: 80
```

_service.yaml_

```yaml
kind: Service
apiVersion: v1
metadata:
  name: demo-service
spec:
  selector:
    app: play-k8s
  type: LoadBalancer
  ports:
    - protocol: TCP
      port: 8086
      targetPort: 80
```

### 示例2

https://www.docker.com/blog/how-kubernetes-works-under-the-hood-with-docker-desktop/

_tutorial.yaml_

```yaml
---
apiVersion: v1
kind: Service
metadata:
  name: tutorial
spec:
  ports:
    - name: 80-tcp
      port: 80
      protocol: TCP
      targetPort: 80
  selector:
    com.docker.project: tutorial
  type: LoadBalancer
status:
  loadBalancer: {}

---
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    com.docker.project: tutorial
  name: tutorial
spec:
  replicas: 1
  selector:
    matchLabels:
      com.docker.project: tutorial
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        com.docker.project: tutorial
    spec:
      containers:
        - image: docker/getting-started
          name: tutorial
          ports:
            - containerPort: 80
              protocol: TCP
          resources: {}
      imagePullPolicy: IfNotPresent  # 确保使用本地镜像，方便本地开发调试。
      restartPolicy: Always
status: {}
```

```bash
$ kubectl apply -f tutorial.yaml
$ kubectl delete -f tutorial.yaml
```

本地开发应用，打包镜像后重新 `kubectl apply` 一下就可以查看结果了。

### Kubernetes on Docker Desktop

* 教程 https://birthday.play-with-docker.com/kubernetes-docker-desktop/
* 完整项目 https://github.com/dockersamples/example-voting-app
* 原理 https://www.docker.com/blog/how-kubernetes-works-under-the-hood-with-docker-desktop/

Kubernetes itself runs in containers. When you deploy a Kubenetes cluster you first install Docker (or another container runtime like containerd) and then use tools like kubeadm which starts all the Kubernetes components in containers. Docker Desktop does all that for you.

在设置面板中开启 Kubernetes， 然后 Docker Desktop will download all the Kubernetes images in the background and get everything started up. When it’s ready you’ll see two green lights in the bottom of the settings screen saying Docker running and Kubernetes running.

That’s a full Kubernetes cluster, with a single node that runs the Kubernetes API and your own applications. 

The Kubernetes components are running in Docker containers, but Docker Desktop doesn’t show them by default to keep things simple when you’re running docker commands. 当你输入 `docker container ls` 时看不到容器，但当你输入 `docker info` 时会发现有 18个容器 在跑。

如果想要重置K8S集群状态，在设置面板中点击下「Reset Kubernetes Cluster」就行。Click that and it will reset your cluster back to a fresh install of Kubernetes. Which is one of the reasons why Docker Desktop is the best of the local Kubernetes options.

You can have many containers in one pod in Kubernetes, and they share the same network and compute environment. That lets you do very cool things with the sidecar pattern.


### Label vs Tag

https://diffsense.com/diff/label/tag

Label 可以起到类似 ID 的定位作用

带牌牌的塑料扎带

[释1] A user-defined alias for a numerical designation, the reverse of an enumeration. Examples: "Storage devices can be given by label or ID."

[释2] A named place in source code that can be jumped to using a GOTO or equivalent construct.

Tag 更多地指 “符号” “记号”

[释1] A piece of markup representing an element in a markup language. Examples: `<code>var num = 0;</code>`

[释2] A keyword, term, or phrase associated with or assigned to data, media, and/or information enabling *keyword-based classification*; often used to categorize content.

