import ImageColors from 'react-native-image-colors';

export const getColorFromImage = async (uri: string): Promise<string> => {
  try {
    const fallback = 'grey';
    const result = await ImageColors.getColors(uri, {
      fallback,
      cache: true,
      key: uri,
    });

    switch (result.platform) {
      case 'android':
        return result.dominant ?? fallback;
      case 'ios':
        return result.background ?? fallback;
      default:
        return fallback;
    }
  } catch (error) {
    console.error('Error extracting color from image:', error);
    return 'grey';
  }
};
