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

describe.only('Test sortArray Function with nested objects', () => {
  it('should work as expected', () => {
    const array = [
      {
        project: {
          id: 50,
          manager: {
            name: 'Roy'
          }
        }
      },
      {
        project: {
          id: 31,
          manager: {
            name: 'Brian'
          }
        }
      },
      {
        project: {
          id: 56,
          manager: {
            name: 'Oluseyi'
          }
        }
      },
      {
        project: {
          id: 32,
          manager: {
            name: 'Grace'
          }
        }
      }
    ];

    const sortedAscendingArray = [
      {
        project: {
          id: 31,
          manager: {
            name: 'Brian'
          }
        }
      },
      {
        project: {
          id: 32,
          manager: {
            name: 'Grace'
          }
        }
      },
      {
        project: {
          id: 56,
          manager: {
            name: 'Oluseyi'
          }
        }
      },
      {
        project: {
          id: 50,
          manager: {
            name: 'Roy'
          }
        }
      }
    ];

    const ascendingSorter = arrayOfObjectsSorter('project.manager.name');

    expect(array.sort(ascendingSorter)).toEqual(sortedAscendingArray);
  });

  it('should work as expected', () => {
    const array = [
      {
        project: {
          id: 50,
          name: 'Est accusamus.'
        },
        role: {},
        vacancies: [],
        available_slots: 2
      }
    ];

    const sortedAscendingArray = [
      {
        project: {
          id: 50,
          name: 'Est accusamus.'
        },
        role: {},
        vacancies: [],
        available_slots: 2
      }
    ];

    const ascendingSorter = arrayOfObjectsSorter('project.name');

    expect(array.sort(ascendingSorter)).toEqual(sortedAscendingArray);
  });

  it('should work as expected', () => {
    const array = [];

    const ascendingSorter = arrayOfObjectsSorter('project.name.certification');
    expect(array.sort(ascendingSorter)).toEqual([]);
  });
});
