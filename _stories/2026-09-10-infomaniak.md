---
title: "Ecodesign of the Custom Brand feature"
company: "Infomaniak"
sector: "Hosting"
logo: /assets/images/logos/infomaniak.svg
summary: "Mutualizing for simplicity and scaling"
key_metric: "-99,93%"
key_metric_label: "Kubernetes pods"
tags: [kubernetes, infrastructure]
date: 2026-09-10
source_url: "https://news.infomaniak.com/en/case-study-eco-design/"
source_name: "Eco-design and technical debt: how we replaced horizontal scaling with a redesign that is 100x more efficient"
---

The Custom Brand feature of kSuite makes it possible for users to customize their online workspce.    
The initial architecture (1 Kubernetes pod per customer) soon happened to be difficult to manage at scale.   
It was decided to pool what was duplicated and rewrite the system in Go for a better scalability.  
  
## Key figures
- Kubernetes pods: from 2,855 to ~2 on average (-99.93%)
- Reserved RAM: from 748 GB to ~2 GB (-99.73%)
- Reserved CPUs: from 28.55 to ~0.2 (-99.30%)  
   
## Beyond the numbers
- Monitoring restored and stabilised
- Multi-cluster compatibility and preparation for multi-data center deployment
