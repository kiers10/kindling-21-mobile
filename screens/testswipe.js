import React, { Component } from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

import SwipeCards from 'react-native-swipe-cards';

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.card, {backgroundColor: this.props.backgroundColor}]}>
        <Text>{this.props.text}</Text>
      </View>
    )
  }
}

class NoMoreCards extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text style={styles.noMoreCardsText}>No more cards</Text>
      </View>
    )
  }
}

export default class testswipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [
        {text: 'Tomato', backgroundColor: 'red'},
        {text: 'Aubergine', backgroundColor: 'purple'},
        {text: 'Courgette', backgroundColor: 'green'},
        {text: 'Blueberry', backgroundColor: 'blue'},
        {text: 'Umm...', backgroundColor: 'cyan'},
        {text: 'orange', backgroundColor: 'orange'},
      ],
      word: "Joseph",
      color: "gray"
    };
    this.handleNope = this.handleNope.bind(this);
  }

  renderItem = ({}) => {
    return(
      <View style={[styles.card, {backgroundColor: this.state.color}]}>
        <Text>{this.state.word}</Text>
      </View>
    )
  }

  handleYup (card) {
    console.log(`Yup for ${card.text}`)

    let obj = new Object;
    obj.text = 'crazyLine';
    obj.backgroundColor = 'gray';

    console.log("Object count: " + this.cards.length);
    // this.pushy(obj);

    // let obj = new Object;
    // obj.text = 'Brady';
    // obj.backgroundColor = 'red';
    // // this.setState({ cards: [obj] });
    // // this.cards = [obj];
    // this.state.cards.push(obj);
  }
s
  pushy = async(val) => {
    this.setState({ cards: [...this.state.cards, val] });
  }

  changeState = async (val) => {
    this.setState({word: val});
  }

  handleNope (card) {
    console.log(`Nope for ${card.text}`)
    this.setState({word: val});

    // let obj = new Object;
    // obj.text = 'Newton';
    // obj.backgroundColor = 'blue';
    // // this.setState({ cards: [obj] });
    // // this.cards = [obj];
    // this.state.cards.push(obj);
  }
  handleMaybe (card) {
    console.log(`Maybe for ${card.text}`)
  }
  render() {
    // If you want a stack of cards instead of one-per-one view, activate stack mode
    // stack={true}
    return (
      <SwipeCards
        cards={this.state.cards}
        renderCard={this.renderItem}
        renderNoMoreCards={() => <NoMoreCards />}

        handleYup={this.handleYup}
        handleNope={this.handleNope}
        handleMaybe={this.handleMaybe}
        hasMaybeAction
        loop={true}
      />
    )
  }
}

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 300,
  },
  noMoreCardsText: {
    fontSize: 22,
  }
})