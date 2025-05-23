import 'react-native-gesture-handler';
import { StackNavigator } from './presentation/navigator/StackNavigator';
import { ThemeContextProvider } from './presentation/context/ThemeContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient();
export const PokemonApp = () =>{
    return(
        <QueryClientProvider client={queryClient}>
            <ThemeContextProvider>
                <StackNavigator/>
            </ThemeContextProvider>
        </QueryClientProvider>
    );
};
