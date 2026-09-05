export const site = {
  name: "Reza Chalak",
  role: "DevOps Engineer",
  location: "Vienna, Austria",
  domain: "rezachalak.site",
  url: "https://rezachalak.site",
  tagline:
    "I build and run the infrastructure and supply chains that ship software — on bare metal, in air-gapped racks, and across AWS and Azure.",
  summary:
    "DevOps Engineer with 9+ years building software and running infrastructure on-premises and in AWS and Azure, across fintech, e-learning, and cybersecurity. Track record: migrated legacy workloads to the cloud, moved a Docker Swarm appliance to Talos Kubernetes for air-gapped sites, cloud cost optimization, built disaster recovery plans with defined RTO/RPO targets, and deployed AI agents into production.",
};

export const contact = {
  email: "rezachalak.dev@gmail.com",
  linkedin: "https://www.linkedin.com/in/rezachalak/",
  linkedinHandle: "/in/rezachalak",
  github: "https://github.com/rezachalak",
  githubHandle: "/rezachalak",
  instagram: "https://www.instagram.com/devopsnetwork/",
  instagramHandle: "@devopsnetwork",
};

export const nav = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export const stats = [
  { value: "9+", label: "Years in production" },
  { value: "300+", label: "Air-gapped servers managed" },
  { value: "30%", label: "AWS spend removed" },
  { value: "5M", label: "Users served by backends built" },
];

export const skills = [
  {
    group: "Core",
    items: [
      "Linux", "Kubernetes (Talos, EKS, AKS, RKE, K3S, Kubespray, Kind)", "Docker", "Containerd",
      "Helm", "Cilium", "MetalLB", "CertManager", "External Secrets Operator", "CNPG", "Kafka",
      "Strimzi", "NetApp Trident Operator", "Longhorn", "Velero", "Harbor", "Nexus", "ArgoCD",
      "FluxCD", "GitLab CI", "Terraform", "Ansible", "AWS", "Azure", "Hetzner", "VMware vSphere",
      "Prometheus Stack", "Grafana Stack", "Python", "Bash", "YAML", "GoTemplate", "Git",
    ],
  },
  {
    group: "Familiar",
    items: [
      "Docker Swarm", "MaaS", "GitHub Actions", "OpenTelemetry", "Fluentd", "ELK Stack",
      "PostgreSQL", "MongoDB", "Elasticsearch", "MinIO", "RabbitMQ", "EMQX", "Cloudflare",
      "CloudFront", "Nginx", "pfSense", "Keycloak", "SmallStep", "mTLS", "Cryptography",
      "SonarQube", "Java", "AI Agents", "RAG", "LangChain", "LangGraph", "ADK",
    ],
  },
  { group: "Languages", items: ["English — Advanced", "German — Basic"] },
];

export type Job = {
  title: string;
  company: string;
  meta: string;
  period: string;
  blurb: string;
  points: string[];
};

export const experience: Job[] = [
  {
    title: "Senior DevOps Engineer",
    company: "ProLion",
    meta: "Austria · Hybrid",
    period: "Jan 2025 — Sep 2026",
    blurb:
      "A cybersecurity company providing ransomware protection solutions for enterprise storage systems.",
    points: [
      "Migrated the on-premises appliance from Docker Swarm to Kubernetes on Talos Linux, for air-gapped customer deployments.",
      "Managed Azure infrastructure for internal services and customer-facing products, including ad-hoc preview environments using central ArgoCD.",
      "Deployed AI agents as part of the product, built and released through GitOps-managed CI/CD pipelines.",
    ],
  },
  {
    title: "DevOps Engineer",
    company: "Notion Wave Inc.",
    meta: "Dubai, UAE · Remote",
    period: "Sep 2022 — Nov 2024",
    blurb: "An international provider of content-driven SaaS solutions.",
    points: [
      "Cut AWS costs 30% by resizing node pools, tuning lifecycle policies, and allocating workloads based on load-test data.",
      "Migrated four SaaS products from on-premises infrastructure to EKS using ArgoCD and Terraform.",
      "Built GitOps pipelines with GitLab, Helm, Terraform, and ArgoCD — a single source of truth for auth and environment config.",
      "Ran a highly available, air-gapped on-premises Kubernetes cluster, including pfSense firewalls, Rancher Manager, and Nexus repository.",
      "Built Disaster Recovery Plans covering all data and infrastructure components: RTO 6 hours, RPO 24 hours.",
      "Rolled out OpenTelemetry for infrastructure monitoring.",
    ],
  },
  {
    title: "DevOps Engineer",
    company: "Khebreh Pardaz Pars (KPP)",
    meta: "",
    period: "Apr 2021 — Sep 2022",
    blurb:
      "An e-banking software provider contracted by Mellat Bank, one of the Middle East's largest financial institutions.",
    points: [
      "Migrated 10 systemd-managed projects to Kubernetes.",
      "Managed 300+ air-gapped servers using Ansible playbooks and roles, and maintained CI/CD pipelines for 15+ projects.",
      "Migrated a monolithic app to microservices using Spring Cloud, creating 14 network subnets.",
      "Integrated Prometheus and ELK for monitoring; built a Java Spring app to connect to the SMS provider's SOAP API.",
      "Engineered backend infrastructure for the BankPlus App, supporting 5 million users. Used Kafka with up to 200 topics, tested at over 1 million messages per second and p99 latency under 300ms.",
      "Contributed to ISO 27001 implementation with the security team.",
    ],
  },
  {
    title: "Software Engineer",
    company: "Omid Financial Group",
    meta: "",
    period: "Apr 2017 — Apr 2021",
    blurb: "Stock market algorithmic trading.",
    points: [
      "Developed a Java Spring app that integrated a broker API for order submission, using Liquibase and Hibernate.",
      "Ran deployment and testing stages in GitLab CI on a Kubernetes cluster.",
      "Ran unit, automated, manual, load, and performance tests using Postman and JMeter.",
    ],
  },
];

export const education = [
  {
    title: "M.Sc. in Mechanical Engineering",
    org: "Amirkabir University of Technology (AUT)",
    date: "Apr 2016",
    notes: [
      "Ranked 5th in the final exam of the 19th National Scientific Olympiad, 2013.",
      "Graduated with an A grade.",
      "Primary focus on green energies and computer simulations.",
    ],
  },
  {
    title: "Java Developer",
    org: "Maktab-Sharif bootcamp",
    date: "May 2018",
    notes: [
      "Developed core understanding of Java, Spring, networking, databases, and design patterns.",
      "Final project: designed and developed a university system using Java Spring.",
    ],
  },
];

export const certifications = [
  { name: "CKA — Certified Kubernetes Administrator", status: "In progress", date: "Expected 2026" },
  { name: "CKS — Certified Kubernetes Security Specialist", status: "In progress", date: "Expected 2026" },
];

export const talks = [
  {
    title: "Immutable, Minimal, Mighty: Running Kubernetes on Bare Metal with Talos",
    event: "CNCF Vienna Meetup",
    role: "Speaker",
    date: "Sep 2026",
    abstract:
      "Why an immutable, API-driven Linux distribution changes how you run Kubernetes on your own hardware — covering the move from a Docker Swarm appliance to Talos, what air-gapped customer sites demand, and the operational trade-offs of giving up SSH.",
    tags: ["Talos", "Bare Metal", "Kubernetes", "Air-gapped"],
  },
];

export const services = [
  {
    id: "01",
    title: "Kubernetes Platform Engineering",
    summary:
      "Clusters that survive contact with production — on bare metal with Talos, or managed on EKS and AKS.",
    points: [
      "Bare-metal and air-gapped clusters: Talos, RKE, K3s, Kubespray",
      "Networking and ingress: Cilium, MetalLB, cert-manager, mTLS",
      "Storage and stateful workloads: Longhorn, NetApp Trident, CNPG, Kafka/Strimzi",
      "Migrations off Docker Swarm, systemd, and VM-based deployments",
    ],
  },
  {
    id: "02",
    title: "GitOps & CI/CD",
    summary:
      "One source of truth for every environment, so releases stop depending on who is at the keyboard.",
    points: [
      "ArgoCD and FluxCD delivery, including ad-hoc preview environments",
      "GitLab CI and GitHub Actions pipelines with Helm and Terraform",
      "Private registries and artifact supply chains: Harbor, Nexus",
      "Secrets handling with External Secrets Operator and Keycloak-backed auth",
    ],
  },
  {
    id: "03",
    title: "Cloud & Cost Optimization",
    summary:
      "Right-sized infrastructure on AWS, Azure, and Hetzner — backed by load-test data, not guesswork.",
    points: [
      "Node pool sizing, lifecycle policies, and workload placement",
      "Terraform-managed landing zones and reproducible environments",
      "Lift-and-reshape migrations from on-premises to EKS and AKS",
      "Track record: 30% off an AWS bill without cutting capacity",
    ],
  },
  {
    id: "04",
    title: "Observability & Reliability",
    summary:
      "Know what broke before the customer tells you, and know how to get it back.",
    points: [
      "Prometheus and Grafana stacks, OpenTelemetry instrumentation",
      "Log pipelines with Fluentd and the ELK stack",
      "Disaster recovery plans with defined RTO/RPO targets and tested restores",
      "Backup and restore automation with Velero and custom tooling",
    ],
  },
  {
    id: "05",
    title: "Air-gapped & Regulated Environments",
    summary:
      "Infrastructure for sites with no internet, strict audits, and no room for improvisation.",
    points: [
      "Offline registries, mirrored dependencies, and reproducible installers",
      "300+ air-gapped servers managed with Ansible playbooks and roles",
      "pfSense firewalls, network segmentation, and internal PKI with SmallStep",
      "ISO 27001 implementation support alongside security teams",
    ],
  },
  {
    id: "06",
    title: "AI Agents in Production",
    summary:
      "Getting agents past the demo and onto the same release train as everything else.",
    points: [
      "Agent workloads packaged, deployed, and released through GitOps",
      "RAG and orchestration with LangChain, LangGraph, and ADK",
      "Self-hosted inference and data paths that stay inside your network",
      "Observability and cost controls for model-backed services",
    ],
  },
];

export type PostSection = {
  heading?: string;
  body?: string[];
  list?: string[];
  code?: { lang: string; content: string };
  callout?: string;
};

export type PostLink = {
  label: string;
  href: string;
  kind: "slides" | "repo" | "video" | "external";
};

export type Post = {
  slug: string;
  title: string;
  date: string;
  dateISO: string;
  readingTime: string;
  excerpt: string;
  tags: string[];
  event?: string;
  links?: PostLink[];
  sections: PostSection[];
};

export const posts: Post[] = [
  {
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
  },
];
