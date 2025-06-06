import { Pokemon } from '../../domain/entities/pokemon';
import { getPokemonById } from './get-pokemon-by-id';

export const getPokemonByIds = async(ids:number[]):Promise<Pokemon[]> =>{
    try {
        const pokemonPromises: Promise<Pokemon>[] = ids.map(id => {
            return getPokemonById(id);
        });
        return Promise.all(pokemonPromises);
    } catch (error) {
        throw new Error(`no se encontraron por esos :${ids}`);
    }
};
