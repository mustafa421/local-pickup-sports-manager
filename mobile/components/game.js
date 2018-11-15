//import libraries

import React from 'react';
import {Text, Image, View, date} from 'react-native';
import PropTypes from 'prop-types';

//Create Game Component
function Game(props) {
    return (
        <View style={{alignItems: 'center'}}>
            
            <Text>Location: {props.location} </Text>
            <Text>Date: {props.date} </Text>
            <Text>Time: {props.time} </Text>
            <Text>Going: {props.number_going} </Text>
            <Text>Interested: {props.number_interested} </Text>
            <Text>Difficulty: {props.difficulty} </Text>
        </View>
    );
}

Game.propTypes = {
    location: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    number_going: PropTypes.number.isRequired,
    number_interested: PropTypes.number.isRequired,
    difficulty: PropTypes.number.isRequired
}
//Render the Game Component to the Device
export default Game;