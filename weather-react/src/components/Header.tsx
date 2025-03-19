import Button from "./Button";
import Logo from "./Logo";
import Clock from "./Clock";
import { formatDate } from "@/lib/utils";
import { Loader2, Search } from "lucide-react";
import { Drawer } from "vaul";
import Input from "./Input";
import { useEffect, useState } from "react";
import { fetchCordByName } from "@/services/api";
import useFetch from "@/services/useFetch";

const Header = ({
  isSearchOpen,
  setIsSearchOpen,
  setLongitude,
  setLatitude,
}: {
  isSearchOpen: boolean;
  setIsSearchOpen: (value: boolean) => void;
  setLongitude: (value: number) => void;
  setLatitude: (value: number) => void;
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isInitial, setIsInitial] = useState(true);

  const {
    data: searchData,
    loading: searchLoading,
    refetch: fetchSearchResults,
    reset: resetSearchResults,
  } = useFetch(() => fetchCordByName(searchQuery), false);

  const day = formatDate(new Date());

  const today = new Date();
  const isToday =
    today.getDay() + today.getMonth() + today.getFullYear() ===
    new Date().getDay() + new Date().getMonth() + new Date().getFullYear();

  const reset = () => {
    setSearchQuery("");
    setIsInitial(true);
    setIsSearchOpen(false);
  };

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        setIsInitial(false);
        await fetchSearchResults();
      } else {
        resetSearchResults();
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <header>
      <Logo />

      <div className="relative mt-4 flex items-center justify-between">
        <div>
          <Clock className="text-lg font-semibold" />

          <p className="text-lg font-semibold">
            {isToday && "Today - "}
            {day}
          </p>
        </div>

        <Drawer.Root open={isSearchOpen} onOpenChange={setIsSearchOpen}>
          <Drawer.Trigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="size-6" />
            </Button>
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/40" />
            <Drawer.Content className="before:bg-accent fluid bg-background fixed right-0 bottom-0 left-0 h-[50vh] rounded-t-xl outline-none before:absolute before:top-2 before:left-1/2 before:h-2 before:w-12 before:-translate-x-1/2 before:transform before:rounded-full">
              <div className="fluid mx-auto mt-4 p-4">
                <h1 className="mb-2 text-lg font-bold">Seach for a city</h1>
                <Input
                  placeholder="Search..."
                  type="search"
                  value={searchQuery}
                  onChange={(value) => setSearchQuery(value)}
                />

                <div className="mt-4">
                  {isInitial && !searchLoading && !searchData && (
                    <p className="text-sm font-medium text-gray-500">
                      Search for a city to view how the weather is there.
                    </p>
                  )}
                  {searchLoading && (
                    <>
                      <Loader2 className="text-primary mx-auto size-6 animate-spin" />
                    </>
                  )}
                  {searchData && (
                    <button
                      key={searchData.name}
                      className="hover:bg-hover flex w-full cursor-pointer flex-col items-start rounded-xl px-5 py-2 font-medium transition-colors"
                      onClick={() => {
                        setLatitude(searchData.coord.lat);
                        setLongitude(searchData.coord.lon);
                        reset();
                      }}
                    >
                      <span className="text-primary text-lg">
                        {searchData.name}
                      </span>
                      <span>{searchData.sys.country}</span>
                    </button>
                  )}
                  {!searchLoading && !searchData && !isInitial && (
                    <p className="text-sm font-medium text-gray-500">
                      No results found.
                    </p>
                  )}
                </div>
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </div>
    </header>
  );
};

export default Header;
