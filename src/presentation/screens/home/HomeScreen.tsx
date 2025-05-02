import { View } from 'react-native';
import { ActivityIndicator, Button, Text } from 'react-native-paper';
import { getPokemons } from '../../../actions/pokemons';
import { useQuery } from '@tanstack/react-query';


export const HomeScreen = () => {

  // Queries
  const {isLoading,data} = useQuery({
     queryKey: ['pokemons'],
     queryFn: () =>getPokemons(),
     staleTime: 1000 * 60 * 60, //60 minutes
    });
  // getPokemons();

  // const [isLoading, setIsLoading] = useState(true);
  // const [hasError, setHasError] = useState('');
  // const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  // useEffect(() => {
  //   return () => {

  //   };
  // }, []);

  return (
    <View>
      <Text variant="titleLarge">HomeScreen</Text>
      {
        isLoading ? (<ActivityIndicator/>) : (
          <Button
          icon="camera"
          mode="contained"
          onPress={() => console.log('Pressed')}
        >
          Press me
        </Button>
        )
      }
    </View>
  );
};
