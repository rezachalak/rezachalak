import type { Post } from "./types";

export const talosCncfVienna: Post = {
    slug: "talos-cncf-vienna-sep-2026",
    title: "Immutable, Minimal, Mighty: Running Kubernetes on Bare Metal with Talos",
    date: "Sep 2026",
    dateISO: "2026-09-03",
    readingTime: "12 min read",
    event: "CNCF Vienna Meetup",
    excerpt:
      "The companion writeup to my CNCF Vienna talk: what happens when you apply Kubernetes' own design principles to the operating system underneath it — plus the full GitOps demo that runs on one laptop, and every trap I hit building it.",
    tags: ["Talos", "Bare Metal", "Kubernetes", "GitOps", "Flux"],
    links: [
      {
        label: "Slides",
        href: "/talos-cncf-vienna-sep-2026",
        kind: "slides",
      },
      {
        label: "Demo repository",
        href: "https://github.com/rezachalak/talos-cncf-vienna-demo",
        kind: "repo",
      },
    ],
    sections: [
      {
        body: [
          "I gave this talk at the CNCF Vienna Meetup on 3 September 2026. It opens with a question I think is worth sitting with: have you ever thought about the design principles behind Kubernetes? And if those principles are good enough to run your workloads, what happens when you apply them one layer down — to the operating system itself?",
          "That is more or less what Talos Linux is. This post follows the same arc as the talk and then walks through the demo, which runs a complete GitOps loop on a single laptop with no cloud, no external registry, and no second repository to wire up.",
        ],
      },
      {
        heading: "What's wrong with a general-purpose Linux",
        body: [
          "Nothing, in general. That is precisely the problem. A general-purpose distribution is built to do anything, and a Kubernetes node needs to do one thing. Everything else it ships is surface you inherit and have to defend.",
        ],
        list: [
          "A package manager means drift — node by node, in ways nobody records.",
          "SSH access means an unaudited surface, and a shell means undeclared state: whatever the last person did by hand is now part of your cluster and written down nowhere.",
          "General-purpose tooling means CVEs for software your workloads never asked for.",
        ],
      },
      {
        heading: "What a Kubernetes node actually needs",
        body: [
          "Strip it back and the list is short: a kernel, the handful of binaries Kubernetes genuinely requires, a container runtime, and some way to talk to the machine. That last one is where Talos makes its most divisive choice — the way to talk to the machine is an API, and only an API.",
        ],
      },
      {
        heading: "Eight criteria for an operating system built for Kubernetes",
        body: [
          "These are the design criteria from the talk. They read like a description of Kubernetes itself, which is the point — the same ideas apply just as well below the cluster as above it.",
        ],
        list: [
          "API-driven: every interaction goes through an API. Never a shell, never SSH.",
          "Single source of truth: one declarative document fully describes the node.",
          "Declarative state: you say what the node should be, never the steps to get there.",
          "Reconciliation loop: validate, then converge continuously toward the desired state.",
          "Minimal: only what Kubernetes needs. Nothing else ships.",
          "Maintainable: fewer moving parts means fewer things that can drift or break.",
          "Secure by default: mTLS, PKI identity, and no default passwords — not bolted on afterwards.",
          "Replaceable: you don't repair a node, you replace it. Like a pod.",
        ],
      },
      {
        heading: "How Talos actually works",
        body: [
          "Under the hood there are only a few moving pieces. machined is PID 1 and supervises everything. trustd handles PKI and issues node identity. containerd runs every container, and Kubernetes talks to it over the CRI like it would anywhere else.",
          "The interesting one is apid. It is the only door into the machine — a gRPC API secured with mTLS — and talosctl, running on your laptop rather than on the node, is what knocks on it. There is no SSH daemon to disable because there is no SSH daemon.",
          "All of those services sit on COSI, a shared resource and controller-runtime model. If you have written a Kubernetes controller, the pattern is already familiar: resources, watches, reconciliation. It is the same idea, applied to the machine.",
        ],
        callout:
          "Losing SSH is the objection everyone raises within thirty seconds, and it is fair. What you get back is that everything you actually used SSH for — services, extensions, disks, mounts, etcd status — is a typed API call that is auditable in a way a shell session never is.",
      },
      {
        heading: "Inspecting a node without a shell",
        body: [
          "This is the part of the talk that tends to convert people. A Talos node is not a black box just because you cannot log into it:",
        ],
        code: {
          lang: "bash",
          content: `talosctl get services      # what's running, per the machine config
talosctl get extensions    # what the Factory image actually shipped
talosctl get disks         # and: get mounts / usage --humanize /var/mnt/
talosctl etcd status
talosctl edit machineconfig`,
        },
      },
      {
        heading: "Getting from zero to a running node",
        body: [
          "You start at the Talos Image Factory, which builds a custom install image: you pick the extensions, the kernel arguments, and the architecture up front. Whatever the hardware needs goes in; nothing ships unasked. Kernel arguments are declared in the image rather than edited on a running box.",
          "From there a single machine config — one YAML document — fully describes a control plane or worker node. The same model covers bare metal, VMware, Proxmox, and every major cloud.",
          "Upgrades are the payoff. Talos keeps A/B partitions, so an upgrade is one API call pointed at a new Factory installer image, and a rollback is just as fast. No package transactions, no half-upgraded node.",
        ],
      },
      {
        heading: "The demo: a whole GitOps loop on one laptop",
        body: [
          "The demo is a one- or two-node Talos cluster in VirtualBox that bootstraps itself into a complete GitOps setup. Talos boots, brings up its own container registry, installs Flux on its own, and Flux then watches that same registry for manifests you push to it. No cloud, no external registry, no separate GitOps repo.",
          "Stage one is deliberately boring: a patch with nothing but the install disk and a VIP. Stage two is where it gets interesting.",
        ],
        list: [
          "A second disk becomes a UserVolumeConfig mounted at /var/mnt/data.",
          "zot runs as a static pod in kube-system, using that disk for storage.",
          "containerd on the node is pointed at zot as a pull-through mirror for docker.io, ghcr.io, registry.k8s.io and quay.io.",
          "allowSchedulingOnControlPlanes is set, so a single-node cluster can actually run workloads.",
          "Flux is installed by a one-shot helm install Job that Talos runs itself via cluster.inlineManifests — no manual flux install step.",
          "A Flux OCIRepository and Kustomization point at oci://<VIP>:5000/apps — that same zot registry — reconciling every five seconds.",
        ],
      },
      {
        heading: "Bootstrapping it",
        body: [
          "Config generation and bootstrap are three commands. The bootstrap happens once, ever, per cluster:",
        ],
        code: {
          lang: "bash",
          content: `talosctl gen config talos-cncf-vienna-demo https://<VIP>:6443 \\
  --output-dir demo-1 \\
  --config-patch-control-plane @patch.yaml \\
  --with-secrets secrets.yaml

talosctl apply-config --insecure --nodes <control-plane-ip> \\
  --file demo-1/controlplane.yaml

talosctl bootstrap --nodes <control-plane-ip> --endpoints <control-plane-ip>
talosctl kubeconfig kc --force`,
        },
      },
      {
        heading: "Gotchas that cost me the most time",
        body: [
          "The demo looks tidy now. Getting there was not, and these are the ones worth writing down.",
        ],
        list: [
          "Pick a VIP inside your actual subnet. The VMs use bridged networking, so they get a real address on whatever network the laptop is on. A VIP outside that range is simply unreachable — it looks like a Talos or VirtualBox bug and it is neither. A phone hotspot is usually a /28: fourteen usable addresses, total.",
          "machine.network.hostname fights HostnameConfig. Config generation always emits a HostnameConfig with auto: stable. Set a static hostname the other way as well and apply-config rejects the whole config with a confusing \"static hostname is already set\". Set it on the HostnameConfig document instead.",
          "Changing the cluster endpoint invalidates every live ServiceAccount token. Talos derives the apiserver's --service-account-issuer from cluster.controlPlane.endpoint. Change it on an already-bootstrapped cluster — moving from NAT to bridged, say — and every minted token starts failing Unauthorized until the pods restart.",
          "Static pod config files have to live where kubelet can see them. Kubelet runs in its own restricted mount namespace; /var/lib/kubelet/... and UserVolumeConfig mounts under /var/mnt/... are visible, a bare machine.files entry elsewhere is not.",
          "zot's on-demand cache resolves by repository path only, because containerd's mirror protocol never tells it which upstream a pull came from. Fine when you control the image names; two mirrored registries with an identically named repo would collide.",
        ],
      },
      {
        heading: "The trap that looks like nothing happening",
        body: [
          "This one deserves its own section because it fails silently, which is the worst way to fail on stage.",
          "Always run flux push artifact from the repository root with --path=\"./apps\". Push from inside the demo directory with --path=\"../apps\" and the artifact ends up carrying an entry literally named ../apps. Flux refuses to extract it — that is a path-traversal safety check doing its job — and quietly keeps serving whatever it last successfully pulled.",
          "It looks exactly like \"my push had no effect\". It is really \"my push never landed\". Worse, once a bad artifact is stuck, Flux backs off and stops retrying every five seconds, so even a good push afterwards appears to do nothing until you force it.",
        ],
        code: {
          lang: "bash",
          content: `flux reconcile source oci apps -n flux-system
flux reconcile kustomization apps -n flux-system`,
        },
      },
      {
        heading: "Run it yourself",
        body: [
          "The demo repository is linked at the top of this post. It has the VM provisioning script, both config patches, the podinfo app tree, and the run sheet I worked from on stage.",
          "One warning about that run sheet: read it, do not execute it. Despite the .sh extension it hardcodes a VIP and two DHCP addresses you have to replace with your own, the node addresses can only be read off the VM consoles after they boot, and one line opens an interactive editor. Run it top to bottom unattended and it will happily apply configs to addresses that are not yours.",
          "The slides are linked at the top too — one self-contained HTML file, no build step and no runtime dependencies, so it works offline and on a projector. Press E to edit it in place if you want to fork the deck for your own talk.",
          "Questions, corrections, or your own Talos war stories are all welcome. Email is the fastest way to reach me.",
        ],
      },
    ],
  };
