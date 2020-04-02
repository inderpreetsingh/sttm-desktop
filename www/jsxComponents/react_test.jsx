'use strict';

const e = React.createElement;

class ReactTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = { clicked: false };
  }

  render() {
    if (this.state.clicked) {
      return 'You clicked react test';
    }

    return <button onClick={() => this.setState({ clicked: true })}>React Test</button>;
  }
}

const domContainer = document.querySelector('#react-test-container');
ReactDOM.render(e(ReactTest), domContainer);
