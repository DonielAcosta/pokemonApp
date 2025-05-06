/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import { FlatList, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { globalTheme } from '../../../config/theme/global-theme';
import { ActivityIndicator, TextInput } from 'react-native-paper';
import { PokemonCard } from '../../components/pokemons/PokemonCard';
import { useQuery } from '@tanstack/react-query';
import { getPokemonByIds, getPokemonNameWithId } from '../../../actions/pokemons';
import { useMemo, useState } from 'react';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';

export const SearchScreen = () => {
  const { top } = useSafeAreaInsets();
  const [term, setTerm] = useState('');

  const debouncedValue = useDebouncedValue(term);
  const {isLoading, data: pokemonNameList = []} = useQuery({
    queryKey: ['pokemons','all'],
    queryFn: () =>getPokemonNameWithId(),
  });
  // console.log(pokemonNameList);

  const pokemonNameIdList = useMemo(()=>{
      //es un numero
      if(!isNaN(Number(debouncedValue))){
        const pokemon = pokemonNameList.find(pokemon => pokemon.id === Number(debouncedValue) );
        return pokemon ? [pokemon] : [];
      }

      if(debouncedValue.length === 0){return[];}
      if(debouncedValue.length < 3 ){return[];}
      return pokemonNameList.filter(pokemon => pokemon.name.includes(debouncedValue.toLocaleLowerCase()));
  },[debouncedValue]);

  const { isLoading: isLoadingPokemons, data: pokemons = [] } = useQuery({
    queryKey: ['pokemons', 'by', pokemonNameIdList],
    queryFn: () => getPokemonByIds(pokemonNameIdList.map(p => p.id)),
    enabled: pokemonNameIdList.length > 0,
    staleTime: 1000 * 60 * 5,
  });

  if(isLoading){
    return <FullScreenLoader/>;
  }
  return (
    <View style={[globalTheme.globalMargin, {paddingTop: top + 10, flex: 1}]}>
      <TextInput
        placeholder="Buscar Pokémon"
        mode="flat"
        autoFocus
        autoCorrect={false}
        onChangeText={setTerm}
        value={term}
      />

      {isLoadingPokemons && <ActivityIndicator style={{paddingTop: 20}} />}


      {/* <Text>{ JSON.stringify(pokemonNameIdList, null, 2) }</Text> */}

      <FlatList
        data={pokemons}
        keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
        numColumns={2}
        style={{paddingTop: top + 20}}
        renderItem={({item}) => <PokemonCard pokemon={item} />}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={ <View style={{ height: 150 }} />}
      />

    </View>
  );
};

