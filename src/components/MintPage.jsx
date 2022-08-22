const MintPage = ({ doMint }) => {
  return (
    <div>
      <div className="theme-card-bg rounded-xl mt-24 max-w-[360px] mx-auto">
        <div className="text-2xl font-bold pt-10">限定NFT</div>
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
};

export default MintPage;
