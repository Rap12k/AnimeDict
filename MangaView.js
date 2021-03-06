'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  Text
} from 'react-native';

export default class MangaView extends Component {
  static navigationOptions = {
    title: 'Manga',
    headerTitleStyle: {textAlign:'center', alignSelf:'center',flex:1, fontWeight:'bold',},
  };

  render() {
    const { params } = this.props.navigation.state;
    var manga = params.result;
    return (
      <View style={styles.container}>
        <Image style={styles.image}
          source={{uri: manga.image_url}} />
        <View style={styles.content}>
          <View style={styles.dataRow}>
            <View style={styles.data}>
              <View style={styles.separator}/>
              <Text style={styles.headings}>Type: {manga.type}</Text>
              <View style={styles.separator}/>
              <Text style={styles.headings}>Chapters: {manga.chapters}</Text>
              <View style={styles.separator}/>
              <Text style={styles.headings}>Score: {manga.score}</Text>
              <View style={styles.separator}/>
              <Text style={styles.headings}>Volumes: {manga.volumes}</Text>
              <View style={styles.separator}/>
              <Text style={styles.headings}>Current?: {manga.publishing ? 'Yes' : 'No'}</Text>
              <View style={styles.separator}/>
              <Text style={styles.headings}>Started: {manga.start_date.slice(0, 10)}</Text>
            </View>
            <View style={styles.prose}>
              <Text style={styles.title}>{manga.title}</Text>
              <Text style={styles.description}>{manga.synopsis}</Text>
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
