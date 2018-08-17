import React from 'react';
import {
  StyleSheet,
  FlatList,
  Image,
  Text,
  Button,
  View
} from 'react-native';
import {
  Constants
} from 'expo';
const IMAGE_PATH = 'https://image.tmdb.org/t/p/w500';
class DetailScreen extends React.Component {
  static navigationOptions = ({
    navigation
  }) => {
    return {
      headerTitle: 'Detail',
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
      movieId: this.props.screenProps.getItem,
    };
  }
  componentWillMount() {
    return fetch(
        `https://api.themoviedb.org/3/movie/${this.state.movieId}?api_key=544ab12ee521cc3d6b5a2b54926cb569&language=en-US`
      )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        });
      })
      .catch(error => {
        console.error(error);
      });
  }
  render() {
    console.log(`movieid :${this.state.movieId}`)
    return ( <
      View style = {
        styles.container
      } >
      <
      Image style = {
        styles.movieImage
      }
      source = {
        {
          uri: IMAGE_PATH + this.state.dataSource.poster_path
        }
      }
      /> <
      Text style = {
        styles.movieTitle
      } > {
        this.state.dataSource.title
      } < /Text> <
      Text style = {
        styles.movieOverview
      } > {
        this.state.dataSource.overview
      } < /Text> <
      /View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  movieImage: {
    width: 200,
    height: 300,
  },
  movieTitle: {
    fontSize: 20
  },
  movieOverview: {
    paddingTop: 20
  },
});
export default DetailScreen