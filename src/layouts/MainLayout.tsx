import { JsxElement } from "typescript";
import Header from "../components/Header";

const MainLayout = ({ children }: { children: JSX.Element }) => {
  return (
    <div className="w-full bg-transparent">
      <Header />
      <div className="w-4/5 max-w-[1440px] mx-auto py-8">{children}</div>
    </div>
  );
};
export default MainLayout;
