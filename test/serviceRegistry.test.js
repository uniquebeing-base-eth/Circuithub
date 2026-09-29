const test = require('node:test');
const assert = require('node:assert/strict');

const { ServiceRegistry } = require('../src/serviceRegistry');

test('registers a service and verifies it', () => {
  const registry = new ServiceRegistry();

  const service = registry.registerService({
    name: 'Lagos Food Agent',
    description: 'Orders food from participating restaurants in Lagos',
    provider: 'Lagos Food Co.',
    category: 'food',
    capabilities: ['search_food', 'get_menu', 'place_order'],
    endpoint: 'https://example.com/mcp',
    protocol: 'mcp',
    location: 'Lagos, Nigeria',
    currency: 'cUSD',
    pricing: { mode: 'per_order' }
  });

  assert.equal(service.status, 'pending');

  const verified = registry.verifyService(service.id, {
    reachable: true,
    protocolWorks: true,
    capabilitiesMatch: true,
    ownershipVerified: true
  });

  assert.equal(verified.status, 'verified');
  assert.equal(verified.verification.status, 'verified');
  assert.ok(verified.verification.lastVerifiedAt);
});

test('finds matching services by category and location', () => {
  const registry = new ServiceRegistry();

  registry.registerService({
    name: 'Lagos Food Agent',
    provider: 'Lagos Food Co.',
    category: 'food',
    capabilities: ['search_food'],
    endpoint: 'https://example.com/food',
    protocol: 'http',
    location: 'Lagos, Nigeria',
    status: 'verified'
  });

  registry.registerService({
    name: 'Abuja Travel Agent',
    provider: 'Travel Pros',
    category: 'travel',
    capabilities: ['book_flight'],
    endpoint: 'https://example.com/travel',
    protocol: 'http',
    location: 'Abuja, Nigeria',
    status: 'verified'
  });

  const results = registry.searchServices({ category: 'food', location: 'Lagos' });
  assert.equal(results.length, 1);
  assert.equal(results[0].name, 'Lagos Food Agent');
});

test('tracks a request through execution to completion', () => {
  const registry = new ServiceRegistry();

  const service = registry.registerService({
    name: 'Lagos Food Agent',
    provider: 'Lagos Food Co.',
    category: 'food',
    capabilities: ['place_order'],
    endpoint: 'https://example.com/mcp',
    protocol: 'mcp',
    location: 'Lagos, Nigeria',
    status: 'verified'
  });

  const request = registry.createRequest({
    serviceId: service.id,
    requestType: 'place_order',
    payload: { item: 'jollof rice', quantity: 2 }
  });

  assert.equal(request.status, 'pending');

  registry.updateRequestStatus(request.id, 'completed', {
    confirmation: 'Order confirmed'
  });

  const updated = registry.getRequest(request.id);
  assert.equal(updated.status, 'completed');
  assert.equal(updated.result.confirmation, 'Order confirmed');
});
