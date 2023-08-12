import React from "react";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Widgets from "./Widgets";
import "./App.css";
import { useState, useEffect } from "react";
import { LoginMain } from './components/login/login-main.tsx';
import { LoginFooter } from './components/login/login-footer.tsx';
import { CustomIcon } from './components/ui/custom-icon.tsx';
import { Button } from './components/ui/button.tsx';

function App() {

  const [currentAccount, setCurrentAccount] = useState('');
  const [correctNetwork, setCorrectNetwork] = useState(false);

  // Calls Metamask to connect wallet on clicking Connect Wallet button
  const connectWallet = async () => {
    try {
      const { ethereum } = window

      if (!ethereum) {
        console.log('Metamask not detected')
        return
      }
      let chainId = await ethereum.request({ method: 'eth_chainId'})
      console.log('Connected to chain:' + chainId)

      const blockChainId = '0x1a4'
      const blockChainIdMode = '0x397'

      if (chainId !== blockChainIdMode) {
        alert('You are not connected to the Rinkeby Testnet!')
        return
      }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })

      console.log('Found account', accounts[0])
      setCurrentAccount(accounts[0])
    } catch (error) {
      console.log('Error connecting to metamask', error)
    }
  }

  // Checks if wallet is connected to the correct network
  const checkCorrectNetwork = async () => {
    const { ethereum } = window
    let chainId = await ethereum.request({ method: 'eth_chainId' })
    console.log('Connected to chain:' + chainId)

    const blockChainId = '0x1a4'
    const blockChainIdMode = '0x397'

    if (chainId !== blockChainIdMode) {
      setCorrectNetwork(false)
      console.log('Error - Connected to the wrong chain, Connect to optimism Testnet',)
      alert('Wrong Network - Please connect to Optimism Testnet!')
    } else {
      setCorrectNetwork(true)
    }
  }

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    //connectWallet();
    checkCorrectNetwork();
  });

  return (
    <>
    <div className=''>
      {currentAccount === '' ? (
        <main className='grid lg:grid-cols-[1fr,45vw] min-h-screen'>
          <div className='relative hidden items-center justify-center  lg:flex'>
            <img
              className='object-cover h-full'
              //blurClassName='bg-accent-blue'
              src='/assets/twitter-banner.png'
              alt='Twitter banner'
              layout='fill'
              //useSkeleton
            />
            <i className='absolute'>
              <CustomIcon className='h-96 w-96 text-white' 
              iconName='TwitterIcon' 
              />      
            </i>
          </div>


          <div className='flex flex-col items-center justify-between gap-6 p-8 lg:items-start   lg:justify-center'>
      
        <i className='mb-0 self-center lg:mb-10 lg:self-auto'>
        <CustomIcon
          className='-mt-4 h-6 w-6 text-accent-blue lg:h-12 lg:w-12 dark:lg:text-twitter-icon'
          iconName='TwitterIcon'
        />
        </i>
   
        <div className='flex font-extrabold max-w-xs flex-col gap-4 font-twitter-chirp-extended lg:max-w-none lg:gap-16'>
        <h1
          className='text-center text-3xl before:content-["See_what’s_happening_in_the_world_right_now."] 
                     lg:text-6xl lg:before:content-["Events_Happening_now"]'
        />
         
        <h2 className='hidden text-xl lg:block lg:text-3xl'>
          Join EventEAS thread today.
        </h2>

        <button
          className='text-3xl font-bold px-12 bg-sky-600 mb-10 hover:scale-110 transition duration-500 ease-in-out py-7 rounded-full'
          onClick={connectWallet}
          >
          Connect Wallet
          </button>

          <button
          className='text-3xl font-bold px-12 border-4 border-sky-600 mb-10 hover:scale-110 transition duration-500 ease-in-out py-7 rounded-full'
          onClick={connectWallet}
          >
          Verify with World ID
          </button>

        </div>
        </div>

         
      </main>
      ) : correctNetwork ? (
        <div className="app">
          <Sidebar />
          <Feed />
          <Widgets />
        </div>
      ) : (
      <div className='flex flex-col justify-center items-center mb-20 font-bold text-2xl gap-y-3'>
      <div>----------------------------------------</div>
      <div>Please connect to the Optimism Testnet</div>
      <div>and reload the page</div>
      <div>----------------------------------------</div>
      </div>
      )}
    
      <LoginFooter />
    </div>
    </>
  );
}

export default App;
