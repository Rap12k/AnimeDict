/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import SearchPage from './SearchPage';
import SearchResults from './SearchResults';
import MangaResults from './MangaResults';
import AnimeView from './AnimeView';
import MangaView from './MangaView';
import AnimeGenre from './AnimeGenre';
import MangaGenre from './MangaGenre';
import GenreAnimeView from './GenreAnimeView';
import GenreMangaView from './GenreMangaView';

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
  AnimeGenre: AnimeGenre,
  MangaGenre: MangaGenre,
  GenreAnimeView: GenreAnimeView,
  GenreMangaView: GenreMangaView,
  },
  { initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
};
