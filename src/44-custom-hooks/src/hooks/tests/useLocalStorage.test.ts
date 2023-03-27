import {  renderHook, act } from '@testing-library/react';
import useLocalStorage from '../useLocalStorage';


beforeEach(() => {
    localStorage.clear()
})

test('Should accept and render the same initial state', () => {
  const {result} = renderHook(useLocalStorage, {
    initialProps: {
        key:'key',
        initState: 'value',
    }
  });

  expect(result.current[0]).toBe('value')
});


test('State can be an object', () => {
  const obj = {prop1: 1, prop2: "2"}
  const {result} = renderHook(useLocalStorage, {
    initialProps: {
        key:'key',
        initState: obj,
    }
  });

  expect(result.current[0]).toStrictEqual(obj)
});

test('Parsable strings on local storage parsed and taken as initState', () => {
  localStorage.setItem('key', '{"prop":1}')
  const {result} = renderHook(useLocalStorage, {
    initialProps: {
        key:'key',
        initState: 'value',
    }
  });

  expect(result.current[0]).toStrictEqual({prop: 1})
});



test('State should be modified if setState (second argument) is called', () => {
    const {result} = renderHook(useLocalStorage, {
      initialProps: {
          key:'key',
          initState: 'value',
      }
    }); 


    act(() => {
        result.current[1]('newValue')
    })
    
    expect(result.current[0]).toBe('newValue')
  });


  test('If there is already a value on localStorage, the initState will be ignored', () => {
    localStorage.setItem('key', 'ignoreValue')
    const {result} = renderHook(useLocalStorage, {
      initialProps: {
          key:'key',
          initState: 'value',
      }
    }); 

    expect(result.current[0]).toBe('ignoreValue')
});

