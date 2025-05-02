import { pokeApi } from '../../config/api/pokeApi';
import type { Pokemon } from '../../domain/entities/pokemon';
import  type { PokeAPIPaginatedResponse, PokeAPIPokemon } from '../../infrastructure/interfaces/pokepi.interfaces';



export const sleep = async() =>{
    return new Promise(resolve => setTimeout(resolve,200));
};
export const getPokemons = async (page: number, limit: number = 20):Promise<Pokemon[]> =>{
    await sleep();
    try {
        const url = `/pokemon?offset=${ page * 10 }&limit=${limit}`;
        const { data } = await pokeApi.get<PokeAPIPaginatedResponse>(url);

        const pokemonPromises = data.results.map( (info) =>{
            return pokeApi.get<PokeAPIPokemon>(info.url);
        });
        const pokeApiPokemons = await Promise.all(pokemonPromises);
        // console.log(pokeApiPokemons);
        // console.log(data);
        return[];
    } catch (error) {
        console.log(error);
        throw new Error('Error Getting Pokemons');
    }
};
