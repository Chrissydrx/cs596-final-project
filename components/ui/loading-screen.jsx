import { RotatingSquare } from "react-loader-spinner";

function LoadingScreen({ visible }) {
  if (!visible) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 bg-white bg-opacity-90 flex items-center justify-center">
      <RotatingSquare
        visible={true}
        height="200"
        width="200"
        color="#000"
        ariaLabel="rotating-square-loading"
      />
    </div>
  );
}

export default LoadingScreen;
