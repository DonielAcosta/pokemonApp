import { createContext, PropsWithChildren } from 'react';

import { NavigationContainer, DarkTheme as NavigationDarkTheme,DefaultTheme as NavigationDefaultTheme} from '@react-navigation/native';
import { adaptNavigationTheme, DefaultTheme, PaperProvider } from 'react-native-paper';
import { useColorScheme } from 'react-native';

const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
});

export const ThemeContext = createContext({
    isDark: false,
    theme:LightTheme,
});

export const ThemeContextProvider = ({children}:PropsWithChildren) =>{

    const colorScheme = useColorScheme();

    const isDark = colorScheme === 'dark';
    const theme = isDark ? DarkTheme : LightTheme;

    return(
        <PaperProvider  theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <NavigationContainer  theme={theme}>
                <ThemeContext.Provider value={{
                    isDark,
                    theme,
                 }}>
                     {children}
                </ThemeContext.Provider>
            </NavigationContainer>
        </PaperProvider>
    );
};
