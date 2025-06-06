import type { ILinkContainer, IMenuLink } from "@/components/types/navbar";
import {
  Menu,
  Home,
  LogIn,
  Search,
  Library,
  History,
  Settings,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import type { FC } from "react";
import { cn } from "@/lib/utils";
import * as Typo from "@/components/typography";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/themeToggle";
import { useUsers } from "@/contexts/userContext";
import { getProfile } from "@/components/utils/fetchProfile";
import type { IProfile } from "@/components/types/profile";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuLinkState, setMenuLinkState] = useState<boolean>(false);
  const { id, handleProfile } = useUsers();
  function handleState() {
    menuLinkState ? setMenuLinkState(false) : setMenuLinkState(true);
  }
  useEffect(() => {
    if (id) {
      (async () => {
        const profile = await getProfile(id);
        handleProfile(
          profile.data.profile.id,
          profile.data.profile.username,
          profile.data.profile.email
        );
      })();
    }
  }, [id]);

  return (
    <nav className="w-full flex items-center p-5 justify-between isolate sticky left-0 top-0 bg-sidebar z-[99]">
      <Typo.H4 className="font-normal">
        Jeki<span className="font-bold">App</span>
      </Typo.H4>
      <MenuLink state={menuLinkState} onClick={handleState} />
      <div className="flex gap-3 items-center">
        <ModeToggle />
        <Menu onClick={() => handleState()} className="z-99" size={24} />
      </div>
    </nav>
  );
};

const MenuLink: FC<IMenuLink> = ({ state, onClick }) => {
  const { profile } = useUsers();
  const classes = cn(
    "transition-all",
    `absolute w-full h-screen top-0 p-5 bg-sidebar`,
    state ? "left-0" : "left-[-100%]"
  );
  return (
    <div className={classes}>
      <Typo.H4 className="font-normal">
        Jeki<span className="font-bold">App</span>
      </Typo.H4>
      <Typo.Muted className="mt-5">Pages</Typo.Muted>
      <LinkContainer>
        <Typo.LinkItem Icon={Home} url="/" onClick={onClick}>
          Home
        </Typo.LinkItem>
        <Typo.LinkItem Icon={Search} url="/search" onClick={onClick}>
          Search
        </Typo.LinkItem>
        <Typo.LinkItem Icon={Library} url="/library" onClick={onClick}>
          Library
        </Typo.LinkItem>
        <Typo.LinkItem Icon={History} url="/history" onClick={onClick}>
          History
        </Typo.LinkItem>
      </LinkContainer>
      <Typo.Muted className="mt-5 mb-3">Accounts</Typo.Muted>
      <Accounts onClick={onClick} profile={profile} />
    </div>
  );
};

const Accounts: FC<{ onClick: () => void; profile: IProfile | null }> = ({
  onClick,
  profile,
}) => {
  return (
    <>
      {profile ? (
        <div className="flex w-full bg-sidebar-accent px-5 py-2 rounded-lg items-center justify-between">
          <div className="flex flex-col">
            <Typo.H4 className="text-foreground">{profile.username}</Typo.H4>
            <Typo.Muted className="text-xs">{profile.email}</Typo.Muted>
          </div>
          <Link to="/settings" onClick={onClick}>
            <Settings className="hover:cursor-pointer" />
          </Link>
        </div>
      ) : (
        <LinkContainer>
          <Typo.LinkItem url="/login" onClick={onClick}>
            <Button>
              <LogIn />
              Log In
            </Button>
          </Typo.LinkItem>
          <Typo.LinkItem url="/register" onClick={onClick}>
            <Button variant={"outline"}>
              <LogIn />
              Sign Up
            </Button>
          </Typo.LinkItem>
        </LinkContainer>
      )}
    </>
  );
};

const LinkContainer: React.FC<ILinkContainer> = ({ children }) => {
  return <div className="flex flex-col">{children}</div>;
};
export default Navbar;
