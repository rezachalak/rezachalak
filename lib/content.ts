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
    readingTime: "9 min read",
    event: "CNCF Vienna Meetup",
    excerpt:
      "The writeup behind my CNCF Vienna talk: why we moved a Docker Swarm appliance to Talos Linux, what air-gapped customer sites actually demand, and the operational trade-offs of giving up SSH.",
    tags: ["Talos", "Bare Metal", "Kubernetes", "Air-gapped", "GitOps"],
    links: [
      {
        label: "Slides",
        href: "https://github.com/rezachalak/talos-cncf-vienna-demo/tree/main/cncf-vienna-slides/talos-cncf-vienna-sep-2026",
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
          "This is the long form of the talk I gave at the CNCF Vienna Meetup. The short version: we replaced a Docker Swarm appliance with Kubernetes on Talos Linux, shipped it to air-gapped customer sites, and gave up SSH on purpose. Here is what that actually cost and what it bought.",
        ],
      },
      {
        heading: "The starting point",
        body: [
          "The product was an on-premises appliance. Customers ran it inside their own networks, often with no route to the internet at all — storage-adjacent security tooling tends to live in the parts of the network nobody wants exposed. It ran on Docker Swarm, and for a long time that was a perfectly reasonable choice: a single binary, a manageable mental model, and an install that a field engineer could talk a customer through over the phone.",
          "What broke down was not Swarm itself. It was everything around it. Ecosystem tooling had moved on — the operators, CSI drivers, backup tools, and policy engines we wanted were all being written for Kubernetes and nothing else. Every capability we needed became a bespoke thing we had to build and maintain ourselves.",
        ],
      },
      {
        heading: "Why Talos, and not a general-purpose distro",
        body: [
          "The obvious move is Kubernetes on the Linux you already know. We tried that mentally and kept arriving at the same problem: on an appliance you ship to someone else's datacenter, a general-purpose OS is a liability surface. Every package is a thing that can drift, a thing a customer can change, and a thing you must patch on their schedule rather than yours.",
          "Talos inverts that. There is no shell, no package manager, and no SSH. The whole machine is configured through an API with a declarative config, and the root filesystem is immutable. An upgrade is not a package transaction — it is a new image and a reboot.",
        ],
        list: [
          "The node config is a single YAML document you can generate, review, and store in git alongside everything else.",
          "There is nothing to configuration-drift, because there is no way to hand-edit a running node.",
          "The attack surface is genuinely small — no shell means no shell to get a foothold in.",
          "Upgrades are atomic and roll back cleanly, which matters enormously when the machine is 800km away behind a customer's firewall.",
        ],
      },
      {
        heading: "The part that hurts: no SSH",
        body: [
          "This is the objection every engineer raises within thirty seconds, and it is a fair one. Losing SSH means losing the debugging reflex you have built over a career. You cannot exec onto the box and poke around.",
          "What you get instead is talosctl, which exposes the things you actually needed SSH for — logs, service state, dmesg, network config, disk state, packet captures — as API calls. That is a narrower interface than a shell, and narrower is the point. It is also auditable in a way a shell session never is.",
          "The honest cost: the first few incidents are slower. Your team has to rebuild its instincts, and there will be a moment where someone badly wants to just cat a file. Budget for that. Run a deliberate game day before you ship it to a customer, not after.",
        ],
        callout:
          "If your team's answer to every production question is \"SSH in and look\", the migration is a cultural change first and a technical one second. Plan it that way.",
      },
      {
        heading: "What air-gapped actually demands",
        body: [
          "Air-gapped is a word that gets used loosely. In practice it meant: no image pulls, no Helm repo fetches, no module downloads, no telemetry egress, and no assumption that a certificate authority is reachable for validation. Every byte the cluster needs has to be on the media you ship.",
        ],
        list: [
          "A mirrored registry that ships with the appliance, pre-seeded with every image the install needs — including the ones your dependencies pull implicitly.",
          "Charts and manifests vendored, not fetched. A Helm repo URL in a manifest is a landmine on a disconnected site.",
          "An internal PKI, because you cannot lean on a public CA for internal mTLS.",
          "A reproducible installer: the same inputs must produce the same cluster, because you cannot debug a one-off on the customer's floor.",
        ],
      },
      {
        heading: "Delivery: the same pipeline, everywhere",
        body: [
          "The migration was only worth it because it let us collapse two delivery models into one. The same GitOps pipeline that reconciles our Azure preview environments produces the artifacts that go onto the appliance. The cluster's desired state is a git repository either way; the only difference is whether the reconciler pulls from a remote or from a bundle that arrived on disk.",
          "That is the real payoff, and it is worth being precise about it: the win was not Kubernetes. The win was having one description of a deployed system instead of two, and one set of tools that operates on it.",
        ],
      },
      {
        heading: "Would I do it again?",
        body: [
          "Yes, with two caveats. First, do not migrate to Kubernetes because it is Kubernetes — we did it because the ecosystem we needed only existed there, and that is a specific, checkable reason. If Swarm still gives you everything you need, you are fine.",
          "Second, Talos is the right call specifically when you do not control the machine's environment and you do want to control the machine. On a cluster your own team runs, in your own datacenter, with your own on-call rotation, a general-purpose distro costs you much less. On an appliance in someone else's rack, immutability stops being an aesthetic preference and starts being the thing that lets you sleep.",
        ],
      },
      {
        heading: "Slides and questions",
        body: [
          "The slides and the full demo environment are linked at the top of this post — the demo repo carries the manifests and the run sheet from the session, so you can walk through it yourself. I am happy to go deeper on any of this, particularly the air-gapped installer work, which was the least glamorous and most interesting part of the project. Email is the fastest way to reach me.",
        ],
      },
    ],
  },
];
