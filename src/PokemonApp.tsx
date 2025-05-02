import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './presentation/navigator/StackNavigator';

export const PokemonApp = () =>{
    return(
        <NavigationContainer>
            <StackNavigator/>
        </NavigationContainer>
    );
};
