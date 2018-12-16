import React, { Component } from 'react';
import { StyleSheet, View, Button, TextInput } from 'react-native';
import HelloWorld from './components/HelloWorld'

export default class App extends Component {
  constructor(props){
    super(props)
    this.values = [50, 100]
    this.price = '4,05'
  }
  selectValue(x) {
    alert(x)
  }
  render() {
    return (
      <View style={styles.container}>
        { 
          this.values.map(value=>
            <Button key={value} 
                    title={value.toString()} 
                    onPress={ this.selectValue.bind(this,value) }
                    accessibilityLabel={`Seleciona valor ${value} em para abastecer.`}
                    />
          ) 
        }
        <HelloWorld name='Teste'/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
