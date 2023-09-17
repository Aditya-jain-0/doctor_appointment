import React, { useState } from 'react';

const Home = () => {
  const doclist = [
    {
      name: 'A',
      timings: ['1', '2', '3', '4'],
    },
    {
      name: 'B',
      timings: ['5', '6', '7', '8'],
    },
    {
      name: 'C',
      timings: ['9', '10', '11', '12'],
    },
    {
      name: 'D',
      timings: ['13', '14', '15', '16'],
    },
    {
      name: 'E',
      timings: ['17', '18', '19', '20'],
    },
  ];

  const [selectedItem, setSelectedItem] = useState(null);

  const handleclick = (name, timings) => {
    setSelectedItem({ name, timings });
  };

  return (
    <>
      <div className='user'>
        <button>
          <a href='/login'>Login</a>
        </button>
        &nbsp;
        <button>
          <a href='/register'>Register</a>
        </button>
      </div>
      <br />
      <div className='main'>
        <div className='doctorslist'>
          <ol>
            {doclist.map((item, key) => (
              <li
                onClick={() => handleclick(item.name, item.timings)}
                key={key}
                className={selectedItem?.name === item.name ? 'selected' : ''}
              >
                {item.name}
              </li>
            ))}
          </ol>
        </div>
        <div className='timings'>
          {selectedItem && (
            <p>
              Timings for {selectedItem.name}: {selectedItem.timings.join(', ')}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
