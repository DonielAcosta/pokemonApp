/* eslint-disable react-native/no-inline-styles */
import { Image, Pressable, StyleSheet, View} from 'react-native';
import { Pokemon } from '../../../domain/entities/pokemon';
import { Card, Text } from 'react-native-paper';
import { FadeInImage } from '../ui/FadeInimage';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../navigator/StackNavigator';

interface Props {
    pokemon:Pokemon;
}
export const PokemonCard = ({pokemon}:Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  return (
    <Pressable
      onPress={() => navigation.navigate('PokemonScreen',{pokemonId: pokemon.id})}
      style={{ flex: 1}}
    >
      <Card style={[styles.cardContainer, {backgroundColor: pokemon.color}]}>
          <Text style= {styles.name} variant="bodyLarge" lineBreakMode="middle">
              {pokemon.name}
              {'\n#' + pokemon.id}
          </Text>
          {/* IMAGE */}
          <Text style={[styles.name, {marginTop:35}]}>{pokemon.types[0]}</Text>

          <View style={styles.pokeballContainer}>
            <Image
              source={require('../../../assets/pokeball-light.png')}
              style={styles.pokeball}
            />
            {/* imagen pokemon */}
            <FadeInImage
              uri={pokemon.avatar }
              style={styles.pokemonImage}
            />
            {/* typos */}
            {/* <Text style={[styles.name, {marginTop:35}]}>{pokemon.types[0]}</Text> */}
          </View>
      </Card>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    backgroundColor: 'grey',
    height: 120,
    flex: 0.5,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  name: {
    color: 'white',
    top: 10,
    left: 10,
  },
  pokeball: {
    width: 100,
    height: 100,
    right: -25,
    top: -25,
    opacity: 0.4,
  },
  pokemonImage: {
    width: 120,
    height: 120,
    position: 'absolute',
    right: -15,
    top: -90, //para que la imagen suba
  },

  pokeballContainer: {
    alignItems: 'flex-end',
    width: '100%',
    position: 'absolute',

    // overflow: 'hidden',
    // opacity: 0.5,
  },
});
