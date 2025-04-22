"use client"

/**
 * 계정 찾기 페이지 컴포넌트
 * 아이디 찾기 및 비밀번호 재설정 기능을 제공합니다.
 *
 * @author Frontend Team
 * @version 1.0
 */
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import Navbar from "../components/Navbar"
import "./FindAccountPage.css"

/**
 * 계정 찾기 페이지 컴포넌트
 * @returns {JSX.Element} 계정 찾기 페이지 컴포넌트
 */
function FindAccountPage() {
  // 라우터 네비게이션 훅
  const navigate = useNavigate()

  // 인증 컨텍스트에서 이메일 인증 함수 가져오기
  const { sendVerificationCode, verifyEmail } = useAuth()

  // 현재 활성 탭 상태 관리
  const [activeTab, setActiveTab] = useState("find-id")

  // 아이디 찾기 폼 상태 관리
  const [findIdForm, setFindIdForm] = useState({
    email: "",
    phone: "",
  })

  // 비밀번호 찾기 폼 상태 관리
  const [findPwForm, setFindPwForm] = useState({
    username: "",
    email: "",
    phone: "",
    verificationCode: "",
    newPassword: "",
    confirmPassword: "",
  })

  // 에러 상태 관리
  const [findIdError, setFindIdError] = useState(null)
  const [findPwError, setFindPwError] = useState(null)

  // 로딩 상태 관리
  const [findIdLoading, setFindIdLoading] = useState(false)
  const [findPwLoading, setFindPwLoading] = useState(false)

  // 아이디 찾기 결과 상태 관리
  const [foundId, setFoundId] = useState(null)

  // 비밀번호 재설정 단계 상태 관리
  const [pwResetStep, setPwResetStep] = useState("verification") // verification, reset
  const [isVerificationSent, setIsVerificationSent] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [isPasswordReset, setIsPasswordReset] = useState(false)

  /**
   * 아이디 찾기 폼 변경 핸들러
   * @param {Event} e - 이벤트 객체
   */
  const handleFindIdChange = (e) => {
    const { name, value } = e.target
    setFindIdForm((prev) => ({ ...prev, [name]: value }))
    setFindIdError(null)
  }

  /**
   * 비밀번호 찾기 폼 변경 핸들러
   * @param {Event} e - 이벤트 객체
   */
  const handleFindPwChange = (e) => {
    const { name, value } = e.target
    setFindPwForm((prev) => ({ ...prev, [name]: value }))
    setFindPwError(null)
  }

  /**
   * 아이디 찾기 폼 제출 핸들러
   * @param {Event} e - 이벤트 객체
   */
  const handleFindIdSubmit = async (e) => {
    e.preventDefault()

    // 입력 검증
    if (!findIdForm.email || !findIdForm.phone) {
      setFindIdError("이메일과 핸드폰 번호를 모두 입력해주세요.")
      return
    }

    setFindIdLoading(true)
    try {
      /**
       * 백엔드 연동 포인트:
       * 아이디 찾기 API 호출
       *
       * 예시:
       * const response = await axios.post('/api/auth/find-id', {
       *   email: findIdForm.email,
       *   phone: findIdForm.phone
       * });
       *
       * if (response.data.success) {
       *   setFoundId(response.data.username);
       * } else {
       *   setFindIdError('입력하신 정보와 일치하는 계정이 없습니다.');
       * }
       */

      // 임시 로직 (백엔드 연동 전)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // 더미 데이터로 아이디 찾기 성공 시뮬레이션
      if (findIdForm.email === "user@example.com" && findIdForm.phone === "010-1234-5678") {
        setFoundId("user123")
      } else {
        setFindIdError("입력하신 정보와 일치하는 계정이 없습니다.")
      }
    } catch (error) {
      console.error("아이디 찾기 오류:", error)
      setFindIdError("아이디 찾기 중 오류가 발생했습니다. 다시 시도해주세요.")
    } finally {
      setFindIdLoading(false)
    }
  }

  /**
   * 인증 코드 발송 핸들러
   */
  const handleSendVerification = async () => {
    // 입력 검증
    if (!findPwForm.username || !findPwForm.email || !findPwForm.phone) {
      setFindPwError("아이디, 이메일, 핸드폰 번호를 모두 입력해주세요.")
      return
    }

    setFindPwLoading(true)
    try {
      /**
       * 백엔드 연동 포인트:
       * 비밀번호 재설정 인증 코드 발송 API 호출
       *
       * 예시:
       * const response = await axios.post('/api/auth/reset-password/send-code', {
       *   username: findPwForm.username,
       *   email: findPwForm.email,
       *   phone: findPwForm.phone
       * });
       *
       * if (response.data.success) {
       *   setIsVerificationSent(true);
       * } else {
       *   setFindPwError('입력하신 정보와 일치하는 계정이 없습니다.');
       * }
       */

      // 임시 로직 (백엔드 연동 전)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // 더미 데이터로 인증 코드 발송 성공 시뮬레이션
      if (
        findPwForm.username === "user123" &&
        findPwForm.email === "user@example.com" &&
        findPwForm.phone === "010-1234-5678"
      ) {
        setIsVerificationSent(true)
      } else {
        setFindPwError("입력하신 정보와 일치하는 계정이 없습니다.")
      }
    } catch (error) {
      console.error("인증 코드 발송 오류:", error)
      setFindPwError("인증 코드 발송 중 오류가 발생했습니다. 다시 시도해주세요.")
    } finally {
      setFindPwLoading(false)
    }
  }

  /**
   * 인증 코드 확인 핸들러
   */
  const handleVerifyCode = async () => {
    if (!findPwForm.verificationCode) {
      setFindPwError("인증 코드를 입력해주세요.")
      return
    }

    setFindPwLoading(true)
    try {
      /**
       * 백엔드 연동 포인트:
       * 비밀번호 재설정 인증 코드 확인 API 호출
       *
       * 예시:
       * const response = await axios.post('/api/auth/reset-password/verify-code', {
       *   username: findPwForm.username,
       *   email: findPwForm.email,
       *   code: findPwForm.verificationCode
       * });
       *
       * if (response.data.success) {
       *   setIsVerified(true);
       *   setPwResetStep('reset');
       * } else {
       *   setFindPwError('인증 코드가 일치하지 않습니다.');
       * }
       */

      // 임시 로직 (백엔드 연동 전)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // 더미 데이터로 인증 코드 확인 성공 시뮬레이션
      // 테스트를 위해 "123456"을 인증 코드로 사용
      if (findPwForm.verificationCode === "123456") {
        setIsVerified(true)
        setPwResetStep("reset")
      } else {
        setFindPwError("인증 코드가 일치하지 않습니다.")
      }
    } catch (error) {
      console.error("인증 코드 확인 오류:", error)
      setFindPwError("인증 코드 확인 중 오류가 발생했습니다. 다시 시도해주세요.")
    } finally {
      setFindPwLoading(false)
    }
  }

  /**
   * 비밀번호 재설정 핸들러
   * @param {Event} e - 이벤트 객체
   */
  const handleResetPassword = async (e) => {
    e.preventDefault()

    // 입력 검증
    if (!findPwForm.newPassword || !findPwForm.confirmPassword) {
      setFindPwError("새 비밀번호와 비밀번호 확인을 모두 입력해주세요.")
      return
    }

    if (findPwForm.newPassword.length < 6) {
      setFindPwError("비밀번호는 6자 이상이어야 합니다.")
      return
    }

    if (findPwForm.newPassword !== findPwForm.confirmPassword) {
      setFindPwError("비밀번호가 일치하지 않습니다.")
      return
    }

    setFindPwLoading(true)
    try {
      /**
       * 백엔드 연동 포인트:
       * 비밀번호 재설정 API 호출
       *
       * 예시:
       * const response = await axios.post('/api/auth/reset-password', {
       *   username: findPwForm.username,
       *   email: findPwForm.email,
       *   code: findPwForm.verificationCode,
       *   newPassword: findPwForm.newPassword
       * });
       *
       * if (response.data.success) {
       *   setIsPasswordReset(true);
       * } else {
       *   setFindPwError('비밀번호 재설정에 실패했습니다. 다시 시도해주세요.');
       * }
       */

      // 임시 로직 (백엔드 연동 전)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // 비밀번호 재설정 성공 시뮬레이션
      setIsPasswordReset(true)
    } catch (error) {
      console.error("비밀번호 재설정 오류:", error)
      setFindPwError("비밀번호 재설정 중 오류가 발생했습니다. 다시 시도해주세요.")
    } finally {
      setFindPwLoading(false)
    }
  }

  return (
    <div className="find-account-page">
      <Navbar />

      <div className="find-account-container">
        <div className="find-account-card">
          <div className="find-account-header">
            <h2 className="find-account-title">계정 찾기</h2>
            <p className="find-account-subtitle">아이디 찾기 또는 비밀번호 재설정</p>
          </div>

          <div className="find-account-content">
            <div className="find-account-tabs">
              <button
                className={`tab-button ${activeTab === "find-id" ? "active" : ""}`}
                onClick={() => setActiveTab("find-id")}
              >
                아이디 찾기
              </button>
              <button
                className={`tab-button ${activeTab === "find-pw" ? "active" : ""}`}
                onClick={() => setActiveTab("find-pw")}
              >
                비밀번호 찾기
              </button>
            </div>

            <div className="tab-content">
              {/* 아이디 찾기 탭 */}
              {activeTab === "find-id" && (
                <div className="find-id-content">
                  {foundId ? (
                    <div className="find-success">
                      <div className="success-icon">✓</div>
                      <h3 className="success-title">아이디 찾기 성공</h3>
                      <p className="success-message">회원님의 아이디는 다음과 같습니다:</p>
                      <div className="found-id">{foundId}</div>
                      <Link to="/login" className="login-button">
                        로그인 하기
                      </Link>
                    </div>
                  ) : (
                    <form onSubmit={handleFindIdSubmit} className="find-form">
                      {findIdError && <div className="error-message">{findIdError}</div>}

                      <div className="form-group">
                        <label htmlFor="email" className="form-label">
                          이메일
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="가입 시 입력한 이메일을 입력하세요"
                          value={findIdForm.email}
                          onChange={handleFindIdChange}
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="phone" className="form-label">
                          핸드폰 번호
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="가입 시 입력한 핸드폰 번호를 입력하세요 (예: 010-1234-5678)"
                          value={findIdForm.phone}
                          onChange={handleFindIdChange}
                          className="form-input"
                        />
                      </div>

                      <button type="submit" className="submit-button" disabled={findIdLoading}>
                        {findIdLoading ? "아이디 찾는 중..." : "아이디 찾기"}
                      </button>
                    </form>
                  )}
                </div>
              )}

              {/* 비밀번호 찾기 탭 */}
              {activeTab === "find-pw" && (
                <div className="find-pw-content">
                  {isPasswordReset ? (
                    <div className="find-success">
                      <div className="success-icon">✓</div>
                      <h3 className="success-title">비밀번호 재설정 완료</h3>
                      <p className="success-message">비밀번호가 성공적으로 재설정되었습니다.</p>
                      <Link to="/login" className="login-button">
                        로그인 하기
                      </Link>
                    </div>
                  ) : pwResetStep === "verification" ? (
                    <div className="verification-step">
                      {findPwError && <div className="error-message">{findPwError}</div>}

                      <div className="form-group">
                        <label htmlFor="username" className="form-label">
                          아이디
                        </label>
                        <input
                          id="username"
                          name="username"
                          type="text"
                          placeholder="아이디를 입력하세요"
                          value={findPwForm.username}
                          onChange={handleFindPwChange}
                          disabled={isVerificationSent}
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="pw-email" className="form-label">
                          이메일
                        </label>
                        <input
                          id="pw-email"
                          name="email"
                          type="email"
                          placeholder="가입 시 입력한 이메일을 입력하세요"
                          value={findPwForm.email}
                          onChange={handleFindPwChange}
                          disabled={isVerificationSent}
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="pw-phone" className="form-label">
                          핸드폰 번호
                        </label>
                        <input
                          id="pw-phone"
                          name="phone"
                          type="tel"
                          placeholder="가입 시 입력한 핸드폰 번호를 입력하세요"
                          value={findPwForm.phone}
                          onChange={handleFindPwChange}
                          disabled={isVerificationSent}
                          className="form-input"
                        />
                      </div>

                      {!isVerificationSent ? (
                        <button
                          type="button"
                          className="submit-button"
                          onClick={handleSendVerification}
                          disabled={findPwLoading}
                        >
                          {findPwLoading ? "인증 코드 발송 중..." : "인증 코드 발송"}
                        </button>
                      ) : (
                        <div className="verification-code-section">
                          <div className="form-group">
                            <label htmlFor="verificationCode" className="form-label">
                              인증 코드
                            </label>
                            <input
                              id="verificationCode"
                              name="verificationCode"
                              type="text"
                              placeholder="이메일로 발송된 인증 코드를 입력하세요"
                              value={findPwForm.verificationCode}
                              onChange={handleFindPwChange}
                              className="form-input"
                            />
                            <p className="verification-note">* 테스트를 위한 인증 코드는 123456입니다.</p>
                          </div>

                          <button
                            type="button"
                            className="submit-button"
                            onClick={handleVerifyCode}
                            disabled={findPwLoading}
                          >
                            {findPwLoading ? "인증 코드 확인 중..." : "인증 코드 확인"}
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <form onSubmit={handleResetPassword} className="find-form">
                      {findPwError && <div className="error-message">{findPwError}</div>}

                      <div className="form-group">
                        <label htmlFor="newPassword" className="form-label">
                          새 비밀번호
                        </label>
                        <input
                          id="newPassword"
                          name="newPassword"
                          type="password"
                          placeholder="새 비밀번호를 입력하세요"
                          value={findPwForm.newPassword}
                          onChange={handleFindPwChange}
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="confirmPassword" className="form-label">
                          비밀번호 확인
                        </label>
                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          placeholder="비밀번호를 다시 입력하세요"
                          value={findPwForm.confirmPassword}
                          onChange={handleFindPwChange}
                          className="form-input"
                        />
                      </div>

                      <button type="submit" className="submit-button" disabled={findPwLoading}>
                        {findPwLoading ? "비밀번호 재설정 중..." : "비밀번호 재설정"}
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="find-account-footer">
            <Link to="/login" className="back-to-login">
              로그인 페이지로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FindAccountPage
