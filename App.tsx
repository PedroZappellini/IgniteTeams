import React from 'react';
import {ThemeProvider} from 'styled-components';
import theme from './src/theme';
import {StatusBar} from 'react-native';
import Routes from './src/routes';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Routes />
    </ThemeProvider>
  );
};

export default App;
