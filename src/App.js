import React, { useState, useRef, useEffect, createRef } from 'react';
import Select from 'react-select';
import './App.css';

// dummy data
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
  { value: 'chicken', label: 'chicken' },
  { value: 'nuggets', label: 'nuggets' },
  { value: 'burger', label: 'burger' },
  { value: 'king', label: 'king' },
  { value: 'happy', label: 'happy' },
  { value: 'meal', label: 'meal' },
  { value: 'apple', label: 'apple' },
  { value: 'cake', label: 'cake' },
  { value: 'chicken wings', label: 'chicken wings' },
];
const selectMenus = [ options, options, options, options, options, options, options];


export default function App() {
  const menusRef = useRef(selectMenus.map(() => createRef()));

  const [selectedOption, setSelectedOption] = useState(null);

  const [dropValues, setDropValues] = useState([]);
  const [Yaxis, setYaxis] = useState([]);



  useEffect(() => {
    determineDropUp()
    window.addEventListener("scroll", determineDropUp)
    window.addEventListener('resize', determineDropUp);

  }, [])

  const determineDropUp = () => {
    getYAxis();
    getDropValue();
  }


const getYAxis = () => {
  const nextYaxis = menusRef.current.map(
    ref => {
      // console.log("ref y axis", ref.current.getBoundingClientRect().y)
      return ref.current.getBoundingClientRect().y;
    }
  );
  setYaxis(nextYaxis);
}

const getDropValue = () => {

  const centerViewport = window.innerHeight / 2;

  const nextDropValue = menusRef.current.map(
    ref => {
      
      const menuYaxis = ref.current.getBoundingClientRect().y;

      if (menuYaxis < centerViewport) {
        return 'bottom'
      } else {
        return 'top'
      }
    }
  );
  setDropValues(nextDropValue);
}


  return (
    
      <div className="App" style={{width: '50%', padding: '2em'}}>

        {selectMenus.map((menu, index) => {
                  return (
                    <div 
                    ref={menusRef.current[index]} 
                    key={index}
                    >
                    <Select
                      className='react-select'
                      defaultValue={selectedOption}
                      options={options}
                      menuPlacement={dropValues[index]}
                    />
                    </div>
                  )
        })}

      </div>
  );
}