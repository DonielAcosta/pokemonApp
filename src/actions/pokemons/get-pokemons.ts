import { pokeApi } from '../../config/api/pokeApi';
import type { Pokemon } from '../../domain/entities/pokemon';
import  type { PokeAPIPaginatedResponse, PokeAPIPokemon } from '../../infrastructure/interfaces/pokepi.interfaces';
import { PokemonMapper } from '../../infrastructure/mappers/pokemon.mapper';



export const sleep = async() =>{
    return new Promise(resolve => setTimeout(resolve,200));
};
export const getPokemons = async (page: number, limit: number = 20):Promise<Pokemon[]> =>{
    await sleep();
    try {
        // const url = `/pokemon?offset=${ page * 10 }&limit=${limit}`;
        // const { data } = await pokeApi.get<PokeAPIPaginatedResponse>(url);

        // const pokemonPromises = data.results.map( (info) =>{
        //     return pokeApi.get<PokeAPIPokemon>(info.url);
        // });
        // const pokeApiPokemons = await Promise.all(pokemonPromises);
        // const pokemons = pokeApiPokemons.map((item) => PokemonMapper.pokeApiPokemonToEntity(item.data));
        // // console.log(pokeApiPokemons);
        // // console.log(data);
        // console.log(pokemons[0]);
        // return pokemons;

        const url = `/pokemon?offset=${page * 10}&limit=${limit}`;
        const { data } = await pokeApi.get<PokeAPIPaginatedResponse>(url);

        const pokemonPromises = data.results.map(info =>
          pokeApi.get<PokeAPIPokemon>(info.url)
        );

        const pokeApiPokemons = await Promise.all(pokemonPromises);

        const pokemons = await Promise.all(
          pokeApiPokemons.map(item =>
            PokemonMapper.pokeApiPokemonToEntity(item.data)
          )
        );
        // const pokemons = pokeApiPokemons.map((item) => PokemonMapper.pokeApiPokemonToEntity(item.data));//marca error al retornar entonces coloque la de arriba
        console.log(pokemons[0]);
        return pokemons;
    } catch (error) {
        console.log(error);
        throw new Error('Error Getting Pokemons');
    }
};
