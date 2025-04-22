"use client"
import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { useFavorites } from "../contexts/FavoritesContext"
import "./Navbar.css"
import logo from '../logo/logo.png'

/**
 * 네비게이션 바 컴포넌트
 * @returns {JSX.Element} 네비게이션 바 컴포넌트
 */
function Navbar() {
  // 인증 컨텍스트에서 사용자 정보와 로그아웃 함수 가져오기
  const { user, logout } = useAuth()

  // 관심 목록 컨텍스트에서 관심 목록 가져오기
  const { favorites } = useFavorites()

  /**
   * 로그아웃 처리 함수
   * @param {Event} e - 이벤트 객체
   */
  const handleLogout = (e) => {
    e.preventDefault()
    logout()

    /**
     * 백엔드 연동 포인트:
     * 로그아웃 후 필요한 추가 처리
     * 예: 리다이렉트, 상태 초기화 등
     */
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
            <Link to="/" className="navbar-logo">
             <img src={logo} alt="로고" className="logo-image" />
            </Link>
          <div className="navbar-links">
            <Link to="/facilities/silver-town" className="navbar-link">
              실버타운
            </Link>
            <Link to="/facilities/nursing-home" className="navbar-link">
              요양원
            </Link>
            <Link to="/facilities/elderly-home" className="navbar-link">
              양로원
            </Link>
          </div>
        </div>

        <div className="navbar-right">
          <Link to="/favorites" className="navbar-link favorites-link">
            관심목록
            {favorites.length > 0 && <span className="favorites-count">{favorites.length}</span>}
          </Link>

          {user ? (
            <div className="navbar-user">
              <span className="navbar-username">{user.username}</span>
              <button className="navbar-logout-btn" onClick={handleLogout}>
                로그아웃
              </button>
            </div>
          ) : (
            <Link to="/login" className="navbar-link">
              로그인/회원가입
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
