import type { FC, MouseEvent } from "react";
import * as typo from "@/components/typography";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, FolderPen, Images } from "lucide-react";
import { useUsers } from "@/contexts/userContext";
import { Button } from "@/components/ui/button";
import { logoutHandler } from "@/components/utils/logout";

const Settings: FC = () => {
  const { profile, removeId } = useUsers();
  return (
    <div className="w-full p-5 relative min-h-screen">
      <typo.Muted>Profile</typo.Muted>
      <typo.LinkItem className="w-full p-0 mt-3" url="profile">
        <div className="w-full flex items-center justify-between">
          {profile ? (
            <div className="">
              <typo.H2>{profile.username}</typo.H2>
              <typo.Muted>{profile.email}</typo.Muted>
            </div>
          ) : (
            <Button>Login</Button>
          )}
          <ChevronRight />
        </div>
      </typo.LinkItem>
      <Separator className="my-4" />
      <typo.Muted>Preference</typo.Muted>
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-2">
          <FolderPen size={16} />
          <div>
            <typo.Small className="text-sm">
              Change Download Location
            </typo.Small>
            <typo.Muted className="text-xs">
              storage/0/emulated/downloads/jekiapp
            </typo.Muted>
          </div>
        </div>
        <ChevronRight />
      </div>
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-2">
          <Images size={16} />
          <div>
            <typo.Small className="text-sm">Source Images</typo.Small>
            <typo.Muted className="text-xs">Rule34.xxx</typo.Muted>
          </div>
        </div>
        <ChevronRight />
      </div>
      <Separator className="my-4" />
      <typo.Muted>Others</typo.Muted>
      <div className="mt-3"></div>
      <Button
        onClick={async (e: MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();
          const logout = await logoutHandler();
          if (logout) {
            removeId();
            window.location.href = "/";
          }
        }}
        className="bg-red-400"
      >
        Logout
      </Button>
    </div>
  );
};

export default Settings;
