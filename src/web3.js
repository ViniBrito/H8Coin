import Web3 from "web3";

const address = "0xbe0BFe2E5Ac076c9928CeB9092D15ec3CF8B26d9";
const abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "apBlock",
        type: "string",
      },
      {
        internalType: "string",
        name: "apCode",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "numSpots",
        type: "uint8",
      },
    ],
    name: "addAp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "address",
        name: "president",
        type: "address",
      },
    ],
    name: "addInitiative",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint16",
        name: "year",
        type: "uint16",
      },
      {
        internalType: "bool",
        name: "president",
        type: "bool",
      },
      {
        internalType: "string",
        name: "apCode",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "pos",
        type: "uint256",
      },
    ],
    name: "addStudent",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "aps",
    outputs: [
      {
        internalType: "string",
        name: "apBlock",
        type: "string",
      },
      {
        internalType: "string",
        name: "apCode",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "numSpots",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "apsMap",
    outputs: [
      {
        internalType: "string",
        name: "apBlock",
        type: "string",
      },
      {
        internalType: "string",
        name: "apCode",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "numSpots",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "assigmentMap",
    outputs: [
      {
        internalType: "address",
        name: "student",
        type: "address",
      },
      {
        internalType: "string",
        name: "initiative",
        type: "string",
      },
      {
        internalType: "uint16",
        name: "score",
        type: "uint16",
      },
      {
        internalType: "uint16",
        name: "semester",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
      {
        internalType: "string",
        name: "apCode",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "pos",
        type: "uint256",
      },
    ],
    name: "assignApStudent",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
      {
        internalType: "uint16",
        name: "semester",
        type: "uint16",
      },
      {
        internalType: "uint8",
        name: "score",
        type: "uint8",
      },
    ],
    name: "assignScore",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "cohab",
    outputs: [
      {
        internalType: "address",
        name: "director",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "defineCohab",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "apCode",
        type: "string",
      },
    ],
    name: "getApInfo",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "apBlock",
            type: "string",
          },
          {
            internalType: "string",
            name: "apCode",
            type: "string",
          },
          {
            internalType: "uint8",
            name: "numSpots",
            type: "uint8",
          },
          {
            internalType: "address[6]",
            name: "students",
            type: "address[6]",
          },
        ],
        internalType: "struct H8Coin.Apartment",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getMyInfo",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "uint16",
            name: "year",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "score",
            type: "uint16",
          },
          {
            internalType: "bool",
            name: "president",
            type: "bool",
          },
          {
            internalType: "string",
            name: "apCode",
            type: "string",
          },
        ],
        internalType: "struct H8Coin.StudentInfo",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPointsInfo",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "student",
            type: "address",
          },
          {
            internalType: "string",
            name: "initiative",
            type: "string",
          },
          {
            internalType: "uint16",
            name: "score",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "semester",
            type: "uint16",
          },
        ],
        internalType: "struct H8Coin.ScoreEntry[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "semester",
        type: "uint16",
      },
      {
        internalType: "string",
        name: "initiative",
        type: "string",
      },
    ],
    name: "getScoreEntriesForInitiative",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "student",
            type: "address",
          },
          {
            internalType: "string",
            name: "initiative",
            type: "string",
          },
          {
            internalType: "uint16",
            name: "score",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "semester",
            type: "uint16",
          },
        ],
        internalType: "struct H8Coin.ScoreEntry[]",
        name: "entries",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "getStudentScore",
    outputs: [
      {
        internalType: "uint16",
        name: "score",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "initiatives",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "address",
        name: "president",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "isCohab",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "isStudentPresident",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
    ],
    name: "kickStudent",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "listAps",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "apBlock",
            type: "string",
          },
          {
            internalType: "string",
            name: "apCode",
            type: "string",
          },
          {
            internalType: "uint8",
            name: "numSpots",
            type: "uint8",
          },
          {
            internalType: "address[6]",
            name: "students",
            type: "address[6]",
          },
        ],
        internalType: "struct H8Coin.Apartment[]",
        name: "apList",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "myInitiative",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "noAdd",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "scoreMap",
    outputs: [
      {
        internalType: "address",
        name: "student",
        type: "address",
      },
      {
        internalType: "string",
        name: "initiative",
        type: "string",
      },
      {
        internalType: "uint16",
        name: "score",
        type: "uint16",
      },
      {
        internalType: "uint16",
        name: "semester",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "studentsMap",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint16",
        name: "year",
        type: "uint16",
      },
      {
        internalType: "bool",
        name: "exists",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "president",
        type: "bool",
      },
      {
        internalType: "string",
        name: "apCode",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const web3 = new Web3(window.web3?.currentProvider);

const contract = new web3.eth.Contract(abi, address);

let account;

export const connectMetaMask = async () => {
  try {
    account = await window.ethereum.send("eth_requestAccounts");
  } catch (error) {
    if (error.code === 4001) {
      // user rejected
      return false;
    }
  }

  // try enable
  if (!account) {
    account = await window.ethereum.enable();
  }

  if (account && account.hasOwnProperty("result")) {
    account = account.result[0];
  }

  return !!account;
};

export const isCohab = async () => {
  try {
    return await contract.methods.isCohab(account).call({ from: account });
  } catch (error) {
    console.log("error in isCohab:", error);
    return false;
  }
};

export const getMyInfo = async () => {
  if (await isCohab()) {
    return {
      cohab: true,
      name: "membro da COHAB",
    };
  }

  let result;
  try {
    result = await contract.methods.getMyInfo().call({ from: account });
  } catch (error) {
    console.log("error in getMyInfo:", error);
    return null;
  }

  return {
    cohab: false,
    name: result[0],
    year: parseInt(result[1]),
    score: parseInt(result[2]),
    president: result[3],
    apCode: result[4],
  };
};

export const getPoints = async () => {
  let result;
  try {
    result = await contract.methods.getPointsInfo().call({ from: account });
  } catch (error) {
    console.log("error in getPointsInfo:", error);
    return null;
  }

  return result.map((entry) => ({
    initiative: entry.initiative,
    score: entry.score / 10,
  }));
};

export const getApts = async () => {
  let result;
  try {
    result = await contract.methods.listAps().call({ from: account });
  } catch (error) {
    console.log("error in listAps:", error);
    return null;
  }

  return result.map((entry) => ({
    apBlock: entry.apBlock,
    apCode: entry.apCode,
    numSpots: entry.numSpots,
    students: entry.students.map((s) => parseInt(s, 16)),
  }));
};

export const assignScore = async (target, semester, score) => {
  let result;
  try {
    result = await contract.methods
      .assignScore(target, semester, score)
      .send({ from: account });
  } catch (error) {
    console.log("error in assignScore:", error);
    return error;
  }

  console.log(result);
  return "OK";
};
