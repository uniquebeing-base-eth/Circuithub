MASTER BUILD PROMPT — OPEN SERVICE NETWORK

You are building an open service network for the agentic economy on Celo.

Do not treat this as a normal marketplace, directory, or frontend-heavy startup.

The real product is the infrastructure layer that allows humans and AI agents to discover, verify, access, compose, execute, and pay for services that already exist across the internet.

1. PRODUCT THESIS

Services are fragmented.

They exist across:

* websites
* APIs
* AI agents
* MCP servers
* A2A-compatible agents
* local businesses
* SaaS products
* booking systems
* delivery platforms
* freelancers
* suppliers
* digital services
* AI inference providers
* regional providers
* existing marketplaces
* existing businesses

We do not want to replace these businesses or force them to rebuild their systems.

We provide the infrastructure that connects them.

Core statement

The service layer for the agentic economy.

One-sentence description

An open network that makes services discoverable, callable, composable, and payable by humans and AI agents.

The network should work even when the user does not know or care that Celo is being used.

Celo should primarily provide the financial infrastructure for cheap, programmable, stable-value settlement.

⸻

2. CORE LOOP

The fundamental network flow is:

Discover → Verify → Select → Execute → Pay

A more complete lifecycle can be:

Discover → Verify → Select → Compose → Execute → Pay → Track

The system should allow an AI agent or human to:

1. Discover available services.
2. Inspect structured capabilities.
3. Verify that the provider/service actually works.
4. Compare available options.
5. Select a provider.
6. Compose multiple services when necessary.
7. Execute the service.
8. Pay the provider.
9. Track the result.
10. Record relevant verification/reputation information.

Do not make the network decide which provider is “best.”

Return structured information such as:

* price
* availability
* location
* capabilities
* requirements
* reputation
* latency
* verification status
* supported protocols
* payment methods
* provider information

The requesting human or agent decides what to use.

⸻

3. IMPORTANT PRINCIPLE

Do not reinvent existing infrastructure.

Before implementing anything, research and reuse existing standards, protocols, SDKs, registries, and infrastructure.

Especially investigate:

* Celo
* Celopedia
* ERC-8004
* 8004scan
* MCP
* A2A
* OpenAPI
* HTTP APIs
* x402
* stablecoin payments
* existing agent identity systems
* existing agent/service registries
* existing reputation/attestation systems

If an existing standard already solves a problem, integrate with it instead of creating a proprietary replacement.

⸻

4. REQUIRED CELO REFERENCES

Before writing production code, install and study:

npx skills add celo-org/celopedia-skills

Use the Celopedia skills as a primary technical reference for the Celo implementation.

Also study:

Celo buy-skill

https://github.com/celo-org/buy-skill

Use it as an important reference for agentic purchasing/service transactions.

Celo x402 example

https://github.com/celo-org/x402-celo-example

Use it as an important reference for machine-to-machine/API payments and x402-style payment flows on Celo.

8004scan

https://8004scan.io

Use this as an important discovery/reference source for ERC-8004 agents.

Do not blindly copy implementations.

Understand what already exists and integrate where appropriate.

⸻

5. ERC-8004 / AGENT DISCOVERY

ERC-8004 should be treated as one of the network’s discovery and identity sources where appropriate.

8004scan can help answer:

What agents exist?

Our network should answer a broader question:

What services exist, are they currently available, what can they actually do, can I verify their endpoint, and can my agent execute the service?

Therefore:

Discovery != Verification

An agent/service being listed somewhere does not automatically make it trusted or currently operational.

The network should be capable of discovering services from:

* ERC-8004
* 8004scan
* MCP directories
* A2A ecosystems
* direct provider registration
* partner registries
* compatible service registries
* other legitimate service sources

Do not require every service to use ERC-8004 if that would unnecessarily exclude useful providers.

The architecture should remain open.

⸻

6. SERVICE VERIFICATION

Every discovered service should have a verification lifecycle.

At minimum verify:

1. Is the endpoint reachable?
2. Does the advertised protocol actually work?
3. Can the capabilities be retrieved?
4. Do the capabilities match the registered description?
5. Can the service successfully respond to a safe test request?
6. Can ownership/identity be verified where applicable?
7. When was it last verified?
8. Is it currently operational?

Possible states:

pending
verified
degraded
offline
failed

Verification should expire.

Services should be periodically rechecked.

Do not permanently mark an endpoint as trusted after one successful request.

⸻

7. SERVICE REGISTRY

Create a service registry/index that represents available services.

A service should be able to describe things such as:

service_id
name
description
provider
category
capabilities
endpoint
protocol
location
pricing
currency
availability
requirements
authentication
verification_status
last_verified_at

Do not over-engineer the schema.

The registry should support services such as:

Travel

* flight booking
* hotel booking
* transport
* visa assistance
* travel planning

Food

* restaurants
* food ordering
* delivery
* catering

Local services

* cleaners
* mechanics
* electricians
* photographers
* repair services

Business

* accounting
* legal services
* marketing
* design
* research
* logistics

Digital services

* AI inference
* image generation
* video generation
* voice
* transcription
* translation
* data processing

Commerce

* products
* suppliers
* purchasing
* fulfillment

The architecture must remain generic.

Do not hardcode the network around one category.

⸻

8. PROVIDER MODEL

Existing businesses should not need to rebuild their businesses.

A provider should be able to connect:

* an existing API
* existing website
* existing booking system
* existing POS
* existing backend
* existing agent
* existing MCP server
* existing A2A service

We provide a standard integration layer around them.

Create a lightweight provider integration/SDK approach where useful.

The goal is:

Existing service + network integration = agent-accessible service.

⸻

9. API

Build a clean API that applications and agents can use.

Initial API surface should remain small.

Example:

GET    /services
POST   /services/search
GET    /services/:id
POST   /services/register
POST   /services/:id/verify
POST   /requests
GET    /requests/:id

Do not create dozens of endpoints unnecessarily.

The API should be designed so that:

* AI agents can use it
* applications can use it
* mobile clients can use it
* desktop clients can use it
* plugins/connectors can use it

⸻

10. MCP

MCP is a first-class interface.

The same underlying service network should be accessible through MCP.

Initial MCP tools:

search_services
get_service
request_service
get_request_status

Later, if required:

get_quote
execute_service
cancel_request
pay_for_service

Do not expose unnecessary tools.

The MCP layer should make the network usable by:

* Claude
* Codex
* OpenClaw
* other MCP-compatible agents
* future AI clients

The MCP implementation should call the same core service/network logic as the API.

Do not create separate business logic for MCP.

⸻

11. AGENTS ARE FIRST-CLASS USERS

The network must not be designed as:

Humans use website → agents maybe use API later.

Instead:

Humans and agents are both clients of the network.

An agent should be able to:

1. discover a service
2. inspect capabilities
3. inspect pricing
4. verify availability
5. select a service
6. request execution
7. pay
8. receive the result
9. track the request

The website is only one interface.

⸻

12. COMPOSABILITY

One of the most important advantages of the network is that services can be composed.

Example:

User asks:

Create a 60-second promotional video for my restaurant.

The network could make available:

Script service
↓
Image service
↓
Voice service
↓
Video service
↓
Music service

Another example:

Book me a flight from Lagos to London next Friday under $800.

The network can discover relevant travel services, retrieve availability/pricing, and allow the requesting agent to select and execute the appropriate service.

Another:

Get jollof rice and chicken delivered to my hotel.

The network can connect:

Restaurant
+
Ordering service
+
Delivery service

Do not hardcode these examples.

Build primitives that allow them to emerge from the network.

⸻

13. PAYMENTS

The network must make payment a native part of service execution.

Use Celo for settlement.

Prioritize stable-value payments and machine-readable payment flows.

Research and use:

* Celo stablecoins
* x402
* existing Celo payment infrastructure
* Celo buy-skill
* existing wallet/payment standards

Do not create a new token.

Do not create a custom payment currency.

Do not build a proprietary payment protocol if an existing standard already works.

⸻

14. BUSINESS MODEL

We must make money.

Keep the initial model extremely simple.

Transaction fee

When the network successfully facilitates a paid service:

Customer pays $20
Provider receives $19.80
Network receives $0.20

The exact percentage should be configurable.

The key principle:

We earn when the network creates successful service activity.

Do not begin with:

* subscriptions
* advertising
* token speculation
* complicated DAO economics
* paid listings
* unnecessary SaaS tiers

The network should earn from actual economic activity.

The provider should receive the majority of the payment.

Celo’s low-cost settlement should make small service transactions economically practical.

⸻

15. DECENTRALIZATION

Use decentralized infrastructure where it provides real value.

Do not put everything onchain simply for ideological reasons.

Good candidates for decentralized/verifiable infrastructure:

* agent identity
* service identity
* ownership proofs
* registration
* attestations
* reputation
* validation
* payment settlement

Better kept offchain:

* search
* indexing
* API requests
* MCP requests
* routing
* service execution
* health checks
* private data
* large request payloads
* temporary execution state

Principle:

Put trust-critical state where verifiability matters. Keep high-frequency/private execution offchain.

Reuse existing decentralized primitives rather than building custom ones.

⸻

16. DATABASE / INDEX

A database/index is allowed.

Do not confuse an offchain index with the ultimate source of truth for decentralized trust-critical information.

The database can be used for:

* fast search
* caching
* service metadata
* verification results
* request state
* temporary execution data
* analytics

Potential tables:

providers
services
endpoints
verifications
requests
payments

Keep the schema minimal.

⸻

17. SECURITY

Treat every external service as untrusted.

Implement appropriate protection against:

* malicious endpoints
* SSRF
* arbitrary URL access
* request injection
* malicious webhooks
* replay attacks
* fake payment confirmations
* endpoint impersonation
* credential leakage
* excessive requests
* oversized payloads
* timeout attacks

Use:

* URL validation
* endpoint allow/deny controls where appropriate
* timeouts
* rate limits
* request validation
* authentication
* webhook verification
* payment verification
* replay protection
* secure secret storage
* minimal private-data retention

Never blindly execute an arbitrary URL submitted by an external provider from privileged infrastructure.

Verification infrastructure itself must be hardened.

⸻

18. FRONTEND

Do not spend most of the development time building a beautiful marketplace UI.

The frontend is primarily:

Documentation

Explain:

* what the network is
* how services integrate
* how agents use it
* how developers use the API
* how MCP works
* how providers connect
* how payments work

Service explorer

Allow users to:

* search services
* inspect capabilities
* inspect provider
* see verification status
* see pricing
* see supported protocols

Developer onboarding

Show:

Connect API
Connect MCP
Register service
Verify service
Execute service
Receive payment

The UI should be clean, simple, warm, and functional.

Do not create unnecessary “Web3 UI.”

Do not build a bottom navigation.

Do not make Celo the visual focus.

⸻

19. PLUGIN / CONNECTOR ARCHITECTURE

The network should eventually be usable as a connector/plugin for:

* AI clients
* browsers
* desktop applications
* mobile applications
* agent frameworks
* developer tools

Do not build every plugin immediately.

Instead:

Design the API/MCP layer so that these integrations can be added without changing the core network.

⸻

20. MOBILE + COMPUTER

The network should work across:

* computers
* phones
* AI agents
* developer environments

Do not create separate backend architectures for each.

Everything should consume the same core service infrastructure.

⸻

21. MVP

We need a working vertical slice quickly.

Do not spend the first day building an enormous protocol.

The MVP must prove:

Step 1

A provider registers a service.

Step 2

The network discovers/indexes the service.

Step 3

The network verifies the endpoint.

Step 4

An AI agent discovers the service through MCP/API.

Step 5

The agent requests the service.

Step 6

Payment is handled through Celo.

Step 7

The provider receives payment.

Step 8

The network takes a small fee.

Step 9

The request/result is tracked.

Step 10

If the endpoint becomes unavailable, the service status changes accordingly.

If these work end-to-end, the MVP has proven the fundamental thesis.

⸻

22. ONE-DAY BUILD PRIORITY

Use AI coding tools aggressively.

Use the installed Celopedia skills before implementation.

Do not tell me this requires weeks of development.

We are building a focused vertical slice.

Prioritize:

1. Service registry
2. Provider registration
3. Verification
4. Service discovery
5. API
6. MCP
7. Celo payment
8. Network fee
9. Request tracking
10. Minimal docs/explorer

Everything else is secondary.

⸻

23. IMPLEMENTATION WORKFLOW

Before coding:

Phase 1 — Research

Use:

npx skills add celo-org/celopedia-skills

Read the relevant Celopedia skills.

Study:

* current Celo architecture
* stablecoin/payment options
* wallet/payment tooling
* x402
* buy-skill
* ERC-8004
* 8004scan
* MCP
* A2A
* OpenAPI

Determine what can be reused.

Phase 2 — Architecture

Produce a short implementation note covering:

Architecture
Components
Data model
Service lifecycle
Verification lifecycle
Payment flow
API
MCP
Celo integration
Security boundaries
Offchain/onchain responsibilities

Keep it concise.

Phase 3 — Build

Implement the smallest end-to-end flow.

Phase 4 — Test

Demonstrate:

Provider
↓
Register service
↓
Network discovers it
↓
Network verifies endpoint
↓
Agent discovers it
↓
Agent requests service
↓
Payment occurs
↓
Provider receives payment
↓
Network receives fee
↓
Result returned

Phase 5 — Demo

Create one compelling real-world example.

The demo should make the network’s value obvious in less than a minute.

⸻

24. DEMO SCENARIO

Use a simple service where the entire flow can actually execute.

For example:

User/Agent:
"Find me a service that can perform X."
Network:
Discovers providers.
Network:
Shows:
- capability
- price
- availability
- verification
- provider
Agent:
Selects provider.
Network:
Executes request.
Payment:
Settles on Celo.
Provider:
Receives payment.
Network:
Receives fee.
Agent:
Receives result.

The demo should show that we are not another directory.

We are the infrastructure that turns discovered services into executable, payable services.

⸻

25. WHAT NOT TO BUILD

Do NOT build:

* a new blockchain
* a new token
* a new wallet
* a new agent identity protocol
* a new MCP replacement
* a new payment protocol
* a new decentralized storage protocol
* a giant marketplace UI
* a social network
* unnecessary DAO mechanics
* speculative token economics
* complicated NFT infrastructure
* dozens of unnecessary API endpoints

Use existing infrastructure.

Our value is in connecting existing infrastructure into an open service network.

⸻

26. PRODUCT DIFFERENTIATION

The network should sit between:

Humans
AI Agents
Applications
        ↓
OPEN SERVICE NETWORK
        ↓
Existing Services
Existing Businesses
Existing Agents
Existing APIs
Existing MCP Servers
Existing Marketplaces
Existing Providers

We do not need to own the services.

We do not need to replace the providers.

We do not need to host every service.

We make them discoverable, verifiable, callable, composable, and payable.

⸻

27. FINAL SUCCESS CRITERIA

The implementation is successful if a developer can:

1. Register an existing service.
2. Have the network discover it.
3. Have the network verify it.
4. Search for it through API.
5. Search for it through MCP.
6. Request the service.
7. Pay for it using Celo.
8. Confirm payment.
9. Deliver the provider’s share.
10. Take the network fee.
11. Track the request.
12. Detect when the service becomes unavailable.

And an AI agent can perform the entire process without needing to understand the internal implementation.

⸻

FINAL PRODUCT DEFINITION

Build:

An open service network for the agentic economy — infrastructure that lets humans and AI agents discover, verify, access, compose, execute, and pay for services across the internet.

The website is the interface.

The API is the developer interface.

MCP is the agent interface.

The registry is the discovery layer.

Verification is the trust layer.

Celo is the settlement layer.

The service providers remain the service providers.

The network earns from successful service activity.

Build the smallest working version that proves this entire loop.

Do not over-engineer.

Do not reinvent existing infrastructure.

Use what already exists. Connect it. Verify it. Make it executable. Make it payable.
