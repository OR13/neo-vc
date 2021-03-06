Need to setup https://github.com/neo4j-labs/neosemantics

```
CREATE CONSTRAINT n10s_unique_uri ON (r:Resource) ASSERT r.uri IS UNIQUE;

call n10s.graphconfig.init();

call n10s.rdf.import.fetch(
    "https://or13.github.io/neo-vc/scenarios/e-commerce-chemistry-import/0-purchase-order.json",
    "JSON-LD"
);

```

### Working Example

```
call n10s.rdf.import.fetch(
    "https://or13.github.io/neo-vc/scenarios/e-commerce-chemistry-import/test-0.json",
    "JSON-LD"
)

```

```
call n10s.rdf.import.fetch(
    "https://raw.githubusercontent.com/jbarrasa/neosemantics-python-examples/master/rdf_data/movie.json",
    "JSON-LD"
)

```

### Not Working

![image info](./fail.png)

```

call n10s.rdf.import.fetch(
    "https://or13.github.io/neo-vc/scenarios/e-commerce-chemistry-import/test-1.json",
    "JSON-LD"
)


call n10s.rdf.import.fetch(
    "https://or13.github.io/neo-vc/scenarios/e-commerce-chemistry-import/0-purchase-order.json",
    "JSON-LD"
)

```
