# Architecture

## Overview
AlgoVis Pro is a full-stack web application with a React frontend and a Spring Boot backend.

```text
Frontend (React + TypeScript)
        |
        | HTTP/JSON
        v
Backend (Spring Boot)
  - /api/health
  - /api/algorithms
  - /api/algorithms/{id}/scenarios
```

## Frontend Modules
- `src/app/`: page composition and orchestration
- `src/features/algorithms/`: algorithm-specific step generators
- `src/components/player/`: universal execution player
- `src/components/visualizer/`: bar/cell rendering modes
- `src/services/`: API client layer
- `src/types/`: shared frontend contracts

## Backend Modules
- `controller/`: REST endpoints
- `service/`: algorithm catalog and scenario providers
- `dto/`: response contracts
- `config/`: CORS/web configuration

## Core Design Choice
All algorithms emit a shared `ExecutionStep` format so the same player can run sorting, text search, and graph traversals.
