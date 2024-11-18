import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts';
import { Wallet, Users, Rocket } from 'lucide-react';
import { Container, PageHeader, Card } from '../components/shared';

const data = [
  { name: 'Public Sale', value: 40, color: '#EAB308', description: 'Available for public token sale participants' },
  { name: 'Team & Advisors', value: 20, color: '#3B82F6', description: '12-month cliff, then 24-month linear vesting' },
  { name: 'Ecosystem Growth', value: 15, color: '#EC4899', description: '6-month cliff, then 18-month linear vesting' },
  { name: 'Marketing', value: 15, color: '#8B5CF6', description: '3-month cliff, then 12-month linear vesting' },
  { name: 'Airdrop', value: 10, color: '#10B981', description: 'Reserved for community airdrops and rewards' }
];

const TokenStats = [
  {
    icon: <Wallet className="w-12 h-12 text-yellow-400" />,
    title: "Initial Supply",
    value: "1,000,000 BWT",
    description: "Fixed supply, no additional minting"
  },
  {
    icon: <Users className="w-12 h-12 text-yellow-400" />,
    title: "Max Supply",
    value: "1,000,000 BWT",
    description: "Hard cap, ensuring value preservation"
  },
  {
    icon: <Rocket className="w-12 h-12 text-yellow-400" />,
    title: "Token Launch Price",
    value: "$1.70 USD",
    description: "Strategic launch pricing for sustainable growth"
  }
];

const Tokenomics = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle,
      fill, payload, percent, value } = props;

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 3}
          outerRadius={outerRadius + 6}
          fill={fill}
        />
        <g transform={`translate(${cx},${cy})`}>
          <text x={0} y={-20} textAnchor="middle" fill="#fff" className="text-lg font-bold">
            {payload.name}
          </text>
          <text x={0} y={10} textAnchor="middle" fill="#fff" className="text-2xl font-bold">
            {`${value}%`}
          </text>
        </g>
      </g>
    );
  };

  return (
    <Container className="py-20">
      <PageHeader
        title="Tokenomics"
        description="Understanding BWT Token Distribution and Allocation"
      />

      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        <Card className="flex flex-col items-center justify-center min-h-[400px]">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                dataKey="value"
                onMouseEnter={(_, index) => setActiveIndex(index)}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    className="transition-all duration-300"
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h2 className="text-2xl font-bold mb-6 text-white">Distribution Details</h2>
          <div className="space-y-4">
            {data.map((item, index) => (
              <motion.div
                key={index}
                className={`p-4 rounded-lg transition-all duration-300 cursor-pointer ${
                  activeIndex === index ? 'bg-gray-700/50 scale-105' : 'hover:bg-gray-700/30'
                }`}
                onMouseEnter={() => setActiveIndex(index)}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full transition-transform duration-300" 
                      style={{ 
                        backgroundColor: item.color,
                        transform: activeIndex === index ? 'scale(1.2)' : 'scale(1)'
                      }} 
                    />
                    <h3 className="font-semibold text-white">{item.name}</h3>
                  </div>
                  <span className="text-yellow-400 font-bold">{item.value}%</span>
                </div>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {TokenStats.map((item, index) => (
          <Card key={index}>
            <div className="flex flex-col items-center text-center">
              {item.icon}
              <h3 className="text-xl font-semibold mt-4 mb-2">{item.title}</h3>
              <p className="text-2xl font-bold text-yellow-400 mb-2">{item.value}</p>
              <p className="text-gray-400 text-sm">{item.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default Tokenomics;