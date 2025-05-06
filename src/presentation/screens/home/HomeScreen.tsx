/* eslint-disable react/no-unstable-nested-components */
import { FlatList, StyleSheet, View } from 'react-native';
import { getPokemons } from '../../../actions/pokemons';
import { useInfiniteQuery, QueryClient, useQueryClient } from '@tanstack/react-query';
import { PokeballBg } from '../../components/ui/PokeballBg';
import { Text } from 'react-native-paper';
import { globalTheme } from '../../../config/theme/global-theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PokemonCard } from '../../components/pokemons/PokemonCard';

export const HomeScreen = () => {
  const { top } = useSafeAreaInsets();
  const QueryClient = useQueryClient();

  //esta es la forma tradicional de la peticion http
  // const { isLoading, data:pokemons = [] } = useQuery({
  //   queryKey: ['pokemons'],
  //   queryFn: () => getPokemons(0),
  //   staleTime: 1000 * 60 * 60, // 60 minutes
  // });

  const { isLoading, data,fetchNextPage } = useInfiniteQuery({
    queryKey: ['pokemons','infinite'],
    initialPageParam:0,
    staleTime: 1000 * 60 * 60, // 60 minutes
    queryFn: async(params) => {
      const pokemons = await getPokemons(params.pageParam);
      pokemons.forEach(pokemon =>{
        QueryClient.setQueryData(['pokemon',pokemon.id],pokemon);
      });
     return pokemons;
    },
    getNextPageParam:(lastPage, pages) => pages.length,
  });
  return (
    <View style={globalTheme.globalMargin}>
      <PokeballBg style={styles.imgPosition} />
        {/* <FlatList
        data={pokemons}
        keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
        numColumns={2}
        style = {{ paddingTop: top + 20 }}
        ListHeaderComponent={() =>(
          <Text variant="displayMedium">Pokemones 2025</Text>
        )}
        renderItem={({item})=><PokemonCard pokemon={item}/>}
        /> */}

      <FlatList
        data={data?.pages.flat() ?? []}
        keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
        numColumns={2}
        style = {{ paddingTop: top + 20 }}
        ListHeaderComponent={() =>(
          <Text variant="displayMedium">Pokemones 2025</Text>
        )}
        renderItem={({item})=><PokemonCard pokemon={item}/>}
        onEndReachedThreshold={0.6}
        onEndReached={() =>fetchNextPage()}
        showsVerticalScrollIndicator={false}
        />
    </View>
  );
};

const styles = StyleSheet.create({

  imgPosition: {
    position: 'absolute',
    top: -100,
    right: -100,
  },
});
