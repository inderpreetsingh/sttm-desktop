'use strict';

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === 'object' || typeof call === 'function') ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError(
      'Super expression must either be null or a function, not ' + typeof superClass,
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, enumerable: false, writable: true, configurable: true },
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}

var e = React.createElement;

var ReactTest = (function(_React$Component) {
  _inherits(ReactTest, _React$Component);

  function ReactTest(props) {
    _classCallCheck(this, ReactTest);

    var _this = _possibleConstructorReturn(
      this,
      (ReactTest.__proto__ || Object.getPrototypeOf(ReactTest)).call(this, props),
    );

    _this.state = { clicked: false };
    return _this;
  }

  _createClass(ReactTest, [
    {
      key: 'render',
      value: function render() {
        var _this2 = this;

        if (this.state.clicked) {
          return 'You clicked react test';
        }

        return React.createElement(
          'button',
          {
            onClick: function onClick() {
              return _this2.setState({ clicked: true });
            },
          },
          'React Test',
        );
      },
    },
  ]);

  return ReactTest;
})(React.Component);

var domContainer = document.querySelector('#react-test-container');
ReactDOM.render(e(ReactTest), domContainer);
