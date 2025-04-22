"use client"

/**
 * 로그인 페이지 컴포넌트
 * 사용자 로그인 기능을 제공합니다.
 *
 * @author Frontend Team
 * @version 1.0
 */
import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import Navbar from "../components/Navbar"
import "./LoginPage.css"

/**
 * 로그인 페이지 컴포넌트
 * @returns {JSX.Element} 로그인 페이지 컴포넌트
 */
function LoginPage() {
  // 라우터 네비게이션 및 위치 훅
  const navigate = useNavigate()
  const location = useLocation()

  // 인증 컨텍스트에서 로그인 함수 가져오기
  const { login, socialLogin } = useAuth()

  // 폼 데이터 상태 관리
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  })

  // 에러 상태 관리
  const [errors, setErrors] = useState({})
  // 로딩 상태 관리
  const [isLoading, setIsLoading] = useState(false)
  // 소셜 로그인 로딩 상태 관리
  const [isSocialLoading, setIsSocialLoading] = useState({
    kakao: false,
    google: false,
  })
  // 성공 메시지 상태 관리
  const [successMessage, setSuccessMessage] = useState(null)

  // URL 파라미터에서 registered=true 확인
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const registered = searchParams.get("registered")
    if (registered === "true") {
      setSuccessMessage("회원가입이 완료되었습니다. 로그인해주세요.")
    }
  }, [location.search])

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
    }

    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요."
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  /**
   * 로그인 폼 제출 핸들러
   * @param {Event} e - 이벤트 객체
   */
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    try {
      const success = await login(formData.username, formData.password)

      if (success) {
        navigate("/")
      } else {
        setErrors((prev) => ({
          ...prev,
          form: "로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.",
        }))
      }
    } catch (error) {
      console.error("로그인 오류:", error)
      setErrors((prev) => ({
        ...prev,
        form: "로그인 중 오류가 발생했습니다. 다시 시도해주세요.",
      }))
    } finally {
      setIsLoading(false)
    }

    /**
     * 백엔드 연동 포인트:
     * 로그인 API 호출
     *
     * 예시:
     * try {
     *   const response = await axios.post('/api/auth/login', {
     *     username: formData.username,
     *     password: formData.password
     *   });
     *
     *   const { token, user } = response.data;
     *   localStorage.setItem('token', token);
     *   localStorage.setItem('user', JSON.stringify(user));
     *
     *   // 인증 헤더 설정
     *   axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
     *
     *   // 로그인 성공 후 홈페이지로 이동
     *   navigate('/');
     * } catch (error) {
     *   console.error('로그인 오류:', error);
     *   setErrors(prev => ({
     *     ...prev,
     *     form: error.response?.data?.message || '로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.'
     *   }));
     * } finally {
     *   setIsLoading(false);
     * }
     */
  }

  /**
   * 소셜 로그인 핸들러
   * @param {string} provider - 소셜 로그인 제공자 (예: 'kakao', 'google')
   */
  const handleSocialLogin = async (provider) => {
    setIsSocialLoading((prev) => ({ ...prev, [provider]: true }))
    try {
      const success = await socialLogin(provider)

      if (success) {
        navigate("/")
      } else {
        setErrors((prev) => ({
          ...prev,
          form: `${provider === "kakao" ? "카카오" : "구글"} 로그인에 실패했습니다.`,
        }))
      }
    } catch (error) {
      console.error(`${provider} 로그인 오류:`, error)
      setErrors((prev) => ({
        ...prev,
        form: `${provider} 로그인 중 오류가 발생했습니다. 다시 시도해주세요.`,
      }))
    } finally {
      setIsSocialLoading((prev) => ({ ...prev, [provider]: false }))
    }

    /**
     * 백엔드 연동 포인트:
     * 소셜 로그인 처리
     *
     * 예시:
     * // 소셜 로그인은 일반적으로 OAuth 리다이렉트 방식으로 처리됩니다.
     * // 프론트엔드에서는 백엔드가 제공하는 소셜 로그인 URL로 리다이렉트합니다.
     * window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
     *
     * // 또는 팝업 방식으로 처리할 수도 있습니다.
     * // 이 경우 백엔드에서 소셜 로그인 성공 후 토큰을 반환받아 처리합니다.
     */
  }

  return (
    <div className="login-page">
      <Navbar />

      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h2 className="login-title">로그인</h2>
            <p className="login-subtitle">환영합니다! 계정에 로그인하세요</p>
          </div>

          <div className="login-content">
            {successMessage && <div className="success-message">{successMessage}</div>}

            {errors.form && <div className="error-message">{errors.form}</div>}

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="username" className="form-label">
                  아이디
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
                  비밀번호
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

              <div className="form-options">
                <div className="remember-me">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="checkbox"
                  />
                  <label htmlFor="rememberMe" className="checkbox-label">
                    아이디 저장
                  </label>
                </div>
                <Link to="/find-account" className="forgot-link">
                  아이디/비밀번호 찾기
                </Link>
              </div>

              <button type="submit" className="login-button" disabled={isLoading}>
                {isLoading ? "로그인 중..." : "로그인"}
              </button>
            </form>

            <div className="divider">
              <span className="divider-text">또는</span>
            </div>

            <div className="social-login">
              <button
                type="button"
                className="social-button google-button"
                onClick={() => handleSocialLogin("google")}
                disabled={isSocialLoading.google}
              >
                <svg className="social-icon" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                {isSocialLoading.google ? "로그인 중..." : "구글로 로그인"}
              </button>

              <button
                type="button"
                className="social-button kakao-button"
                onClick={() => handleSocialLogin("kakao")}
                disabled={isSocialLoading.kakao}
              >
                <svg className="social-icon" viewBox="0 0 24 24" fill="none">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 4C7.58172 4 4 6.78579 4 10.1429C4 12.4097 5.57143 14.3741 7.89286 15.3973L6.75 19.1429C6.67172 19.3719 6.937 19.5567 7.14286 19.4199L11.3571 16.6973C11.5679 16.7122 11.7821 16.7203 12 16.7203C16.4183 16.7203 20 13.9345 20 10.5774C20 7.22031 16.4183 4 12 4Z"
                    fill="#3A1D1D"
                  />
                </svg>
                {isSocialLoading.kakao ? "로그인 중..." : "카카오 로그인"}
              </button>
            </div>
          </div>

          <div className="login-footer">
            <p className="register-text">
              계정이 없으신가요?{" "}
              <Link to="/register" className="register-link">
                회원가입
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
