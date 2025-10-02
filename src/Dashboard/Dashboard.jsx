import React from 'react';
import { ArrowUp, ArrowDown, ShoppingBag, Plane, User, Zap, Home, ArrowRight, Wallet, TrendingUp, TrendingDown, Building, Film, Utensils, Brain, Lightbulb } from 'lucide-react';

const Dashboard = () => {

  // Data for Expenses List
  const expenses = [
      { id: 1, title: 'Rent', date: '1st Feb 2025', amount: -1200, icon: Building, iconBg: 'bg-red-500/10', iconColor: 'text-red-500' },
      { id: 2, title: 'Groceries', date: '5th Feb 2025', amount: -350, icon: ShoppingBag, iconBg: 'bg-pink-500/10', iconColor: 'text-pink-500' },
      { id: 3, title: 'Entertainment', date: '8th Feb 2025', amount: -150, icon: Film, iconBg: 'bg-purple-500/10', iconColor: 'text-purple-500' },
      { id: 4, title: 'Dining Out', date: '12th Feb 2025', amount: -80, icon: Utensils, iconBg: 'bg-orange-500/10', iconColor: 'text-orange-500' },
  ];

  // Data for Income List
  const income = [
      { id: 1, title: 'Salary', date: '1st Feb 2025', amount: 12000, icon: User, iconBg: 'bg-green-500/10', iconColor: 'text-green-500' },
      { id: 2, title: 'Freelance Project', date: '10th Feb 2025', amount: 2500, icon: Zap, iconBg: 'bg-yellow-500/10', iconColor: 'text-yellow-500' },
      { id: 3, title: 'Stock Dividend', date: '15th Feb 2025', amount: 500, icon: TrendingUp, iconBg: 'bg-blue-500/10', iconColor: 'text-blue-500' },
  ];

  // AI Suggestions Data
  const aiSuggestions = [
    {
      id: 1,
      title: 'Reduce Dining Out',
      description: 'You spent $80 on dining out. Try cooking at home to save ~$200/month.',
      type: 'savings',
      priority: 'high',
      icon: Utensils
    },
    {
      id: 2,
      title: 'Emergency Fund Goal',
      description: 'Build an emergency fund of $15,000 (3 months expenses). You\'re 82% there!',
      type: 'goal',
      priority: 'medium',
      icon: TrendingUp
    },
    {
      id: 3,
      title: 'Investment Opportunity',
      description: 'Consider investing $2,000 in index funds based on your current savings rate.',
      type: 'investment',
      priority: 'medium',
      icon: Brain
    }
  ];

  const totalBalance = 91100;
  const totalIncome = 98200;
  const totalExpenses = 7100;

  // Custom Doughnut Chart Component
  const DoughnutChart = ({ data, centerText, centerValue }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = 0;
    
    const paths = data.map((item, index) => {
      const percentage = item.value / total;
      const angle = percentage * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      
      const x1 = 50 + 35 * Math.cos((startAngle - 90) * Math.PI / 180);
      const y1 = 50 + 35 * Math.sin((startAngle - 90) * Math.PI / 180);
      const x2 = 50 + 35 * Math.cos((endAngle - 90) * Math.PI / 180);
      const y2 = 50 + 35 * Math.sin((endAngle - 90) * Math.PI / 180);
      
      const largeArcFlag = angle > 180 ? 1 : 0;
      
      const pathData = [
        `M 50 50`,
        `L ${x1} ${y1}`,
        `A 35 35 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        `Z`
      ].join(' ');
      
      currentAngle += angle;
      
      return (
        <path
          key={index}
          d={pathData}
          fill={item.color}
          className="hover:opacity-80 transition-opacity"
        />
      );
    });

    return (
      <div className="relative w-64 h-64 mx-auto">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {paths}
          <circle cx="50" cy="50" r="20" fill="transparent" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-gray-400 text-sm font-medium">{centerText}</p>
          <p className="text-3xl font-bold text-white">{centerValue}</p>
        </div>
      </div>
    );
  };

  // Custom Bar Chart Component
  const BarChart = ({ data }) => {
    const maxValue = Math.max(...data.map(d => d.value));
    
    return (
      <div className="h-64 flex items-end justify-center gap-8 px-4">
        {data.map((item, index) => {
          const height = (item.value / maxValue) * 200;
          return (
            <div key={index} className="flex flex-col items-center gap-3">
              <div className="flex flex-col items-center">
                <span className="text-gray-400 text-sm mb-2">${item.value}</span>
                <div
                  className="w-12 bg-purple-500 rounded-t-lg transition-all duration-500 hover:bg-purple-400"
                  style={{ height: `${height}px` }}
                />
              </div>
              <span className="text-gray-400 text-sm">{item.label}</span>
            </div>
          );
        })}
      </div>
    );
  };

  // Chart data
  const financialOverviewData = [
    { value: totalBalance, color: '#8b5cf6', label: 'Balance' },
    { value: totalExpenses, color: '#ef4444', label: 'Expenses' },
    { value: totalIncome, color: '#f97316', label: 'Income' }
  ];

  const expensesBarData = [
    { label: 'Week 1', value: 1200 },
    { label: 'Week 2', value: 900 },
    { label: 'Week 3', value: 1500 },
    { label: 'Week 4', value: 1100 }
  ];

  const incomeDistributionData = [
    { value: 55000, color: '#8b5cf6', label: 'Salary' },
    { value: 8000, color: '#ef4444', label: 'Interest from Savings' },
    { value: 11900, color: '#f97316', label: 'E-commerce Sales' },
    { value: 23300, color: '#3b82f6', label: 'Graphic Design' }
  ];

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'border-red-500 bg-red-500/5';
      case 'medium': return 'border-yellow-500 bg-yellow-500/5';
      case 'low': return 'border-green-500 bg-green-500/5';
      default: return 'border-gray-500 bg-gray-500/5';
    }
  };

  const getPriorityBadgeColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-500/20 text-red-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'low': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  // --- MAIN DASHBOARD COMPONENT ---
  return (
    <div className="min-h-screen bg-black text-gray-300 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Total Balance Card */}
          <div className="bg-gray-900 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-sm font-medium">Total Balance</p>
                <p className="text-2xl font-bold text-white">${totalBalance.toLocaleString()}</p>
              </div>
            </div>
          </div>
          {/* Total Income Card */}
          <div className="bg-gray-900 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-sm font-medium">Total Income</p>
                <p className="text-2xl font-bold text-white">${totalIncome.toLocaleString()}</p>
              </div>
            </div>
          </div>
          {/* Total Expenses Card */}
          <div className="bg-gray-900 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-sm font-medium">Total Expenses</p>
                <p className="text-2xl font-bold text-white">${totalExpenses.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Column 1: AI Suggestions & Expenses */}
          <div className="lg:col-span-1 space-y-6">
            {/* AI Suggestions Card */}
            <div className="bg-gray-900 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-white">AI Suggestions</h2>
                </div>
                <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <span className="text-sm font-medium">See All</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-4">
                {aiSuggestions.map(suggestion => {
                  const Icon = suggestion.icon;
                  return (
                    <div key={suggestion.id} className={`border rounded-xl p-4 ${getPriorityColor(suggestion.priority)}`}>
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-purple-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-white text-sm">{suggestion.title}</h3>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityBadgeColor(suggestion.priority)}`}>
                              {suggestion.priority}
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm leading-relaxed">{suggestion.description}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Expenses Card */}
            <div className="bg-gray-900 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Expenses</h2>
                <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <span className="text-sm font-medium">See All</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2">
                {expenses.map(e => {
                  const Icon = e.icon;
                  return (
                     <div key={e.id} className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 ${e.iconBg} rounded-xl flex items-center justify-center`}>
                          <Icon className={`w-6 h-6 ${e.iconColor}`} />
                        </div>
                        <div>
                          <p className="font-semibold text-white">{e.title}</p>
                          <p className="text-sm text-gray-400">{e.date}</p>
                        </div>
                      </div>
                      <div className={`flex items-center gap-2 font-bold ${e.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        <span>{e.amount > 0 ? '+' : '-'} ${Math.abs(e.amount).toLocaleString()}</span>
                        {e.amount > 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Column 2: Financial Overview & Bar Chart */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gray-900 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">Financial Overview</h2>
              <div className="mb-6">
                <DoughnutChart 
                  data={financialOverviewData}
                  centerText="Total Balance"
                  centerValue={`$${totalBalance.toLocaleString()}`}
                />
              </div>
              <div className="flex justify-center gap-6 text-sm">
                {financialOverviewData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-900 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-6">Last 30 Days Expenses</h2>
                <BarChart data={expensesBarData} />
            </div>
          </div>

          {/* Column 3: Income Overview & Income List */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gray-900 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">Last 60 Days Income</h2>
              <div className="mb-6">
                <DoughnutChart 
                  data={incomeDistributionData}
                  centerText="Total Income"
                  centerValue={`$${totalIncome.toLocaleString()}`}
                />
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                {incomeDistributionData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
             <div className="bg-gray-900 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">Income</h2>
                    <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                    <span className="text-sm font-medium">See All</span>
                    <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
                <div className="space-y-2">
                    {income.map(i => {
                        const Icon = i.icon;
                        return (
                            <div key={i.id} className="flex items-center justify-between py-3">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 ${i.iconBg} rounded-xl flex items-center justify-center`}>
                                        <Icon className={`w-6 h-6 ${i.iconColor}`} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-white">{i.title}</p>
                                        <p className="text-sm text-gray-400">{i.date}</p>
                                    </div>
                                </div>
                                <div className={`flex items-center gap-2 font-bold ${i.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    <span>{i.amount > 0 ? '+' : '-'} ${Math.abs(i.amount).toLocaleString()}</span>
                                    {i.amount > 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;