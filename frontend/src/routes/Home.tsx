import type { FC } from "react";
import * as typo from "@/components/typography";
import type { IMenuCard } from "@/components/types/menu";
import { cn } from "@/lib/utils";
import { Library, Search, History, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { useUsers } from "@/contexts/userContext";

const Home: FC = () => {
  const { profile } = useUsers();
  return (
    <div className="w-full h-screen p-5 flex-col gap-3 flex">
      {profile ? (
        <typo.Large>Welcome {profile.username}!!</typo.Large>
      ) : (
        <typo.Large>
          Welcome Guests!, click here to{" "}
          <Link to="/login" className="underline">
            Login
          </Link>{" "}
          or{" "}
          <Link to="/register" className="underline">
            Sign Up
          </Link>
        </typo.Large>
      )}
      <MenuContainer />
    </div>
  );
};

const MenuCard: FC<IMenuCard> = ({ url, className, Icon, title }) => {
  return (
    <Link to={url}>
      <div
        className={cn(
          "rounded-md px-5 py-2 bg-accent flex items-center gap-2",
          className
        )}
      >
        <Icon size={16} />
        {title}
      </div>
    </Link>
  );
};
const MenuContainer = () => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <MenuCard Icon={Library} title="Library" url="library" />
      <MenuCard Icon={Search} title="Search" url="search" />
      <MenuCard Icon={History} title="History" url="history" />
      <MenuCard Icon={Settings} title="Settings" url="settings" />
    </div>
  );
};
export default Home;
