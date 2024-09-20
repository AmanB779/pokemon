import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import Card from "./Card";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://pokeapi.co/api/v2/pokemon?limit=50`;
      const result = await axios.get(url);
      const pokemonArray = result.data.results;

      const pokemonData = pokemonArray.map((pokemonData) =>
        axios.get(pokemonData.url)
      );
      const pokemonImageUrl = await Promise.all(pokemonData);
      const imageUrl = pokemonImageUrl.map((detail) => ({
        ...detail.data,
        url: detail.data.sprites.other.dream_world.front_default,
      }));
      setData(imageUrl);
    };
    fetchData();
  }, []);

  const searchPokemon = async () => {
    if (!query) return;

    setLoading(true);
    setSearchResult("");

    try {
      const result = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`
      );
      const pokemonDetail = {
        ...result.data,
        url: result.data.sprites.other.dream_world.front_default,
      };
      setSearchResult(pokemonDetail);
    } catch (error) {
      console.error("Pokémon not found");
      setSearchResult("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Pokipedia </h1>
      <div className="search-container">
        <SearchBar query={query} setQuery={setQuery} />
        <button type="button" onClick={searchPokemon}>
          Search
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {searchResult && (
        <>
          <Card
            key={searchResult.id}
            name={searchResult.name}
            url={searchResult.url}
          />
          <div className="divider" />
        </>
      )}
      <div className="card-container">
        {data.map((item) => (
          <Card key={item.id} name={item.name} url={item.url} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
