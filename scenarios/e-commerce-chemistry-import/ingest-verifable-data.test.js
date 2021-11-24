const neo4j = require("neo4j-driver");
const uri = "neo4j://localhost";
const user = "neo4j";
const password = "test";
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

const { importData } = require("../../lib/importData");

const data0 = require("./0-purchase-order.json");

describe("neo4j", () => {
  beforeAll(async () => {
    const session = driver.session();
    await session.run(
      `
      MATCH (n)
      DETACH DELETE n
      `
    );
    await session.close();
  });
  afterAll(async () => {
    await driver.close();
  });

  it("add data", async () => {
    await importData(data0, driver);
  });
});
