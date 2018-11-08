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
            guesses: [],
            newGuess: '',
            winningNum: (Math.floor(Math.random() * 100) + 1).toString()
        };

    }

    setNewGame(){
        this.setState({
            feedback: "Make Your Guess!",
            guesses: this.state.guesses.filter(item => typeof item === 'number'),
            newGuess: '',
            winningNum: (Math.floor(Math.random() * 100) + 1).toString()
        })
    }

    feedback() {
        if (this.state.newGuess === this.state.winningNum) {
            this.setFeedback('Winner! Click new game to play again!');
        } else if ((Math.abs(this.state.newGuess - this.state.winningNum) >= 15 )) {
            this.setFeedback('Cold!');
        } else if ((Math.abs(this.state.newGuess - this.state.winningNum) >= 10 )) {
            this.setFeedback('Warm!');
        } else if ((Math.abs(this.state.newGuess - this.state.winningNum) >= 5 )) {
            this.setFeedback('Hot!');
        } else {
            this.setFeedback('Super HOT!')
        }
    }

    noDupes() {
        for (let i = 0; i < this.state.guesses.length; i++) {
            if (this.state.guesses[i] === this.state.newGuess) {
                return true;
            }
        }
    }

    setFeedback(feedback){
        this.setState({
            feedback
        })
    }
    
    setGuesses(guess){
        console.log(this.state.guesses)
        this.setState({
            newGuess: guess,
            // guesses: [...this.state.guesses, this.state.newGuess]
        })
    }

    handleSubmit(event){
        event.preventDefault();
        this.feedback();
        event.target.reset();
        this.setState({
            guesses: [...this.state.guesses, this.state.newGuess]
        })
        if (this.noDupes()) {
            alert('You have already guessed this number');
        }
    }

    render() {
        return (
            <div>
                <Header newGame={() => this.setNewGame()}/>
                <GuessSection feedback={this.state.feedback} 
                    handleSubmit={e => this.handleSubmit(e)} 
                    setGuess={guess => this.setGuesses(guess)} />
                <GuessCount count={this.state.guesses.length} />
                <GuessList guesses={this.state.guesses} />
            </div>
        );
    }

}

