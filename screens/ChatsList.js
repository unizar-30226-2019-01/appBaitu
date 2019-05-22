import React, {Component} from 'react';
import {Title,Text,View,Image,StyleSheet,KeyboardAvoidingView,ScrollView,FlatList,Dimensions} from 'react-native';
import { LinearGradient } from 'expo';


//Informacion/data
const data = [
  { key: 'A' }, { key: 'B' }, { key: 'C' }, { key: 'D' }, { key: 'E' }, { key: 'F' }, { key: 'G' }, { key: 'H' }, { key: 'I' }, { key: 'J' },
  // { key: 'K' },
  // { key: 'L' },
];

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};

const numColumns = 1;

class ChatsList extends Component {
  renderItem = ({ item, index }) => {
      if (item.empty === true) {
        return <View style={[styles.item, styles.itemInvisible]} />;
      }
      return (
        <View
          style={styles.item}
        >
          <Text style={styles.itemText}>{item.key}</Text>
        </View>
      );
    };


    render(){
        return(
          <LinearGradient colors={['#ffffff', '#eeeeee']} style={styles.colorContainer} >
          <ScrollView>
            <FlatList
              data={formatData(data, numColumns)}
              style={styles.container}
              renderItem={this.renderItem}
              numColumns={numColumns}
            />
            </ScrollView>
      	  </LinearGradient>
        )
    }
}


const styles = StyleSheet.create({
  colorContainer : {
    flex: 1,
    marginVertical: 20,
  },
  item: {
   backgroundColor: '#1c313a',
   alignItems: 'center',
   justifyContent: 'center',
   flex: 1,
   margin: 1,
   height: 65,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
  },

})

export default ChatsList;
