"use client"

/**
 * 애플리케이션의 메인 컴포넌트
 * 라우팅 설정 및 전역 상태 관리를 담당합니다.
 *
 * @author Frontend Team
 * @version 1.0
 */
import { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import axios from "axios"
import "./App.css"

// 페이지 컴포넌트 import
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import FacilityDetailPage from "./pages/FacilityDetailPage"
import FacilityListPage from "./pages/FacilityListPage"
import FavoritesPage from "./pages/FavoritesPage"

// 컨텍스트 import
import { AuthProvider } from "./contexts/AuthContext"
import { FavoritesProvider } from "./contexts/FavoritesContext"

// API 기본 URL 설정
axios.defaults.baseURL = "http://localhost:8080"

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 애플리케이션 초기화 로직
    // 예: 사용자 인증 상태 확인, 초기 데이터 로드 등

    /**
     * 백엔드 연동 포인트:
     * 1. 사용자 인증 상태 확인 API 호출
     * 2. 필요한 초기 데이터 로드
     *
     * 예시:
     * axios.get('/api/auth/check')
     *   .then(response => {
     *     // 인증 상태 처리
     *   })
     *   .catch(error => {
     *     console.error('인증 확인 실패:', error);
     *   })
     *   .finally(() => {
     *     setIsLoading(false);
     *   });
     */

    // 임시로 로딩 상태 해제
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  if (isLoading) {
    return <div className="loading-container">로딩 중...</div>
  }

  return (
    <AuthProvider>
      <FavoritesProvider>
        <div className="app">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/facility/:facilityId" element={<FacilityDetailPage />} />
            <Route path="/facilities/:facilityType" element={<FacilityListPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </div>
      </FavoritesProvider>
    </AuthProvider>
  )
}

export default App
