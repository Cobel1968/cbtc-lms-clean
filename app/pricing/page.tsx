const tiers = [
  {
    name: 'Student',
    price: '$0',
    features: ['Adaptive Learning Path', 'Digital Assessments', 'Progress Tracking'],
    cta: 'Get Started',
    mostPopular: false,
  },
  {
    name: 'Lead Trainer',
    price: '$49',
    features: ['Analog-to-Digital Bridge', 'Bilingual Mapping', 'Automated Certification', 'Student Analytics'],
    cta: 'Go Pro',
    mostPopular: true,
  },
  {
    name: 'Vocational Center',
    price: 'Custom',
    features: ['White-label Branding', 'Advanced Workforce Insights', 'LMS Integration', 'Priority Support'],
    cta: 'Contact Sales',
    mostPopular: false,
  },
];

export default function PricingPage() {
  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold">Invest in Pedagogical Efficiency</h2>
        <p className="mt-4 text-gray-600">Choose the plan that fits your training scale.</p>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div key={tier.name} className={`p-8 bg-white border rounded-2xl shadow-sm ${tier.mostPopular ? 'border-blue-500 ring-2 ring-blue-500' : ''}`}>
              <h3 className="text-xl font-semibold">{tier.name}</h3>
              <p className="mt-4 text-4xl font-bold">{tier.price}</p>
              <ul className="mt-6 space-y-4 text-left">
                {tier.features.map(f => <li key={f} className="text-sm text-gray-500">✓ {f}</li>)}
              </ul>
              <button className="mt-8 w-full py-3 px-4 rounded-lg bg-black text-white hover:bg-gray-800 transition">
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}