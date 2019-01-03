import React, { Component } from "react";
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, TextInput } from "react-native"
import PropTypes from "prop-types";

const { width, height } = Dimensions.get("window");

export default class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            isCompleted: false,
            toDoValue: props.text
        };
    }

    static PropTypes = {
        text: PropTypes.string.isRequired,
        isCompleted: PropTypes.bool.isRequired,
        deleteToDo: PropTypes.func.isRequired,
        id: PropTypes.string.isRequired,
        uncompleteToDo: PropTypes.func.isRequired,
        completeToDo: PropTypes.func.isRequired,
        updateToDo: PropTypes.func.isRequired
    }
    
    render() {
        const { isEditing, toDoValue } = this.state;
        const { text, id, deleteToDo,  isCompleted} = this.props; //appjs에서 completed or uncompleted되고, state가 아니라 props에서 iscompleted를 가져옴.
        return (
            <View style={styles.container}>
                <View style={styles.column}>
                    <TouchableOpacity onPress={this._toggleComplete}>
                        <View style={[styles.circle, isCompleted ? styles.completedCircle : styles.uncompletedCircle]} />
                    </TouchableOpacity>
                    {isEditing ?
                        (
                            <TextInput
                                style={[styles.text, styles.input, isCompleted ? styles.completedText : styles.uncompletedText]}
                                value={toDoValue} //기본값이 기존에 있던 내용.
                                multiline={true}
                                onChangeText={this._controlInput} //텍스트가 변화하면 텍스트를 변화시켜줌.
                                returnKeyType={"done"}
                                onBlur={this._finishEditing}
                            />
                        ) :
                        (
                            <Text style={[styles.text, isCompleted ?
                                styles.completedText :
                                styles.uncompletedText]}>
                                {text}
                            </Text>
                        )
                    }
                </View>
                {isEditing ?
                    (
                        <View style={styles.actions}>
                            <TouchableOpacity onPressOut={this._finishEditing}>
                                <View style={styles.actionContainer}>
                                    <Text style={styles.actionText}>✅</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ) :
                    (
                        <View style={styles.actions}>
                            <TouchableOpacity onPressOut={this._startEditing}>
                                <View style={styles.actionContainer}>
                                    <Text style={styles.actionText}>✏</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPressOut ={()=>deleteToDo(id)}>
                                <View style={styles.actionContainer}>
                                    <Text style={styles.actionText}>❌</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )
                }
            </View>
        );
    }
    _toggleComplete = () => {
        const {isCompleted, uncompleteToDo, completeToDo, id}=this.props;
        if(isCompleted){
            uncompleteToDo(id);
        } else {
            completeToDo(id);
        }
    };

    _startEditing = () => {
        this.setState({
            isEditing: true
        });
    };

    _finishEditing = () => {
        const {toDoValue} = this.state;
        const {id, updateToDo} = this.props;
        updateToDo(id, toDoValue);
        this.setState({
            isEditing: false
        });
    };

    _controlInput = (text) => {
        this.setState({
            toDoValue: text //텍스트가 발생하면 텍스트로 toDoValue를 변화시킴.
        })
    }
}

const styles = StyleSheet.create({
    container: {
        width: width - 50,
        borderBottomColor: "#bbb",
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: "row", //옆에
        alignItems: "center",
        justifyContent: "space-between"
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 25,
        borderColor: "red",
        borderWidth: 3,
        marginRight: 20
    },
    completedCircle: {
        borderColor: "#bbb"
    },
    uncompletedCircle: {
        borderColor: "#F23657" //빨간색
    },
    text: {
        fontWeight: "600",
        fontSize: 20,
        marginVertical: 20
    },
    completedText: {
        color: "#bbb",
        textDecorationLine: "line-through"
    },
    uncompletedText: {
        color: "#353839"
    },
    column: {
        flexDirection: "row",
        alignItems: "center",
        width: width / 2,
    },
    actions: {
        flexDirection: "row",
    },
    actionContainer: {
        marginVertical: 10,
        marginHorizontal: 10
    },
    input: {
        width: width / 2,
        marginVertical: 15,
        paddingBottom: 5
    }
});