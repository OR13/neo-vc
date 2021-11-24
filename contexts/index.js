const contexts = {
  "https://www.w3.org/2018/credentials/v1": require("./credentials-v1.json"),
  "https://ontology.example/credentials/v1": require("./example-v1.json"),
  "https://or13.github.io/neo-vc/contexts/example-v1.json": require("./example-v1.json"),
};

module.exports = { contexts };
