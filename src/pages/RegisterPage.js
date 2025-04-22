"use client"

/**
 * 회원가입 페이지 컴포넌트
 * 사용자 회원가입 기능을 제공합니다.
 *
 * @author Frontend Team
 * @version 1.0
 */
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import Navbar from "../components/Navbar"
import "./RegisterPage.css"

/**
 * 회원가입 페이지 컴포넌트
 * @returns {JSX.Element} 회원가입 페이지 컴포넌트
 */
function RegisterPage() {
  // 라우터 네비게이션 훅
  const navigate = useNavigate()

  // 인증 컨텍스트에서 회원가입 및 이메일 인증 함수 가져오기
  const { register, sendVerificationCode, verifyEmail } = useAuth()

  // 폼 데이터 상태 관리
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    phone: "",
    verificationCode: "",
    agreeTerms: false,
  })

  // 에러 상태 관리
  const [errors, setErrors] = useState({})
  // 로딩 상태 관리
  const [isLoading, setIsLoading] = useState(false)
  // 이메일 인증 상태 관리
  const [isVerificationSent, setIsVerificationSent] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)

  /**
   * 입력 필드 변경 핸들러
   * @param {Event} e - 이벤트 객체
   */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    // 에러 메시지 초기화
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  /**
   * 폼 유효성 검사
   * @returns {boolean} 유효성 검사 결과
   */
  const validateForm = () => {
    const newErrors = {}

    if (!formData.username.trim()) {
      newErrors.username = "아이디를 입력해주세요."
    } else if (formData.username.length < 4) {
      newErrors.username = "아이디는 4자 이상이어야 합니다."
    }

    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요."
    } else if (formData.password.length < 6) {
      newErrors.password = "비밀번호는 6자 이상이어야 합니다."
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다."
    }

    if (!formData.email) {
      newErrors.email = "이메일을 입력해주세요."
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "유효한 이메일 주소를 입력해주세요."
    }

    if (!isVerified) {
      newErrors.email = "이메일 인증이 필요합니다."
    }

    if (!formData.phone) {
      newErrors.phone = "전화번호를 입력해주세요."
    } else if (!/^\d{3}-\d{3,4}-\d{4}$/.test(formData.phone)) {
      newErrors.phone = "유효한 전화번호 형식이 아닙니다. (예: 010-1234-5678)"
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "이용약관에 동의해주세요."
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  /**
   * 인증 코드 발송 핸들러
   */
  const handleSendVerification = async () => {
    // 이메일 입력 검증
    if (!formData.email) {
      setErrors((prev) => ({ ...prev, email: "이메일을 입력해주세요." }))
      return
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrors((prev) => ({ ...prev, email: "유효한 이메일 주소를 입력해주세요." }))
      return
    }

    setIsVerifying(true)
    try {
      const success = await sendVerificationCode(formData.email)

      if (success) {
        setIsVerificationSent(true)
        setErrors((prev) => ({ ...prev, email: "" }))
      } else {
        setErrors((prev) => ({ ...prev, email: "인증 코드 전송에 실패했습니다." }))
      }
    } catch (error) {
      console.error("인증 코드 전송 오류:", error)
      setErrors((prev) => ({
        ...prev,
        email: "인증 코드 전송 중 오류가 발생했습니다. 다시 시도해주세요.",
      }))
    } finally {
      setIsVerifying(false)
    }

    /**
     * 백엔드 연동 포인트:
     * 이메일 인증 코드 전송 API 호출
     *
     * 예시:
     * try {
     *   await axios.post('/api/auth/send-verification', { email: formData.email });
     *   setIsVerificationSent(true);
     *   setErrors(prev => ({ ...prev, email: '' }));
     * } catch (error) {
     *   console.error('인증 코드 전송 오류:', error);
     *   setErrors(prev => ({
     *     ...prev,
     *     email: error.response?.data?.message || '인증 코드 전송에 실패했습니다.'
     *   }));
     * } finally {
     *   setIsVerifying(false);
     * }
     */
  }

  /**
   * 인증 코드 확인 핸들러
   */
  const handleVerifyCode = async () => {
    if (!formData.verificationCode) {
      setErrors((prev) => ({ ...prev, verificationCode: "인증 코드를 입력해주세요." }))
      return
    }

    setIsVerifying(true)
    try {
      const success = await verifyEmail(formData.email, formData.verificationCode)

      if (success) {
        setIsVerified(true)
        setErrors((prev) => ({ ...prev, verificationCode: "" }))
      } else {
        setErrors((prev) => ({ ...prev, verificationCode: "인증 코드가 일치하지 않습니다." }))
      }
    } catch (error) {
      console.error("이메일 인증 오류:", error)
      setErrors((prev) => ({
        ...prev,
        verificationCode: "인증 코드 확인 중 오류가 발생했습니다. 다시 시도해주세요.",
      }))
    } finally {
      setIsVerifying(false)
    }

    /**
     * 백엔드 연동 포인트:
     * 이메일 인증 코드 확인 API 호출
     *
     * 예시:
     * try {
     *   await axios.post('/api/auth/verify-email', {
     *     email: formData.email,
     *     code: formData.verificationCode
     *   });
     *   setIsVerified(true);
     *   setErrors(prev => ({ ...prev, verificationCode: '' }));
     * } catch (error) {
     *   console.error('이메일 인증 오류:', error);
     *   setErrors(prev => ({
     *     ...prev,
     *     verificationCode: error.response?.data?.message || '인증 코드가 일치하지 않습니다.'
     *   }));
     * } finally {
     *   setIsVerifying(false);
     * }
     */
  }

  /**
   * 회원가입 폼 제출 핸들러
   * @param {Event} e - 이벤트 객체
   */
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    try {
      const success = await register(formData.username, formData.password, formData.email, formData.phone)

      if (success) {
        // 회원가입 성공 시 로그인 페이지로 이동
        navigate("/login?registered=true")
      } else {
        setErrors((prev) => ({
          ...prev,
          form: "회원가입에 실패했습니다. 다시 시도해주세요.",
        }))
      }
    } catch (error) {
      console.error("회원가입 오류:", error)
      setErrors((prev) => ({
        ...prev,
        form: "회원가입 중 오류가 발생했습니다. 다시 시도해주세요.",
      }))
    } finally {
      setIsLoading(false)
    }

    /**
     * 백엔드 연동 포인트:
     * 회원가입 API 호출
     *
     * 예시:
     * try {
     *   await axios.post('/api/auth/register', {
     *     username: formData.username,
     *     password: formData.password,
     *     email: formData.email,
     *     phone: formData.phone
     *   });
     *
     *   // 회원가입 성공 시 로그인 페이지로 이동
     *   navigate('/login?registered=true');
     * } catch (error) {
     *   console.error('회원가입 오류:', error);
     *   setErrors(prev => ({
     *     ...prev,
     *     form: error.response?.data?.message || '회원가입에 실패했습니다. 다시 시도해주세요.'
     *   }));
     * } finally {
     *   setIsLoading(false);
     * }
     */
  }

  return (
    <div className="register-page">
      <Navbar />

      <div className="register-container">
        <div className="register-card">
          <div className="register-header">
            <h2 className="register-title">회원가입</h2>
            <p className="register-subtitle">모서요 서비스 이용을 위한 회원가입</p>
          </div>

          <div className="register-content">
            {errors.form && <div className="error-message">{errors.form}</div>}

            <form onSubmit={handleSubmit} className="register-form">
              <div className="form-group">
                <label htmlFor="username" className="form-label">
                  아이디 <span className="required">*</span>
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="아이디를 입력하세요"
                  value={formData.username}
                  onChange={handleChange}
                  className="form-input"
                />
                {errors.username && <p className="field-error">{errors.username}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  비밀번호 <span className="required">*</span>
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                />
                {errors.password && <p className="field-error">{errors.password}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">
                  비밀번호 확인 <span className="required">*</span>
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="비밀번호를 다시 입력하세요"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-input"
                />
                {errors.confirmPassword && <p className="field-error">{errors.confirmPassword}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  이메일 <span className="required">*</span>
                </label>
                <div className="input-with-button">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="이메일을 입력하세요"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-input ${isVerified ? "verified" : ""}`}
                    disabled={isVerified}
                  />
                  <button
                    type="button"
                    className="verification-button"
                    onClick={handleSendVerification}
                    disabled={isVerifying || isVerified}
                  >
                    {isVerifying ? "전송 중..." : isVerified ? "인증 완료" : "인증코드 발송"}
                  </button>
                </div>
                {errors.email && <p className="field-error">{errors.email}</p>}
              </div>

              {isVerificationSent && !isVerified && (
                <div className="form-group">
                  <label htmlFor="verificationCode" className="form-label">
                    인증 코드 <span className="required">*</span>
                  </label>
                  <div className="input-with-button">
                    <input
                      id="verificationCode"
                      name="verificationCode"
                      type="text"
                      placeholder="인증 코드를 입력하세요"
                      value={formData.verificationCode}
                      onChange={handleChange}
                      className="form-input"
                    />
                    <button
                      type="button"
                      className="verification-button"
                      onClick={handleVerifyCode}
                      disabled={isVerifying}
                    >
                      {isVerifying ? "확인 중..." : "확인"}
                    </button>
                  </div>
                  {errors.verificationCode && <p className="field-error">{errors.verificationCode}</p>}
                  <p className="verification-note">* 테스트를 위한 인증 코드는 123456입니다.</p>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  전화번호 <span className="required">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="전화번호를 입력하세요 (예: 010-1234-5678)"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-input"
                />
                {errors.phone && <p className="field-error">{errors.phone}</p>}
              </div>

              <div className="form-group checkbox-group">
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="checkbox"
                  />
                  <label htmlFor="agreeTerms" className="checkbox-label">
                    <a href="/terms" className="terms-link" target="_blank" rel="noopener noreferrer">
                      이용약관
                    </a>{" "}
                    및{" "}
                    <a href="/privacy" className="terms-link" target="_blank" rel="noopener noreferrer">
                      개인정보 처리방침
                    </a>
                    에 동의합니다. <span className="required">*</span>
                  </label>
                </div>
                {errors.agreeTerms && <p className="field-error">{errors.agreeTerms}</p>}
              </div>

              <button type="submit" className="register-button" disabled={isLoading}>
                {isLoading ? "회원가입 중..." : "회원가입"}
              </button>
            </form>
          </div>

          <div className="register-footer">
            <p className="login-text">
              이미 계정이 있으신가요?{" "}
              <Link to="/login" className="login-link">
                로그인
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
