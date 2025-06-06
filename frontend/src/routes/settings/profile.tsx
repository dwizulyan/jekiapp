import type { FC } from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import * as typo from "@/components/typography";
import type { ICustomCard } from "@/components/types/profile";
import { SquarePen, Check } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Profile: FC = () => {
  return (
    <div className="flex p-5 flex-col gap-3 justify-start">
      <typo.H3>Profile</typo.H3>
      <CustomCard label="Username" value="JekiTheRight" />
      <Separator className="my-1" />
      <CustomCard label="Email" value="jekitheright@gmail.com" />
    </div>
  );
};

const CustomCard: FC<ICustomCard> = ({ className, value, label }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  function handleIsEdit() {
    setIsEdit((isEdit) => !isEdit);
  }
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <div className="flex flex-col">
        <typo.Muted>{label}</typo.Muted>
        <div>
          {isEdit ? (
            <div className={cn("flex items-center gap-2")}>
              <Input value={value} placeholder={value} />
              <Button>
                <Check />
              </Button>
            </div>
          ) : (
            <typo.P className="px-3 py-1">{value}</typo.P>
          )}
        </div>
      </div>
      <SquarePen size={18} onClick={handleIsEdit} />
    </div>
  );
};

export default Profile;
