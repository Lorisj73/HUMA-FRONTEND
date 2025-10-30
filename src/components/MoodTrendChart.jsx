import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
} from 'chart.js'

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Filler)

export default function MoodTrendChart({labels, data, theme, height}){
  const createGradient = (ctx, area, alphaTop = 0.18, alphaBottom = 0.18) => {
    const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top)
    // bottom -> top mapping: red (low) to blue (high)
    gradient.addColorStop(0, `rgba(239, 68, 68, ${alphaBottom})`) // red-500
    gradient.addColorStop(1, `rgba(59, 130, 246, ${alphaTop})`)   // blue-500
    return gradient
  }

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Humeur',
        data,
        borderColor: (context) => {
          const { chart } = context
          const { ctx, chartArea } = chart
          if (!chartArea) return '#3b82f6'
          return createGradient(ctx, chartArea, 1, 1)
        },
        backgroundColor: (context) => {
          const { chart } = context
          const { ctx, chartArea } = chart
          if (!chartArea) return 'rgba(59,130,246,0.12)'
          return createGradient(ctx, chartArea, 0.18, 0.18)
        },
        fill: true,
        tension: 0.35,
        pointRadius: 0,
        borderWidth: 3,
      },
    ],
  }

  const css = getComputedStyle(document.documentElement)
  const gridColor = css.getPropertyValue('--chart-grid')?.trim() || '#eef2f7'
  const tickColor = css.getPropertyValue('--chart-tick')?.trim() || '#6b7280'

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { mode: 'index', intersect: false } },
    scales: {
      x: { grid: { display: false }, ticks: { color: tickColor } },
      y: { grid: { color: gridColor }, ticks: { color: tickColor }, suggestedMin: 40, suggestedMax: 70 },
    },
  }

  const h = height || 'var(--chart-h, 180px)'
  return (
    <div className="chart" style={{height: h}}>
      <Line data={chartData} options={options} />
    </div>
  )
}
