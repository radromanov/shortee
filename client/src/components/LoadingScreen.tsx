import { PuffLoader } from "react-spinners";

const LoadingScreen = () => {
  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center">
      <PuffLoader color="#ce36d6" speedMultiplier={0.5} />
    </div>
  );
};

export default LoadingScreen;
