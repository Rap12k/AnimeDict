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
    title: 'Upcoming Anime',
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
          <View style={styles.dataRow}>
            <View style={styles.data}>
              <View style={styles.separator}/>
              <Text style={styles.headings}>Type: {anime.type}</Text>
              <View style={styles.separator}/>
              <Text style={styles.headings}>Members: {anime.members}</Text>
              <View style={styles.separator}/>
              <Text style={styles.headings}>Genre: {anime.genres[0].name ? anime.producers[0].name : 'Not Announced'}</Text>
              <View style={styles.separator}/>
              <Text style={styles.headings}>Genre2: {anime.genres[1].name ? anime.producers[0].name : 'Not Announced'}</Text>
              <View style={styles.separator}/>
              <Text style={styles.headings}>Producer: {anime.producers[0].name ? anime.producers[0].name : 'None'}</Text>
              <View style={styles.separator}/>
              <Text style={styles.headings}>Source: {anime.source}</Text>
              <View style={styles.separator}/>
            </View>
            <View style={styles.prose}>
              <Text style={styles.title}>{anime.title}</Text>
              <Text style={styles.description}>{anime.synopsis.slice(0, 300)}...</Text>
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d80032',
    textAlign: 'center',
    padding: 5,
  },
  headings: {
    fontSize: 14,
    padding: 4,
    color: '#011627',
  },
  description: {
    fontSize: 16,
    color: '#011627',
  },
  dataRow: {
    flexDirection: 'row',
    flex: 1,
  },
  data: {
    flexDirection: 'column',
    flex: 1,
    width: '30%',
  },
  prose: {
    padding: 4,
    width: '70%',
    borderWidth: 1,
    borderColor: 'rgb(0,0,0)',
    borderRadius: 1,
    flex:2,
  },
});
