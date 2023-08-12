import React from "react";
import "./Sidebar.css";
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
          className='mt-10 text-lg font-bold px-12 bg-sky-600 mb-5 mr-10 hover:scale-110 transition duration-500 ease-in-out py-4 w-full rounded-full absolute bottom-0 left-0 '
          onClick={connectWallet}
          >
          Disconnect Wallet
      </button>
      </div>

  );
}

export default Sidebar;
