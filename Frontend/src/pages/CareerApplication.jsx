import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, User, Mail, Phone, FileText, Briefcase } from 'lucide-react';

export default function CareerApplication() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    position: '',
    experience: '',
    education: '',
    skills: '',
    coverLetter: '',
    resume: null,
    portfolio: null,
    availability: '',
    expectedSalary: '',
    references: ''
  });
  const [errors, setErrors] = useState({});

  const jobTitles = {
    '1': 'Personal Trainer',
    '2': 'Fitness Manager',
    '3': 'Group Fitness Instructor',
    '4': 'Front Desk Coordinator',
    '5': 'Membership Sales Consultant',
    '6': 'Facility Maintenance Technician'
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.position.trim()) newErrors.position = 'Position is required';
    if (!formData.experience.trim()) newErrors.experience = 'Experience is required';
    if (!formData.education.trim()) newErrors.education = 'Education is required';
    if (!formData.coverLetter.trim()) newErrors.coverLetter = 'Cover letter is required';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Create application object
      const application = {
        id: Date.now(),
        ...formData,
        jobId: jobId,
        jobTitle: jobTitles[jobId] || formData.position,
        submittedAt: new Date().toISOString(),
        status: 'pending',
        resume: formData.resume ? {
          name: formData.resume.name,
          size: formData.resume.size,
          type: formData.resume.type
        } : null,
        portfolio: formData.portfolio ? {
          name: formData.portfolio.name,
          size: formData.portfolio.size,
          type: formData.portfolio.type
        } : null
      };

      // Save to localStorage for admin to view
      const existingApplications = JSON.parse(localStorage.getItem('careerApplications') || '[]');
      existingApplications.push(application);
      localStorage.setItem('careerApplications', JSON.stringify(existingApplications));

      // Show success message
      alert('Application submitted successfully! We will review your application and get back to you soon.');
      navigate('/careers');
    } catch (error) {
      alert('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate('/careers')}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition"
          >
            <ArrowLeft size={20} />
            Back to Careers
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transition-colors duration-300">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-900 dark:text-blue-400 mb-2">Career Application</h1>
            <p className="text-gray-600 dark:text-gray-400">
              {jobId && jobTitles[jobId] ? `Applying for: ${jobTitles[jobId]}` : 'General Application'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <User size={20} />
                Personal Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.fullName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="John Doe"
                  />
                  {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="+94 77 123 4567"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="City, Country"
                  />
                </div>
              </div>
            </div>

            {/* Position Information */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Briefcase size={20} />
                Position Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Position Applying For *
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position || (jobId && jobTitles[jobId] ? jobTitles[jobId] : '')}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.position ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Personal Trainer"
                  />
                  {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expected Salary (LKR)
                  </label>
                  <input
                    type="text"
                    name="expectedSalary"
                    value={formData.expectedSalary}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="80,000 - 120,000"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Availability
                  </label>
                  <input
                    type="text"
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Immediate / 2 weeks notice / etc."
                  />
                </div>
              </div>
            </div>

            {/* Professional Background */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText size={20} />
                Professional Background
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Work Experience *
                  </label>
                  <textarea
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    rows="4"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.experience ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Describe your relevant work experience, including job titles, companies, and key responsibilities..."
                  />
                  {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Education *
                  </label>
                  <textarea
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    rows="3"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.education ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="List your educational background, degrees, certifications, and relevant training..."
                  />
                  {errors.education && <p className="text-red-500 text-sm mt-1">{errors.education}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skills & Certifications
                  </label>
                  <textarea
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="List your relevant skills, certifications, and technical competencies..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    References
                  </label>
                  <textarea
                    name="references"
                    value={formData.references}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Provide contact information for 2-3 professional references..."
                  />
                </div>
              </div>
            </div>

            {/* Cover Letter */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Cover Letter *
              </h2>
              <textarea
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                rows="6"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.coverLetter ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Tell us why you're interested in this position and what makes you a great fit for our team..."
              />
              {errors.coverLetter && <p className="text-red-500 text-sm mt-1">{errors.coverLetter}</p>}
            </div>

            {/* File Uploads */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Upload size={20} />
                Documents
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Resume/CV
                  </label>
                  <input
                    type="file"
                    name="resume"
                    onChange={handleChange}
                    accept=".pdf,.doc,.docx"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">PDF, DOC, or DOCX format</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Portfolio (Optional)
                  </label>
                  <input
                    type="file"
                    name="portfolio"
                    onChange={handleChange}
                    accept=".pdf,.doc,.docx,.zip"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX, or ZIP format</p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => navigate('/careers')}
                className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}