//import { useAuth } from '../../lib/context/auth-context.tsx';
//import { NextImage } from '../../components/ui/next-image.tsx';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { CustomIcon } from '../../components/ui/custom-icon.tsx';
import { Button } from '../../components/ui/button.tsx';
import Sidebar from "../../Sidebar";
import Feed from "../../Feed";
import Widgets from "../../Widgets";

export function LoginMain(): JSX.Element {
  const navigate = useNavigate();
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

      if (chainId !== blockChainId) {
        alert('You are not connected to the Optimism Testnet!')
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

    if (chainId !== blockChainId) {
      setCorrectNetwork(false)
    } else {
      setCorrectNetwork(true)
    }
  }

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    connectWallet();
    checkCorrectNetwork();
  });

  function openThread() {
    navigate('/Thread');
  }

  return (
    <main className='grid lg:grid-cols-[1fr,45vw]'>
      <div className='relative hidden items-center justify-center  lg:flex'>
        <img
          //imgClassName='object-cover'
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
     
        <div className='flex max-w-xs flex-col gap-4 font-twitter-chirp-extended lg:max-w-none lg:gap-16'>
          <h1
            className='text-3xl before:content-["See_what’s_happening_in_the_world_right_now."] 
                       lg:text-6xl lg:before:content-["Events_Happening_now"]'
          />
           
          <h2 className='hidden text-xl lg:block lg:text-3xl'>
            Join EventEAS today.
          </h2>
        </div>


        <div className='flex max-w-xs flex-col gap-6 [&_button]:py-2'>


 
        <div>
          {currentAccount === '' ? (
          <>            
          <button
          className='text-2xl font-bold py-3 px-12 bg-[#f1c232] rounded-lg mb-10 hover:scale-105 transition duration-500 ease-in-out'
          onClick={connectWallet}
          >
          Connect Wallet
          </button>
          </>
          ) : correctNetwork ? (
            <div className="app">
                        {<Navigate to="/Thread" />}
          

          {/**

            <openThread />
          <Sidebar />
          <Feed />
          <Widgets />
           */}
      </div>
      ) : (
      <div className='flex flex-col justify-center items-center mb-20 font-bold text-2xl gap-y-3'>
      <div>----------------------------------------</div>
      <div>Please connect to the Optimism Testnet</div>
      <div>and reload the page</div>
      <div>----------------------------------------</div>
      </div>
      )}
      </div>
































          <div className='flex flex-col gap-3'>
            <p className='font-bold'>Already have an account? </p>
            <Button
              className='border border-light-line-reply font-bold text-accent-blue hover:bg-accent-blue/10
                         focus-visible:bg-accent-blue/10 focus-visible:!ring-accent-blue/80 active:bg-accent-blue/20
                         dark:border-light-secondary'
              //onClick={connectWallet()}
            >
              Sign in with Google 
            </Button>

            <Button
              className=' bg-accent-blue bg-blue-500 text-white transition hover:brightness-90
                         focus-visible:!ring-accent-blue/80 focus-visible:brightness-90 active:brightness-75'
              //onClick={connectWallet()}
            >
              Sign in with Metamask
            </Button>
          </div>
        </div>
       
      </div>
    </main>
  );
}
