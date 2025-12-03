
import PokemonWrapper from "@/components/pokemon-wrapper";
async function getData() {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=20";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    const pokemonDetails = await Promise.all(
      result.results.map(async (pokemon: {url: string }) => {
        const res = await fetch(pokemon.url , {
          cache : 'force-cache'
        });
        const details = await res.json();
        return {
          id: details.id,
          name: details.name,
          types: details.types.map((type: { type: { name: string } }) => type.type.name),
          imageURL: details.sprites.other["official-artwork"].front_default,
        } 
      })
    );
    return pokemonDetails;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }else {
      console.error("An unknown error occurred");
    }
  }
  return [];
}

export default async function Home() {
  const pokemondata = await getData();

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-500 to-red-600">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl md:text-6xl font-bold text-center text-white mb-8">Pokedex</h1>
        <PokemonWrapper pokemons={pokemondata} />
      </div>
    </div>
  );
}
