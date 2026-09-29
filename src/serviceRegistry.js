'use strict';

class ServiceRegistry {
  constructor() {
    this.services = [];
    this.requests = [];
  }

  createId(prefix) {
    return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
  }

  normalizeService(serviceInput) {
    const now = new Date().toISOString();
    const service = {
      id: serviceInput.id || this.createId('service'),
      name: serviceInput.name || 'Unnamed Service',
      description: serviceInput.description || '',
      provider: serviceInput.provider || 'Unknown Provider',
      category: serviceInput.category || 'general',
      capabilities: Array.isArray(serviceInput.capabilities) ? serviceInput.capabilities : [],
      endpoint: serviceInput.endpoint || '',
      protocol: serviceInput.protocol || 'http',
      location: serviceInput.location || 'Global',
      pricing: serviceInput.pricing || { mode: 'quote' },
      currency: serviceInput.currency || 'USD',
      availability: serviceInput.availability || 'available',
      requirements: serviceInput.requirements || [],
      authentication: serviceInput.authentication || 'none',
      verification: {
        status: serviceInput.status === 'verified' ? 'verified' : 'pending',
        lastVerifiedAt: serviceInput.verification && serviceInput.verification.lastVerifiedAt ? serviceInput.verification.lastVerifiedAt : null,
        checks: serviceInput.verification && serviceInput.verification.checks ? serviceInput.verification.checks : {}
      },
      status: serviceInput.status || 'pending',
      createdAt: serviceInput.createdAt || now,
      updatedAt: serviceInput.updatedAt || now,
      metadata: serviceInput.metadata || {}
    };

    service.status = service.status || 'pending';
    return service;
  }

  registerService(serviceInput) {
    const service = this.normalizeService(serviceInput);
    this.services.push(service);
    return service;
  }

  getService(serviceId) {
    return this.services.find((service) => service.id === serviceId) || null;
  }

  searchServices(filters = {}) {
    const { category, location, protocol, status } = filters;

    return this.services.filter((service) => {
      const matchesCategory = category ? service.category.toLowerCase() === category.toLowerCase() : true;
      const matchesLocation = location ? service.location.toLowerCase().includes(String(location).toLowerCase()) : true;
      const matchesProtocol = protocol ? service.protocol.toLowerCase() === String(protocol).toLowerCase() : true;
      const matchesStatus = status ? service.status.toLowerCase() === String(status).toLowerCase() : true;

      return matchesCategory && matchesLocation && matchesProtocol && matchesStatus;
    });
  }

  verifyService(serviceId, verificationInput = {}) {
    const service = this.getService(serviceId);

    if (!service) {
      throw new Error(`Service not found: ${serviceId}`);
    }

    const checks = {
      reachable: Boolean(verificationInput.reachable),
      protocolWorks: Boolean(verificationInput.protocolWorks),
      capabilitiesMatch: Boolean(verificationInput.capabilitiesMatch),
      ownershipVerified: Boolean(verificationInput.ownershipVerified),
      ...verificationInput.checks
    };

    const isVerified = Object.values(checks).every((value) => value === true || value === undefined);
    const verificationStatus = isVerified ? 'verified' : 'degraded';

    service.verification = {
      status: verificationStatus,
      lastVerifiedAt: new Date().toISOString(),
      checks
    };
    service.status = verificationStatus;
    service.updatedAt = new Date().toISOString();

    return service;
  }

  createRequest(requestInput) {
    const service = this.getService(requestInput.serviceId);

    if (!service) {
      throw new Error(`Service not found: ${requestInput.serviceId}`);
    }

    const request = {
      id: requestInput.id || this.createId('request'),
      serviceId: service.id,
      requestType: requestInput.requestType || 'default',
      payload: requestInput.payload || {},
      status: requestInput.status || 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      result: null
    };

    this.requests.push(request);
    return request;
  }

  updateRequestStatus(requestId, status, result = null) {
    const request = this.getRequest(requestId);

    if (!request) {
      throw new Error(`Request not found: ${requestId}`);
    }

    request.status = status;
    request.result = result;
    request.updatedAt = new Date().toISOString();

    return request;
  }

  getRequest(requestId) {
    return this.requests.find((request) => request.id === requestId) || null;
  }
}

module.exports = {
  ServiceRegistry
};
