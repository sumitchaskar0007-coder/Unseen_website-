import {
  ArrowRight, BarChart3, BellRing, BookOpenCheck, CalendarDays, Check, Cloud,
  CreditCard, GraduationCap, LayoutDashboard, MessageSquareText, ShieldCheck,
  Sparkles, UserRoundCheck, Users,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { onlineImages } from '../data/onlineImages'
import './erp-premium.css'

const modules = [
  { icon: UserRoundCheck, title: 'Admissions & Enrollment', copy: 'Move every enquiry from application to confirmed admission in one guided workflow.' },
  { icon: CalendarDays, title: 'Attendance & Timetable', copy: 'Manage daily attendance, classes, substitutions and schedules without spreadsheet chaos.' },
  { icon: CreditCard, title: 'Fees & Finance', copy: 'Automate fee plans, reminders, receipts, concessions and outstanding-payment reports.' },
  { icon: BookOpenCheck, title: 'Academics & Exams', copy: 'Plan curriculum, publish assignments, manage examinations and generate report cards.' },
  { icon: MessageSquareText, title: 'Parent Communication', copy: 'Keep families informed through announcements, alerts and student-specific updates.' },
  { icon: BarChart3, title: 'Reports & Insights', copy: 'Turn operational and academic data into live dashboards for faster decisions.' },
]

const outcomes = [
  ['One source of truth', 'Student, staff, academic and financial records stay connected.'],
  ['Less repetitive work', 'Automations remove duplicate entry and routine follow-ups.'],
  ['Role-based security', 'Every user sees exactly the information they are allowed to access.'],
  ['Ready from anywhere', 'Cloud access keeps administrators, teachers and families connected.'],
]

export default function ERPPage() {
  return (
    <div className="erp-page">
      <section className="erp-hero">
        <div className="erp-orb erp-orb-a" aria-hidden="true" />
        <div className="erp-orb erp-orb-b" aria-hidden="true" />
        <div className="erp-shell erp-hero-grid">
          <div className="erp-hero-copy">
            <p className="erp-kicker"><Sparkles /> School ERP, thoughtfully connected</p>
            <h1>Run your whole school from <em>one clear system.</em></h1>
            <p className="erp-intro">Unseen School ERP connects admissions, attendance, academics, fees, staff and parent communication in a platform shaped around how your institution actually works.</p>
            <div className="erp-actions">
              <Link to="/contact" className="erp-button is-primary">Request a demo <ArrowRight /></Link>
              <a href="#erp-modules" className="erp-button is-secondary">Explore modules</a>
            </div>
            <div className="erp-trust-row">
              <span><Check /> Custom workflows</span><span><Check /> Secure cloud access</span><span><Check /> Guided onboarding</span>
            </div>
          </div>

          <div className="erp-dashboard" aria-label="School ERP dashboard preview">
            <div className="erp-dashboard-top"><span><i /> Unseen ERP</span><small>Academic year 2026–27</small></div>
            <div className="erp-dashboard-body">
              <aside aria-hidden="true"><LayoutDashboard /><Users /><CalendarDays /><CreditCard /><BarChart3 /></aside>
              <div className="erp-dashboard-main">
                <div className="erp-dashboard-welcome"><span>Good morning, Admin</span><strong>School overview</strong></div>
                <div className="erp-metric-grid">
                  <article><span>Students</span><strong>1,248</strong><small>+42 this term</small></article>
                  <article><span>Attendance</span><strong>94.8%</strong><small>Today</small></article>
                  <article><span>Fee collection</span><strong>87%</strong><small>On track</small></article>
                </div>
                <div className="erp-chart-card">
                  <div><span>Weekly attendance</span><strong>Live overview</strong></div>
                  <div className="erp-bars" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></div>
                </div>
                <div className="erp-dashboard-bottom">
                  <article><BellRing /><span><strong>12</strong>New notices</span></article>
                  <article><BookOpenCheck /><span><strong>8</strong>Exams scheduled</span></article>
                </div>
              </div>
            </div>
            <div className="erp-float-card"><ShieldCheck /><span><strong>Role-based access</strong><small>Protected at every level</small></span></div>
          </div>
        </div>
      </section>

      <section className="erp-signal-strip" aria-label="ERP platform benefits">
        <span>Admissions</span><i /> <span>Academics</span><i /> <span>Finance</span><i /> <span>Communication</span><i /> <span>Analytics</span>
      </section>

      <section className="erp-modules" id="erp-modules">
        <div className="erp-shell">
          <div className="erp-section-head">
            <div><p className="erp-kicker"><GraduationCap /> Everything in sync</p><h2>One platform.<br /><em>Every school workflow.</em></h2></div>
            <p>Start with the modules you need today and expand as your institution grows. Every part shares the same reliable data.</p>
          </div>
          <div className="erp-module-grid">
            {modules.map(({ icon: Icon, title, copy }, index) => (
              <article key={title}><span className="erp-module-number">0{index + 1}</span><Icon /><h3>{title}</h3><p>{copy}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="erp-story">
        <div className="erp-shell erp-story-grid">
          <div className="erp-story-image">
            <img src={onlineImages.analyticsDashboard} alt="Education administrator reviewing live analytics" />
            <span><Cloud /> Live, secure and accessible</span>
          </div>
          <div className="erp-story-copy">
            <p className="erp-kicker"><BarChart3 /> From data to direction</p>
            <h2>See what needs attention before it becomes a problem.</h2>
            <p>Leadership dashboards surface attendance trends, fee status, academic progress and operational activity without waiting for manual reports.</p>
            <div className="erp-outcomes">
              {outcomes.map(([title, copy]) => <article key={title}><Check /><div><strong>{title}</strong><span>{copy}</span></div></article>)}
            </div>
          </div>
        </div>
      </section>

      <section className="erp-cta">
        <div className="erp-shell erp-cta-inner">
          <div><p>Ready to simplify school operations?</p><h2>Let’s shape an ERP around your institution.</h2></div>
          <Link to="/contact" className="erp-button is-light">Book a discovery call <ArrowRight /></Link>
        </div>
      </section>
    </div>
  )
}
