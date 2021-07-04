import React from 'react';
import {
  Button,
  View,
  Text,
  ScrollView,
  StyleSheet,
  Switch,
} from 'react-native';
import { Ionicons } from 'react-native-vector-icons';

const Todo = (props) => {
  return (
    <View style={styles.item}>
      <View
        style={{
          backgroundColor: 'black',
          width: 40,
          padding: 5,
          borderRadius: 4,
        }}>
        <Text style={{ color: 'white', fontSize: 25 }}>{props.item.count}</Text>
      </View>
      <View
        style={{
          backgroundColor: 'green',
          marginLeft: 10,
          borderRadius: 4,
          width: 35,
          height: 40,
          padding: 3,
        }}>
        <Ionicons
          name="add-circle-outline"
          size={30}
          color={'white'}
          onPress={props.add}
        />
      </View>
      <View
        style={{
          backgroundColor: '#52B2BF',
          marginLeft: 10,
          borderRadius: 4,
          width: 35,
          height: 40,
          padding: 3,
        }}>
        <Ionicons
          name="remove-circle-outline"
          size={30}
          color={'white'}
          onPress={props.subtract}
        />
      </View>
      <View
        style={{
          backgroundColor: '#B53737',
          marginLeft: 10,
          borderRadius: 4,
          width: 35,
          height: 40,
          padding: 5,
        }}>
        <Ionicons
          name="trash-outline"
          size={25}
          color={'white'}
          onPress={props.remove}
        />
      </View>
    </View>
  );
};
export default class App extends React.Component {
  state = {
    item: [
      { id: 1, count: 0 },
      { id: 2, count: 0 },
      { id: 3, count: 0 },
      { id: 4, count: 0 },
    ],
    total: 0,
  };

  reset() {
    this.setState({
      item: [
        { id: 1, count: 0 },
        { id: 2, count: 0 },
        { id: 3, count: 0 },
        { id: 4, count: 0 },
      ],
      total: 0,
    });
  }
  add(id) {
    this.setState({
      item: this.state.item.map((item) => {
        if (id === item.id) return { id: item.id, count: item.count + 1 };
        else return item;
      }),
      total: this.state.total + 1,
    });
  }
  subtract(id) {
    if (this.state.item[id - 1].count > 0)
      this.setState({
        item: this.state.item.map((item) => {
          if (id === item.id) return { id: item.id, count: item.count - 1 };
          else return item;
        }),
        total: this.state.total - 1,
      });
  }
  deleteItem(id,index) {
    this.setState({
      item: this.state.item.filter(item => item.id !== id),
      total: (this.state.total)-(this.state.item[index].count),
    });
  }

  render() {
    return (
      <View style={styles.appContainer}>
        <View
          style={{
            backgroundColor: '#f6f6f6',
            flexDirection: 'row',
            paddingLeft: 20,
          }}>
          <Ionicons name="cart" size={35} color={'black'} />
          <View
            style={{
              backgroundColor: '#52B2BF',
              width: 45,
              marginLeft: 10,
              height: 25,
              borderRadius: 15,
              padding: 5,
              marginTop: 5,
            }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              {this.state.total}
            </Text>
          </View>
          <Text style={{ color: 'black', padding: 8 }}>Items</Text>
        </View>
        <View
          style={{
            backgroundColor: 'green',
            marginLeft: 30,
            marginTop: 30,
            width: 35,
          }}>
          <Ionicons
            name="sync-circle-outline"
            size={35}
            color={'white'}
            onPress={() => this.reset()}
          />
        </View>
        <ScrollView style={styles.todoContainer}>
          <Text>
            {this.state.item.map((item,index) => (
              <Todo
                item={item}
                add={() => this.add(item.id)}
                subtract={() => this.subtract(item.id)}
                remove={() => this.deleteItem(item.id,index)}
              />
            ))}
          </Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    marginTop: 80,
    margin: 30,
    paddingBottom: 60,
  },
  todoContainer: {
    paddingLeft: 10,
    paddingTop: 10,
  },
  item: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
