const jsonld = require("jsonld");
const { documentLoader } = require("./documenLoader");

const isGraphNode = /<(.+)>/;

// When importing from RDF, we don't know the labels yet...
// Better to import as is, then label them after import.
const getNodeLabel = (s, p, o) => {
  // TODO: ask the ontology if the predicate is to a known type?
  // const predicateName = getSafePredicateName(p);
  // if (["dateTime", "type"].includes(predicateName)) {
  //   return "Class";
  // }
  // let label = s.includes("urn:bnid:") ? "BlankNode" : "Node";
  // return label;
  // return "Node";
  // if (s.startsWith("http")) {
  //   return "Resource";
  // }

  // if (s.startsWith("did")) {
  //   return "Identifier";
  // }
  return "Node";
};

const getNodeById = async (id, driver) => {
  const session = driver.session();
  const { records } = await session.run(`MATCH (n {id: "${id}"}) RETURN n`);
  await session.close();
  return records;
};

const addSubject = async (s, p, o, driver) => {
  const records = await getNodeById(s, driver);
  if (records.length) {
    // update
    // console.log("skipping create for existing node id: " + s);
  } else {
    // create
    const session = driver.session();
    const label = getNodeLabel(s, p, o);
    let id = s;

    await session.run(
      `MERGE (
        a:${label} { 
          id: $id
        }
      ) 
      RETURN a`,
      {
        id,
      }
    );
    await session.close();
  }
};

const getSafePredicateName = (p) => {
  if (p.includes("#")) {
    return p.split("#").pop();
  } else {
    return p.split("/").pop();
  }
};

const addObject = async (s, p, o, driver) => {
  if (isGraphNode.test(o)) {
    const [_0, type] = o.match(isGraphNode);
    const label = getNodeLabel(s, p, o);
    const records = await getNodeById(type, driver);
    if (records.length) {
      // update
      // console.log("skipping create for existing node id: " + s);
    } else {
      // create
      const session = driver.session();
      await session.run(`MERGE (a:${label} { id: "${type}" }) RETURN a`);
      await session.close();
    }
  } else {
    // literal, add as property (destroying context)
    const session = driver.session();
    await session.run(
      `
MATCH  (n {id: '${s}' })
SET n += {  ${getSafePredicateName(p)}:  "${o.replace(/\"/g, "")}" }
RETURN n
`
    );
    await session.close();
  }
};

const addPredicate = async (s, p, o, driver) => {
  if (isGraphNode.test(o)) {
    const [_0, type] = o.match(isGraphNode);
    const relation = getSafePredicateName(p);
    const session = driver.session();
    await session.run(
      `
  MATCH
    (s {id: '${s}'}),
    (o {id: '${type}'})
  MERGE (s)-[:${relation}]->(o)
  RETURN s`
    );
    await session.close();
  }
};

const getMatchesFromQuad = (quad) => {
  const intermediateNode = /<(\S+?)>\s+<(\S+?)>\s+<(\S+?)>\s+<(.+?)>\s+\./;
  matches = quad.match(intermediateNode);
  if (matches === null) {
    const terminalNode = /<(.+)> <(.+)> (.+) ./;
    matches = quad.match(terminalNode);
  }
  return matches;
};

const addStatement = async (quad, driver) => {
  let matches = getMatchesFromQuad(quad);
  if (matches !== null) {
    const [_0, subject, predicate, object] = matches;
    await addSubject(subject, predicate, object, driver);
    await addObject(subject, predicate, object, driver);
    await addPredicate(subject, predicate, object, driver);
  }
};

const importData = async (document, driver) => {
  const canonized = await jsonld.canonize(document, {
    format: "application/n-quads",
    documentLoader,
  });

  const statements = canonized
    .split("\n")
    .filter((s) => s !== "")
    .map((element) => element.replace(/(_:c14n[0-9]+)/g, "<urn:bnid:$1>"));
  // console.log(statements);
  // .slice(0, 10);
  await Promise.all(
    statements.map((s) => {
      return addStatement(s, driver);
    })
  );
};

module.exports = { importData };
