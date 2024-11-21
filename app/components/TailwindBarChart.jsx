import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function TailwindBarChart({ data }) { // Destructure data from props

  return (
    <div className="bg-black rounded-lg shadow dark:bg-black">
      <ResponsiveContainer width="90%" height={200}>
        <BarChart data={data} margin={{ top: 0, right: 1, left: 2, bottom: 0 }}>
          <XAxis dataKey="label" stroke="#9CA3AF" /> {/* Tailwind Gray-400 */}
          <YAxis stroke="#9CA3AF" />
          <Tooltip />
          <Bar dataKey="value" fill="rgba(37, 99, 235, 0.6)" radius={[4, 4, 0, 0]} /> {/* Tailwind Blue-600 */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
