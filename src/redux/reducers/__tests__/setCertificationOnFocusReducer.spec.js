import setCertificationOnFocusReducer from '../setCertificationOnFocusReducer';
import { SET_CERTIFICATION_ON_FOCUS } from '../../constants/cadreCertificationTypes';

it('set certification on fucus', () => {
  expect(
    setCertificationOnFocusReducer(
      {},
      {
        type: SET_CERTIFICATION_ON_FOCUS,
        data: {}
      }
    )
  ).toMatchObject({});
});
