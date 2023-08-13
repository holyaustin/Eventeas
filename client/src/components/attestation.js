import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import {ethers} from 'ethers';

async function Attestation() {
// Attestation Contract OP Goerli
const EASContractAddress = "0x4200000000000000000000000000000000000021";

// Schema Registry Contract OP Goerli
// const schemaContractAddress = "0x4200000000000000000000000000000000000020";

const eas = new EAS(EASContractAddress);
const web3Modal = new Web3Modal();
const connection = await web3Modal.connect();
const provider = new ethers.providers.Web3Provider(connection);
const signer = provider.getSigner();

eas.connect(signer);

/**
const {ethereum} = window

if(ethereum) {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  eas.connect(signer);
} else {
  console.log("Ethereum object doesn't exist!");
}
 */

  // Initialize SchemaEncoder with the schema string
  const schemaEncoder = new SchemaEncoder("address username, string tweet, string image_url");
  const encodedData = schemaEncoder.encodeData([
    { name: "username", value: "0xa6D6f4556B022c0C7051d62E071c0ACecE5a1228", type: "address" },
    { name: "tweet", value: "Testing EAS", type: "string" },
    { name: "image_url", value: 1, type: "string" },
  ]);
  console.log (encodedData)

  const schemaUID = "0x4a97c3aa0da89370da3a4db71c479f0144ebc7534deffd63fd3a7509193c5374";
  
  const tx = await eas.attest({
    schema: schemaUID,
    data: {
      recipient: "0xab2E06a5dd2f751Df0d2D2448788D8cBd06ac149",
      expirationTime: 0,
      revocable: true, // Be aware that if your schema is not revocable, this MUST be false
      data: encodedData,
    },
  });
  
  const newAttestationUID = await tx.wait();
  
  console.log("New attestation UID:", newAttestationUID);
  }
}
export default Attestation;