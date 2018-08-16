import React from "react";
import {
  StyleSheet,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator
} from "react-native";
import { Constants } from "expo";

import { createStackNavigator } from "react-navigation";

const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: []
    };
  }

  // fetch movie database api
  componentDidMount() {
    return fetch(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=544ab12ee521cc3d6b5a2b54926cb569&language=en-US&page=1"
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.results
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  renderItem = ({ item }) => {
    return (
      <View>
        <Image
          style={styles.movieImage}
          source={{ uri: IMAGE_PATH + item.poster_path }}
        />
        <Text>{item.title}</Text>
      </View>
    );
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Text>Content loading</Text>
        </View>
      );
    } else {
      return (
        <View>
          <FlatList data={this.state.dataSource} renderItem={this.renderItem} />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  movieImage: {
    width: 400,
    height: 300
  }
});
