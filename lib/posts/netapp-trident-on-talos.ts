import type { Post } from "./types";

export const netappTridentOnTalos: Post = {
  slug: "netapp-trident-on-talos",
  title: "Running NetApp Trident on Talos Linux",
  date: "May 2026",
  dateISO: "2026-05-21",
  readingTime: "11 min read",
  excerpt:
    "Trident needs iscsiadm, blkid and mkfs on every node that mounts a volume. Talos has no package manager and no shell. Reconciling those two facts took longer than everything else in this setup.",
  tags: ["Talos", "NetApp", "Trident", "Kubernetes", "iSCSI", "ONTAP"],
  links: [
    {
      label: "Trident requirements",
      href: "https://docs.netapp.com/us-en/trident/trident-get-started/requirements.html",
      kind: "external",
    },
    {
      label: "Talos Image Factory",
      href: "https://factory.talos.dev/",
      kind: "external",
    },
  ],
  sections: [
    {
      body: [
        "NetApp Trident needs iscsiadm, blkid and mkfs on every node that mounts a volume. Talos Linux has no package manager and no shell to install them with. Reconciling those two facts took me longer than the ONTAP configuration and the Trident install put together, mostly because I started from the wrong mental model.",
        "This is the whole setup, on a Talos cluster talking to an ONTAP A220 over both iSCSI and NFS. You'll need talosctl, kubectl and helm, plus admin access to the array.",
      ],
    },
    {
      heading: "Extensions are part of the image",
      body: [
        "On a normal distribution you install open-iscsi and multipath-tools and you're done. On Talos they arrive as system extensions, and the first thing to understand is where those live.",
        "They are baked into the installer image. The machine config has a .machine.install.extensions field, it is deprecated, and since Talos v1.5 it installs nothing. I lost an evening to this: add extensions there, apply the config, reboot, watch the node come back perfectly healthy with no iscsiadm anywhere on it. No error, no warning in the logs I was reading. Just a node that doesn't work.",
        "What you do instead is build a schematic, hand it to Image Factory, and point the node at the installer image that comes back.",
      ],
    },
    {
      body: ["Write schematic.yaml:"],
      code: {
        lang: "yaml",
        content: `customization:
  systemExtensions:
    officialExtensions:
      - siderolabs/iscsi-tools
      - siderolabs/trident-iscsi-tools
      - siderolabs/multipath-tools
      - siderolabs/util-linux-tools
      # plus whatever your platform needs:
      # - siderolabs/qemu-guest-agent`,
      },
    },
    {
      body: ["Post it and keep the ID you get back:"],
      code: {
        lang: "bash",
        content: `curl -sX POST --data-binary @schematic.yaml \\
  https://factory.talos.dev/schematics
# {"id":"<schematic-id>"}`,
      },
    },
    {
      heading: "What the four extensions are for",
      list: [
        "iscsi-tools gives you the open-iscsi initiator, iscsiadm and iscsid. Without it there is no block storage at all.",
        "trident-iscsi-tools is a small bundle of binaries Trident shells out to: lsscsi, ls, free, pgrep, cat, dd.",
        "multipath-tools is device-mapper multipathing, for redundant paths to the array.",
        "util-linux-tools gives you blkid and mkfs, which is how a new LUN gets a filesystem.",
      ],
      body: [
        "That last one deserves a warning. NetApp's requirements table lists util-linux-tools under NVMe/TCP and not under iSCSI, so if you build your extension list from that table you will leave it out. You need it for iSCSI too. trident-iscsi-tools ships cat and dd but no blkid and no mkfs, so Trident can provision a LUN, attach it, and then fail to put ext4 on it. That is error one in the troubleshooting section, and it is the single most expensive thing on this page to get wrong.",
      ],
    },
    {
      heading: "Kernel modules",
      body: [
        "Two device-mapper modules, and these genuinely do belong in the machine config:",
      ],
      code: {
        lang: "yaml",
        content: `machine:
  kernel:
    modules:
      - name: dm_multipath
      - name: dm_round_robin`,
      },
    },
    {
      heading: "Multipath",
      body: [
        "multipathd runs as an extension service, so its config is a separate document rather than something under machine:",
      ],
      code: {
        lang: "yaml",
        content: `---
apiVersion: v1alpha1
kind: ExtensionServiceConfig
name: multipathd
configFiles:
  - content: |-
      defaults {
        user_friendly_names yes
        find_multipaths no
        path_selector "round-robin 0"
      }
    mountPath: /etc/multipath.conf`,
      },
      callout:
        "find_multipaths no is not a preference. Trident enforces it for SAN, and yes or smart will give you mount failures. It only matters for block storage, so skip it if you are purely on NFS.",
    },
    {
      body: [
        "The path selector has to match a module that is actually loaded, which is why dm_round_robin is in the list above. If you want service-time or queue-length you need dm_service_time or dm_queue_length instead.",
        "user_friendly_names yes just gets you readable names under /dev/mapper.",
      ],
    },
    {
      heading: "Applying it, which is two jobs not one",
      body: [
        "This is where the earlier point about images bites. The machine config and the extensions go on by different routes.",
        "Kernel modules and the multipath config are machine config, so apply-config handles them:",
      ],
      code: {
        lang: "bash",
        content: `talosctl -n <control-plane-ip> apply-config --file controlplane.yaml
talosctl -n <worker-ip>        apply-config --file worker.yaml`,
      },
    },
    {
      body: [
        "The extensions need an upgrade to the new installer image. Same Talos version you are already on, one node at a time:",
      ],
      code: {
        lang: "bash",
        content: `talosctl -n <node-ip> upgrade \\
  --image factory.talos.dev/metal-installer/<schematic-id>:v1.15.0 \\
  --preserve`,
      },
    },
    {
      body: [
        "The node pulls the image, installs it and reboots on its own. No separate talosctl reboot.",
        "--preserve keeps the EPHEMERAL partition. On a three-node control plane you can leave it off and let etcd resync from quorum. On a single control plane you cannot, because etcd lives on EPHEMERAL and a default upgrade will take it with the node.",
        "Check the extensions actually landed before touching ONTAP:",
      ],
      code: {
        lang: "bash",
        content: `talosctl -n <node-ip> get extensions
talosctl -n <node-ip> read /etc/iscsi/initiatorname.iscsi`,
      },
    },
    {
      callout:
        "Talos v1.12.5 moved where iscsi-tools exposes its binaries. They are no longer at /usr/local/sbin on the host root, which breaks CSI drivers that chroot in to call iscsiadm. If you are pinning versions anywhere near that release, read siderolabs/talos issue 12951 first.",
    },
    {
      heading: "The ONTAP side",
      body: [
        "One SVM serving both protocols. All of this is clickable in System Manager, but the CLI is quicker to follow and quicker to repeat, so that is what I'll show. Node and port names are from my system; substitute yours.",
      ],
      code: {
        lang: "text",
        content: `vserver create -vserver svm_timewarp_k8s -rootvolume root_vol \\
  -aggregate aggr1 -rootvolume-security-style unix

vserver add-protocols -vserver svm_timewarp_k8s -protocols iscsi,nfs`,
      },
    },
    {
      body: [
        "Three LIFs: management for Trident's control path, then one each for block and file traffic.",
      ],
      code: {
        lang: "text",
        content: `network interface create -vserver svm_timewarp_k8s -lif lif_mgmt \\
  -service-policy default-management -home-node node-01 -home-port e0c \\
  -address 10.20.1.73 -netmask 255.255.255.0

network interface create -vserver svm_timewarp_k8s -lif lif_iscsi \\
  -service-policy default-data-iscsi -home-node node-01 -home-port e0d \\
  -address 10.20.1.75 -netmask 255.255.255.0

network interface create -vserver svm_timewarp_k8s -lif lif_nfs \\
  -service-policy default-data-files -home-node node-01 -home-port e0d \\
  -address 10.20.1.76 -netmask 255.255.255.0`,
      },
    },
    {
      body: [
        "iSCSI and NFS can share a port. Give them separate ones if you have the ports.",
        "Next, iSCSI and the igroup that maps your nodes to the LUNs Trident will create. Collect every node's IQN first:",
      ],
      code: {
        lang: "bash",
        content: `for node in <node-1-ip> <node-2-ip> <node-3-ip>; do
  talosctl -n "$node" read /etc/iscsi/initiatorname.iscsi
done`,
      },
    },
    {
      body: ["Then on the array:"],
      code: {
        lang: "text",
        content: `vserver iscsi create -vserver svm_timewarp_k8s

lun igroup create -vserver svm_timewarp_k8s -igroup trident-iscsi \\
  -protocol iscsi -ostype linux \\
  -initiator iqn.2016-01.io.talos:node1,iqn.2016-01.io.talos:node2`,
      },
    },
    {
      body: [
        "Every node that might ever mount an iSCSI volume goes in that igroup. Leave one out and the cluster works fine until the scheduler puts a pod on it, which is a fault that looks like a network problem and isn't.",
        "Then NFS and the export policy:",
      ],
      code: {
        lang: "text",
        content: `vserver nfs create -vserver svm_timewarp_k8s -v3 enabled -v4.1 enabled

vserver export-policy rule create -vserver svm_timewarp_k8s \\
  -policyname default -clientmatch 10.21.9.0/24 \\
  -rorule sys -rwrule sys -superuser sys -protocol nfs3,nfs4`,
      },
    },
    {
      body: [
        "clientmatch is your node subnet. Swap sys for krb5 if you run Kerberos.",
        "Last, the credentials:",
      ],
      code: {
        lang: "bash",
        content: `kubectl create namespace trident

kubectl create secret generic netapp-ontap-credentials \\
  --namespace trident \\
  --from-literal=username=admin \\
  --from-file=password=/path/to/password.txt`,
      },
    },
    {
      body: [
        "from-file rather than from-literal for the password, so it stays out of your shell history. Delete the file afterwards.",
      ],
    },
    {
      heading: "Installing Trident",
      code: {
        lang: "bash",
        content: `helm repo add netapp-trident https://netapp.github.io/trident-helm-chart
helm repo update netapp-trident

helm install trident-operator netapp-trident/trident-operator \\
  --namespace trident \\
  --version 100.2510.0`,
      },
    },
    {
      body: ["You should get something like this:"],
      code: {
        lang: "text",
        content: `NAME                       READY   STATUS    RESTARTS   AGE
trident-controller-xxxxx   6/6     Running   0          2m
trident-node-linux-xxxxx   2/2     Running   0          2m
trident-operator-xxxxx     1/1     Running   0          3m`,
      },
    },
    {
      body: [
        "There is one trident-node-linux pod per node. If exactly one of them is stuck in Init or CrashLoopBackOff, that node is missing an extension. Go and run talosctl get extensions against that specific node rather than assuming the upgrade worked everywhere.",
      ],
    },
    {
      heading: "Backends",
      body: ["iSCSI first:"],
      code: {
        lang: "yaml",
        content: `apiVersion: trident.netapp.io/v1
kind: TridentBackendConfig
metadata:
  name: ontap-iscsi-backend
  namespace: trident
spec:
  version: 1
  storageDriverName: ontap-san
  managementLIF: "10.20.1.73"
  dataLIF: "10.20.1.75"
  svm: "svm_timewarp_k8s"
  igroupName: "trident-iscsi"
  credentials:
    name: netapp-ontap-credentials
  storage:
    - labels:
        encryption: "false"
        protocol: "iscsi"
        zone: "dev"
      defaults:
        spaceReserve: "none"
        snapshotPolicy: "default"
        snapshotReserve: "10"
        splitOnClone: "false"
        encryption: "false"
        tieringPolicy: "none"`,
      },
    },
    {
      body: ["Then NFS, which is the same shape minus the igroup:"],
      code: {
        lang: "yaml",
        content: `apiVersion: trident.netapp.io/v1
kind: TridentBackendConfig
metadata:
  name: ontap-nfs-backend
  namespace: trident
spec:
  version: 1
  storageDriverName: ontap-nas
  managementLIF: "10.20.1.73"
  dataLIF: "10.20.1.76"
  svm: "svm_timewarp_k8s"
  credentials:
    name: netapp-ontap-credentials
  storage:
    - labels:
        performance: "standard"
        protocol: "file"
        encryption: "false"
        zone: "dev"
      defaults:
        spaceReserve: "none"
        snapshotPolicy: "default"
        snapshotReserve: "10"
        splitOnClone: "false"
        encryption: "false"
        tieringPolicy: "none"
        exportPolicy: "default"
        securityStyle: "unix"
        unixPermissions: "0755"`,
      },
    },
    {
      body: [
        "Apply both and check they come up. A backend stuck in Failed almost always tells you exactly what is wrong if you describe it:",
      ],
      code: {
        lang: "bash",
        content: `kubectl apply -f trident-backend-iscsi.yaml
kubectl apply -f trident-backend-nfs.yaml
kubectl get tridentbackendconfig -n trident

kubectl describe tridentbackendconfig ontap-iscsi-backend -n trident`,
      },
    },
    {
      heading: "Storage classes",
      body: ["Block, ReadWriteOnce, and the cluster default:"],
      code: {
        lang: "yaml",
        content: `apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: ontap-iscsi
  annotations:
    storageclass.kubernetes.io/is-default-class: "true"
provisioner: csi.trident.netapp.io
parameters:
  backendType: "ontap-san"
  encryption: "false"
  provisioningType: "thin"
  fsType: "ext4"
allowVolumeExpansion: true
volumeBindingMode: WaitForFirstConsumer`,
      },
    },
    {
      body: ["File, ReadWriteMany:"],
      code: {
        lang: "yaml",
        content: `apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: ontap-nfs
provisioner: csi.trident.netapp.io
parameters:
  backendType: "ontap-nas"
  encryption: "false"
  fsType: "nfs"
allowVolumeExpansion: true
volumeBindingMode: WaitForFirstConsumer`,
      },
    },
    {
      body: [
        "WaitForFirstConsumer holds off provisioning until the scheduler has picked a node, so the volume is created where the pod actually lands. It is what stops the multi-attach error below, and I would set it even if you never hit that.",
        "fsType: ext4 on the block class is what makes fsGroup work. fsType: nfs on the NFS class looks like a copy-paste mistake, because the export obviously already has a filesystem on it. It isn't one. NetApp documents that fsGroup needs a non-null fsType on NFS volumes too, and nfs is the value everyone uses. Reviewers will flag it; leave it in.",
      ],
    },
    {
      heading: "Checking it works",
      body: ["A PVC and something to consume it:"],
      code: {
        lang: "yaml",
        content: `apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: test-pvc
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: ontap-iscsi
  resources:
    requests:
      storage: 1Gi`,
      },
    },
    {
      body: [
        "This will sit at Pending, which is WaitForFirstConsumer working rather than anything broken. Give it a pod:",
      ],
      code: {
        lang: "yaml",
        content: `apiVersion: v1
kind: Pod
metadata:
  name: test-pod
spec:
  containers:
    - name: test
      image: nginx:alpine
      volumeMounts:
        - name: data
          mountPath: /data
  volumes:
    - name: data
      persistentVolumeClaim:
        claimName: test-pvc`,
      },
    },
    {
      body: [
        "PVC goes Bound, pod goes Running. Then actually write to it, because a Bound PVC and a working mount are not the same claim:",
      ],
      code: {
        lang: "bash",
        content: `kubectl exec test-pod -- df -h /data
kubectl exec test-pod -- touch /data/hello`,
      },
    },
    {
      body: [
        "Delete both and run it again against ontap-nfs with ReadWriteMany.",
      ],
    },
    {
      heading: "The four errors I hit",
      body: ["In the order I hit them."],
    },
    {
      codeFirst: true,
      heading: "device /dev/dm-X is not unformatted",
      code: {
        lang: "text",
        content: `MountVolume.MountDevice failed: rpc error: code = Internal
desc = failed to stage volume: device /dev/dm-1 is not unformatted`,
      },
      body: [
        "util-linux-tools is missing. Trident wants blkid to find out whether the device already has a filesystem, and mkfs.ext4 to create one, and trident-iscsi-tools provides neither. This is the NetApp documentation gap from earlier arriving in your logs.",
        "Add siderolabs/util-linux-tools to the schematic, generate a new schematic ID, upgrade the nodes, then delete and recreate the PVCs that failed. They will not recover on their own.",
      ],
    },
    {
      code: {
        lang: "bash",
        content: `talosctl -n <node-ip> get extensions

kubectl exec -n trident <trident-node-pod> -c trident-main -- which blkid`,
      },
    },
    {
      codeFirst: true,
      heading: "Multi-Attach error for volume",
      code: {
        lang: "text",
        content: `Multi-Attach error for volume "pvc-xxxxx": Volume is already
exclusively attached to one node and can't be attached to another`,
      },
      body: [
        "volumeBindingMode is Immediate, so the volume got provisioned and attached before the scheduler chose a node. The pod then landed somewhere else, and Kubernetes cannot drag a ReadWriteOnce volume after it.",
        "Switch to WaitForFirstConsumer. volumeBindingMode is immutable, so that means deleting and recreating the StorageClass, and recreating anything provisioned under the old one.",
      ],
    },
    {
      codeFirst: true,
      heading: "unknown path selector type",
      code: {
        lang: "text",
        content: `device-mapper: table: 251:0: multipath: unknown path selector type
dm_addmap: libdm task=0 error: Invalid argument`,
      },
      body: [
        "multipath.conf names a selector whose module is not loaded. Either load the one you asked for or fall back to round-robin, which is the most widely available.",
        "To see what the node actually has, use list and not read, because it is a directory:",
      ],
    },
    {
      code: {
        lang: "bash",
        content: `talosctl -n <node-ip> list /lib/modules
talosctl -n <node-ip> list /lib/modules/<version>/kernel/drivers/md/`,
      },
      body: [
        "Take the kernel version off the node. $(uname -r) expands against your laptop, which is a confusing five minutes if you don't notice.",
      ],
    },
    {
      codeFirst: true,
      heading: "Could not login to iSCSI target",
      code: {
        lang: "text",
        content: `iscsiadm: Could not login to [iface: default, target: iqn.xxx, portal: x.x.x.x,3260]`,
      },
      body: [
        "Three candidates, in the order worth checking: the node's IQN is not in the igroup, the iSCSI LIF is not reachable from the node subnet, or iscsid is not running.",
      ],
    },
    {
      code: {
        lang: "bash",
        content: `talosctl -n <node-ip> read /etc/iscsi/initiatorname.iscsi
talosctl -n <node-ip> services
talosctl -n <node-ip> netstat | grep 3260`,
      },
    },
    {
      body: ["And on the array:"],
      code: {
        lang: "text",
        content: `lun igroup show -vserver svm_timewarp_k8s -igroup trident-iscsi`,
      },
    },
    {
      heading: "Afterwards",
      body: [
        "Almost everything difficult about this was the extension workflow, and specifically unlearning the habit of treating package installation as something you do to a running machine. On Talos the package is the image. Changing what is installed means building a new image and rolling the nodes onto it, and once that stops feeling like a detour it stops being one.",
        "What you get for it is a storage layer with no hand-edited node state in it anywhere. No box that drifted because somebody installed a different multipath-tools on it two years ago and left no note. That was the reason to run Talos to begin with, so it would be strange to bolt storage on in a way that gave it up.",
      ],
    },
  ],
};
