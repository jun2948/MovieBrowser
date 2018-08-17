import React from 'react';
import {
  StyleSheet,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Constants
} from 'expo';
import {
  createStackNavigator
} from 'react-navigation';


const IMAGE_PATH = 'https://image.tmdb.org/t/p/w500';


class HomeScreen extends React.Component {
  static navigationOptions = ({
    navigation
  }) => {
    return {
      headerTitle: 'Home'
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
      movieId: '',
    };
  }

  componentDidMount() {
    return
    fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=544ab12ee521cc3d6b5a2b54926cb569&language=en-US&page=1')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.results,
        });
      })
      .catch(error => {
        console.error(error);
      });
  }
  goToDetail = (index) => {
    // this.setState(
    //   {movieId: this.state.dataSource[index].id}
    // )
    this.props.screenProps.showDetails(this.state.dataSource[index].id)
    this.props.navigation.navigate("Detail")
  }
  renderItem = ({
    item,
    index
  }) => {
    return ( <
      TouchableOpacity onPress = {
        () => this.goToDetail(index)
      }
      style = {
        styles.movieList
      } >
      <
      Image style = {
        styles.movieImage
      }
      source = {
        {
          uri: IMAGE_PATH + item.poster_path
        }
      }
      /> <
      /TouchableOpacity>
    );
  };
  render() {
    return ( <
      View style = {
        styles.container
      } >
      <
      FlatList data = {
        this.state.dataSource
      }
      renderItem = {
        this.renderItem
      }
      /> <
      /View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  movieImage: {
    width: 200,
    height: 300,

  },
  movieList: {
    paddingTop: 20,
  }

});

export default HomeScreen;