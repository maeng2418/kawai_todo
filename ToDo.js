import React, { Component } from "react";
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from "react-native"

const { width, height } = Dimensions.get("window");

export default class Todo extends Component{
    state = {
        isEditing: false,
        isCompleted: false
    };
    render(){
        const {isCompleted} = this.state;
        return(
        <View style={styles.container}>
            <TouchableOpacity onPress={this._toggleComplete}>
                <View style={[styles.circle, isCompleted ? styles.completedCircle : styles.uncompletedCircle]}/>
            </TouchableOpacity>
            <Text style={styles.text}>Hello I'm a To Do</Text>
        </View>
        );
    }
    _toggleComplete = () =>{
        this.setState(prevState =>{
            return {
                isCompleted: !prevState.isCompleted
            };
        });
    };
}

const styles = StyleSheet.create({
    container: {
        width: width -50,
        borderBottomColor: "#bbb",
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: "row", //옆에
        alignItems:"center"
    },
    circle:{
        width: 30,
        height: 30,
        borderRadius: 25,
        borderColor: "red",
        borderWidth: 3,
        marginRight: 20
    },
    completedCircle:{
        borderColor: "#bbb"
    },
    uncompletedCircle:{
        borderColor: "#F23657" //빨간색
    },
    text: {
        fontWeight: "600",
        fontSize: 20,
        marginVertical: 20
    }
})