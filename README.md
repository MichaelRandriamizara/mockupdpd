# DPD API Mockup

This is a mock implementation of the DPD API for testing and development purposes. It provides endpoints that simulate the behavior of the real DPD API.

## Installation

```bash
npm install
```

## Running the Server

Development mode with auto-reload:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on port 3000 by default. You can change this by setting the `PORT` environment variable.

## API Endpoints

### Authentication

#### GET /api/v1/auth/me
Get current user information.
- Requires Bearer token authentication
- Returns user details

#### POST /api/v1/auth/login
Authenticate user and get token.
- Body: `{ "email": "test@example.com", "password": "password" }`
- Returns: `{ "token": "mock-token", "user": {...} }`

### Services

#### GET /api/v1/services
Get available shipping services and prices.
- Required query params: `countryFrom`, `countryTo`
- Optional query params:
  - `postalCodeFrom`: Sender postal code
  - `postalCodeTo`: Receiver postal code
  - `serviceType`: Filter by service type (Business, Private, Pudo, etc.)
  - `mainServiceName`: Filter by service name (partial match)
  - `mainServiceAlias`: Filter by service alias (exact match)
  - `packageSize`: Filter by package size (XS, S, M, L, XL)
  - `payerCode`: Payer code
  - `affiliateLinkedId`: Affiliate account UUID
- Returns: Array of available services with prices

### Shipments

#### POST /api/v1/shipment
Create a new shipment.
- Body: Shipment details including sender, receiver, and parcels
- Returns: Created shipment with ID

#### GET /api/v1/shipment/:id
Get shipment details by ID.
- Returns: Shipment details

#### GET /api/v1/shipment
List all shipments.
- Returns: Array of shipments

#### PATCH /api/v1/shipment/:id/status
Update shipment status.
- Body: `{ "status": "new_status" }`
- Returns: Updated shipment

### Labels

#### POST /api/v1/labels
Generate a shipping label.
- Body: `{ "shipmentId": "SH123", "format": "pdf" }`
- Returns: Label details with download URL

#### GET /api/v1/labels/:id
Get label details by ID.
- Returns: Label details

#### GET /api/v1/labels/shipment/:shipmentId
Get all labels for a shipment.
- Returns: Array of labels

### Lockers

#### GET /api/v1/lockers
List all parcel lockers.
- Query params: `city`, `status`
- Returns: Array of lockers

#### GET /api/v1/lockers/:id
Get locker details by ID.
- Returns: Locker details

#### GET /api/v1/lockers/nearby
Find nearby lockers.
- Query params: `latitude`, `longitude`, `radius`
- Returns: Array of nearby lockers

## Error Handling

All endpoints follow the RFC7808 problem details format for errors:

```json
{
    "status": "error",
    "message": "Error message",
    "type": "about:blank",
    "instance": "/api/v1/endpoint"
}
```

## Rate Limiting

The API implements rate limiting:
- 60 requests per minute per IP address
- Rate limit headers are included in responses

## Security

- CORS enabled
- Helmet security headers
- Bearer token authentication required for protected endpoints