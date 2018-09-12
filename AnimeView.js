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
          <Text style={styles.title}>{anime.title}</Text>
        <View style={styles.content}>
          <View style={styles.data}>
            <View style={styles.separator}/>
            <Text style={styles.headings}>Type: {anime.type}</Text>
            <View style={styles.separator}/>
            <Text style={styles.headings}>Number of Episodes: {anime.episodes}</Text>
            <View style={styles.separator}/>
            <Text style={styles.headings}>Score: {anime.score}</Text>
            <View style={styles.separator}/>
          </View>
          <Text style={styles.description}>{anime.description}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFFFC'
  },
  content: {
    flexDirection: 'row', 
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: '#011627',
  },
  image: {
    flex:  2,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#d80032',
    alignSelf: 'center',
  },
  headings: {
    fontSize: 16,
    margin: 5,
    color: '#011627',
  },
  description: {
    fontSize: 18,
    margin: 5,
    color: '#011627',
    width: '70%',
  },
  data: {
    flexDirection: 'column',
    flex: 1,
    width: '30%',
  }
});
