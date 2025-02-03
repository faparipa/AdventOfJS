'use client';
import { useState } from 'react';
import styles from './pricingchart.module.css';
import Card from '@/components/pricinChart/card/Card';
import Toggle from '@/components/pricinChart/toggle/Toggle';

const cardsData = {
  PRO: {
    title: 'PRO',
    price: 18,
    for: 'For Claude power users',
    description: {
      a: 'More usage than free',
      b: 'Access to Projects to organize documents and charts',
      c: 'Ability to use more models, like Claude 3.5 Sonnet and Claude 3 Opus',
      d: 'Access to new features',
    },
  },
  TEAM: {
    title: 'TEAM',
    price: 25,
    for: 'For fast-growing teams',
    description: {
      a: 'More usage than Pro',
      b: 'Central billing and administration',
      c: 'Early access to collaboration features',
    },
  },
};

function PricingChartPage() {
  const [selectedPlan, setSelectedPlan] = useState('PRO');

  const togglePlan = () => {
    setSelectedPlan((prevPlan) => (prevPlan === 'PRO' ? 'TEAM' : 'PRO'));
  };

  const card = cardsData[selectedPlan];

  return (
    <div>
      <h2>Pricing Chart Page</h2>
      <div className={styles.container}>
        <img className={styles.logo} src='/LOGOA.svg' alt='logo' />
        <Card card={card} />
        <div className={styles.checkContainer}>
          <Toggle
            togglePlan={togglePlan}
            before='Pro'
            after='Team'
            checked={selectedPlan === 'TEAM'}
          />
        </div>
      </div>
    </div>
  );
}

export default PricingChartPage;
