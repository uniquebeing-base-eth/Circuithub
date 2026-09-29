# Circuithub

Build: Open Service Network for Humans & AI Agents

You are the lead engineer building an open service network for the agentic economy.

The goal is NOT to build another consumer marketplace, travel app, food app, AI marketplace, wallet, DEX, or DeFi frontend.

We are building infrastructure that makes existing digital and real-world services discoverable, callable, composable, and payable by humans and AI agents.

The frontend is NOT the main product. It exists primarily for documentation, developer onboarding, examples, and a basic network/service explorer.

The core product is:

Protocol + Service Registry + Discovery + Verification + API + MCP + Execution + Payment/Settlement

⸻

0. MAJOR REFERENCE — CELOPEDIA

Before writing significant code, install and use the Celo ecosystem skills:

npx skills add celo-org/celopedia-skills

Treat Celopedia as a major technical reference and guide for all Celo-related decisions.

Use it to investigate the current Celo ecosystem and determine:

* existing Celo payment primitives
* stablecoins available on Celo
* Celo SDKs and libraries
* account/wallet infrastructure
* smart-account/account-abstraction options
* fee abstraction
* payment primitives
* relevant contracts
* existing identity infrastructure
* existing agent infrastructure
* existing Celo developer tooling
* deployment options
* RPC infrastructure
* existing standards that should be reused
* anything else already available that prevents us from reinventing infrastructure

Do NOT invent a Celo-specific solution when an existing, documented Celo primitive already solves the problem.

The principle is:

Use existing infrastructure wherever possible. Build only the missing connective tissue.

If Celopedia provides a recommended implementation, prefer it over inventing a new architecture.

⸻

1. PRODUCT VISION

The internet already has thousands of services:

* travel agents
* hotels
* airlines
* restaurants
* delivery companies
* logistics providers
* shopping providers
* suppliers
* freelancers
* AI agents
* AI model providers
* APIs
* local businesses
* financial/payment services
* other machine-accessible services

But these services are fragmented across:

* websites
* APIs
* apps
* MCP servers
* A2A agents
* agent registries
* different countries
* different ecosystems
* different payment systems

We want to create an access layer that allows humans and AI agents to discover and use those services through common interfaces.

Core idea:

Human / AI Agent
       ↓
    API / MCP
       ↓
Service Discovery
       ↓
Verified Services
       ↓
Execute Request
       ↓
Payment / Settlement
       ↓
Result / Status

The network does NOT need to own the underlying services.

A restaurant remains a restaurant.

A travel agency remains a travel agency.

A logistics company remains a logistics company.

An AI provider remains an AI provider.

They simply become accessible to software through our network.

⸻

2. SIMPLE PRODUCT DESCRIPTION

Use this as the internal definition of the product:

An open network that makes services discoverable, callable, and payable by humans and AI agents.

Another useful description:

The service layer for the agentic economy.

Do not turn this into marketing fluff in the codebase.

The implementation should remain simple.

⸻

3. CORE PRINCIPLE

We are NOT trying to replace existing structures.

We are simplifying access to them.

For example:

Travel

A user says:

Book me a flight from Lagos to London.

Our network should be able to discover relevant travel agents/providers and expose them to the requesting agent.

Food

A user says:

Order jollof rice and chicken and have it delivered.

The requesting agent can discover food-ordering services.

Video creation

An agent receives:

Create a 60-second promotional video.

It could discover and compose:

Script service
      ↓
Image service
      ↓
Voice service
      ↓
Video service
      ↓
Music service

There may be many providers for each capability.

The network should not permanently decide which provider is “best.”

The requesting agent/user should be able to apply its own criteria:

* price
* availability
* location
* reputation
* requirements
* capabilities
* response time
* historical reliability
* user preferences

⸻

4. AGENTS ARE FIRST-CLASS USERS

Do NOT build this as a traditional website marketplace and add AI later.

AI agents must be first-class clients.

The primary interfaces are:

API

For:

* developers
* applications
* businesses
* autonomous agents

MCP

For:

* Claude
* Codex
* OpenClaw
* other MCP-compatible agents
* future agentic systems

Plugin / Connector

For:

* browsers
* desktop applications
* AI clients
* other software

Mobile / Human Client

A user should eventually be able to use the same network directly from a phone.

The frontend website is secondary.

⸻

5. REFERENCE MODEL: ANTSEED

Use Antseed as an architectural reference, NOT as something to copy.

The useful conceptual pattern is:

Discover
   ↓
Choose
   ↓
Connect
   ↓
Pay

Our broader model is:

Discover
   ↓
Select
   ↓
Compose
   ↓
Execute
   ↓
Pay
   ↓
Verify / Track

Antseed demonstrates how services can be discovered and consumed by agents.

Our scope is broader:

AI services
Travel
Food
Shopping
Logistics
Local services
Business services
Digital services
Other machine-accessible services

Do not copy Antseed’s implementation or proprietary behavior.

Use it only as conceptual inspiration for an open service network.

⸻

6. DO NOT REINVENT EXISTING STANDARDS

This is one of the most important requirements.

Before implementing anything, search for an existing standard/protocol/library that already solves it.

Potentially relevant technologies include:

* ERC-8004
* 8004scan
* MCP
* A2A
* OpenAPI
* HTTP
* Celo infrastructure
* EVM standards
* existing identity systems
* existing domain verification
* existing reputation/attestation mechanisms

These are examples, not instructions to blindly use everything.

Evaluate each one and use it where appropriate.

Do NOT create:

* custom agent identity
* custom blockchain
* custom token
* custom wallet
* custom agent communication protocol
* custom MCP replacement
* custom A2A replacement
* custom payment token
* unnecessary custom reputation system

unless research proves there is a genuine missing requirement.

⸻

7. AGENT / SERVICE DISCOVERY

The network should be able to discover services from multiple sources.

Potential sources:

ERC-8004
8004scan
MCP directories
A2A ecosystems
direct provider registration
partner registries
other compatible registries

Do not assume every source is trustworthy.

Discovery and verification are separate concepts.

An agent being discovered does NOT automatically mean it is verified.

⸻

8. SERVICE REGISTRY

Create a simple service registry.

The registry should represent services in a machine-readable format.

A service should be able to describe:

id
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
verification status
last verified timestamp

Keep the schema extensible.

Do not over-engineer it.

The registry should support services exposed through:

MCP
A2A
HTTP/API
OpenAPI
other compatible interfaces

⸻

9. SERVICE REGISTRATION

A provider should be able to register a service.

Example concept:

registerService({
  name: "Lagos Food Agent",
  description: "Orders food from participating restaurants in Lagos",
  capabilities: [
    "search_food",
    "get_menu",
    "place_order",
    "track_order"
  ],
  endpoint: "https://example.com/mcp",
  protocol: "mcp",
  location: "Lagos, Nigeria"
})

Do NOT require providers to rebuild their existing systems.

A provider should be able to connect:

* an existing API
* an MCP server
* an A2A agent
* an existing application backend
* a connector
* another supported interface

⸻

10. ENDPOINT VERIFICATION

This is a major feature.

We do NOT simply trust a submitted endpoint.

When a service is registered or imported, the system should verify it.

Minimum verification:

Is endpoint reachable?
        ↓
Does advertised protocol work?
        ↓
Can we retrieve capabilities?
        ↓
Do capabilities match the registration?
        ↓
Does identity/ownership verification pass where applicable?
        ↓
Does the service respond correctly?
        ↓
Record verification result

A service should have a status such as:

pending
verified
degraded
offline
failed

Verification should have a timestamp.

Verification is not permanent.

The endpoint should periodically be rechecked.

Do NOT claim that a service is verified forever.

⸻

11. ERC-8004

Investigate ERC-8004 using Celopedia/web research and existing documentation.

Determine exactly which parts can be reused for:

* agent identity
* registration
* reputation
* validation
* endpoint/ownership verification

Do not recreate ERC-8004 functionality.

If an agent already has an ERC-8004 identity, use it where appropriate.

The system should be able to discover an existing agent and associate its service with that identity.

Do not require every service to use ERC-8004 if the service does not need it.

The network should remain broadly compatible.

⸻

12. 8004SCAN

Investigate the available 8004scan APIs and discovery mechanisms.

Where appropriate, use 8004scan as a discovery source.

Conceptually:

8004scan
   ↓
Discover agents
   ↓
Import candidate
   ↓
Inspect metadata
   ↓
Verify endpoint
   ↓
Normalize service
   ↓
Add to service registry

Do not blindly mirror 8004scan.

Our value is not simply having a list of agents.

Our value is:

discovering usable services and verifying that they actually work.

⸻

13. MCP SERVER

Build an MCP interface.

The first tools should remain small.

Minimum:

search_services
get_service
request_service
get_request_status

Potential future tools:

get_quote
execute_service
cancel_request
pay_for_service

Do not expose unnecessary tools initially.

Example conceptual interaction:

User:
"Find me a hotel in Lagos."
AI Agent
    ↓
search_services({
  category: "hotel",
  location: "Lagos"
})
    ↓
Verified service results

The agent then decides what to do next.

⸻

14. API

Create a clean developer API.

Initial conceptual endpoints:

GET  /services
POST /services/search
GET  /services/:id
POST /services/register
POST /services/:id/verify
POST /requests
GET  /requests/:id

Payment endpoints should be added only when the actual payment flow is implemented.

Do not create 50 endpoints.

Keep the API small and composable.

⸻

15. SERVICE EXECUTION

The network should not necessarily proxy every request.

Prefer direct communication with providers where possible.

Conceptually:

Requesting Agent
       ↓
Our Network
       ↓
Discover / verify / route
       ↓
Provider Endpoint
       ↓
Provider executes service
       ↓
Result

The network is the connective layer.

Do not unnecessarily store:

* user prompts
* private agent conversations
* provider responses
* sensitive service data

Only store what is required for:

* service discovery
* request tracking
* verification
* payments
* auditing
* reputation/attestation where necessary

⸻

16. PAYMENT

Use Celo infrastructure.

Before implementing payment, use Celopedia to identify the simplest appropriate current Celo payment/stablecoin primitives.

Requirements:

* stable-value payment
* low transaction cost
* provider settlement
* network fee
* no unnecessary custody
* clear transaction records

Basic economic flow:

User / Agent
      ↓
Service
      ↓
Payment
      ↓
Provider receives payment
      ↓
Network receives small fee

The network should not unnecessarily custody provider funds.

⸻

17. MONETIZATION

The business model should remain simple.

Primary model:

Take a small fee when the network facilitates a successful paid service transaction.

Example:

Service price: $20
Provider: $19.80
Network:   $0.20

The actual percentage should be configurable.

Do not create subscriptions, tokens, staking requirements, advertising systems, or complicated pricing unless there is a real reason.

For digital services where a transaction percentage doesn’t make sense, a small execution/infrastructure fee may be considered later.

But V1 should focus on:

pay-per-successful-service.

⸻

18. NETWORK NEUTRALITY

The network should not arbitrarily decide:

“This provider is the best.”

Instead, return structured information.

Example:

Provider A
price: $10
availability: available
reputation: ...
latency: ...
verification: verified
Provider B
price: $8
availability: available
reputation: ...
latency: ...
verification: verified

The requesting agent/user can make the selection according to its own preferences.

This makes the network an open access layer, not a centralized recommendation engine.

⸻

19. VERIFICATION VS REPUTATION

Keep these separate.

Verification

Answers:

Does this endpoint exist and does it appear to do what it claims?

Reputation

Answers:

What history/signals exist around this service?

Do not combine them into one meaningless score.

Use existing ERC-8004 reputation/validation mechanisms where appropriate.

Otherwise keep reputation extremely simple for V1.

⸻

20. DECENTRALIZATION

Use decentralized infrastructure where it provides real value.

Do NOT make everything onchain.

Good candidates for decentralized/verifiable infrastructure:

Agent identity
Service registration
Ownership proofs
Attestations
Reputation/validation
Payment settlement

Good candidates for offchain infrastructure:

Search
API requests
MCP requests
Service execution
Health checks
Private data
Routing
Request payloads

Principle:

Put trust-critical state where it benefits from verifiability. Keep high-frequency/private computation offchain.

⸻

21. FRONTEND

The frontend is NOT the primary product.

Build only enough UI for:

Homepage

Explain:

The service layer for humans and AI agents.

Documentation

Explain:

* API
* MCP
* provider integration
* service registration
* verification
* payments
* examples

Service explorer

Show available services and their verification status.

Developer onboarding

Show how to connect an existing service.

Do NOT spend most of the build time on:

* animations
* dashboards
* social feeds
* user profiles
* elaborate marketplace cards
* unnecessary UI

The infrastructure matters more.

⸻

22. PLUGIN / CONNECTOR DIRECTION

Design the API/MCP so it can later be packaged into:

* browser extension
* desktop plugin
* AI client plugin
* mobile application
* developer SDK

The same network should work across:

Computer
Phone
Browser
AI agent
CLI
Developer application

Do not create separate business logic for each client.

They should all use the same underlying network interfaces.

⸻

23. PROVIDER SDK

Create a lightweight SDK if it simplifies onboarding.

Example:

npm install @network/sdk

Possible API:

registerService(...)
verifyService(...)
getServiceStatus(...)

Do not build an SDK with hundreds of methods.

The objective is:

A provider should be able to connect an existing service with minimal work.

⸻

24. DATABASE

A simple database is fine for metadata/indexing even though the project uses decentralized primitives.

Do NOT force every piece of data onchain.

Possible tables:

services
providers
endpoints
verifications
requests
payments

Keep the schema minimal.

Use the database as an index/cache where useful, not as the ultimate source of truth for trust-critical information when an appropriate decentralized primitive exists.

⸻

25. SECURITY

Treat every external service as untrusted.

Important requirements:

* endpoint timeouts
* rate limits
* request validation
* authentication where required
* SSRF protection
* URL validation
* malicious endpoint protection
* webhook validation
* payment verification
* replay protection
* secrets never stored in plaintext
* no private user information unnecessarily stored
* sandbox external service checks where possible

Never blindly execute arbitrary submitted URLs from privileged infrastructure.

⸻

26. TESTING

The MVP must demonstrate the complete flow.

At minimum:

Test 1 — Register

Provider registers a service.

Test 2 — Verify

System checks endpoint.

Test 3 — Discover

MCP/API searches the service.

Test 4 — Execute

An agent requests the service.

Test 5 — Payment

A test payment settles on the selected Celo environment.

Test 6 — Fee

The network receives its configured fee.

Test 7 — Failure

An unavailable endpoint is detected and marked appropriately.

⸻

27. FIRST DEMO

The first demo should be extremely simple.

Example:

AI Agent
"Find me a service that can perform X."
        ↓
MCP
        ↓
Our Network
        ↓
Verified service
        ↓
Request
        ↓
Provider
        ↓
Payment
        ↓
Result

The demo does NOT need 1,000 services.

It needs to prove the infrastructure works.

⸻

28. IMPLEMENTATION RULES

Follow these rules strictly:

1. Do not over-engineer.
2. Do not build features just because they sound cool.
3. Reuse existing standards.
4. Use Celopedia heavily for Celo decisions.
5. Research before inventing.
6. Use ERC-8004 where appropriate instead of creating custom identity infrastructure.
7. Use MCP instead of creating a custom AI-agent protocol.
8. Use standard APIs/OpenAPI/HTTP where appropriate.
9. Use Celo’s existing payment infrastructure.
10. Keep the frontend minimal.
11. Prioritize API + MCP.
12. Treat agents as first-class clients.
13. Treat providers as independent businesses.
14. Never require providers to abandon their existing infrastructure.
15. Verify external endpoints before listing them as verified.
16. Do not put private service requests onchain unnecessarily.
17. Do not create a token for V1.
18. Do not create a DAO for V1.
19. Do not create a custom blockchain.
20. Do not create a complicated reputation system.

⸻

29. RESEARCH-FIRST REQUIREMENT

Before coding, spend a short focused research pass using:

npx skills add celo-org/celopedia-skills

Then investigate the current Celo ecosystem and existing standards.

Create a short internal implementation note containing:

Existing Celo primitive → what it solves → how we will use it
Existing standard → what it solves → how we will use it
Missing functionality → what we actually need to build

Do not produce a giant research report.

The goal is to avoid reinventing anything.

⸻

30. TECHNICAL DECISION PRINCIPLE

When choosing between:

Build ourselves
vs
Use existing infrastructure

default to:

Use existing infrastructure.

Only build ourselves when:

1. no suitable standard exists,
2. existing infrastructure cannot satisfy the requirement,
3. or our specific service-network layer is the actual product.

⸻

31. MVP SUCCESS CRITERIA

The MVP is successful if we can demonstrate:

Provider

Can register a service.

Network

Can discover and verify it.

Agent

Can find it through MCP.

Agent

Can request/use it.

Payment

Can settle through Celo.

Network

Can take a small fee.

Provider

Receives the remaining payment.

Developer

Can integrate without using the frontend.

If these work, stop.

Do not keep adding features.

⸻

32. FINAL PRODUCT MODEL

The finished architecture should conceptually look like:

                         SERVICE NETWORK
                                │
             ┌──────────────────┼──────────────────┐
             │                  │                  │
            API                MCP              SDK
             │                  │                  │
        Applications        AI Agents          Providers
             │                  │                  │
             └──────────────────┼──────────────────┘
                                │
                        Service Discovery
                                │
                    ┌───────────┴───────────┐
                    │                       │
              Existing agents         Existing businesses
                    │                       │
              ERC-8004 / A2A          APIs / MCP / HTTP
                    │                       │
                    └───────────┬───────────┘
                                │
                         Verification
                                │
                           Execution
                                │
                           Payment
                                │
                              CELO
                                │
                     Provider + Network fee

The core loop is:

Discover → Verify → Select → Execute → Pay

That loop is the product.

Everything else should support it.

⸻

33. START NOW

First:

npx skills add celo-org/celopedia-skills

Then inspect the available Celopedia skills and documentation.

Research the current Celo ecosystem and existing standards.

Then produce:

1. a minimal architecture,
2. database/schema proposal,
3. API specification,
4. MCP tool specification,
5. provider registration format,
6. verification flow,
7. Celo payment flow,
8. project folder structure.

After that, immediately implement the MVP.

Do not wait for approval between every small implementation decision.

Make sensible engineering decisions, document them briefly, and prioritize getting the complete Discover → Verify → Execute → Pay loop working.

The final result should be a working developer/infrastructure product, not a mockup.
