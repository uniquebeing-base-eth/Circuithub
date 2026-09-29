'use strict';

const express = require('express');
const path = require('path');
const { ServiceRegistry } = require('./serviceRegistry');

const app = express();
const registry = new ServiceRegistry();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

const seedServices = [
  {
    name: 'Lagos Food Agent',
    description: 'Orders food from participating restaurants in Lagos',
    provider: 'Lagos Food Co.',
    category: 'food',
    capabilities: ['search_food', 'get_menu', 'place_order', 'track_order'],
    endpoint: 'https://example.com/mcp',
    protocol: 'mcp',
    location: 'Lagos, Nigeria',
    currency: 'cUSD',
    pricing: { mode: 'per_order' },
    status: 'verified',
    verification: {
      status: 'verified',
      lastVerifiedAt: new Date().toISOString(),
      checks: {
        reachable: true,
        protocolWorks: true,
        capabilitiesMatch: true,
        ownershipVerified: true
      }
    }
  },
  {
    name: 'City Travel Desk',
    description: 'Books flights and hotel stays across Nigeria',
    provider: 'City Travel Desk',
    category: 'travel',
    capabilities: ['search_flights', 'book_hotel', 'book_flight'],
    endpoint: 'https://example.com/travel',
    protocol: 'http',
    location: 'Abuja, Nigeria',
    currency: 'cUSD',
    pricing: { mode: 'booking_fee' },
    status: 'verified',
    verification: {
      status: 'verified',
      lastVerifiedAt: new Date().toISOString(),
      checks: {
        reachable: true,
        protocolWorks: true,
        capabilitiesMatch: true,
        ownershipVerified: true
      }
    }
  }
];

seedServices.forEach((service) => registry.registerService(service));

app.get('/health', (req, res) => {
  res.json({ ok: true, status: 'healthy', services: registry.services.length });
});

app.get('/services', (req, res) => {
  res.json(registry.services);
});

app.post('/services/search', (req, res) => {
  const results = registry.searchServices(req.body || {});
  res.json(results);
});

app.post('/services/register', (req, res) => {
  try {
    const service = registry.registerService(req.body);
    res.status(201).json(service);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/services/:id', (req, res) => {
  const service = registry.getService(req.params.id);
  if (!service) {
    return res.status(404).json({ error: 'Service not found' });
  }
  return res.json(service);
});

app.post('/services/:id/verify', (req, res) => {
  try {
    const service = registry.verifyService(req.params.id, req.body || {});
    res.json(service);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

app.post('/requests', (req, res) => {
  try {
    const request = registry.createRequest(req.body);
    res.status(201).json(request);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/requests/:id', (req, res) => {
  const request = registry.getRequest(req.params.id);
  if (!request) {
    return res.status(404).json({ error: 'Request not found' });
  }
  return res.json(request);
});

app.get('/mcp/tools', (req, res) => {
  res.json({
    tools: [
      'search_services',
      'get_service',
      'request_service',
      'get_request_status'
    ]
  });
});

app.post('/mcp', (req, res) => {
  const { tool, args = {} } = req.body || {};

  if (!tool) {
    return res.status(400).json({ error: 'Tool name is required' });
  }

  const handlers = {
    search_services: () => registry.searchServices(args),
    get_service: () => registry.getService(args.id),
    request_service: () => registry.createRequest({
      serviceId: args.serviceId,
      requestType: args.requestType || 'default',
      payload: args.payload || {}
    }),
    get_request_status: () => registry.getRequest(args.requestId)
  };

  const handler = handlers[tool];
  if (!handler) {
    return res.status(404).json({ error: `Unknown MCP tool: ${tool}` });
  }

  try {
    return res.json({ ok: true, result: handler() });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Circuithub API running on http://localhost:${port}`);
  });
}

module.exports = app;
