import React, { useState , useEffect } from "react";
import "./TweetBox.css";
import Avatar from 'avataaars';
import { generateRandomAvatarOptions } from './avatar';
import { Button } from "@material-ui/core";
//import axios from 'axios';
import { TwitterContractAddress } from './config.js';
import { TwitterContractAddressMode } from './config.js';
import { TwitterContractAddressZora } from './config.js';
import { TwitterContractAddressBase } from './config.js';
import {ethers} from 'ethers';
import Twitter from './utils/TwitterContract.json'
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import Web3Modal from "web3modal";

function TweetBox() {
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");
  const [avatarOptions, setAvatarOptions] = useState("");

  const addTweet = async () => {
    let tweet = {
      'tweetText': tweetMessage,
      'isDeleted': false
    };

    try {
      const {ethereum} = window

      if(ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const TwitterContract = new ethers.Contract(
          TwitterContractAddress,
          Twitter.abi,
          signer
        )

        let twitterTx = await TwitterContract.addTweet(tweet.tweetText, tweet.isDeleted);

        console.log(twitterTx);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch(error) {
      console.log("Error submitting new Tweet", error);
    }
  }

  const addAttestation = async () => {
    let tweet = {
      'tweetText': tweetMessage,
      'isDeleted': false
    };

        // Attestation Contract OP Goerli
        const EASContractAddress = "0x4200000000000000000000000000000000000021";
    
        // Schema Registry Contract OP Goerli
        // const schemaContractAddress = "0x4200000000000000000000000000000000000020";
        
        const eas = new EAS(EASContractAddress);
        console.log("eas is", eas)
    
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        console.log("connected adddress is", account);
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        console.log("signer is", signer)
        eas.connect(signer);

          // Initialize SchemaEncoder with the schema string
    const schemaEncoder = new SchemaEncoder("string username, string tweet, string image_url");
    console.log("tweet message", tweetMessage)
    console.log("tweet message", tweetImage)
    console.log("wallet address", account)
    const encodedData = schemaEncoder.encodeData([
      { name: "username", value: {account}, type: "string" },
      { name: "tweet", value: {tweetMessage}, type: "string" },
      { name: "image_url", value: {tweetImage}, type: "string" },
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
    setTweetMessage("");
    setTweetImage("");

  }

  const sendTweet = (e) => {
    e.preventDefault();

    addTweet();
    addAttestation();

    //setTweetMessage("");
    //setTweetImage("");
  };

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    let avatar = generateRandomAvatarOptions();
    setAvatarOptions(avatar);
  }, []);

  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox__input">
          <Avatar
            style={{ width: '100px', height: '100px' }}
            avatarStyle='Circle'
            {...avatarOptions }
          />
          <input
            onChange={(e) => setTweetMessage(e.target.value)}
            value={tweetMessage}
            placeholder="What's happening?"
            type="text"
          />

        </div>
        <input
          value={tweetImage}
          onChange={(e) => setTweetImage(e.target.value)}
          className="tweetBox__imageInput"
          placeholder="Optional: Enter image URL"
          type="text"
        />

        <Button
          onClick={sendTweet}
          type="submit"
          className="tweetBox__tweetButton"
        >
          Tweet
        </Button>
      </form>
    </div>
  );
}

export default TweetBox;
