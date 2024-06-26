import logo from "../logo_3.png";
import fullLogo from "../full_logo.png";
import { FaUser } from "react-icons/fa";
import { GiSwordSpade } from "react-icons/gi";
import { TbShoppingCartFilled } from "react-icons/tb";
import { BsChatLeftTextFill } from "react-icons/bs";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

function Navbar() {
  const [connected, toggleConnect] = useState(false);
  const location = useLocation();
  const [currAddress, updateAddress] = useState("0x");

  async function getAddress() {
    const ethers = require("ethers");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    updateAddress(addr);
  }

  function updateButton() {
    const ethereumButton = document.querySelector(".enableEthereumButton");
    ethereumButton.textContent = "Connected";
    ethereumButton.classList.remove("hover:bg-blue-70");
    ethereumButton.classList.remove("bg-blue-500");
    ethereumButton.classList.add("hover:bg-green-70");
    ethereumButton.classList.add("bg-green-500");
  }

  async function connectWebsite() {
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    if (chainId !== "0x13881") {
      //alert('Incorrect network! Switch your metamask network to Rinkeby');
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x13881" }],
      });
    }
    await window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then(() => {
        updateButton();
        console.log("here");
        getAddress();
        window.location.replace(location.pathname);
      });
  }

  useEffect(() => {
    if (window.ethereum == undefined) return;
    let val = window.ethereum.isConnected();
    if (val) {
      console.log("here");
      getAddress();
      toggleConnect(val);
      updateButton();
    }

    window.ethereum.on("accountsChanged", function (accounts) {
      window.location.replace(location.pathname);
    });
  });

  return (
    <div className="">
      <nav className="w-screen">
        <ul className="flex items-end justify-between py-3 bg-transparent text-white pr-5">
          <li className="flex items-end ml-5 pb-2">
            <Link to="/">
              
            <div className="inline-block font-bold  text-3xl ml-2 text-white bg-gradient-to-r  px-4 py-2 rounded-lg shadow-lg font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
  CRYPTO CANVAS
</div>

            </Link>
          </li>
          <li className="w-2/6">
            <ul className="lg:flex justify-between font-bold mr-10 text-lg">
              {location.pathname === "/" ? (
                <li className="hover:pb-0 p-2  bg-black rounded-3xl px-3 bg-opacity-40">
                  <Link to="/">Marketplace
                         <TbShoppingCartFilled /></Link>
                </li>
              ) : (
                <li className="hover:border-b-2 hover:border-green-500 hover:pb-0 p-2">
                  <Link to="/">Marketplace
                         <TbShoppingCartFilled /></Link>
                </li>
              )}
              <li className=" hover:border-b-2 hover:border-green-500 hover:pb-0 p-2">
                All Chats
                <BsChatLeftTextFill />
              </li>
              {location.pathname === "/sellNFT" ? (
               <li className="hover:border-b-2 hover:border-green-500 hover:pb-0 p-2 flex flex-col items-center">
               <Link to="/sellNFT" className="flex flex-col items-center">
                 <span>Mint</span>
                 <GiSwordSpade />
               </Link>
             </li>
             
              ) : (
                <li className="hover:border-b-2 hover:border-green-500 hover:pb-0 p-2 flex flex-col items-center">
  <Link to="/sellNFT" className="flex flex-col items-center">
    <span>Mint</span>
    <GiSwordSpade />
  </Link>
</li>

              )}
              {location.pathname === "/profile" ? (
                <li className=" hover:pb-0 p-2  bg-black rounded-3xl px-3 bg-opacity-40 justify-center  ">
                  <Link to="/profile">  Profile<FaUser /></Link>
                </li>
              ) : (
                <li className="hover:border-b-2 hover:border-green-500 hover:pb-0 p-2 top-2 justify-center">
                  <Link to="/profile"> Profile<FaUser mt-2 /></Link>
                </li>
              )}
              <li>
                {connected ? (
                  <button
                    className="rounded-full enableEthereumButton bg-green-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded text-sm mt-3"
                    onClick={connectWebsite}
                  >
                    Connected
                  </button>
                ) : (
                  <button
                    className=" rounded-full enableEthereumButton bg-green-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-sm mt-3"
                    onClick={connectWebsite}
                  >
                    Connect Wallet
                  </button>
                )}
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;