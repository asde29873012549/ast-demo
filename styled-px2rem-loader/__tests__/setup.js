global.React = {
  createElement: jest.fn(),
};

global.styled = new Proxy({}, {
  get: () => jest.fn(),
});

global.css = jest.fn();
global.createGlobalStyle = jest.fn();
global.keyframes = jest.fn();