/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {TextInput, Button, StyleSheet, Text, View, Image} from 'react-native';
import SearchPage from './SearchPage';
import SearchResults from './SearchResults';
import AnimeView from './AnimeView';
import {
  createStackNavigator,
} from 'react-navigation';

const App = createStackNavigator({
  Home: { screen: SearchPage },
  Results: { screen: SearchResults },
  Anime: { screen: AnimeView },
});

export default App;