import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { evaluate } from './utils';

type Expression = {
  expression: string;
}

function App() {
  const { register, handleSubmit } = useForm<Expression>();
  const [result, setResult] = useState<number>();

  const onSubmit: SubmitHandler<Expression> = (values) => {
    setResult(evaluate(values.expression));
  }

  return (
    <div style={{ width: '60%', margin: '4rem auto' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder='Enter your expression' {...register('expression', { required: true })} />
        <button type="submit">Evaluate</button>
      </form>
      <h4>Result: {result}</h4>
    </div>
  )
}

export default App
