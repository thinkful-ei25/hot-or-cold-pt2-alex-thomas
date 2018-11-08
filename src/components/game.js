import React from 'react';

import Header from './header';
import GuessSection from './guess-section';
import GuessCount  from './guess-count';
import GuessList from './guess-list';

export default class Game extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            feedback: "Make Your Guess!",
            guesses: ["2"],
            newGuess: ''
        };

    }

    // setNewGame(){
    //     this.setState({
    //         feedback: "Make Your Guess!",
    //         guesses: this.guesses.filter(item => typeof item === 'number')
    //     })
    // }

    // setFeedback(feedback){
    //     this.setState({
    //         feedback
    //     })
    // }
    
    setGuesses(guess){
        console.log(this.state.guesses)
        this.setState({
            newGuess: guess,
            guesses: [...this.state.guesses, this.state.newGuess]
        })
    }

    handleSubmit(event){
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <Header />
                <GuessSection feedback="Make Your Guess!" 
                    handleSubmit={e => this.handleSubmit(e)} 
                    setGuess={guess => this.setGuesses(guess)} />
                <GuessCount count={this.state.guesses.length} />
                <GuessList guesses={[this.state.guesses]} />
            </div>
        );
    }

}

