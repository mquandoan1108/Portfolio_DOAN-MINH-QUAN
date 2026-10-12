import React, { useState } from 'react';
import { Mail, Phone, ExternalLink, Copy, Check, Send, MapPin, MessageSquare } from 'lucide-react';
import { Language } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ContactSectionProps {
  currentLang: Language;
  onCopyPhone: () => void;
  phoneCopied: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  currentLang,
  onCopyPhone,
  phoneCopied,
}) => {
  const [emailCopied, setEmailCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSubmitted(true);
  };

  return (
    <section
      id="contact"
      style={{ fontFamily: 'system-ui' }}
      className="py-16 lg:py-24 bg-slate-900 text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-sky-400 tracking-wide uppercase mb-2">
            <span>Direct Channels</span>
            <span aria-hidden="true" className="mx-2 text-slate-600">·</span>
            <span>Let's Connect</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white text-balance">
            {currentLang === 'vi' ? 'Liên Hệ Trực Tiếp & Kết Nối Cơ Hội' : 'Direct Contact & Professional Inquiries'}
          </h2>
          <p className="mt-3 text-base text-slate-300">
            {currentLang === 'vi'
              ? 'Sẵn sàng thảo luận về các vị trí Business Analyst, Quality Control Manager hoặc các dự án tối ưu hóa vận hành & phân tích dữ liệu.'
              : 'Open for strategic discussions on Business Analyst, Quality Control Manager roles, or data-driven supply chain optimization projects.'}
          </p>
        </div>

        {/* 2-Column Split: Left Contact Cards, Right Message Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Contact Channels (Span 5) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Phone Card */}
            <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">
                    {currentLang === 'vi' ? 'Điện thoại di động / Zalo' : 'Mobile / Phone'}
                  </div>
                  <a href={`tel:${PERSONAL_INFO.phone}`} className="text-sm font-bold text-white hover:text-sky-400 transition-colors font-mono">
                    {PERSONAL_INFO.phoneDisplay}
                  </a>
                </div>
              </div>
              <button
                onClick={onCopyPhone}
                type="button"
                className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors text-xs font-medium flex items-center gap-1.5"
                title="Sao chép số điện thoại"
              >
                {phoneCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span className="hidden sm:inline">{phoneCopied ? (currentLang === 'vi' ? 'Đã chép' : 'Copied') : (currentLang === 'vi' ? 'Chép' : 'Copy')}</span>
              </button>
            </div>

            {/* Email Card */}
            <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">
                    {currentLang === 'vi' ? 'Hộp thư điện tử' : 'Email Address'}
                  </div>
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="text-sm font-bold text-white hover:text-sky-400 transition-colors truncate block max-w-[200px] sm:max-w-none">
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>
              <button
                onClick={handleCopyEmail}
                type="button"
                className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors text-xs font-medium flex items-center gap-1.5"
                title="Sao chép email"
              >
                {emailCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span className="hidden sm:inline">{emailCopied ? (currentLang === 'vi' ? 'Đã chép' : 'Copied') : (currentLang === 'vi' ? 'Chép' : 'Copy')}</span>
              </button>
            </div>

            {/* LinkedIn Card */}
            <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                  <ExternalLink className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">LinkedIn Profile</div>
                  <div className="text-sm font-bold text-white font-mono">
                    linkedin.com/in/{PERSONAL_INFO.linkedinHandle}
                  </div>
                </div>
              </div>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white transition-colors text-xs font-medium flex items-center gap-1.5"
              >
                <span>{currentLang === 'vi' ? 'Truy cập' : 'Open'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Location & Availability Note */}
            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 text-xs text-slate-400 space-y-1.5">
              <div className="flex items-center gap-2 text-slate-300 font-medium">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
                <span>{PERSONAL_INFO.location[currentLang]}</span>
              </div>
              <p className="leading-relaxed">
                {currentLang === 'vi'
                  ? 'Làm việc trực tiếp tại TP.HCM hoặc hybrid/remote với các dự án phân tích dữ liệu quy mô toàn quốc.'
                  : 'Based in Ho Chi Minh City, available for on-site, hybrid, and remote engagements nationwide.'}
              </p>
            </div>

          </div>

          {/* Right: Message Form (Span 7) */}
          <div className="lg:col-span-7 bg-slate-800/80 rounded-2xl border border-slate-700/80 p-6 sm:p-8 shadow-xl">
            {formSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  {currentLang === 'vi' ? 'Cảm ơn bạn đã gửi tin nhắn!' : 'Thank you for reaching out!'}
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  {currentLang === 'vi'
                    ? 'Thông tin đã được ghi nhận. Quân sẽ phản hồi qua email hoặc số điện thoại trong vòng 24 giờ.'
                    : "Your message has been received. Quan will respond to your email or phone within 24 hours."}
                </p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({ name: '', email: '', company: '', message: '' });
                  }}
                  type="button"
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition-colors"
                >
                  {currentLang === 'vi' ? 'Gửi tin nhắn khác' : 'Send another message'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-bold text-white mb-2">
                  {currentLang === 'vi' ? 'Gửi Lời Nhắn Nhanh' : 'Send a Quick Message'}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-medium text-slate-300 mb-1">
                      {currentLang === 'vi' ? 'Họ và tên *' : 'Your Name *'}
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={currentLang === 'vi' ? 'Ví dụ: Nguyễn Văn A' : 'John Doe'}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:border-sky-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-medium text-slate-300 mb-1">
                      {currentLang === 'vi' ? 'Email liên hệ *' : 'Email Address *'}
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:border-sky-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-company" className="block text-xs font-medium text-slate-300 mb-1">
                    {currentLang === 'vi' ? 'Doanh nghiệp / Tổ chức' : 'Company / Organization'}
                  </label>
                  <input
                    id="contact-company"
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder={currentLang === 'vi' ? 'Tên công ty hoặc phòng ban' : 'Company or Agency'}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:border-sky-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-medium text-slate-300 mb-1">
                    {currentLang === 'vi' ? 'Nội dung trao đổi *' : 'Message *'}
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={
                      currentLang === 'vi'
                        ? 'Trao đổi về cơ hội hợp tác, dự án phân tích dữ liệu hoặc phỏng vấn tuyển dụng...'
                        : 'Inquire about career opportunities, analytics consultations, or interview arrangements...'
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:border-sky-500 focus:outline-hidden resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold transition-all active:scale-[0.99] shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>{currentLang === 'vi' ? 'Gửi Thông Điệp' : 'Submit Message'}</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
