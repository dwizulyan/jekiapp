import type { FC } from "react";
import * as Typo from "@/components/typography";
import { useTitle } from "@/components/utils/useTitle";

const History: FC = () => {
  useTitle("History");
  return (
    <div className="">
      <Typo.Muted className="px-5 pt-5">History</Typo.Muted>
      <Typo.Small className="px-5 mb-2">Latest Search</Typo.Small>
      <div className="w-full flex gap-5 items-center overflow-x-scroll px-5">
        {Array(5)
          .fill(1)
          .map(() => {
            return (
              <div className="shrink-0 h-[175px] w-[125px] bg-accent rounded-lg"></div>
            );
          })}
      </div>
    </div>
  );
};
export default History;
