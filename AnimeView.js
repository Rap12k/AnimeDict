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
      <Image style={styles.image}
          source={{uri: anime.image_url}} />
        <View style={styles.content}>
          <Text style={styles.price}>{anime.title}</Text>
          <Text style={styles.title}>Type: {anime.type}</Text>
          <Text style={styles.title}>Number of Episodes: {anime.episodes}</Text>
          <Text style={styles.title}>Score: {anime.score}</Text>
          <View style={styles.separator}/>
        </View>
        <Text style={styles.description}>{anime.description}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(245, 252, 255)'
  },
  content: {
  },
  separator: {
    height: 1,
    backgroundColor: 'rgb(169,63,85)',
  },
  image: {
    flex:  2
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'rgb(169,63,85)',
    alignSelf: 'center',
  },
  title: {
    fontSize: 18,
    margin: 5,
    color: 'rgb(169,63,85)',
  },
  description: {
    fontSize: 18,
    margin: 5,
    color: 'rgb(169,63,85)',
  }
});
