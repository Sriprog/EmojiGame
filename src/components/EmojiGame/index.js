/* 
Quick Tip 

- Use the below function in the EmojiGame Component to shuffle the emojisList every time when an emoji is clicked.

const shuffledEmojisList = () => {
  const {emojisList} = this.props
  return emojisList.sort(() => Math.random() - 0.5)
}

*/

import './index.css'
import {Component} from 'react'
import NavBar from '../NavBar'
import EmojiCard from '../EmojiCard'
import WinOrLoseCard from '../WinOrLoseCard'

class EmojiGame extends Component {
  state = {
    clickedEmojis: [],
    isGameOver: false,
    topScore: 0,
  }

  setTopScore = currentScore => {
    const {topScore} = this.state
    if (currentScore > topScore) {
      this.setState({topScore: currentScore})
    }
  }

  finishGameAndSetTopScore = newScore => {
    this.setIsGameOver(true)
    this.setTopScore(newScore)
  }

  onClickEmoji = id => {
    const {emojisList} = this.props
    const {clickedEmojis} = this.state
    const isEmojiPresent = clickedEmojis.includes(id)
    const clickedEmojisLength = clickedEmojis.length

    if (isEmojiPresent) {
      this.finishGameAndSetTopScore(clickedEmojisLength)
    } else {
      if (emojisList.length - 1 === clickedEmojisLength) {
        this.finishGameAndSetTopScore(emojisList.length)
      }
      this.setState(prevState => ({
        clickedEmojis: [...prevState.clickedEmojis, id],
      }))
    }
  }

  getShuffledEmojisList = () => {
    const {emojisList} = this.props
    return emojisList.sort(() => Math.random() - 0.5)
  }

  renderEmojisList = () => {
    const shuffledEmojiList = this.getShuffledEmojisList()
    return (
      <ul className="emojis-list-container">
        {shuffledEmojiList.map(eachEmoji => (
          <EmojiCard
            key={eachEmoji.id}
            emoji={eachEmoji}
            onClickEmoji={this.onClickEmoji}
          />
        ))}
      </ul>
    )
  }

  setIsGameOver = value => {
    this.setState({isGameOver: value})
  }

  resetGame = () => {
    this.setIsGameOver(false)
    this.setState({clickedEmojis: []})
  }

  renderScoreCard = () => {
    const {emojisList} = this.props
    const {clickedEmojis} = this.state
    const isWon = clickedEmojis.length === emojisList.length

    return (
      <WinOrLoseCard
        isWon={isWon}
        onClickPlayAgain={this.resetGame}
        score={clickedEmojis.length}
      />
    )
  }

  render() {
    const {clickedEmojis, isGameOver, topScore} = this.state
    return (
      <div className="emoji-game-container ">
        <NavBar
          currentScore={clickedEmojis.length}
          isGameOver={isGameOver}
          topScore={topScore}
        />
        <div className="emoji-game-body">
          {isGameOver ? this.renderScoreCard() : this.renderEmojisList()}
        </div>
      </div>
    )
  }
}

export default EmojiGame
