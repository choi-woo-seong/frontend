"use client"

/**
 * 인증 관련 컨텍스트
 * 사용자 인증 상태 및 관련 기능을 관리합니다.
 * Spring Security와 연동하여 인증 처리를 담당합니다.
 *
 * @author Frontend Team
 * @version 1.0
 */
import { createContext, useState, useContext, useEffect } from "react"

// 인증 컨텍스트 생성
const AuthContext = createContext(null)

/**
 * 인증 컨텍스트 제공자 컴포넌트
 *
 * @param {Object} props - 컴포넌트 props
 * @param {React.ReactNode} props.children - 자식 컴포넌트
 */
export function AuthProvider({ children }) {
  // 사용자 상태 관리
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // 컴포넌트 마운트 시 로컬 스토리지에서 사용자 정보 불러오기
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error)
        localStorage.removeItem("user")
      }
    }
    setLoading(false)

    /**
     * 백엔드 연동 포인트:
     * 토큰 유효성 검증 API 호출
     *
     * 예시:
     * const token = localStorage.getItem('token');
     * if (token) {
     *   axios.get('/api/auth/validate', {
     *     headers: { Authorization: `Bearer ${token}` }
     *   })
     *   .then(response => {
     *     setUser(response.data);
     *   })
     *   .catch(error => {
     *     console.error('Token validation failed:', error);
     *     localStorage.removeItem('token');
     *     localStorage.removeItem('user');
     *     setUser(null);
     *   })
     *   .finally(() => {
     *     setLoading(false);
     *   });
     * } else {
     *   setLoading(false);
     * }
     */
  }, [])

  /**
   * 로그인 함수
   *
   * @param {string} username - 사용자 아이디
   * @param {string} password - 사용자 비밀번호
   * @returns {Promise<boolean>} 로그인 성공 여부
   */
  const login = async (username, password) => {
    try {
      setError(null)

      /**
       * 백엔드 연동 포인트:
       * 로그인 API 호출
       *
       * 예시:
       * const response = await axios.post('/api/auth/login', {
       *   username,
       *   password
       * });
       *
       * const { token, user } = response.data;
       * localStorage.setItem('token', token);
       * localStorage.setItem('user', JSON.stringify(user));
       * setUser(user);
       *
       * // 인증 헤더 설정
       * axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
       *
       * return true;
       */

      // 임시 로그인 로직 (백엔드 연동 전)
      const dummyUser = {
        id: "user123",
        username,
        email: "user@example.com",
        phone: "010-1234-5678",
      }

      localStorage.setItem("user", JSON.stringify(dummyUser))
      setUser(dummyUser)

      return true
    } catch (error) {
      console.error("Login failed:", error)
      setError(error.response?.data?.message || "로그인에 실패했습니다.")
      return false
    }
  }

  /**
   * 소셜 로그인 함수
   *
   * @param {string} provider - 소셜 로그인 제공자 (예: 'kakao', 'google')
   * @returns {Promise<boolean>} 로그인 성공 여부
   */
  const socialLogin = async (provider) => {
    try {
      setError(null)

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

      // 임시 소셜 로그인 로직 (백엔드 연동 전)
      const dummyUser = {
        id: `${provider}_user123`,
        username: `${provider}User`,
        email: `${provider}@example.com`,
      }

      localStorage.setItem("user", JSON.stringify(dummyUser))
      setUser(dummyUser)

      return true
    } catch (error) {
      console.error(`${provider} login failed:`, error)
      setError(error.response?.data?.message || "소셜 로그인에 실패했습니다.")
      return false
    }
  }

  /**
   * 로그아웃 함수
   */
  const logout = () => {
    /**
     * 백엔드 연동 포인트:
     * 로그아웃 API 호출
     *
     * 예시:
     * axios.post('/api/auth/logout')
     *   .catch(error => {
     *     console.error('Logout API error:', error);
     *   })
     *   .finally(() => {
     *     // 로컬 상태 및 스토리지 정리
     *     localStorage.removeItem('token');
     *     localStorage.removeItem('user');
     *     delete axios.defaults.headers.common['Authorization'];
     *     setUser(null);
     *   });
     */

    // 임시 로그아웃 로직 (백엔드 연동 전)
    localStorage.removeItem("user")
    setUser(null)
  }

  /**
   * 회원가입 함수
   *
   * @param {string} username - 사용자 아이디
   * @param {string} password - 사용자 비밀번호
   * @param {string} email - 사용자 이메일
   * @param {string} phone - 사용자 전화번호
   * @returns {Promise<boolean>} 회원가입 성공 여부
   */
  const register = async (username, password, email, phone) => {
    try {
      setError(null)

      /**
       * 백엔드 연동 포인트:
       * 회원가입 API 호출
       *
       * 예시:
       * const response = await axios.post('/api/auth/register', {
       *   username,
       *   password,
       *   email,
       *   phone
       * });
       *
       * // 회원가입 후 자동 로그인 처리
       * const { token, user } = response.data;
       * localStorage.setItem('token', token);
       * localStorage.setItem('user', JSON.stringify(user));
       * setUser(user);
       *
       * // 인증 헤더 설정
       * axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
       *
       * return true;
       */

      // 임시 회원가입 로직 (백엔드 연동 전)
      const dummyUser = {
        id: "new_user123",
        username,
        email,
        phone,
      }

      localStorage.setItem("user", JSON.stringify(dummyUser))
      setUser(dummyUser)

      return true
    } catch (error) {
      console.error("Registration failed:", error)
      setError(error.response?.data?.message || "회원가입에 실패했습니다.")
      return false
    }
  }

  /**
   * 이메일 인증 코드 전송 함수
   *
   * @param {string} email - 사용자 이메일
   * @returns {Promise<boolean>} 전송 성공 여부
   */
  const sendVerificationCode = async (email) => {
    try {
      setError(null)

      /**
       * 백엔드 연동 포인트:
       * 이메일 인증 코드 전송 API 호출
       *
       * 예시:
       * await axios.post('/api/auth/send-verification', { email });
       * return true;
       */

      // 임시 로직 (백엔드 연동 전)
      return true
    } catch (error) {
      console.error("Failed to send verification code:", error)
      setError(error.response?.data?.message || "인증 코드 전송에 실패했습니다.")
      return false
    }
  }

  /**
   * 이메일 인증 코드 확인 함수
   *
   * @param {string} email - 사용자 이메일
   * @param {string} code - 인증 코드
   * @returns {Promise<boolean>} 인증 성공 여부
   */
  const verifyEmail = async (email, code) => {
    try {
      setError(null)

      /**
       * 백엔드 연동 포인트:
       * 이메일 인증 코드 확인 API 호출
       *
       * 예시:
       * await axios.post('/api/auth/verify-email', { email, code });
       * return true;
       */

      // 임시 로직 (백엔드 연동 전)
      return code === "123456" // 테스트용 코드
    } catch (error) {
      console.error("Email verification failed:", error)
      setError(error.response?.data?.message || "이메일 인증에 실패했습니다.")
      return false
    }
  }

  // 컨텍스트 값 정의
  const value = {
    user,
    loading,
    error,
    login,
    socialLogin,
    logout,
    register,
    sendVerificationCode,
    verifyEmail,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

/**
 * 인증 컨텍스트 사용 훅
 *
 * @returns {Object} 인증 컨텍스트 값
 */
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
