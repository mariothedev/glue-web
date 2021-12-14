import { useState, useEffect } from 'react'
// import { couch } from '../../app/db'
// import { useAppSelector, useAppDispatch } from '../../app/hooks'
// import {
//   decrement,
//   increment,
//   incrementByAmount,
//   incrementAsync,
//   incrementIfOdd,
//   selectCount,
// } from './counterSlice'
// import styles from './Counter.module.css'

function Counter() {
  // const dispatch = useAppDispatch()
  // const count = useAppSelector(selectCount)
  // const [incrementAmount, setIncrementAmount] = useState('2')

  // const incrementValue = Number(incrementAmount) || 0
  useEffect(() => {
    // couch.listDatabases().then(dbs => console.log(dbs), err => {
    //   // request error occured
    //   console.log(err)
    // });
    // db.insert(p).then((response) => {
    //   p.processAPIResponse(response)
    //   console.log(p)
    // })
  }, []);
  return (
    <div>
      {/* <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() => dispatch(incrementByAmount(incrementValue))}
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync(incrementValue))}
        >
          Add Async
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch(incrementIfOdd(incrementValue))}
        >
          Add If Odd
        </button>

      </div> */}
      <p>Hello</p>
    </div>
  )
}

export default Counter



