import { useState } from "react";
import PokeCard from "./PokeCard";

function PokeList() {
  const [list, setList] = useState(null);
  const [state, setState] = useState("loading");
  const [error, setError] = useState(null);

  async function fetchList(currData) {
    try {
      const endpoint = list
        ? list.next
        : `https://pokeapi.co/api/v2/pokemon/?limit=24`;
      const response = await fetch(endpoint);
      const result = await response.json();

      if (result.results) {
        const { count, next, previous } = { ...result };
        const nextList = {
          count,
          next,
          previous,
          data: [...currData],
        };

        const expandList = await Promise.all(
          result.results.map(async (item) => {
            try {
              const singleResponse = await fetch(item.url);
              const singleResult = await singleResponse.json();
              item = { ...item, ...singleResult };
              return item;
            } catch (error) {
              console.log({ ...item, error });
            }
          })
        );

        nextList.data = [...currData, ...expandList];

        setList(nextList);
        setState("success");
      }
    } catch (error) {
      console.log(error);
      setState("error");
      // setError(error);
    }
  }

  if (state === "error") {
    return <p>error</p>;
  }

  if (!list) {
    fetchList([]);
  }

  if (state === "loading") {
    return <p>loading...</p>;
  }

  return (
    <div className="p-2 sm:p-6 lg:p-8 flex flex-col items-center gap-8 dark:bg-gray-800">
      <div className="w-full max-w-7xl grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
        {list.data.map((item) => {
          return <PokeCard pokemon={item} key={item.id}></PokeCard>;
        })}
      </div>
      <button className="px-3 py-2 w-fit min-w-32 rounded-md bg-gray-200 text-gray-900 hover:bg-gray-300 dark:hover:bg-gray-100 text-sm font-medium">
        Load More
      </button>
    </div>
  );
}

export default PokeList;
