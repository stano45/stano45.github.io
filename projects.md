---
title: Projects – Stanislav Kosorin
description: Projects by Stanislav Kosorin: backpressure, multi-tenant rate limiting in Python and Go; P4 load balancing for Kubernetes from Google Summer of Code 2024; a Rust code generator and a Slovak learning app.
url: https://kosorin.com/projects
---

# Projects

More projects are on [my GitHub profile](https://github.com/stano45). Also available as a [PDF résumé](https://kosorin.com/Stanislav_Kosorin_Resume.pdf) ([download](https://kosorin.com/Stanislav_Kosorin_Resume.pdf)).

## Multi-Tenant Rate Limiting – backpressure

2026 · open source

Rate limiting for Temporal workflows and other async workers that share rate-limited APIs. Before each call to an upstream API, a worker asks a shared Valkey gate for a permit, and the gate enforces a global cap, three priority classes, and a fair share between the tenants competing for it. The Python and Go packages share the same keyspace, so mixed fleets coordinate, and a plugin wires it into Temporal workers. To test it I also built mocklimit, a mock API server with realistic rate limits.

[Check out backpressure on GitHub](https://github.com/stano45/backpressure) · [mocklimit](https://github.com/stano45/mocklimit)

## Google Summer of Code – P4 Language Consortium

2024 · GSoC project

Load balancing for Kubernetes, done in the network switch. I built a CNI plugin that programs a P4 switch (BMv2) so traffic keeps reaching a pod while it migrates live to another node. Then I ported it to a real Intel Tofino 2 switch at TU Berlin's INET lab: a P4 program with connection-consistent hashing, a small control plane for migrations, and 20 live migrations in a row without dropping a single TCP connection.

[Check out p4containerflow on GitHub](https://github.com/stano45/p4containerflow) · [the Tofino 2 port](https://github.com/stano45/p4containerflow-tofino2)

## Portfolio Website – kosorin.com

2023, rewritten in 2026 · personal project

You're looking at it! I first built this website in 2023 with React, Next.js and Tailwind CSS, statically exported and hosted on GitHub Pages, in four languages. In 2026 I replaced all of that with a handful of hand-written HTML pages and one small stylesheet: no JavaScript, no frameworks, no build step. Every page also has a Markdown copy for LLMs.

[Check out the repository on GitHub](https://github.com/stano45/stano45.github.io) · [See the old Next.js version](https://github.com/stano45/stano45.github.io/tree/df00646a7734218bd040b543aa9a46df01f080cc)

## Rust Microservice Code Generator – TU Berlin

2023 · university project

Crustagen generates a ready-to-run Rust microservice from an AsyncAPI spec: the code, its dependencies and the docs.

[Check out the repository on GitHub](https://github.com/Programmierpraktikum-MVA/AsyncAPI)

## Slovak Language Learning App – LearnSlovak.sk

2025 · personal project · offline for now

Duolingo doesn't teach Slovak, so I built an app for my girlfriend to learn it: lessons and a practice mode, with a Next.js frontend and a Go backend.
