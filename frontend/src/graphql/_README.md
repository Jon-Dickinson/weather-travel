```mermaid
graph LR
    Query[GraphQL Query] -- "Defines what to fetch" --> Schema[API Response]
    Schema -- "Matches" --> Interface[TS Interfaces]
    Interface -- "Enforces types in" --> Components[React UI Tree]
    
    style Query fill:#F92672,color:#fff
    style Interface fill:#62CEE1,color:#000
    style Components fill:#A2DD2E,color:#000
```

### Making the codebase much more maintainable and resilient:

By defining these interfaces and queries upfront, I'm creating a strictly typed contract between my data layer and my UI. 

If the backend schema ever changes, TypeScript will immediately highlight exactly which components need to be updated, 