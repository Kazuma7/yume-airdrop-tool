import "./App.css";
import { ethers, Wallet } from "ethers";
import { useEffect, useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("body");
const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
  },

  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "350px",
    height: "480px",
    transform: "translate(-50%, -50%)",
    borderRadius: "12px",
  },
};

const PRIVATE_KEY =
  "24f51c8c4e2cd7dd75d134c8da75074782646f2b641c97be1cc46f0605293d5e";
const contractAddress = "0x103c4e61F9096D62cB803e1ED6C33ce14D4752a4";
const abi = ["function mint(address recipient) public"];
// const recipient = "0x947FFEdee7d08685Df07B87821843F8Fb51eC738";

function App() {
  const [modalIsOpen, setIsOpen] = useState(true);
  const [load, setLoad] = useState(false);
  const [profile, setProfile] = useState(false);
  const [wallet, setWallet] = useState();

  const createWallet = () => {
    const tmpWallet = ethers.Wallet.createRandom();
    setWallet(tmpWallet);
    // console.log("privateKey:" + wallet.privateKey);
    // console.log("address:" + wallet.address);
    localStorage.setItem("private_key", wallet.privateKey);
    setIsOpen(false);
  };

  const doMint = () => {
    setLoad(true);
    const provider = new ethers.providers.JsonRpcProvider(
      "https://rinkeby.infura.io/v3/9aa81ad4818244ba9cd55eeb6b032fe8"
    );
    const signer = new ethers.Wallet(PRIVATE_KEY, provider);
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const mintNFT = async () => {
      let nftTxn = await contract.mint(wallet.address);
      await nftTxn.wait();
      console.log(
        `NFT Minted! Check it out at: https://goerli.etherscan.io/tx/${nftTxn.hash}`
      );
      setLoad(false);
      // window.location = "https://tofunft.com/user/" + wallet.address;
      window.location = "https://testnets.opensea.io/" + wallet.address;
    };
    mintNFT();
  };

  //最初の案内モーダル
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  //ローディングモーダル
  const openLoad = () => {
    setLoad(true);
  };

  const closeLoad = () => {
    setLoad(false);
  };

  //プロファイルモーダル
  const openProfile = () => {
    setProfile(true);
  };

  const closeProfile = () => {
    setProfile(false);
  };

  useEffect(() => {
    if (localStorage.getItem("private_key")) {
      const tmpWallet = new ethers.Wallet(localStorage.getItem("private_key"));
      setWallet(tmpWallet);
      // console.log("privateKey:" + tmpWallet.privateKey);
      // console.log("address:" + tmpWallet.address);
      setIsOpen(false);
    }
  }, []);

  return (
    <div className="App theme-bg min-h-screen theme-text-color">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="text-center py-4 font-bold text-xl">
          コラボNFT受け取り
        </div>
        <div className="px-8">
          アクセスしてくださりありがとうございます。このページではT3限定のNFTを受け取ることができます
        </div>
        <div className=" mt-10">
          <a className="flex justify-center cursor-pointer">
            <div
              className="border rounded-full px-10 py-3 bg-green-500 text-white font-bold"
              onClick={createWallet}
            >
              初心者の方
            </div>
          </a>
          <a className="flex justify-center mt-4 cursor-pointer">
            <div className="border-2 rounded-full px-10 py-3 border-green-500 bg-white text-green-500 font-bold">
              経験者の方
            </div>
          </a>
        </div>
      </Modal>
      <Modal isOpen={load} onRequestClose={closeLoad} style={customStyles}>
        <div>
          <div className="font-bold text-center pt-4 text-theme-100 text-2xl">
            送信中...
          </div>
          <div className="flex justify-center mt-20">
            <div className="animate-spin h-24 w-24 border-4 border-red-600 rounded-full border-t-transparent"></div>
          </div>
          <div className="pt-6"></div>
        </div>
      </Modal>
      <Modal
        isOpen={profile}
        onRequestClose={closeProfile}
        style={customStyles}
      >
        <div>
          <div className="font-bold text-center pt-4 text-theme-100 text-xl">
            アドレス
          </div>
          <div className="text-center mt-6">
            <div className="font-bold text-sm mb-2">ウォレットアドレス</div>
            <div className="break-words text-sm text-left">
              {wallet?.address}
            </div>
          </div>
          <div className="text-center mt-6">
            <div className="font-bold text-sm mb-2">秘密鍵</div>
            <div className="break-words text-sm text-left">
              {wallet?.privateKey}
            </div>
          </div>
          <div className="text-center mt-6">
            <div className="font-bold text-sm mb-2">公開鍵</div>
            <div className="break-words text-sm text-left">
              {wallet?.publicKey}
            </div>
          </div>
          <div className="text-center mt-10 theme-text-sub-color font-bold">
            絶対に他の人に教えないでください
          </div>
        </div>
      </Modal>
      <div className="">
        <div className="flex justify-between py-6 font-bold text-left px-10 bg-white">
          <div>NFT配布サービス</div>
          <div
            className="theme-text-sub-color cursor-pointer"
            onClick={openProfile}
          >
            アドレスの確認
          </div>
        </div>
        <div className="theme-card-bg rounded-xl mt-24 max-w-[360px] mx-auto">
          <div className="text-2xl font-bold pt-10">T3限定NFT</div>
          <div className="font-bold">作品タイトル</div>
          <div className="flex justify-center mt-8">
            <div className=" h-32 w-48">
              <img src=" ./sample.jpeg" layout="fill" />
            </div>
          </div>
          <div className="px-10 text-left mt-12 pb-12 text-sm">
            花や植物を正確に、かつ細密に描き、それまでの植物画とはまったく異なる美しい作品を世に送り出したのが、彼ルドゥーテでした。革命の嵐が吹き荒れる激動期のパリに生きたその生涯をたどる
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <a
          className="border rounded-full px-10 py-4 bg-green-500 text-white font-bold mt-16 cursor-pointer"
          onClick={doMint}
        >
          限定NFTを受け取る
        </a>
      </div>
    </div>
  );
}
export default App;
