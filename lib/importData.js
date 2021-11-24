const jsonld = require("jsonld");
const { documentLoader } = require("./documenLoader");

const getOrCreateSubject = async (s, driver) => {
  const session = driver.session();
  const label = "Node";
  await session.run(`MERGE (a:${label} { id: $id }) RETURN a`, {
    id: s,
  });
  await session.close();
};

const regex = /<(.+)> <(.+)> (.+) ./;
const addStatement = async (quad, driver) => {
  // const [_0, subject, predicate, object] = quad.match(regex);
  // // console.log(subject, predicate, object);
  // await getOrCreateSubject(subject, driver);
  // const session = driver.session();
  // const label = "N-QUAD";
  // await session.run(`MERGE (a:${label} { id: $id }) RETURN a`, {
  //   id: "123",
  // });
  // await session.close();
};

const importData = async (document, driver) => {
  const canonized = await jsonld.canonize(document, {
    format: "application/n-quads",
    documentLoader,
  });
  console.log(canonized);
  // const statements = canonized
  //   .split("\n")
  //   .filter((s) => s !== "")
  //   .slice(0, 3);
  // await Promise.all(
  //   statements.map((s) => {
  //     return addStatement(s, driver);
  //   })
  // );
};

module.exports = { importData };
