import React from 'react';
import PlayerSheet from 'components/Sheet';
import GameMap from 'components/Map';
import { createNewGame } from 'lib/GameEngine';
import './styles.css';
import 'normalize.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {Map: null, game: null, actions: {}};
  }

  componentDidMount() {
    const {game, Map, actions} = createNewGame({ updateHandler: this.handleGameChange });
    console.log('game is', game)
    console.log('the map', game.actions);
    this.setState({ game, Map, actions });
  }

  handleGameChange = (gameUpdate) => {
    console.log('handle game change called');
    this.setState({ game: gameUpdate });
  }

  render() {
    const { game, Map, actions } = this.state;
    return (
      <div className="app">
        <h2>React Application Scaffolding</h2>
        <div className="app-container">
          <PlayerSheet />
          {Map && <GameMap game={game} Map={Map} actions={actions} />}
        </div>
      </div>
    );
  }
}

export default App;
