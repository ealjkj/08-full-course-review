import {  renderHook, act, waitFor } from '@testing-library/react';
import useIndexedDB from '../useIndexedDB';
import { clear, set } from 'idb-keyval';
import "fake-indexeddb/auto";

beforeEach(() => {
  clear();
})


test('Before the db access, the status should be loading and the state ans setState should be null', async () => {
  const {result} = renderHook(useIndexedDB, {
    initialProps: {
        key:'key',
        initState: 'value',
    }
  });


  expect(result.current).toStrictEqual([null, null, {isLoading: true, isError: false}])

});


test('Should accept an initial state', async () => {
  const {result} = renderHook(useIndexedDB, {
    initialProps: {
        key:'key',
        initState: 'value',
    }
  });

  await waitFor(() => {
    expect(result.current[0]).toBe('value')
  })
});


test('State can be an object', async () => {
  const obj = {prop1: 1, prop2: "2"}
  const {result} = renderHook(useIndexedDB, {
    initialProps: {
        key:'key',
        initState: obj,
    }
  });
  await waitFor(() => {
    expect(result.current[0]).toStrictEqual(obj)
  })
  
});

test('objects on the db will be taken as initial state instead of the args', async () => {
  await set('key', {prop : 1})
  const {result} = renderHook(useIndexedDB, {
    initialProps: {
        key:'key',
        initState: 'value',
    }
  });

  await waitFor(() => {
    expect(result.current[0]).toStrictEqual({prop: 1})
  })

});



test('State should be modified if setState (second argument) is called', async () => {
    const {result} = renderHook(useIndexedDB, {
      initialProps: {
          key:'key',
          initState: 'value',
      }
    }); 

    await waitFor(() => {
      expect(result.current[0]).toBe('value')
    })

    act(() => {
        result.current[1]('newValue')
    })
    
    expect(result.current[0]).toBe('newValue')
  });


