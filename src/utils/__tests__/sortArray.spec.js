import arrayOfObjectsSorter from '../sortArray';

describe.only('Test sortArray Function', () => {
  it('should work as expected', () => {
    const array = [
      {
        fellow_id: '-LONjhec1Re6QptQhduO',
        name: 'Howard Wilkinson',
        email: 'howard.wilkinson@andela.com',
        level: 'D0B',
        project: 'Roo'
      },
      {
        fellow_id: '-LOYInzRmYji3DUN9bxS',
        name: 'Antonette Reynolds',
        email: 'antonette.reynolds@andela.com',
        level: 'D0B',
        project: 'Roo'
      },
      {
        fellow_id: '-LQdduOe5sz1eUvJXrw7',
        name: 'Justus Upton',
        email: 'justus.upton@andela.com',
        level: 'D0B',
        project: 'Roo'
      },
      {
        fellow_id: '-LONnUSI__ZBVPzxCPJc',
        name: 'Patience Mills',
        email: 'patience.mills@andela.com',
        level: 'D0B',
        project: 'Roo'
      },
      {
        fellow_id: '-LOYP681vBGcZKzofgkd',
        name: 'Columbus Reichel',
        email: 'columbus.reichel@andela.com',
        level: 'D0B',
        project: 'Travel Tool'
      }
    ];

    const sortedAscendingArray = [
      {
        fellow_id: '-LOYInzRmYji3DUN9bxS',
        name: 'Antonette Reynolds',
        email: 'antonette.reynolds@andela.com',
        level: 'D0B',
        project: 'Roo'
      },
      {
        fellow_id: '-LOYP681vBGcZKzofgkd',
        name: 'Columbus Reichel',
        email: 'columbus.reichel@andela.com',
        level: 'D0B',
        project: 'Travel Tool'
      },
      {
        fellow_id: '-LONjhec1Re6QptQhduO',
        name: 'Howard Wilkinson',
        email: 'howard.wilkinson@andela.com',
        level: 'D0B',
        project: 'Roo'
      },
      {
        fellow_id: '-LQdduOe5sz1eUvJXrw7',
        name: 'Justus Upton',
        email: 'justus.upton@andela.com',
        level: 'D0B',
        project: 'Roo'
      },
      {
        fellow_id: '-LONnUSI__ZBVPzxCPJc',
        name: 'Patience Mills',
        email: 'patience.mills@andela.com',
        level: 'D0B',
        project: 'Roo'
      }
    ];

    const sortedDescendingArray = [
      {
        fellow_id: '-LONnUSI__ZBVPzxCPJc',
        name: 'Patience Mills',
        email: 'patience.mills@andela.com',
        level: 'D0B',
        project: 'Roo'
      },
      {
        fellow_id: '-LQdduOe5sz1eUvJXrw7',
        name: 'Justus Upton',
        email: 'justus.upton@andela.com',
        level: 'D0B',
        project: 'Roo'
      },
      {
        fellow_id: '-LONjhec1Re6QptQhduO',
        name: 'Howard Wilkinson',
        email: 'howard.wilkinson@andela.com',
        level: 'D0B',
        project: 'Roo'
      },
      {
        fellow_id: '-LOYP681vBGcZKzofgkd',
        name: 'Columbus Reichel',
        email: 'columbus.reichel@andela.com',
        level: 'D0B',
        project: 'Travel Tool'
      },
      {
        fellow_id: '-LOYInzRmYji3DUN9bxS',
        name: 'Antonette Reynolds',
        email: 'antonette.reynolds@andela.com',
        level: 'D0B',
        project: 'Roo'
      }
    ];
    const ascendingSorter = arrayOfObjectsSorter('name');
    const descendingSorter = arrayOfObjectsSorter('-name');

    expect(array.sort(ascendingSorter)).toEqual(sortedAscendingArray);
    expect(array.sort(descendingSorter)).toEqual(sortedDescendingArray);
  });
});
