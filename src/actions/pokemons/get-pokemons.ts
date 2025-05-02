import { pokeApi } from '../../config/api/pokeApi';
import { Pokemon } from '../../domain/entities/pokemon';



export const sleep = async() =>{
    return new Promise(resolve => setTimeout(resolve,200));
};
export const getPokemons = async ():Promise<Pokemon[]> =>{
    await sleep();
    try {
        const url = '/pokemon';
        const { data } = await pokeApi.get(url);
        console.log(data);
        return[];
    } catch (error) {
        throw new Error('Error Getting Pokemons');
    }
};
