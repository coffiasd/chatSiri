import { FaOctopusDeploy, FaRobot } from "react-icons/fa";
import {
    useConnectModal,
    useAccountModal,
    useChainModal,
} from '@rainbow-me/rainbowkit';
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi';
import { useEffect, useState } from "react";
import { FaShoppingCart, FaListUl, FaFaucet } from "react-icons/fa";
import { useRouter } from 'next/router';
import Link from 'next/link'

export default function Sidebar() {

    const { openConnectModal } = useConnectModal();
    const { openAccountModal } = useAccountModal();
    const { openChainModal } = useChainModal();
    const { address, isConnected, isDisconnected } = useAccount();
    const [tab, setTab] = useState(false);
    const { switchNetwork } = useSwitchNetwork()
    const { chain } = useNetwork();

    const [login, setLogin] = useState(false);
    const router = useRouter();

    useEffect(() => {
        console.log(isConnected);
        // if (isConnected) {
        //     setLogin(true);
        // }else{
        //     setLogin(false);
        // }
        setTab(router.asPath);
    }, [isConnected])

    return (
        <aside className="absolute flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700 top-0 left-0 lg:flex md:hidden">
            <Link href="/">
                <a className='ml-5 in-line flex items-center' >
                    <FaOctopusDeploy className='text-success' size="1.5rem" />
                    <span className="ml-5">Jarvis</span>
                </a>
            </Link>


            <div className="flex flex-col justify-between flex-1 mt-6">
                <nav>
                    <Link href="#">
                        <a className={`flex items-center px-4 py-2 text-gray-700 ${tab == '/chat' ? 'bg-gray-100' : ''} rounded-md  dark:text-gray-200`}>
                            <FaRobot size="1rem" />
                            <span className="mx-4 font-medium">Chat</span>
                        </a>
                    </Link>

                </nav>

                <div className=''>

                    {isConnected &&
                        (<><button className="btn btn-sm btn-info ml-3 normal-case" onClick={openAccountModal}>Profile</button><button className="btn btn-sm btn-error ml-3 normal-case " onClick={openChainModal}>Chain</button></>)

                    }

                    {isDisconnected && <button className="btn btn-sm btn-error ml-3 normal-case" onClick={openConnectModal}>connect wallet</button>}
                </div>
            </div>
        </aside>
    )
}