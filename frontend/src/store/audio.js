import React, { useState } from 'react';

export const Context = React.createContext({});

const Container = (props) => {

  const [isPlay, setIsPlay] = useState(false);

  return (
    <Context.Provider value={{ isPlay, setIsPlay }}>
      {props.children}
      {isPlay && (
        <audio
          src='https://docs.google.com/uc?export=open&id=14JlzHWUE2TqAsN237ft43SOw02xDPori'
          autoPlay={true}>
        </audio>
      )}
    </Context.Provider>
  );
};

export default Container;