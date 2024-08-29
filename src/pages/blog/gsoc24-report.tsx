import React, { ReactNode } from 'react';

import { CSGuidePost, GSoC24Report } from '@/blogposts';
import { BlogPost, ImageWrapper } from '@/components';

interface InsiderTipProps {
  content: ReactNode;
  number?: number;
}
function InsiderTip({ content, number }: InsiderTipProps): JSX.Element {
  return (
    <p className="mb-8">
      <b>Insider Tip{number ? ` ${number}` : ''}: </b>
      {content}
    </p>
  );
}

function H3title({ children }: { children: string }): JSX.Element {
  return <h3 className="my-8 font-bold text-2xl">{children}</h3>;
}

export default function BlogPostPage(): ReactNode {
  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    <BlogPost post={GSoC24Report}>
      <div className="my-8 text-xl">
        <h2 className="my-8 font-bold text-3xl" id="abstract">
          Abstract
        </h2>
        <p className="mb-8">
          Kubernetes has recently introduced a container checkpoint/restore (C/R) feature to enable the creation of
          stateful snapshots for running containers. This feature allows containers to be restarted from checkpoints in
          different pods, enabling use cases such as live migration of microservices. However, preserving established
          TCP connections during migration is challenging because Kubernetes dynamically allocates IP addresses to Pods
          in the cluster. As a result, the restored container will run with a different IP address after migration,
          while clients will continue to send packets to the old IP address. This project aims to address this problem
          by developing a P4-based load balancer that keeps track of established TCP connections and routes application
          traffic to the correct IP address after container migration.
        </p>
        <h2 className="my-8 font-bold text-3xl" id="goals">
          Goals
        </h2>
        <ul className="ml-6 list-disc">
          <li className="mb-4">
            Write a load balancer program in the P4 language that forwards TCP packets to hosts while preserving
            established TCP connections during container migration
          </li>
          <li className="mb-4">
            Develop a P4Runtime controller that automatically updates the packet forwarding rules during container
            migration
          </li>
          <li className="mb-4">Explore the integration of a P4 software switch with Kubernetes clusters</li>
          <li className="mb-4">
            Design evaluation experiments that demonstrate the preservation of established TCP connections during
            container migration
          </li>
        </ul>
        <h2 className="my-8 font-bold text-3xl" id="results">
          Results
        </h2>
        <p className="mb-8">
          The project successfully demonstrates the application of the P4 language to address the challenge of
          preserving established TCP connections during container migration, even when IP addresses change. Several
          migration scenarios were implemented using the BMv2 switch to illustrate the effectiveness of this approach.
        </p>
        <p className="mb-8">Key contributions include:</p>
        <ul className="ml-6 list-disc">
          <li className="mb-4">
            <strong>Process migration:</strong> Demonstrating how TCP connections can be maintained during migration of
            Linux processes from one network namespace to another.
          </li>
          <li className="mb-4">
            <strong>Container migration with a BMv2 switch:</strong> Demonstrating migration of containers between Pods
            while preserving TCP connections.
          </li>
          <li className="mb-4">
            <strong>Container migration with a fully containerized setup:</strong> The scenario above has been extended
            to include the BMv2 switch running in a container.
          </li>
          <li className="mb-4">
            <strong>Container migration of an in-memory database:</strong> This example demonstrates the migration of a
            container running an in-memory database (Redis) while preserving established TCP connections.
          </li>
          <li className="mb-4">
            <strong>Kubernetes integration using kube-router:</strong> A use case was explored involving kube-router,
            with plans to replace it with BMv2 in future work.
          </li>
        </ul>
        <h2 className="my-8 font-bold text-3xl" id="links">
          Links
        </h2>
        <p className="mb-8">
          All artifacts developed throughout this GSoC project are available in the following GitHub repository:
          <a href="https://github.com/stano45/p4containerflow" className="text-blue-500 underline">
            https://github.com/stano45/p4containerflow
          </a>
        </p>
        <h2 className="my-8 font-bold text-3xl" id="implementation-details">
          Implementation details
        </h2>
        <p className="mb-8">
          This project was implemented in small, incremental steps, from simple process migration using
          <a href="https://criu.org/Main_Page" className="text-blue-500 underline">
            CRIU
          </a>
          to an integration with
          <a href="https://kubernetes.io/" className="text-blue-500 underline">
            Kubernetes
          </a>
          . The following sections describe each step of the project, outline some of the key challenges faced during
          development, and discuss their solutions. The relevant code and resources for each step are linked in the
          sections below.
        </p>
        <h3 className="my-8 font-bold text-3xl" id="initial-prototype">
          Initial prototype
        </h3>
        <p className="mb-8">
          Relevant PR:
          <a href="https://github.com/stano45/p4containerflow/pull/1" className="text-blue-500 underline">
            https://github.com/stano45/p4containerflow/pull/1
          </a>
        </p>
        <p className="mb-8">
          The
          <a href="https://github.com/p4lang/tutorials" className="text-blue-500 underline">
            tutorials repository
          </a>
          provides a set of scripts for building a virtual machine (VM) which includes all relevant P4 packages. This
          <a href="https://github.com/p4lang/tutorials/tree/master/vm-ubuntu-24.04" className="text-blue-500 underline">
            VM
          </a>
          runs
          <a href="https://releases.ubuntu.com/noble/" className="text-blue-500 underline">
            Ubuntu 24.04
          </a>
          and includes packages such as:
        </p>
        <ul className="ml-6 list-disc">
          <li className="mb-4">
            <a href="https://github.com/p4lang/behavioral-model" className="text-blue-500 underline">
              The BMv2 software switch
            </a>
          </li>
          <li className="mb-4">
            <a href="https://github.com/p4lang/p4c" className="text-blue-500 underline">
              The p4 compiler (p4c)
            </a>
          </li>
          <li className="mb-4">
            <a href="https://github.com/mininet/mininet" className="text-blue-500 underline">
              mininet
            </a>
          </li>
          <li className="mb-4">
            <a href="https://github.com/p4lang/p4runtime" className="text-blue-500 underline">
              p4runtime (python library for interacting with switches)
            </a>
          </li>
        </ul>
        <p className="mb-8">
          Our initial prototype was inspired by the load_balance exercise available in the
          <a href="https://github.com/p4lang/tutorials" className="text-blue-500 underline">
            p4lang/tutorials
          </a>
          repository. This is a simple example of a P4-based load balancer that hashes connections based on the
          five-tuple (source IP, source port, destination IP, destination port, and protocol) into 2 buckets
          representing hosts. The output of this hash is 0 or 1, which is then used to index the target host (`h2` or
          `h3`) using the `ecmp_nhop` table.
        </p>
        <p className="mb-8">
          The following diagram shows the initial network topology, with three hosts (`h1`, `h2`, `h3`) and three
          switches (`s1`, `s2`, `s3`), where `s1` is the load balancer:
        </p>
        <ImageWrapper imagePath="/simple_lb_light.png" />
        <h3 className="my-8 font-bold text-3xl" id="controller">
          Controller
        </h3>
        <p className="mb-8">
          Relevant PRs:
          <ul className="ml-6 list-disc">
            <li className="mb-4">
              <a href="https://github.com/stano45/p4containerflow/pull/3" className="text-blue-500 underline">
                https://github.com/stano45/p4containerflow/pull/3
              </a>
            </li>
            <li className="mb-4">
              <a href="https://github.com/stano45/p4containerflow/pull/5" className="text-blue-500 underline">
                https://github.com/stano45/p4containerflow/pull/5
              </a>
            </li>
            <li className="mb-4">
              <a href="https://github.com/stano45/p4containerflow/pull/16" className="text-blue-500 underline">
                https://github.com/stano45/p4containerflow/pull/16
              </a>
            </li>
            <li className="mb-4">
              <a href="https://github.com/stano45/p4containerflow/pull/17" className="text-blue-500 underline">
                https://github.com/stano45/p4containerflow/pull/17
              </a>
            </li>
          </ul>
        </p>
        <p className="mb-8">
          Next, we wanted to be able to change the hosts during runtime. We built a Python-based controller, utilizing
          the p4runtime library, and further Python utilities from the
          <a href="https://github.com/p4lang/tutorials" className="text-blue-500 underline">
            p4lang/tutorials
          </a>
          repository. Furthermore, we set up a simple flask HTTP server with three endpoints: `/insert_node`,
          `/update_node`, and `/delete_node`. These endpoints insert, update, and delete entries in the `ecmp_nhop`
          table.
        </p>
        <p className="mb-8">
          The controller also keeps track of the match-action table state, by a target IP -{'>'} index mapping. The
          index mapping corresponds to the value in the `ecmp_nhop` table. This makes it more efficient to look up the
          index of a specific IP in the table, without the need to fetch table state from the switch on each update
          request.
        </p>
        <ImageWrapper imagePath="/controller_light.png" />
        <p className="mb-8">During this stage, we faced minor issues:</p>
        <ul className="ml-6 list-disc">
          <li className="mb-4">
            There is a distinction between `INSERT` and `MODIFY` operations when updating table entries. The `INSERT`
            operation will not work when trying to modify an existing table entry. Therefore, we modified the utils from
            p4lang/tutorials to correctly set the operation type in the request (
            <a
              href="https://github.com/stano45/p4containerflow/pull/3/files#diff-4f9b1842d1e340173e930bf32157910c84b4c896e1530e48d7995f97b3425e57"
              className="text-blue-500 underline"
            >
              see code
            </a>
            ).
          </li>
          <li className="mb-4">
            Initially, the controller initiates a connection to each switch in order, e.g. `s1`, then `s2`, etc. To be
            able to perform write operations, the switch needs to be set as master, by performing the master arbitration
            update. Therefore, when we wrote the initial match-action tables from the `.json` runtime files in order of
            switch id and then attempted to update `s1` during runtime, we encountered an error that this controller is
            not set as the master. A simple fix is to perform a master arbitration update again, or simply program `s1`
            as the last switch on initialization.
          </li>
          <li className="mb-4">
            Later in the project, we modified the controller to accept a `.json` configuration for switches. This
            configuration allows for an arbitrary number of switches and flexible programming of each switch (
            <a href="https://github.com/stano45/p4containerflow/pull/16" className="text-blue-500 underline">
              see PR
            </a>
            ).
          </li>
          <li className="mb-4">
            The BMv2 switches take time to initialize and start up the gRPC server. During this period, the controller
            cannot initiate a connection with the switches. We solved this by simply waiting 2 seconds before starting
            the controller (
            <a
              href="https://github.com/stano45/p4containerflow/blob/880844bb9fd43b5629bafe5e175f7a4285343e8d/examples/redis/Makefile#L9"
              className="text-blue-500 underline"
            >
              see code
            </a>
            ). A more practical solution would be to implement a retry mechanism in the controller code when initiating
            a switch connection.
          </li>
        </ul>
        <h3 className="my-8 font-bold text-3xl" id="tcp-checksum">
          TCP Checksum
        </h3>
        <p className="mb-8">
          Relevant PR:
          <a href="https://github.com/stano45/p4containerflow/pull/6" className="text-blue-500 underline">
            https://github.com/stano45/p4containerflow/pull/6
          </a>
        </p>
        <p className="mb-8">
          At this point, we have a working load balancer that forwards traffic to one of two hosts. We are also able to
          update the load balancer node IPs using the controller. However, the load balancer in this state only supports
          traffic in the direction of the target hosts, while traffic from the hosts back to the client is not properly
          handled.
        </p>
        <p className="mb-8">To support TCP connections, the following needs to be adjusted:</p>
        <ul className="ml-6 list-disc">
          <li className="mb-4">
            Rewrite the IP address of response packets. This is necessary since the load balancer also has an IP
            address, and packets returning from target hosts would not be recognized as being a part of the same TCP
            connection.
          </li>
          <li className="mb-4">Recompute the checksum for TCP packets, in addition to the IPv4 checksum.</li>
        </ul>
        <p className="mb-8">
          Rewriting the source was relatively straightforward. Using p4’s match-action tables, we inserted an entry to
          the `ecmp_group` table, matching on the client’s IP (fixed at `10.0.1.1` in this example,
          <a
            href="https://github.com/stano45/p4containerflow/blob/a270c9bb9448d7952e0811c4d0636a79ee64113e/controller/switch_controller.py#L65"
            className="text-blue-500 underline"
          >
            see code
          </a>
          ) and wrote an action to rewrite the source address to the switches’ IP (
          <a
            href="https://github.com/stano45/p4containerflow/blob/4846084c3239aeeac9944526f0bd917a79c8aa0f/load_balancer/load_balance.p4#L124"
            className="text-blue-500 underline"
          >
            see code
          </a>
          ).
        </p>
        <p className="mb-8">
          Calculating the TCP checksum correctly was a bit trickier. The key issues to look out for are properly parsing
          TCP headers (
          <a
            href="https://github.com/stano45/p4containerflow/blob/4846084c3239aeeac9944526f0bd917a79c8aa0f/load_balancer/load_balance.p4#L30"
            className="text-blue-500 underline"
          >
            see code
          </a>
          ) and passing headers to the hash function in the right order (
          <a
            href="https://github.com/stano45/p4containerflow/blob/4846084c3239aeeac9944526f0bd917a79c8aa0f/load_balancer/load_balance.p4#L218"
            className="text-blue-500 underline"
          >
            see code
          </a>
          {''} and {''}
          <a
            href="https://forum.p4.org/t/checksum-calculation-when-adding-payload-to-syn-packet/96/4"
            className="text-blue-500 underline"
          >
            p4 forum thread
          </a>
          ).
        </p>
        <p className="mb-8">
          During this stage, I found Wireshark to be a very useful tool, since it verifies the checksum of each TCP
          packet. If the checksum is calculated incorrectly, this will be indicated in the packet trace. This can help
          test any changes to the checksum quickly, without being left to wonder why packets are being dropped. A
          similar functionality is provided by the tcpdump CLI.
        </p>
        <h3 className="my-8 font-bold text-3xl" id="linux-networking">
          Linux Networking
        </h3>
        <p className="mb-8">
          Relevant PR:
          <a href="https://github.com/stano45/p4containerflow/pull/8" className="text-blue-500 underline">
            https://github.com/stano45/p4containerflow/pull/8
          </a>
        </p>
        <p className="mb-8">
          The initial prototype relies on mininet to build a network using virtual interfaces and network namespaces.
          Mininet is a useful tool for rapidly building and evaluating network topologies. However, since the goal is to
          integrate this system into Kubernetes, mininet is a limitation. We decided to rebuild the same topology using
          the Linux networking stack. The main building blocks of this step are:
        </p>
        <ul className="ml-6 list-disc">
          <li className="mb-4">Network namespaces (netns),</li>
          <li className="mb-4">Virtual ethernet pairs (veth pairs).</li>
        </ul>
        <p className="mb-8">
          A network namespace is a fundamental building block of Linux networking that allows for the creation of
          isolated network environments. Each namespace has its own set of network interfaces, routing tables, and
          iptables rules, making it possible to simulate multiple network environments on a single host.
        </p>
        <p className="mb-8">
          Virtual ethernet pairs can be used to create virtual interfaces, and automatically link them together. It is
          possible to “place” one half of the pair inside a network namespace, to simulate a link to a separate network.
          The other half of the veth pair acts as a gateway for the network living in the namespace.
        </p>
        <p className="mb-8">
          Using netns, veth pairs, and the iproute2 suite to set MAC and IP addresses of virtual interfaces, we rebuilt
          the mininet topology on the Linux Networking Stack. This is done in the form of bash scripts (
          <a
            href="https://github.com/stano45/p4containerflow/blob/998d1dcb70cb97cee3636877cc68cb296cdc32b6/examples/process_migration/build.sh"
            className="text-blue-500 underline"
          >
            see code
          </a>
          ).
        </p>
        <ImageWrapper imagePath="/linux_network_light.png" />
        <p className="mb-8">
          Setting up a complex virtual network topology is not straightforward. We outlined key challenges we faced
          during implementation:
        </p>
        <ul className="ml-6 list-disc">
          <li className="mb-4">
            It is important to set the gateway address of each of the network namespaces, followed by static ARP
            entries. This ensures the routing works properly.
          </li>
          <li className="mb-4">
            The number of virtual interfaces can grow quite large when building a complex network topology like ours.
            This is just a tip for anyone attempting the same: Whenever you write a script to build a network element
            (veth pair, netns), make sure to immediately write a script to tear it down the same way. Always a new
            interface/namespace, and then tear it down. It is easy to forget this part, and then have to manually tear
            down the network with additional effort.
          </li>
        </ul>
        <h3 className="my-8 font-bold text-3xl" id="containerizing-hosts">
          Containerizing hosts
        </h3>
        <p className="mb-8">
          Relevant PR:
          <a href="https://github.com/stano45/p4containerflow/pull/9" className="text-blue-500 underline">
            https://github.com/stano45/p4containerflow/pull/9
          </a>
        </p>
        <p className="mb-8">
          After everything was running properly on a virtualized network, we immediately recognized that the next step
          would be to start containerizing components. Container management tools (such as
          <a href="https://podman.io/" className="text-blue-500 underline">
            Podman
          </a>
          ) create network namespaces and wire them up using veth pairs in a very similar way as we did in the previous
          step.
        </p>
        <p className="mb-8">
          Specifically, Podman uses the netavark backend for virtual networking. Each network is a separate network
          namespace, and each container in the network is connected to a network bridge. The network has a reserved IP
          address range, and the network bridge acts as the gateway. Each container assigned to a network gets its own
          IP.
        </p>
        <p className="mb-8">
          The following diagram shows the network topology of a single host and the connection of the network to a
          switch port:
        </p>
        <ImageWrapper imagePath="/container_interface_light.png" />
        <p className="mb-8">
          We wrote a script to create a network and a pod for each container. A pod is a group of containers with a
          shared IP address. This is also the case within the Kubernetes network model. We built a container image using
          the TCP server executable from the previous steps. Analogously, we built a client image.
        </p>
        <p className="mb-8">
          There is no explicit link from the network bridge to the switch port. We ensured correct routing by setting
          the corresponding switch port as the default gateway for each host and inserted a static ARP entry. This way,
          the container immediately sent all traffic (outside its network) to the switch port’s MAC address, and the
          switch handled all further routing. This was repeated for all hosts to mimic the previous topology.
        </p>
        <p className="mb-8">
          However, this approach is not ideal, since the IP route and the static MAC address have to be inserted inside
          the container. This is not possible with most containers, since most only include the required binaries and no
          networking packages, such as iproute2. Therefore, a further configuration of each container would be
          necessary, which might not be scalable in real-world scenarios. We did not address this problem, as this is
          only an intermediate step in the project, and the topology will change in the next steps.
        </p>
        <p className="mb-8">
          Furthermore, when setting up the routing, we encountered a strange issue: each established TCP connection
          would receive an `RST` packet from some interface and terminate. If you ever encounter such an issue in your
          experiments, it might be easier to check the following:
        </p>
        <ul className="ml-6 list-disc">
          <li className="mb-4">
            Are there IP table rules that drop TCP packets anywhere? This would mean the kernel sends the TCP `RST` from
            that interface.
          </li>
          <li className="mb-4">
            Is the switch interface in promiscuous mode? Sometimes, when a packet is addressed at an interface, the
            kernel sends a `RST` packet, since there is no process listening on that interface.
          </li>
        </ul>
        <p className="mb-8">This issue can be solved by blocking TCP reset packets generated by the interface.</p>
        <h3 className="my-8 font-bold text-3xl" id="containerizing-bmv2-switches">
          Containerizing BMv2 switches
        </h3>
        <p className="mb-8">
          Relevant PR:
          <a href="https://github.com/stano45/p4containerflow/pull/10" className="text-blue-500 underline">
            https://github.com/stano45/p4containerflow/pull/10
          </a>
        </p>
        <p className="mb-8">
          After containerizing the hosts, we also decided to containerize the BMv2 switches. We simplified the topology
          to only include one switch, which uses the host network bridges as ports. These network bridges act as
          gateways for the Podman networks created in the previous step.
        </p>
        <p className="mb-8">
          For simplicity, the switch container runs on the host network. The container image used is
          docker.io/p4lang/p4c image, which includes the BMv2 binary.
        </p>
        <p className="mb-8">
          The following diagram shows the network topology, which consists of 4 Podman networks interfaced by bridges,
          connected to a single BMv2 switch running in a container, but on the host network:
        </p>
        <ImageWrapper imagePath="/container_network_light.png" />
        <h3 className="my-8 font-bold text-3xl" id="redis-container-migration">
          Redis container migration
        </h3>
        <p className="mb-8">
          Relevant PR:
          <a href="https://github.com/stano45/p4containerflow/pull/18" className="text-blue-500 underline">
            https://github.com/stano45/p4containerflow/pull/18
          </a>
        </p>
        <p className="mb-8">
          To demonstrate container migration on the network topology we created, we set up a system with multiple
          components:
        </p>
        <ul className="ml-6 list-disc">
          <li className="mb-4">An in-memory database (Redis) instance running on host 2 (`h2`),</li>
          <li className="mb-4">
            A backend application (App) running on host 1 (`h1`), exposing an endpoint to fetch data from the Redis DB,
            additionally containing the uptime of the Redis instance and number of connected clients,
          </li>
          <li className="mb-4">
            A client, also running on `h1`, that periodically fetches data from the BE and prints them in the console
            (simulating an oversimplified frontend application),
          </li>
          <li className="mb-4">
            A producer, also running on `h1`, periodically fetches a numerical ‘counter’ entry from the Redis DB,
            increments it by one, and updates the entry in the database.
          </li>
        </ul>
        <ImageWrapper imagePath="/redis_light.png" />
        <p className="mb-8">
          After deploying this system, we can observe the counter being periodically incremented by the producer. We
          perform a migration of the Redis DB from host 2 to host 3, the same way as in the previous examples, and
          observe little to no downtime from the client’s perspective.
        </p>
        <p className="mb-8">We confirm that the migration has been successfully performed, since:</p>
        <ul className="ml-6 list-disc">
          <li className="mb-4">Traffic from the producer and the app is correctly routed to `h3` instead of `h2`,</li>
          <li className="mb-4">The counter does not reset, confirming data consistency,</li>
          <li className="mb-4">
            The uptime of the Redis instance does not reset, confirming the instance previously running on `h2` is now
            running on `h3`,
          </li>
          <li className="mb-4">
            The connected clients count stays at 2, confirming both the app’s and producer’s TCP connections to the
            Redis DB have been preserved.
          </li>
        </ul>
        <h3 className="my-8 font-bold text-3xl" id="the-kubernetes-network-model">
          The Kubernetes network model
        </h3>
        <p className="mb-8">
          Before we dive into the
          <a href="https://kubernetes.io/" className="text-blue-500 underline">
            Kubernetes
          </a>
          integration, it is important to understand the Kubernetes network model, and how load balancing is handled in
          practice. This is how Kubernetes networking is described in the
          <a href="https://kubernetes.io/docs/concepts/services-networking/" className="text-blue-500 underline">
            official documentation
          </a>
          :
        </p>
        <blockquote className="mb-8">
          Every Pod in a cluster gets its own unique cluster-wide IP address (one address per IP address family). This
          means you do not need to explicitly create links between Pods and you almost never need to deal with mapping
          container ports to host ports. This creates a clean, backwards-compatible model where Pods can be treated much
          like VMs or physical hosts from the perspectives of port allocation, naming, service discovery, load
          balancing, application configuration, and migration.
        </blockquote>
        <p className="mb-8">
          This model is similar to what we have deployed in previous examples, where each pod was assigned a unique IP
          address, while the pod network interface is often a bridge. However, the pod IP is allocated by Kubernetes. We
          will discuss the implications of this in the next section.
        </p>
        <p className="mb-8">
          Furthermore, it is important to understand how load balancing is handled in Kubernetes. As always, there are
          multiple options. Firstly, it is possible to create a `Service` of type `LoadBalancer`. The load balancer is
          implemented by the cloud provider and is usually a proprietary component, which cannot be deployed locally
          without extra effort.
        </p>
        <p className="mb-8">
          Therefore, we evaluated various open source solutions to Kubernetes to assess how we can approach the
          integration of the BMv2 switch into the Kubernetes ecosystem.
        </p>
        <p className="mb-8">
          Firstly, we looked at
          <a href="https://metallb.universe.tf/" className="text-blue-500 underline">
            MetalLB
          </a>
          , which provides a load balancer implementation for bare metal clusters. Using MetalLB in layer 2 mode, all
          service traffic is routed to a single node, where `kube-proxy` spreads the traffic to pods. This model could
          be potentially extended by integrating a BMv2 switch running our P4 load load balancer program.
        </p>
        <p className="mb-8">
          Secondly, Kubernetes provides a Gateway API implementation that includes protocol-specific Route resources
          such as
          <a href="https://gateway-api.sigs.k8s.io/guides/tcp/" className="text-blue-500 underline">
            TCPRoute
          </a>
          allowing to forward a TCP stream to a specified backend. Since this is similar to the goal of this project, a
          potential approach could be to modify this functionality to route traffic to a BMv2 switch.
        </p>
        <p className="mb-8">
          Lastly, it is possible to build a solution similar to
          <a href="https://github.com/cloudnativelabs/kube-router" className="text-blue-500 underline">
            kube-router
          </a>
          . The kube-router solution is deployed on the cluster as a `DaemonSet`, which means that all nodes run a copy
          of the pod (see the
          <a
            href="https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/"
            className="text-blue-500 underline"
          >
            Kubernetes docs
          </a>
          for more information). Kube-router uses the standard Linux networking stack (as discussed in a previous
          section), which makes it more straightforward to use than solutions using SDN or overlays.
        </p>
        <p className="mb-8">
          Because of the simplicity of the kube-router solution, and the potential ease of replacing it with a
          controller using the BMv2 software switch, we decided to first deploy kube-router, and then look at
          possibilities of replacing it with a custom solution.
        </p>
        <h3 className="my-8 font-bold text-3xl" id="initial-kubernetes-integration">
          Initial Kubernetes integration
        </h3>
        <p className="mb-8">
          Relevant PRs:
          <ul className="ml-6 list-disc">
            <li className="mb-4">
              <a href="https://github.com/stano45/p4containerflow/pull/21" className="text-blue-500 underline">
                https://github.com/stano45/p4containerflow/pull/21
              </a>
            </li>
            <li className="mb-4">
              <a href="https://github.com/stano45/p4containerflow/pull/22" className="text-blue-500 underline">
                https://github.com/stano45/p4containerflow/pull/22
              </a>
            </li>
          </ul>
        </p>
        <p className="mb-8">
          As a first step to start with the Kubernetes integration, we created a single-node cluster using kubeadm. To
          handle networking, we deployed a `DaemonSet` on the node running kube-router to load-balance traffic between
          pods. Furthermore, we deployed a simple `http-server` service, running in 2 pods. There is one container
          running in each pod, which accepts requests, holds them for a couple of seconds, and then sends a response.
        </p>
        <p className="mb-8">Migration within of a container running inside a Kubernetes pod requires multiple steps:</p>
        <ul className="ml-6 list-disc">
          <li className="mb-4">Calling the kubelet checkpoint API to create a container checkpoint,</li>
          <li className="mb-4">Building a container image from the checkpoint,</li>
          <li className="mb-4">Pushing the container image to a container registry (local or hosted),</li>
          <li className="mb-4">Editing manifests to deploy this container image,</li>
          <li className="mb-4">Applying the manifest to restore the container.</li>
        </ul>
        <p className="mb-8">
          However, there are multiple issues with this approach, which will need to be addressed in future development
          of the project:
        </p>
        <ul className="ml-6 list-disc">
          <li className="mb-4">
            Restoring a container with a new IP address in Kubernetes presents a &quot;chicken or the egg&quot; problem.
            In our approach, the checkpoint is modified with the new IP address (similar to
            <a
              href="https://github.com/stano45/p4containerflow/blob/998d1dcb70cb97cee3636877cc68cb296cdc32b6/scripts/edit_files_img.py"
              className="text-blue-500 underline"
            >
              scripts/edit_files_img.py
            </a>
            ), but Kubernetes allocates the IP address during restore. This could potentially be handled by running an
            <a
              href="https://kubernetes.io/docs/concepts/workloads/pods/init-containers/"
              className="text-blue-500 underline"
            >
              init container
            </a>
            in the target pod to make Kubernetes assign an IP address before container restore.
          </li>
          <li className="mb-4">
            The &quot;Connection reset by peer&quot; error always occurs after restore because checkpointing is
            performed for a container in a network namespace allocated to a Pod. There is no mechanism currently to
            prevent the Linux kernel from closing the TCP connection when a new packet is received from the client while
            the checkpointed container is not running. This problem could be solved by attaching
            <a href="https://criu.org/Action_scripts" className="text-blue-500 underline">
              CRIU action scripts
            </a>
            to
            <a
              href="https://kubernetes.io/docs/tasks/configure-pod-container/attach-handler-lifecycle-event/"
              className="text-blue-500 underline"
            >
              Kubernetes lifecycle events
            </a>
            to lock the network and prevent the Kernel from sending a `RST` packet to the client.
          </li>
          <li className="mb-4">
            The current checkpoint /restore mechanism in Kubernetes was primarily designed for forensic analysis and
            unsuitable for live migration. In particular, it takes significant time to create a checkpoint archive,
            upload it to a container registry, and restore the container in a new Pod. This results in significant
            downtime. Within future work, there is room to optimize this process in multiple places.
          </li>
        </ul>{' '}
        <h2 className="my-8 font-bold text-3xl" id="future-work">
          Future Work
        </h2>{' '}
        <p className="mb-8">
          {' '}
          While this project presents multiple experiments showcasing container migration with established TCP
          connections, there is an additional effort required to utilize the P4 load balancer within Kubernetes.
          Specifically, the above-described example with kube-router should be modified to utilize a BMv2 switch for
          load balancing. This approach requires writing a Kubernetes controller that interacts with the BMv2 switch.{' '}
        </p>{' '}
        <p className="mb-8">
          {' '}
          Furthermore, it would be particularly useful to deploy a multi-node Kubernetes cluster and run the load
          balancer on a P4-programmable switch, such as Intel Tofino to assess the feasibility of this approach in a
          realistic scenario. Similarly, such an evaluation could be performed using SmartNICs such as the NVIDIA
          BlueField DPU.{' '}
        </p>
      </div>
    </BlogPost>
  );
}
