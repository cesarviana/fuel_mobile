import React, {Component} from 'react'
import {StyleSheet, View, TextInput, Text, Button, Alert, CheckBox} from 'react-native'
import FuelValueOption from './components/FuelValueOption'
import Messages from './services/Messages'
/**
 * This app stores fuel data, to track fuel consumption by month, money spent by period, etc.
 * */
import History from './components/History'

import fuelService from './services/FuelService'
import Message from "./components/Message";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: undefined,
            values: [50, 100],
            price: 4.06,
            selectedValue: 100,
            kilometers: 0,
            otherPriceChecked: false,
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
            Messages.alert(`O abastecimento foi ${this.state.id ? 'atualizado' : 'salvo'}.`);
            this.updateData()
        } catch (e) {
            Messages.alert(`O abastecimento foi ${this.state.id ? 'atualizado' : 'salvo'}.`);
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
                <TextInput
                    style={styles.textInput}
                    onChangeText={(price) => this.setState({price})}
                    value={this.state.price.toString()}
                    keyboardType='numeric'
                />
                <View style={styles.valueOptions}>
                    {
                        this.state.values.map(value =>
                            <FuelValueOption key={value}
                                             value={value}
                                             liters={this.litersL(value)}
                                             onSelect={(selectedValue) => this.setState({
                                                 selectedValue,
                                                 otherPriceChecked: false
                                             })}
                                             selected={!this.state.otherPriceChecked && this.state.selectedValue === value}
                            />
                        )
                    }
                </View>
                <View style={styles.otherValueContainer}>
                    <CheckBox
                        value={this.state.otherPriceChecked}
                        onValueChange={() => this.setState({otherPriceChecked: !this.state.otherPriceChecked})}
                    />
                    <Text>Outro valor</Text>
                    <TextInput
                        value={this.state.selectedValue.toString()}
                        style={[{borderWidth: 1, borderColor: 'red', width: 80}, styles.textInput]}
                        onChangeText={(selectedValue) => this.setState({selectedValue})}
                        editable={this.state.otherPriceChecked}
                        keyboardType='numeric'
                    />
                </View>

                <Text>{this.litersL(this.state.selectedValue)}</Text>
                <Text>KM atual</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(kilometers) => this.setState({kilometers})}
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
                    otherPriceChecked: this.state.values.find((v) => v === item.value) === undefined,
                    id: item.id,
                    createdAt: item.createdAt,
                    price: item.price,
                    selectedValue: item.value,
                    kilometers: item.kilometers
                })}/>
                <Message/>
            </View>
        );
    }

    litersL(value) {
        return (value / this.state.price).toFixed(3) + ' L'
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'lightgreen',
        flex: 1,
        paddingTop: 20,
        padding: 6
    },
    textInput: {
        fontSize: 25
    },
    valueOptions: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    otherValueContainer: {
        display: 'flex',
        flexDirection: 'row'
    }
});
