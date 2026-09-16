import React, { useState, useEffect } from 'react';
import { careerAPI } from '../api';
import { FaBriefcase, FaMapMarkerAlt, FaClock, FaDollarSign, FaFilter, FaChevronRight } from 'react-icons/fa';
import toast from 'react-hot-toast';

interface CareerItem {
  _id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  salary: string;
  isActive: boolean;
  createdAt: string;
}

const Careers = () => {
  const [careers, setCareers] = useState<CareerItem[]>([]);
  const [filteredCareers, setFilteredCareers] = useState<CareerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCareer, setSelectedCareer] = useState<CareerItem | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [applicationForm, setApplicationForm] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    resume: null as File | null,
  });

  const jobTypes = ['all', 'Full-time', 'Part-time', 'Contract', 'Internship'];

  useEffect(() => { fetchCareers(); }, []);
  useEffect(() => { filterCareers(); }, [selectedType, careers]);

  const fetchCareers = async () => {
    try {
      setLoading(true);
      const response = await careerAPI.getAll();
      const activeCareers = (response.data || [])
        .filter((career: CareerItem) => career.isActive === true)
        .map((career: any) => ({
          ...career,
          requirements: Array.isArray(career.requirements)
            ? career.requirements
            : career.requirements
            ? career.requirements.split(',').map((r: string) => r.trim())
            : [],
        }));
      setCareers(activeCareers);
      setFilteredCareers(activeCareers);
      if (activeCareers.length === 0) toast('No active job openings at the moment', { icon: 'ℹ️' });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to load careers');
      setCareers([]);
      setFilteredCareers([]);
    } finally {
      setLoading(false);
    }
  };

  const filterCareers = () => {
    setFilteredCareers(
      selectedType === 'all' ? careers : careers.filter((c) => c.type === selectedType)
    );
  };

  const handleApply = (career: CareerItem) => setSelectedCareer(career);

  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Application submitted successfully! We will contact you soon.');
    setSelectedCareer(null);
    setApplicationForm({ name: '', email: '', phone: '', experience: '', resume: null });
  };

  const typePillStyle = (type: string): React.CSSProperties => {
    const map: Record<string, { bg: string; color: string }> = {
      'Full-time':  { bg: '#ecfdf5', color: '#065f46' },
      'Part-time':  { bg: '#eff6ff', color: '#1e40af' },
      'Contract':   { bg: '#fefce8', color: '#854d0e' },
      'Internship': { bg: '#fdf4ff', color: '#6b21a8' },
    };
    const s = map[type] || { bg: '#f3f4f6', color: '#374151' };
    return {
      display: 'inline-block',
      backgroundColor: s.bg,
      color: s.color,
      fontSize: '11px',
      fontWeight: 600,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      padding: '4px 10px',
      borderRadius: '4px',
      marginBottom: '12px',
    };
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px', backgroundColor: '#ffffff' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '50%', border: '3px solid #f3f4f6', borderTopColor: '#F97316', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <p style={{ fontSize: '14px', color: '#9ca3af', margin: 0 }}>Loading opportunities...</p>
      </div>
    );
  }

  const formFields = [
    { key: 'name',       label: 'Full Name',            type: 'text',  required: true,  placeholder: 'Jane Smith' },
    { key: 'email',      label: 'Email Address',        type: 'email', required: true,  placeholder: 'jane@example.com' },
    { key: 'phone',      label: 'Phone Number',         type: 'tel',   required: true,  placeholder: '+1 (555) 000-0000' },
    { key: 'experience', label: 'Years of Experience',  type: 'text',  required: false, placeholder: 'e.g. 3 years' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>

      {/* ── Hero ── */}
      <div style={{ backgroundColor: '#1a1a1a', padding: '64px 0 56px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
          <span style={{ display: 'inline-block', backgroundColor: '#F97316', color: '#fff', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '5px 14px', borderRadius: '4px', marginBottom: '20px' }}>
            We're Hiring
          </span>
          <h1 style={{ fontSize: '42px', fontWeight: 700, color: '#ffffff', lineHeight: 1.15, margin: '0 0 16px', letterSpacing: '-0.5px' }}>
            Join Our Team
          </h1>
          <p style={{ fontSize: '16px', color: '#9ca3af', maxWidth: '520px', lineHeight: 1.65, margin: 0 }}>
            We're looking for passionate individuals to join our mission of providing quality education.
          </p>
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 24px' }}>

        {/* Filters */}
        {careers.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px', flexWrap: 'wrap' }}>
            <FaFilter style={{ color: '#9ca3af', fontSize: '13px' }} />
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#374151', marginRight: '4px' }}>Filter:</span>
            {jobTypes.map((type) => {
              const active = selectedType === type;
              return (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  style={{
                    padding: '7px 18px',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    border: `1.5px solid ${active ? '#F97316' : '#e5e7eb'}`,
                    backgroundColor: active ? '#fff7ed' : '#ffffff',
                    color: active ? '#c2410c' : '#6b7280',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {type === 'all' ? 'All roles' : type}
                </button>
              );
            })}
          </div>
        )}

        {filteredCareers.length > 0 && (
          <p style={{ fontSize: '13px', color: '#9ca3af', margin: '0 0 20px' }}>
            {filteredCareers.length} {filteredCareers.length === 1 ? 'position' : 'positions'} available
          </p>
        )}

        {/* Cards */}
        {filteredCareers.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 24px' }}>
            <FaBriefcase style={{ fontSize: '40px', color: '#d1d5db', marginBottom: '16px' }} />
            {careers.length === 0 ? (
              <>
                <p style={{ fontSize: '18px', fontWeight: 600, color: '#374151', margin: '0 0 8px' }}>No open positions right now</p>
                <p style={{ fontSize: '14px', color: '#9ca3af', margin: 0 }}>We're not actively hiring at the moment. Check back soon.</p>
              </>
            ) : (
              <>
                <p style={{ fontSize: '18px', fontWeight: 600, color: '#374151', margin: '0 0 8px' }}>No roles match this filter</p>
                <button onClick={() => setSelectedType('all')} style={{ background: 'none', border: 'none', color: '#F97316', fontSize: '14px', fontWeight: 500, cursor: 'pointer', marginTop: '8px', textDecoration: 'underline' }}>
                  Clear filter
                </button>
              </>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredCareers.map((career) => (
              <div
                key={career._id}
                style={{
                  backgroundColor: '#ffffff',
                  border: `1px solid ${hoveredCard === career._id ? '#F97316' : '#e5e7eb'}`,
                  borderRadius: '12px',
                  padding: '28px 32px',
                  transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
                  boxShadow: hoveredCard === career._id ? '0 4px 24px rgba(249,115,22,0.1)' : '0 1px 4px rgba(0,0,0,0.04)',
                }}
                onMouseEnter={() => setHoveredCard(career._id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={typePillStyle(career.type)}>{career.type}</div>
                    <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#111827', margin: '0 0 14px', letterSpacing: '-0.2px' }}>
                      {career.title}
                    </h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '16px' }}>
                      {[
                        { icon: <FaBriefcase />, text: career.department },
                        { icon: <FaMapMarkerAlt />, text: career.location },
                        { icon: <FaClock />, text: career.type },
                        ...(career.salary ? [{ icon: <FaDollarSign />, text: career.salary }] : []),
                      ].map(({ icon, text }, i) => (
                        <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#6b7280' }}>
                          <span style={{ color: '#F97316', fontSize: '12px' }}>{icon}</span>
                          {text}
                        </span>
                      ))}
                    </div>
                    <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.7, margin: '0 0 20px' }}>
                      {career.description}
                    </p>
                    {Array.isArray(career.requirements) && career.requirements.length > 0 && (
                      <>
                        <p style={{ fontSize: '12px', fontWeight: 600, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 10px' }}>
                          Requirements
                        </p>
                        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                          {career.requirements.map((req, idx) => (
                            <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#374151', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '4px 10px' }}>
                              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#F97316', flexShrink: 0, display: 'inline-block' }} />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>

                  <button
                    onClick={() => handleApply(career)}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#F97316', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '11px 22px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'background-color 0.15s ease', flexShrink: 0 }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#ea6d0e')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F97316')}
                  >
                    Apply Now <FaChevronRight style={{ fontSize: '11px' }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Modal ── */}
      {selectedCareer && (
        <div
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '16px', overflowY: 'auto' }}
          onClick={(e) => { if (e.target === e.currentTarget) setSelectedCareer(null); }}
        >
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', width: '100%', maxWidth: '480px', padding: '32px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            {/* Modal header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#111827', margin: '0 0 4px' }}>Apply for this role</h2>
                <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>{selectedCareer.title} · {selectedCareer.department}</p>
              </div>
              <button
                onClick={() => setSelectedCareer(null)}
                style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #e5e7eb', backgroundColor: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '18px', color: '#6b7280', flexShrink: 0, marginLeft: '12px' }}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleApplicationSubmit}>
              {formFields.map(({ key, label, type, required, placeholder }) => (
                <div key={key} style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#374151', letterSpacing: '0.04em', marginBottom: '6px', textTransform: 'uppercase' }}>
                    {label}{required && ' *'}
                  </label>
                  <input
                    type={type}
                    placeholder={placeholder}
                    required={required}
                    style={{
                      width: '100%', padding: '10px 14px', border: `1px solid ${focusedInput === key ? '#F97316' : '#e5e7eb'}`,
                      borderRadius: '8px', fontSize: '14px', color: '#111827', backgroundColor: '#ffffff',
                      outline: 'none', boxSizing: 'border-box',
                      boxShadow: focusedInput === key ? '0 0 0 3px rgba(249,115,22,0.12)' : 'none',
                    }}
                    onFocus={() => setFocusedInput(key)}
                    onBlur={() => setFocusedInput(null)}
                    value={(applicationForm as any)[key]}
                    onChange={(e) => setApplicationForm({ ...applicationForm, [key]: e.target.value })}
                  />
                </div>
              ))}

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#374151', letterSpacing: '0.04em', marginBottom: '6px', textTransform: 'uppercase' }}>
                  Resume *
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  required
                  style={{ fontSize: '13px', color: '#374151', width: '100%' }}
                  onChange={(e) => setApplicationForm({ ...applicationForm, resume: e.target.files?.[0] || null })}
                />
                <p style={{ fontSize: '12px', color: '#9ca3af', margin: '6px 0 0' }}>Accepted: PDF, DOC, DOCX</p>
              </div>

              <button
                type="submit"
                style={{ width: '100%', padding: '12px', backgroundColor: '#1a1a1a', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', marginTop: '8px', transition: 'background-color 0.15s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F97316')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1a1a1a')}
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Careers;
