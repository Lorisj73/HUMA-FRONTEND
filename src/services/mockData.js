export const dailyMetrics = [
  { key: 'workload', label: 'Charge de travail', value: 3.8, unit: '/5', delta: -0.2 },
  { key: 'recognition', label: 'Reconnaissance', value: 4.2, unit: '/5', delta: -0.2 },
  { key: 'collab', label: 'Collaboration', value: 4.5, unit: '/5', delta: 0.2 },
  { key: 'balance', label: 'Équilibre vie pro/perso', value: 4.2, unit: '/5', delta: -0.2 },
]

export const keywords = [
  { label: 'Productif', count: 8 },
  { label: 'Fatigue', count: 3 },
  { label: 'Calme', count: 4 },
]

export const previousDays = [
  { label: 'Positif', count: 3 },
  { label: 'Négatif', count: 1 },
  { label: 'Neutre',  count: 4 },
]

export const moodAverage = { value: 3.8, unit: '/5', trend: -0.2 }

export const moodEvolution = {
  summary: 'Neutre',
  percent: 62,
  delta: +8,
  labels: ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'],
  data: [0,100,55,61,63,59,62],
}
