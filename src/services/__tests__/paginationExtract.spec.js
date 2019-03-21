import paginationExtract from '../paginationExtract';

const response = {
  summary: {
    ltWk5OffTrack: 10,
    gteWk5OffTrack: 12,
    onTrack: 13
  },
  page: 2,
  payload: [
    {
      id: 'AND/F/008',
      firstName: 'Amber',
      lastName: 'Gill',
      level: 'D0B',
      status: 'gteWk5OffTrack',
      quality: 0.86,
      quantity: 1.14,
      initiative: 1,
      communication: 1.29,
      professionalism: 1.29,
      integration: 1.29
    },
    {
      id: 'AND/F/009',
      firstName: 'Lee',
      lastName: 'Hampton',
      level: 'D0B',
      status: 'gteWk5OffTrack',
      quality: 0.71,
      quantity: 0.86,
      initiative: 0.86,
      communication: 1.29,
      professionalism: 1.14,
      integration: 1
    },
    {
      id: 'AND/F/010',
      firstName: 'Edith',
      lastName: 'Estrada',
      level: 'D0B',
      status: 'gteWk5OffTrack',
      quality: 0.43,
      quantity: 0.43,
      initiative: 0.71,
      communication: 0.86,
      professionalism: 0.86,
      integration: 1
    },
    {
      id: 'AND/F/021',
      firstName: 'James',
      lastName: 'Katarikawe',
      level: 'D0B',
      status: 'gteWk5OffTrack',
      quality: 0.67,
      quantity: 0.83,
      initiative: 1,
      communication: 1.17,
      professionalism: 1.17,
      integration: 1
    }
  ],
  firstPageURL: 'http://localhost:8000/api/fellows?page=1',
  from: 5,
  pages: 3,
  finalPageURL: 'http://localhost:8000/api/fellows?page=3',
  nextPageURL: 'http://localhost:8000/api/fellows?page=3',
  perPage: '4',
  prevPageURL: 'http://localhost:8000/api/fellows?page=1',
  to: 8,
  total: 12
};

const paginationResponse = {
  page: 2,

  firstPageURL: 'http://localhost:8000/api/fellows?page=1',
  from: 5,
  pages: 3,
  finalPageURL: 'http://localhost:8000/api/fellows?page=3',
  nextPageURL: 'http://localhost:8000/api/fellows?page=3',
  perPage: '4',
  prevPageURL: 'http://localhost:8000/api/fellows?page=1',
  to: 8,
  total: 12
};

it('should extract the pagination data', () => {
  expect(paginationExtract(response)).toEqual(paginationResponse);
});
