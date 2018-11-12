//import libraries

import React from 'react';
import {TEXT, IMAGE, VIEW} from 'react-native';

//Create Game Component
const Game = () => {


    return (
        <View style={{alignItems: 'center'}}>
            
            <Text>Location: {this.props.location} </Text>
            <Text>Date: {this.props.date} </Text>
            <Text>Time: {this.props.time} </Text>
            <Text>Going: {this.props.number_going} </Text>
            <Text>Interested: {this.props.number_interested} </Text>
            <Text>Difficulty: {this.props.difficulty} </Text>
        </View>
    );
}

//Render the Game Component to the Device
export default Game;