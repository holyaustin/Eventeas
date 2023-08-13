import React from "react";
import "./Sidebar.css";
//import  Attestation  from"./components/attestation";
import TwitterIcon from "@material-ui/icons/Twitter";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Button } from "@material-ui/core";
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import {ethers} from 'ethers';
import Web3Modal from "web3modal";

function Sidebar() {
  const connectWallet = async () => {
    try {
      const { ethereum } = window

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })

      console.log('Found account', accounts[0])
      // setCurrentAccount(accounts[0])
      await window.ethereum.request({
        method: "eth_requestAccounts",
        params: [{eth_accounts: {}}]
    })
    console.log('Disconnect account')

    } catch (error) {
      console.log('Error connecting to metamask', error)
    }
  }


  async function Attestation() {
    // Attestation Contract OP Goerli
    const EASContractAddress = "0x4200000000000000000000000000000000000021";
    
    // Schema Registry Contract OP Goerli
    // const schemaContractAddress = "0x4200000000000000000000000000000000000020";
    
    const eas = new EAS(EASContractAddress);
    console.log("eas is", eas)

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    console.log("signer is", signer)
      eas.connect(signer);
     
    
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

  return (
    <div className="sidebar relative">
      <TwitterIcon className="sidebar__twitterIcon" />

      <SidebarOption Icon={HomeIcon} text="Home" />
      <SidebarOption Icon={SearchIcon} text="Explore" />
      <SidebarOption Icon={NotificationsNoneIcon} text="Notifications" />
      <SidebarOption Icon={MailOutlineIcon} text="Messages" />
      <SidebarOption Icon={BookmarkBorderIcon} text="Bookmarks" />
      <SidebarOption Icon={ListAltIcon} text="Lists"/>
      <SidebarOption Icon={PermIdentityIcon} text="Profile"/>
      <SidebarOption Icon={MoreHorizIcon} text="More" />

      {/* Button -> Tweet */}
      <Button variant="outlined" className="sidebar__tweet" fullWidth>
        Tweet
      </Button>
      <button
          className='mt-10 text-lg font-bold px-12 bg-sky-600 mb-5 mr-10 hover:scale-110 transition duration-500 ease-in-out py-4 rounded-full w-full'
          onClick={Attestation}
          >
          Attest
      </button>

      <button
          className='mt-10 text-lg font-bold px-12 bg-sky-600 mb-5 mr-10 hover:scale-110 transition duration-500 ease-in-out py-4 w-full rounded-full absolute bottom-0 left-0 '
          onClick={''}
          >
          Disconnect Wallet
      </button>
      </div>

  );
}

export default Sidebar;
