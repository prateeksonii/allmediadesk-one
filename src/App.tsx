import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Scatter } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { evaluate, hasX } from './utils';

type Expression = {
  expression: string;
}

type Data = {
  x: number;
  y: number;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const { register, handleSubmit } = useForm<Expression>();
  const [result, setResult] = useState<number>();
  const [dataset, setDataset] = useState<Data[]>();
  const [showGraph, setShowGraph] = useState(false)

  const generateDataset = (expression: string) => {
    let data = [];
    for (let x = 0; x <= 100; x += 1) {
      const expr = expression.replaceAll('x', "*" + x);
      data.push({ x, y: evaluate(expr) })
    }

    console.log(data[0])

    setDataset(data)
  }

  const onSubmit: SubmitHandler<Expression> = (values) => {
    if (hasX(values.expression)) {
      setResult(undefined)
      generateDataset(values.expression);
      setShowGraph(true)
    } else {
      setResult(evaluate(values.expression));
      setShowGraph(false)
    }
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },

    },
  };

  return (
    <div style={{ width: '60%', margin: '4rem auto' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder='Enter your expression' {...register('expression', { required: true })} />
        <button type="submit">Evaluate</button>
      </form>


      <h4>Result: {result}</h4>
      {showGraph && <Scatter options={options} data={{
        labels: ['Data'],

        datasets: [{
          label: 'Data',
          data: dataset
        }]
      }} />}

    </div>
  )
}

export default App
