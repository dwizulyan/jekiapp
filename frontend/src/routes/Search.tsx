import React, { useEffect, useState, type ChangeEvent, type FC } from "react";
import * as typo from "@/components/typography";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { IImage } from "@/components/types/image";
import { useTitle } from "@/components/utils/useTitle";
import { useUsers } from "@/contexts/userContext";
import { Oval } from "react-loader-spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import type { IDisplaySearch } from "@/components/types/search";

const SearchPage: FC = () => {
  useTitle("Search");
  const { setError } = useUsers();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [images, setImages] = useState<IImage[]>([]);
  const [offset, setOffset] = useState<number>(10);
  const [tags, setTags] = useState<string>("");

  const handleTags = (e: React.ChangeEvent<HTMLInputElement>) => {
    const processed = e.target.value.replaceAll(" ", "+");
    setTags(processed);
  };

  async function getMoreImages() {
    try {
      const url = `http://${
        import.meta.env.VITE_IP_SERVER
      }:3000/image/get-by-tags?tags=${tags}&offset=${offset}`;
      const getMore = await fetch(url);
      if (!getMore.ok) {
        setError("Error while fetching data");
        return;
      }
      const res = await getMore.json();
      if (res.data.length === 0) {
        setHasMore(false);
        return;
      }
      setImages((prev) => [...prev, ...res.data]);
      setOffset((prev) => prev + 10);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown Error");
    }
  }

  useEffect(() => {
    images.length > 0 ? console.log(images) : "No images yet";
  }, [images]);
  return (
    <div className="">
      <typo.Muted className="px-5 bg-sidebar">Search Something</typo.Muted>
      <SearchBox
        handleTags={handleTags}
        tags={tags}
        setImages={setImages}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
      />
      <div className="p-5">
        {images.length > 0 ? (
          <DisplaySearch
            images={images}
            dataLength={images.length}
            next={getMoreImages}
            hasMore={hasMore}
          />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};
async function handleSearch(
  setImages: React.Dispatch<React.SetStateAction<IImage[]>>,
  tags: string,
  setError: (error: string) => void
) {
  const url = `http://${
    import.meta.env.VITE_IP_SERVER
  }:3000/image/get-by-tags?tags=${tags}&offset=0&limit=10`;
  try {
    const getImage = await fetch(url);
    if (!getImage) {
      throw new Error("Error while fetching");
    }
    const result = await getImage.json();
    if (!result.success) {
      setError(result.message.split(":")[1]);
    }
    setImages(result.data);
  } catch (err) {
    setError(err instanceof Error ? err.message : "unknown error");
  }
}

const SearchBox: FC<{
  handleTags: (e: ChangeEvent<HTMLInputElement>) => void;
  tags: string;
  setImages: React.Dispatch<React.SetStateAction<IImage[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}> = ({ handleTags, setImages, tags, setIsLoading, isLoading }) => {
  const { setError } = useUsers();
  return (
    <form className="sticky left-1 top-18 w-full bg-sidebar p-5">
      <div className="flex gap-3">
        <Input
          autoCapitalize="off"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleTags(e);
          }}
        />
        {isLoading ? (
          <Button>
            <Oval
              visible={true}
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </Button>
        ) : (
          <Button
            onClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              setIsLoading(true);
              try {
                await handleSearch(setImages, tags, setError);
              } catch (err) {
                setError(err instanceof Error ? err.message : "Unknown Error");
              } finally {
                setIsLoading(false);
              }
            }}
          >
            <Search />
          </Button>
        )}
      </div>
    </form>
  );
};

const DisplaySearch: FC<IDisplaySearch> = ({
  next,
  hasMore,
  dataLength,
  images,
}) => {
  return (
    <div className="">
      <InfiniteScroll
        dataLength={dataLength}
        hasMore={hasMore}
        next={next}
        loader={<Loader />}
        endMessage={<EndWord />}
        className="flex flex-col gap-5"
      >
        <>
          {images
            ? images.map((image) => {
                return (
                  <img
                    className="w-full rounded-lg"
                    key={image.id}
                    src={image.file_url}
                    alt={image.tags}
                  />
                );
              })
            : ""}
        </>
      </InfiniteScroll>
    </div>
  );
};
const EndWord: FC = () => {
  return (
    <div className="flex items-center justify-center py-5">End of Images</div>
  );
};

const Loader: FC = () => {
  return (
    <div className="w-full flex items-center justify-center py-5">
      <Oval
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default SearchPage;
