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
import MangaResults from './MangaResults';
import AnimeView from './AnimeView';
import MangaView from './MangaView';
import {
  createStackNavigator,
} from 'react-navigation';
import './shim.js';


const RootStack = createStackNavigator(
  {
  Home: SearchPage,
  Results: SearchResults,
  MangaList: MangaResults,
  Anime: AnimeView,
  Manga: MangaView,
  },
  { initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
};
