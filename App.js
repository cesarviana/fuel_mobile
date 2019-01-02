import React, {Component} from 'react'
import {StyleSheet, View, TextInput, Text, Button} from 'react-native'
import FuelValueOption from './components/FuelValueOption'
import KilometersInput from './components/KilometersInput'
import History from './components/History'

import fuelService from './services/FuelService'

export default class App extends Component {
    constructor(props) {
        super(props);
        this.previousKilometers = 1000;
        this.state = {
            values: [50, 100],
            price: 4.06,
            selectedValue: [50],
            kilometers: this.previousKilometers.toString(),
            list: []
        };
        this.list()
    }

    list(){
        fuelService.list().then(snapshot => {
            const list = [];
            snapshot.forEach(doc=>list.push(doc.data()));
            this.setState({list});
        })
    }

    async save() {
        try {
            this.setState({saving: true});
            await fuelService.save({
                value: this.state.selectedValue,
                price: this.state.price,
                kilometers: this.state.kilometers
            });
            alert('O abastecimento foi salvo.');
            this.list()
        } catch (e) {
            alert(e.message)
        } finally {
            this.setState({saving: false});
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput onChangeText={(price) => this.setState({price})}
                           value={this.state.price.toString()}
                           keyboardType='numeric'
                />
                {
                    <Text>{this.state.selectedValue}</Text>
                }
                {
                    this.state.values.map(value =>
                        <FuelValueOption key={value}
                                         value={value}
                                         liters={Math.round(value / this.state.price) + ' litros'}
                                         onSelect={(selectedValue) => this.setState({selectedValue})}
                                         selected={this.state.selectedValue === value}
                        />
                    )
                }
                <KilometersInput onChange={(kilometers) => this.setState({kilometers})}
                                 previousKilometers={this.previousKilometers}
                />
                <Button title='Salvar'
                        onPress={this.save.bind(this)}
                        color='blue'
                        disabled={this.state.saving}
                />
                <History list={ this.state.list }/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 20
    },
});
