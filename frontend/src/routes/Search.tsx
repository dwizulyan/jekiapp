import React, { useState, type ChangeEvent, type FC } from "react";
import * as typo from "@/components/typography";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { IImage } from "@/components/types/image";

const SearchPage: FC = () => {
  const [images, setImages] = useState<IImage[]>([]);
  const [tags, setTags] = useState<string>("");
  const handleTags = (e: React.ChangeEvent<HTMLInputElement>) => {
    const processed = e.target.value.replaceAll(" ", "+");
    setTags(processed);
    console.log(processed);
  };
  return (
    <div className="p-5">
      <typo.Muted className="mb-2">Search Something</typo.Muted>
      <SearchBox handleTags={handleTags} tags={tags} setImages={setImages} />
    </div>
  );
};
async function handleSearch(
  setImages: React.Dispatch<React.SetStateAction<IImage[]>>,
  tags: string
) {
  const url = `http://${
    import.meta.env.VITE_IP_SERVER
  }:3000/image/get-by-tags?tags=${tags}`;
  try {
    const getImage = await fetch(url);
    if (!getImage) {
      throw new Error("Error while fetching");
    }
    const result = await getImage.json();
    console.log(result.data);
    setImages(result.data);
  } catch (err) {
    console.log(err instanceof Error ? err.message : "unknown error");
  }
}

const SearchBox: FC<{
  handleTags: (e: ChangeEvent<HTMLInputElement>) => void;
  tags: string;
  setImages: React.Dispatch<React.SetStateAction<IImage[]>>;
}> = ({ handleTags, setImages, tags }) => {
  return (
    <form className="sticky left-1 top-20 w-full">
      <div className="flex gap-3">
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleTags(e);
          }}
        />
        <Button
          onClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            await handleSearch(setImages, tags);
          }}
        >
          <Search />
        </Button>
      </div>
    </form>
  );
};

export default SearchPage;
