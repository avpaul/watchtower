import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import localStorageMock from './__mocks__/localStorageMock';

configure({ adapter: new Adapter() });

window.localStorage = localStorageMock;

// Add global polyfill for window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  value: () => ({
    matches: false,
    addListener: () => {},
    removeListener: () => {}
  })
});
