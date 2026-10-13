import React, { useState } from 'react';
import { Mail, Phone, ExternalLink, Copy, Check, Send, MapPin, MessageSquare, Loader2, AlertCircle } from 'lucide-react';
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'needs_activation' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
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

  const getDirectMailtoUrl = () => {
    const subject = encodeURIComponent(
      `[Portfolio] Trao đổi công việc từ ${formData.name || 'Đối tác'}${formData.company ? ` (${formData.company})` : ''}`
    );
    const body = encodeURIComponent(
      `Chào anh Quân,\n\nTôi là: ${formData.name || '(Họ tên)'}\nEmail liên hệ: ${formData.email || '(Email)'}\nDoanh nghiệp / Tổ chức: ${formData.company || 'Cá nhân'}\n\nNội dung trao đổi:\n${formData.message || ''}\n\n---\n(Thư gửi từ Portfolio của Doan Minh Quan)`
    );
    return `mailto:doanminhquan1108@gmail.com?subject=${subject}&body=${body}`;
  };

  const getDirectGmailUrl = () => {
    const subject = encodeURIComponent(
      `[Portfolio] Trao đổi công việc từ ${formData.name || 'Đối tác'}${formData.company ? ` (${formData.company})` : ''}`
    );
    const body = encodeURIComponent(
      `Chào anh Quân,\n\nTôi là: ${formData.name || '(Họ tên)'}\nEmail liên hệ: ${formData.email || '(Email)'}\nDoanh nghiệp / Tổ chức: ${formData.company || 'Cá nhân'}\n\nNội dung trao đổi:\n${formData.message || ''}\n\n---\n(Thư gửi từ Portfolio của Doan Minh Quan)`
    );
    return `https://mail.google.com/mail/?view=cm&fs=1&to=doanminhquan1108@gmail.com&su=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('https://formsubmit.co/ajax/doanminhquan1108@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          company: formData.company.trim() || 'Cá nhân / Đối tác',
          message: formData.message.trim(),
          _subject: `[Portfolio Website] Tin nhắn mới từ ${formData.name.trim()} (${formData.company.trim() || 'Cá nhân'})`,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      const data = await response.json();

      if (data.success === 'true' || data.success === true) {
        setSubmissionStatus('success');
        setFormSubmitted(true);
      } else if (data.message && data.message.toLowerCase().includes('activation')) {
        // FormSubmit first-time activation notification
        setSubmissionStatus('needs_activation');
        setFormSubmitted(true);
      } else {
        setSubmissionStatus('error');
        setErrorMessage(
          data.message ||
            (currentLang === 'vi'
              ? 'Không thể gửi thư qua cổng tự động. Vui lòng sử dụng nút gửi trực tiếp qua Gmail bên dưới.'
              : 'Could not send message automatically. Please use the direct Gmail button below.')
        );
      }
    } catch (err) {
      console.error('Submit error:', err);
      setSubmissionStatus('error');
      setErrorMessage(
        currentLang === 'vi'
          ? 'Không thể kết nối đến máy chủ gửi thư. Bạn có thể mở Gmail gửi trực tiếp đến doanminhquan1108@gmail.com.'
          : 'Network error connecting to mail gateway. You can send directly via Gmail to doanminhquan1108@gmail.com.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      style={{ fontFamily: 'system-ui' }}
      className="py-16 lg:py-24 border-b border-slate-200/80 dark:border-slate-800/80 text-slate-900 dark:text-slate-100 transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-sky-700 dark:text-sky-400 tracking-wide uppercase mb-2">
            <span>Direct Channels</span>
            <span aria-hidden="true" className="mx-2 text-slate-300 dark:text-slate-700">·</span>
            <span>Let's Connect</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white text-balance">
            {currentLang === 'vi' ? 'Liên Hệ Trực Tiếp & Kết Nối Cơ Hội' : 'Direct Contact & Professional Inquiries'}
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
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
            <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 shadow-xs transition-colors">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 border border-sky-100 dark:border-sky-900/40 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {currentLang === 'vi' ? 'Điện thoại di động / Zalo' : 'Mobile / Phone'}
                  </div>
                  <a href={`tel:${PERSONAL_INFO.phone}`} className="text-sm font-bold text-slate-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-400 transition-colors font-mono">
                    {PERSONAL_INFO.phoneDisplay}
                  </a>
                </div>
              </div>
              <button
                onClick={onCopyPhone}
                type="button"
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/80 transition-colors text-xs font-medium flex items-center gap-1.5"
                title="Sao chép số điện thoại"
              >
                {phoneCopied ? <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span className="hidden sm:inline">{phoneCopied ? (currentLang === 'vi' ? 'Đã chép' : 'Copied') : (currentLang === 'vi' ? 'Chép' : 'Copy')}</span>
              </button>
            </div>

            {/* Email Card */}
            <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 shadow-xs transition-colors">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 border border-sky-100 dark:border-sky-900/40 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {currentLang === 'vi' ? 'Hộp thư điện tử' : 'Email Address'}
                  </div>
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="text-sm font-bold text-slate-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-400 transition-colors truncate block max-w-[200px] sm:max-w-none">
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>
              <button
                onClick={handleCopyEmail}
                type="button"
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/80 transition-colors text-xs font-medium flex items-center gap-1.5"
                title="Sao chép email"
              >
                {emailCopied ? <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span className="hidden sm:inline">{emailCopied ? (currentLang === 'vi' ? 'Đã chép' : 'Copied') : (currentLang === 'vi' ? 'Chép' : 'Copy')}</span>
              </button>
            </div>

            {/* LinkedIn Card */}
            <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 shadow-xs transition-colors">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 border border-sky-100 dark:border-sky-900/40 flex items-center justify-center shrink-0">
                  <ExternalLink className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">LinkedIn Profile</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                    linkedin.com/in/{PERSONAL_INFO.linkedinHandle}
                  </div>
                </div>
              </div>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white transition-colors text-xs font-medium flex items-center gap-1.5 shadow-xs"
              >
                <span>{currentLang === 'vi' ? 'Truy cập' : 'Open'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Location & Availability Note */}
            <div className="p-4 rounded-xl bg-slate-100/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1.5 transition-colors">
              <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-medium">
                <MapPin className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
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
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs transition-colors">
            {formSubmitted ? (
              <div className="py-8 text-center space-y-4">
                {submissionStatus === 'needs_activation' ? (
                  <>
                    <div className="w-14 h-14 rounded-full bg-amber-500/15 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto border border-amber-200 dark:border-amber-500/30">
                      <Mail className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {currentLang === 'vi' ? 'Đã gửi thông tin đến doanminhquan1108@gmail.com!' : 'Message Submitted to doanminhquan1108@gmail.com!'}
                    </h3>
                    <div className="text-sm text-slate-700 dark:text-slate-300 max-w-lg mx-auto leading-relaxed space-y-2 text-left bg-amber-50 dark:bg-slate-950/80 p-4 rounded-xl border border-amber-200 dark:border-amber-500/30">
                      <p className="font-semibold text-amber-800 dark:text-amber-300 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        {currentLang === 'vi'
                          ? 'Bước kích hoạt một lần duy nhất cho hộp thư:'
                          : 'One-time mailbox activation notice:'}
                      </p>
                      <p>
                        {currentLang === 'vi'
                          ? 'Hệ thống FormSubmit đã gửi email chứa liên kết "Activate Form" đến hộp thư doanminhquan1108@gmail.com. Anh Quân vui lòng kiểm tra hộp thư đến (hoặc hòm thư Spam) và nhấn Activate Form một lần để mở khóa nhận email tự động không giới hạn.'
                          : 'FormSubmit has sent an "Activate Form" verification link to doanminhquan1108@gmail.com. Please check your inbox or spam folder and click Activate once to enable instant forwarding.'}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-14 h-14 rounded-full bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-200 dark:border-emerald-500/30">
                      <Check className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {currentLang === 'vi' ? 'Tin nhắn đã được gửi thành công!' : 'Thank you for reaching out!'}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                      {currentLang === 'vi'
                        ? 'Nội dung tin nhắn đã được chuyển tiếp trực tiếp đến doanminhquan1108@gmail.com. Quân sẽ phản hồi qua email hoặc số điện thoại trong vòng 24 giờ.'
                        : 'Your message has been forwarded directly to doanminhquan1108@gmail.com. Quan will respond to your email or phone within 24 hours.'}
                    </p>
                  </>
                )}

                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={getDirectGmailUrl()}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg bg-sky-600 hover:bg-sky-500 text-white transition-colors shadow-xs"
                  >
                    <Mail className="w-4 h-4" />
                    <span>{currentLang === 'vi' ? 'Mở gửi trực tiếp qua Gmail' : 'Open in Gmail'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setSubmissionStatus('idle');
                      setFormData({ name: '', email: '', company: '', message: '' });
                    }}
                    type="button"
                    className="px-4 py-2.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors"
                  >
                    {currentLang === 'vi' ? 'Gửi tin nhắn khác' : 'Send another message'}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {currentLang === 'vi' ? 'Gửi Lời Nhắn Nhanh' : 'Send a Quick Message'}
                  </h3>
                  <span className="text-[11px] font-mono text-sky-700 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800/50 px-2.5 py-0.5 rounded-md">
                    doanminhquan1108@gmail.com
                  </span>
                </div>

                {submissionStatus === 'error' && (
                  <div className="p-3.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 text-xs text-rose-800 dark:text-rose-200 flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                    <div className="space-y-2">
                      <p>{errorMessage}</p>
                      <a
                        href={getDirectGmailUrl()}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-sky-700 dark:text-sky-300 hover:underline font-medium"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>{currentLang === 'vi' ? 'Mở Gmail gửi trực tiếp' : 'Open in Gmail directly'}</span>
                      </a>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      {currentLang === 'vi' ? 'Họ và tên *' : 'Your Name *'}
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={currentLang === 'vi' ? 'Ví dụ: Nguyễn Văn A' : 'John Doe'}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm focus:border-sky-500 dark:focus:border-sky-400 focus:outline-hidden focus:ring-1 focus:ring-sky-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      {currentLang === 'vi' ? 'Email liên hệ *' : 'Email Address *'}
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm focus:border-sky-500 dark:focus:border-sky-400 focus:outline-hidden focus:ring-1 focus:ring-sky-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-company" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    {currentLang === 'vi' ? 'Doanh nghiệp / Tổ chức' : 'Company / Organization'}
                  </label>
                  <input
                    id="contact-company"
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder={currentLang === 'vi' ? 'Tên công ty hoặc phòng ban' : 'Company or Agency'}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm focus:border-sky-500 dark:focus:border-sky-400 focus:outline-hidden focus:ring-1 focus:ring-sky-500 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
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
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm focus:border-sky-500 dark:focus:border-sky-400 focus:outline-hidden focus:ring-1 focus:ring-sky-500 transition-colors resize-none"
                  />
                </div>

                <div className="space-y-2.5 pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-sky-600 hover:bg-sky-500 disabled:bg-sky-300 dark:disabled:bg-sky-900 disabled:cursor-not-allowed text-white text-sm font-semibold transition-all active:scale-[0.99] shadow-xs cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>{currentLang === 'vi' ? 'Đang gửi đến doanminhquan1108@gmail.com...' : 'Sending to doanminhquan1108@gmail.com...'}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{currentLang === 'vi' ? 'Gửi Thông Điệp Đến Email' : 'Submit Message to Email'}</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1">
                    <span>{currentLang === 'vi' ? 'Hoặc gửi qua ứng dụng:' : 'Or compose directly:'}</span>
                    <div className="flex items-center gap-3">
                      <a
                        href={getDirectGmailUrl()}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 font-medium transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>{currentLang === 'vi' ? 'Soạn trên Gmail' : 'Gmail Web'}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <span className="text-slate-300 dark:text-slate-700">·</span>
                      <a
                        href={getDirectMailtoUrl()}
                        className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium transition-colors"
                      >
                        <span>{currentLang === 'vi' ? 'Mail Client' : 'Mail App'}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
