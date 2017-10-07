import React from 'react';
import { StyleSheet, 
         Text,
         View,
         FlatList,
         Image
} from 'react-native';

class Cell extends React.Component {
  render() {
    return(    
      <View style={styles.cell}>
        <Image 
        style={styles.imageView} 
        source={{uri:this.props.cellItem.image[3]['#text']}} 
        />
        <View style={styles.contentView}>
          <Text style={[styles.whiteText, styles.textBold]}>{this.props.cellItem.name}</Text>
          <Text style={[styles.whiteText, styles.textBold]}>{this.props.cellItem.artist.name}</Text>
        </View>
        <View style={styles.accessoryView}>
          <Text style={styles.textCenter}/>
        </View>
      </View>
     )
  }
}

export default class App extends React.Component {
  // fetch data and return it to the caller
  fetchTopTracks() {
    const apiKey = "80b1866e815a8d2ddf83757bd97fdc76"
    const url = `http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${apiKey}&format=json`
    
    return fetch(url)
    .then(response => response.json())
  }

  constructor(props) {
    super(props)

    this.state = { tracks: [] }
    
    // fetch api data then render-- fetch stuff then update state
    this.fetchTopTracks()
      .then(json => {
        this.setState({ tracks: json.tracks.track }) 
      })
  }

  render() {

    const tableData = Array(50).fill("Hello Humph")
    
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.tracks} 
          renderItem={ ({item}) => (
            <Cell cellItem={item} />
          )}
          keyExtractor={ (_,index) => index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // func of flex number with flex sibblings
    flex: 1,
    paddingTop: 40,
    paddingLeft: 15,
    paddingRight: 15,
    // flex direction is set to vertical can make horizontal with row
    // flexDirection: 'row',
    backgroundColor: '#000',
  },
  cell: {
    marginBottom: 4,
    flexDirection: 'row',
  },
  imageView: {
    height: 75,
    width: 75,
  },
  contentView: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    marginLeft: 15,
  },
  accessoryView: {
    width: 40,
    justifyContent: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
  whiteText: {
    color: 'white',
  },
  textBold: {
    fontWeight: 'bold',
  },
  // redBox: {
  //   flex: 1,
  //   backgroundColor: 'red'
  // },
  // blueBox: {
  //   flex: 1,
  //   backgroundColor: 'blue'
  // }
});

// flatList takes data and a renter. array of data. can be ANYTHING
// first cell = first item etc
// renter item is a function

// tappable cells
// navagation
// audio
// more/different content form last.fm api spotify etc