import type { FC } from "react";
import * as Typo from "@/components/typography";
import { useTitle } from "@/components/utils/useTitle";

const Library: FC = () => {
  useTitle("Library");
  return (
    <div className="w-full p-5">
      <Typo.Muted>Library</Typo.Muted>
    </div>
  );
};

export default Library;
