const labelAllBuyers = async (driver) => {
  const session = driver.session();
  await session.run(
    `
    MATCH (n:Node)<-[:buyer]-(b)
    WHERE n.id STARTS WITH 'urn:bnid:'
    call apoc.create.addLabels(n, ['Buyer']) YIELD node
    RETURN node
    `
  );
  await session.close();
};

const labelAllSellers = async (driver) => {
  const session = driver.session();
  await session.run(
    `
    MATCH (n:Node)<-[:seller]-(b)
    WHERE n.id STARTS WITH 'urn:bnid:'
    call apoc.create.addLabels(n, ['Seller']) YIELD node
    RETURN node
    `
  );
  await session.close();
};

const labelAllTypes = async (driver) => {
  const session = driver.session();
  await session.run(
    `
    MATCH (n:Node)<-[:type]-(b)
    call apoc.create.addLabels(n, ['Class']) YIELD node
    RETURN node
    `
  );
  await session.close();
};

const labelAllProducts = async (driver) => {
  const session = driver.session();
  await session.run(
    `
    MATCH (n:Node)<-[:product]-(b)
    call apoc.create.addLabels(n, ['Product']) YIELD node
    RETURN node
    `
  );
  await session.close();
};

const addLabelsToBlankNodes = async (driver) => {
  await labelAllBuyers(driver);
  await labelAllSellers(driver);
  await labelAllTypes(driver);
  await labelAllProducts(driver);
};

module.exports = { addLabelsToBlankNodes };
