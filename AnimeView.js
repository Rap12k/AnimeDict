'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  Text
} from 'react-native';

export default class AnimeView extends Component {
  static navigationOptions = {
    title: 'Anime',
    headerTitleStyle: {textAlign:'center', alignSelf:'center',flex:1, fontWeight:'bold',},
  };

  render() {
    const { params } = this.props.navigation.state;
    var anime = params.result;
    return (
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.price}>English: {anime.title} Japanese: {anime.title_japanese}</Text>
          <Text style={styles.title}>Status: {anime.status}</Text>
          <Text style={styles.title}>Number of Episodes: {anime.episodes}</Text>
          <Text style={styles.title}>Aired: {anime.aired}</Text>
          <Text style={styles.title}>Rating: {anime.rating}</Text>
          <View style={styles.separator}/>
        </View>
        <Text style={styles.description}>{anime.synopsis}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 65
  },
  heading: {
    backgroundColor: '#F8F8F8',
  },
  separator: {
    height: 1,
    backgroundColor: '#DDDDDD'
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#48BBEC',
    alignSelf: center,
  },
  title: {
    fontSize: 18,
    margin: 5,
    color: '#656565'
  },
  description: {
    fontSize: 18,
    margin: 5,
    color: '#656565'
  }
});
