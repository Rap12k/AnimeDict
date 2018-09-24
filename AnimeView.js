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
          <View style={styles.dataRow}>
            <View style={styles.data}>
              <View style={styles.separator}/>
              <Text style={styles.headings}>Type: {anime.type}</Text>
              <View style={styles.separator}/>
              <Text style={styles.headings}>Episodes: {anime.episodes}</Text>
              <View style={styles.separator}/>
              <Text style={styles.headings}>Score: {anime.score}</Text>
              <View style={styles.separator}/>
              <Text style={styles.headings}>Rating: {anime.rated}</Text>
              <View style={styles.separator}/>
              <Text style={styles.headings}>Airing?: {anime.airing ? 'Yes' : 'No'}</Text>
              <View style={styles.separator}/>
              <Text style={styles.headings}>Aired: {anime.start_date ? anime.start_date.slice(0,10) : 'Not Yet' }</Text>
              <View style={styles.separator}/>
              <Text style={styles.headings}>Ended: {anime.end_date ? anime.end_date.slice(0,10) : 'Not Yet' }</Text>
            </View>
            <View style={styles.prose}>
              <Text style={styles.description}>{anime.synopsis}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFFFC',
    borderWidth: 1,
    borderColor: 'rgb(0,0,0)',
    borderRadius: 1,
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
    flex:  1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#d80032',
    textAlign: 'center',
    padding: 5,
  },
  headings: {
    fontSize: 16,
    padding: 4,
    color: '#011627',
  },
  description: {
    fontSize: 18,
    color: '#011627',
  },
  dataRow: {
    flexDirection: 'row',
    flex: 2,
  },
  data: {
    flexDirection: 'column',
    flex: 1,
    width: '30%',
  },
  prose: {
    padding: 5,
    width: '70%',
    borderWidth: 1,
    borderColor: 'rgb(0,0,0)',
    borderRadius: 1,
    flex:2,
  },
});
