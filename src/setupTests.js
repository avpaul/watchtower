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
const result = {
  event: 'success',
  info: {
    original_filename: 'name',
    url: 'url',
    public_id: 'id',
    format: 'format'
  }
};

window.cloudinary = {
  createUploadWidget: jest
    .fn()
    .mockImplementationOnce((params, callback) => callback(false, result))
};
