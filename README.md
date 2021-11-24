### VC Data Model & Graph Data

Need to setup https://github.com/neo4j-labs/neosemantics

```
CREATE CONSTRAINT n10s_unique_uri ON (r:Resource) ASSERT r.uri IS UNIQUE

call n10s.graphconfig.init()

```

```
call n10s.rdf.import.fetch( "https://raw.githubusercontent.com/jbarrasa/neosemantics-python-examples/master/rdf_data/movie.json",
                            "JSON-LD")

```

```
with '
{
    "@context": [{"@vocab": "https://ontology.example/vocab/"}],
    "@id": "did:example:123",
    "name": "Alice"
}
' as  payload

call n10s.rdf.import.inline( payload, "JSON-LD") yield terminationStatus, triplesLoaded, triplesParsed, namespaces
return terminationStatus, triplesLoaded, triplesParsed, namespaces
```

```
with '
<did:key:z6MkpJ7szHBshTMun5qfz6A9k3cFZPa4ssfLPpXFmdgBmzVi> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://ontology.example/vocab/Organization> .
<did:key:z6MkpJ7szHBshTMun5qfz6A9k3cFZPa4ssfLPpXFmdgBmzVi> <https://ontology.example/vocab/name> "Univeristy of Example, Chemistry Department" .
<did:key:z6MkpJ7szHBshTMun5qfz6A9k3cFZPa4ssfLPpXFmdgBmzVi> <https://ontology.example/vocab/url> "https://example.edu" .
<urn:uuid:0> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://ontology.example/vocab/PurchaseOrderCertificate> .
<urn:uuid:0> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://www.w3.org/2018/credentials#VerifiableCredential> .
<urn:uuid:0> <https://w3id.org/security#proof> _:c14n3 .
<urn:uuid:0> <https://www.w3.org/2018/credentials#credentialSubject> <urn:uuid:po:123> .
<urn:uuid:0> <https://www.w3.org/2018/credentials#issuanceDate> "2021-11-24T04:12:25Z"^^<http://www.w3.org/2001/XMLSchema#dateTime> .
<urn:uuid:0> <https://www.w3.org/2018/credentials#issuer> <did:key:z6MkpJ7szHBshTMun5qfz6A9k3cFZPa4ssfLPpXFmdgBmzVi> .
<urn:uuid:po:123> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://ontology.example/vocab/PurchaseOrder> .
<urn:uuid:po:123> <https://ontology.example/vocab/buyer> _:c14n2 .
<urn:uuid:po:123> <https://ontology.example/vocab/product> _:c14n0 .
<urn:uuid:po:123> <https://ontology.example/vocab/seller> _:c14n4 .
_:c14n0 <https://ontology.example/vocab/name> "Cellulase Enzyme" .
_:c14n0 <https://ontology.example/vocab/price> "$100.00" .
_:c14n0 <https://ontology.example/vocab/url> "https://market.example/pruducts/685975" .
_:c14n0 <https://ontology.example/vocab/weight> "1 Kilogram" .
_:c14n1 <http://purl.org/dc/terms/created> "2021-11-24T04:41:40Z"^^<http://www.w3.org/2001/XMLSchema#dateTime> _:c14n3 .
_:c14n1 <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://w3id.org/security#Ed25519Signature2018> _:c14n3 .
_:c14n1 <https://w3id.org/security#jws> "eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..PC7PzEiS4OhvHTZJBvhYYTV0Rvesk9zHkdm-NTAWiWJGbUDNxSw0vvSh_7Y5SWUbOo_x_TVbVWLxoceKeyTiAA" _:c14n3 .
_:c14n1 <https://w3id.org/security#proofPurpose> <https://w3id.org/security#assertionMethod> _:c14n3 .
_:c14n1 <https://w3id.org/security#verificationMethod> <did:key:z6MkpJ7szHBshTMun5qfz6A9k3cFZPa4ssfLPpXFmdgBmzVi#z6MkpJ7szHBshTMun5qfz6A9k3cFZPa4ssfLPpXFmdgBmzVi> _:c14n3 .
_:c14n2 <https://ontology.example/vocab/email> "alice@example.com" .
_:c14n2 <https://ontology.example/vocab/name> "Professor Alice" .
_:c14n2 <https://ontology.example/vocab/phone> "555-555-5551" .
_:c14n4 <https://ontology.example/vocab/email> "bob@example.com" .
_:c14n4 <https://ontology.example/vocab/name> "Chemical Supply Co." .
_:c14n4 <https://ontology.example/vocab/phone> "555-555-5552" .
_:c14n4 <https://ontology.example/vocab/url> "https://market.example/supplier/7856234" .

' as  payload

call n10s.rdf.import.inline( payload, "N-Quads") yield terminationStatus, triplesLoaded, triplesParsed, namespaces
return terminationStatus, triplesLoaded, triplesParsed, namespaces
```

#### Develop

```
npm i
docker-compose up
npm run test
```
