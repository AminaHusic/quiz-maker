import { useNavigate } from "react-router";
import Lottie from "lottie-react";
import Button, { ButtonStyles } from "../components/Button";
import MainLayout from "../layouts/MainLayout";
import animation from "../assets/Animation - 1719155242886.json";

const Home = () => {
  const navigate = useNavigate();
  return (
    <MainLayout>
      <div className="flex justify-between items-center md:flex-row flex-col">
        <div className="flex flex-col gap-4 items-stretch justify-between basis-1/2">
          <h1 className="text-4xl text-primary-dark">
            Welcome to <br />
            <strong> Quiz Maker App</strong>
          </h1>
          <Button
            buttonStyle={ButtonStyles.mainButtonStyle}
            text="See all"
            onClick={() => navigate("/all-quizzes")}
          />
        </div>
        <Lottie animationData={animation} />
      </div>
    </MainLayout>
  );
};

export default Home;
