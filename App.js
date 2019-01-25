import React, {Component} from 'react'
import {StyleSheet, View, TextInput, Text, Button, Alert} from 'react-native'
import FuelValueOption from './components/FuelValueOption'

import History from './components/History'

import fuelService from './services/FuelService'

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: undefined,
            values: [50, 100, 200],
            price: 4.06,
            selectedValue: 50,
            kilometers: 0,
            list: []
        };
        this.updateData();
    }

    async updateData() {
        const list = await fuelService.list();
        this.setState({list});
        if (list.length > 0) {
            const kilometers = list[0].kilometers;
            const price = list[0].price;
            this.setState({id: undefined, createdAt: undefined, kilometers, price})
        }
    }

    async save() {
        try {
            this.setState({saving: true});
            await fuelService.save({
                id: this.state.id,
                createdAt: this.state.createdAt,
                value: this.state.selectedValue,
                price: this.state.price,
                kilometers: this.state.kilometers
            });
            alert(`O abastecimento foi ${this.state.id ? 'atualizado' : 'salvo'}.`);
            this.updateData()
        } catch (e) {
            alert(e.message)
        } finally {
            this.setState({saving: false});
        }
    }

    async delete() {
        Alert.alert('Excluir registro?', 'Tem certeza?',
            [
                {
                    text: 'Cancelar', onPress: () => {
                        // cancel :)
                    }
                },
                {
                    text: 'Sim', onPress: () => {
                        this.deleteReally()
                    }
                }
            ],
            {
                cancelable: true
            }
        );
    }

    async deleteReally() {
        if (this.state.id) {
            try {
                await fuelService.delete(this.state.id);
                this.updateData()
            } catch (e) {
                alert(e.message)
            }
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
                                         liters={(value / this.state.price).toFixed(3) + ' L'}
                                         onSelect={(selectedValue) => this.setState({selectedValue})}
                                         selected={this.state.selectedValue === value}
                        />
                    )
                }
                <Text>KM atual</Text>
                <TextInput onChangeText={(kilometers) => this.setState({kilometers})}
                           keyboardType='numeric'
                           value={this.state.kilometers.toString()}
                />

                <Button title='Salvar'
                        onPress={this.save.bind(this)}
                        color='blue'
                        disabled={this.state.saving}
                />
                {
                    this.state.id ?
                        <Button title='Excluir'
                                onPress={this.delete.bind(this)}
                                color='red'
                                disabled={this.state.saving}
                        /> : null
                }
                <History list={this.state.list} onSelect={(item) => this.setState({
                    id: item.id,
                    createdAt: item.createdAt,
                    price: item.price,
                    selectedValue: item.value,
                    kilometers: item.kilometers
                })}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        padding: 6
    },
});
