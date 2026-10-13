import React, { useState } from 'react';
import { Calculator, TrendingDown, TrendingUp, ShieldCheck, DollarSign, RefreshCw } from 'lucide-react';
import { Language } from '../types';

interface RoiSimulatorProps {
  currentLang: Language;
}

export const RoiSimulator: React.FC<RoiSimulatorProps> = ({ currentLang }) => {
  // Inputs
  const [fleetSize, setFleetSize] = useState<number>(45); // number of vehicles/routes
  const [monthlyOpexMlnVnd, setMonthlyOpexMlnVnd] = useState<number>(1200); // 1.2 Billion VND
  const [wasteReductionRate, setWasteReductionRate] = useState<number>(12); // Quân's benchmark: 12%
  const [marginBoostRate, setMarginBoostRate] = useState<number>(4); // Quân's benchmark: 4%
  const [currency, setCurrency] = useState<'vnd' | 'usd'>('vnd');

  // Calculations
  // Monthly waste reduced = monthly OPEX * (wasteRate / 100)
  const monthlySavings = (monthlyOpexMlnVnd * (wasteReductionRate / 100));
  const annualSavings = monthlySavings * 12;

  // Margin boost value on assumed 1.3x revenue = monthlyOpex * 1.3 * (marginBoostRate / 100)
  const monthlyMarginGains = (monthlyOpexMlnVnd * 1.3 * (marginBoostRate / 100));
  const annualMarginGains = monthlyMarginGains * 12;

  const totalAnnualImpact = annualSavings + annualMarginGains;

  // Currency formatter
  const formatCurrency = (valMlnVnd: number) => {
    if (currency === 'vnd') {
      if (valMlnVnd >= 1000) {
        return `${(valMlnVnd / 1000).toFixed(2)} Tỷ VNĐ`;
      }
      return `${Math.round(valMlnVnd).toLocaleString()} Triệu VNĐ`;
    } else {
      // rough 1 USD = 25,000 VND -> 1 Mln VND = $40 USD
      const usdVal = valMlnVnd * 40;
      if (usdVal >= 1000000) {
        return `$${(usdVal / 1000000).toFixed(2)}M USD`;
      }
      return `$${Math.round(usdVal).toLocaleString()} USD`;
    }
  };

  const resetDefaults = () => {
    setFleetSize(45);
    setMonthlyOpexMlnVnd(1200);
    setWasteReductionRate(12);
    setMarginBoostRate(4);
  };

  return (
    <section
      id="roi-calculator"
      style={{ fontFamily: 'system-ui' }}
      className="py-16 lg:py-24 border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-sky-700 dark:text-sky-400 tracking-wide uppercase mb-2">
            <span>Empirical ROI Simulator</span>
            <span aria-hidden="true" className="mx-2 text-slate-300 dark:text-slate-700">·</span>
            <span>Business Impact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white text-balance">
            {currentLang === 'vi'
              ? 'Mô Phỏng Hiệu Quả Cắt Giảm Chi Phí & Tăng Lợi Nhuận'
              : 'Interactive Operational Waste & Margin Simulator'}
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
            {currentLang === 'vi'
              ? 'Thử nghiệm tính toán giá trị thặng dư thực tế dựa trên kinh nghiệm thực chiến của Đoàn Minh Quân: Cắt giảm 12% lãng phí bằng Dashboard BI và gia tăng 4% biên lợi nhuận hợp đồng thương mại.'
              : 'Simulate direct operational ROI based on proven track records: 12% waste reduction via automated BI dashboards and 4% margin uplift via pre-deal contract auditing.'}
          </p>
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Input Controls Card */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6 transition-colors duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {currentLang === 'vi' ? 'Thông số giả định vận hành' : 'Operational Assumptions'}
              </span>
              
              <div className="flex items-center gap-2">
                {/* Currency toggle */}
                <div className="inline-flex rounded-lg border border-slate-200 dark:border-slate-700 p-0.5 text-xs font-mono">
                  <button
                    onClick={() => setCurrency('vnd')}
                    type="button"
                    className={`px-2 py-1 rounded-md transition-colors ${
                      currency === 'vnd' ? 'bg-sky-600 text-white font-bold' : 'text-slate-500'
                    }`}
                  >
                    VNĐ
                  </button>
                  <button
                    onClick={() => setCurrency('usd')}
                    type="button"
                    className={`px-2 py-1 rounded-md transition-colors ${
                      currency === 'usd' ? 'bg-sky-600 text-white font-bold' : 'text-slate-500'
                    }`}
                  >
                    USD
                  </button>
                </div>

                <button
                  onClick={resetDefaults}
                  type="button"
                  className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                  title="Đặt lại mặc định"
                  aria-label="Reset parameters"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Slider 1: Monthly OPEX */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label htmlFor="opex-slider" className="font-semibold text-slate-700 dark:text-slate-300">
                  {currentLang === 'vi' ? 'Chi phí vận hành hàng tháng (OPEX)' : 'Monthly Operating Cost (OPEX)'}
                </label>
                <span className="font-mono font-bold text-sky-600 dark:text-sky-400 tabular-nums">
                  {formatCurrency(monthlyOpexMlnVnd)}
                </span>
              </div>
              <input
                id="opex-slider"
                type="range"
                min="200"
                max="5000"
                step="50"
                value={monthlyOpexMlnVnd}
                onChange={(e) => setMonthlyOpexMlnVnd(Number(e.target.value))}
                className="w-full accent-sky-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>{currency === 'vnd' ? '200 Tr VNĐ' : '$8,000'}</span>
                <span>{currency === 'vnd' ? '5 Tỷ VNĐ' : '$200,000'}</span>
              </div>
            </div>

            {/* Slider 2: Fleet / Network Scale */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label htmlFor="fleet-slider" className="font-semibold text-slate-700 dark:text-slate-300">
                  {currentLang === 'vi' ? 'Quy mô đội xe / Chi nhánh tuyến vận tải' : 'Fleet Vehicles / Provincial Nodes'}
                </label>
                <span className="font-mono font-bold text-sky-600 dark:text-sky-400 tabular-nums">
                  {fleetSize} {currentLang === 'vi' ? 'Đầu xe / Tuyến' : 'Vehicles / Routes'}
                </span>
              </div>
              <input
                id="fleet-slider"
                type="range"
                min="10"
                max="150"
                step="5"
                value={fleetSize}
                onChange={(e) => setFleetSize(Number(e.target.value))}
                className="w-full accent-sky-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>10 xe</span>
                <span>150 xe</span>
              </div>
            </div>

            {/* Benchmark Rates */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800">
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  {currentLang === 'vi' ? 'Tỷ lệ cắt giảm lãng phí (BI)' : 'BI Waste Reduction Rate'}
                </div>
                <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400 font-mono mt-1 tabular-nums">
                  -{wasteReductionRate}%
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {currentLang === 'vi' ? 'Đã kiểm chứng tại Viettel' : 'Viettel Logistics benchmark'}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800">
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  {currentLang === 'vi' ? 'Biên lợi nhuận gia tăng' : 'Contract Margin Boost'}
                </div>
                <div className="text-lg font-bold text-sky-600 dark:text-sky-400 font-mono mt-1 tabular-nums">
                  +{marginBoostRate}%
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {currentLang === 'vi' ? 'Nhờ thẩm định P&L hợp đồng' : 'Pre-deal pricing simulation'}
                </div>
              </div>
            </div>

          </div>

          {/* Right: Projected Return / Result Card */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm dark:shadow-xl space-y-6 transition-colors duration-200">
            <div>
              <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                {currentLang === 'vi' ? 'Dự báo Giá trị Thặng dư Hàng Năm' : 'Projected Annual Business Value'}
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400 mt-2 tracking-tight tabular-nums">
                {formatCurrency(totalAnnualImpact)}
                <span className="text-sm font-sans text-slate-500 dark:text-slate-400 font-normal ml-2">/ {currentLang === 'vi' ? 'năm' : 'year'}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                {currentLang === 'vi'
                  ? 'Tổng giá trị tạo ra từ chi phí cắt giảm và lợi nhuận bảo vệ qua kiểm soát chất lượng dữ liệu.'
                  : 'Cumulative fiscal upside combined from operational leak prevention and margin defense.'}
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              
              {/* Item 1: Waste reduction */}
              <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-emerald-50/70 dark:bg-slate-800/60 border border-emerald-200/70 dark:border-slate-700/60 transition-colors duration-200">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 shrink-0">
                    <TrendingDown className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">
                      {currentLang === 'vi' ? 'Tiết giảm lãng phí chi phí vận hành' : 'Annual OPEX Waste Elimination'}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      {currentLang === 'vi'
                        ? 'Cảnh báo tự động lộ trình thừa, rò rỉ nhiên liệu và chậm SLA'
                        : 'Eliminating deadhead runs, idle fuel drain, and late SLA penalty risks'}
                    </div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 font-mono tabular-nums">
                    +{formatCurrency(annualSavings)}
                  </div>
                </div>
              </div>

              {/* Item 2: Margin uplift */}
              <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-sky-50/70 dark:bg-slate-800/60 border border-sky-200/70 dark:border-slate-700/60 transition-colors duration-200">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-sky-100 dark:bg-sky-500/20 text-sky-700 dark:text-sky-400 shrink-0">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">
                      {currentLang === 'vi' ? 'Lợi nhuận gộp bảo vệ & tăng thêm' : 'Protected Contract Gross Margin'}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      {currentLang === 'vi'
                        ? 'Thẩm định tỷ lệ tải trọng và kịch bản giá thầu trước khi ký'
                        : 'Contract feasibility modeling and minimum yield guarantees'}
                    </div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-base font-extrabold text-sky-600 dark:text-sky-400 font-mono tabular-nums">
                    +{formatCurrency(annualMarginGains)}
                  </div>
                </div>
              </div>

            </div>

            <div className="pt-2 text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>
                {currentLang === 'vi'
                  ? 'Phương pháp luận đã được ứng dụng trực tiếp tại mạng lưới 15 chi nhánh Viettel Logistics.'
                  : 'Operational methodology proven live across 15 provincial Viettel Logistics branches.'}
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
