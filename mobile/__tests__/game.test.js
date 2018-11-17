import React from 'react';
import Game from "../components/game";
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer
    .create(<Game
        location={"madison"}
        date={"Tomorrow"}
        time={"12:00"}
        number_interested={3}
        number_going={4}
        difficulty={1}/>)
        .toJSON();
        expect(tree).toMatchSnapshot();
}) ;

it('renders correctly again', () => {
    const tree = renderer
    .create(<Game
        location={"Courts"}
        date={"11/27"}
        time={"3 PM"}
        number_interested={1}
        number_going={9}
        difficulty={4}/>)
        .toJSON();
        expect(tree).toMatchSnapshot();
}) ;

//These should throw errors
it('rejects location', () => {
    const tree = renderer
    .create(<Game
        location={4}
        date={"11/27"}
        time={"3 PM"}
        number_interested={1}
        number_going={9}
        difficulty={4}/>)
        .toJSON();

        
        expect(tree).toMatchSnapshot();
          
}) ;

it('rejects date', () => {
    const tree = renderer
    .create(<Game
        location={"Madison"}
        date={4}
        time={"3 PM"}
        number_interested={1}
        number_going={9}
        difficulty={4}/>)
        .toJSON();

        
        expect(tree).toMatchSnapshot();
          
}) ;

it('rejects time', () => {
    const tree = renderer
    .create(<Game
        location={"Madison"}
        date={"November 1"}
        time={6}
        number_interested={1}
        number_going={9}
        difficulty={4}/>)
        .toJSON();

        
        expect(tree).toMatchSnapshot();
          
}) ;

it('rejects number interested', () => {
    const tree = renderer
    .create(<Game
        location={"Courts"}
        date={"11/27"}
        time={"3 PM"}
        number_interested={"1"}
        number_going={9}
        difficulty={4}/>)
        .toJSON();
        expect(tree).toMatchSnapshot();
}) ;

it('rejects number going', () => {
    const tree = renderer
    .create(<Game
        location={"Courts"}
        date={"11/27"}
        time={"3 PM"}
        number_interested={1}
        number_going={"9"}
        difficulty={4}/>)
        .toJSON();
        expect(tree).toMatchSnapshot();
}) ;

it('rejects difficulty', () => {
    const tree = renderer
    .create(<Game
        location={"Courts"}
        date={"11/27"}
        time={"3 PM"}
        number_interested={1}
        number_going={9}
        difficulty={"4"}/>)
        .toJSON();
        expect(tree).toMatchSnapshot();
}) ;