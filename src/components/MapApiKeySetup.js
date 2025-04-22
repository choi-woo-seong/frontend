"use client"

/**
 * 카카오맵 API 키 설정 컴포넌트
 * 카카오맵 API 키를 설정하는 인터페이스를 제공합니다.
 *
 * @author Frontend Team
 * @version 1.0
 */
import { useState } from "react"
import "./MapApiKeySetup.css"

/**
 * 카카오맵 API 키 설정 컴포넌트
 * @returns {JSX.Element} 카카오맵 API 키 설정 컴포넌트
 */
function MapApiKeySetup() {
  // API 키 상태 관리
  const [apiKey, setApiKey] = useState("")
  // 성공 상태 관리
  const [isSuccess, setIsSuccess] = useState(false)
  // 에러 상태 관리
  const [error, setError] = useState(null)

  /**
   * API 키 저장 핸들러
   */
  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      setError("API 키를 입력해주세요")
      return
    }

    // 로컬 스토리지에 API 키 저장 (개발 목적으로만 사용)
    try {
      localStorage.setItem("KAKAO_MAP_API_KEY", apiKey)
      setIsSuccess(true)
      setError(null)

      // 환경 변수에 API 키 설정 (실제로는 이렇게 하지 않음)
      // 이 부분은 개발 편의를 위한 것으로, 실제 프로덕션에서는 서버 측에서 처리해야 함
      process.env.REACT_APP_KAKAO_MAP_API_KEY = apiKey

      // 3초 후 성공 메시지 숨기기
      setTimeout(() => {
        setIsSuccess(false)
      }, 3000)
    } catch (err) {
      setError("API 키 저장에 실패했습니다")
      console.error("Error saving API key:", err)
    }
  }

  return (
    <div className="map-api-key-setup">
      <div className="setup-card">
        <div className="setup-header">
          <h2 className="setup-title">카카오맵 API 키 설정</h2>
          <p className="setup-description">카카오맵 API를 사용하기 위해 발급받은 API 키를 입력해주세요.</p>
        </div>

        <div className="setup-content">
          {error && (
            <div className="setup-alert error">
              <div className="alert-icon">!</div>
              <div className="alert-content">
                <h3 className="alert-title">오류</h3>
                <p className="alert-description">{error}</p>
              </div>
            </div>
          )}

          {isSuccess && (
            <div className="setup-alert success">
              <div className="alert-icon">✓</div>
              <div className="alert-content">
                <h3 className="alert-title">성공</h3>
                <p className="alert-description">API 키가 성공적으로 저장되었습니다.</p>
              </div>
            </div>
          )}

          <div className="setup-form">
            <div className="form-group">
              <label htmlFor="api-key" className="form-label">
                카카오맵 API 키
              </label>
              <input
                id="api-key"
                type="text"
                placeholder="API 키를 입력하세요"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="setup-instructions">
              <p className="instructions-text">API 키는 카카오 개발자 사이트에서 발급받을 수 있습니다.</p>
              <ol className="instructions-list">
                <li>카카오 개발자 사이트 (https://developers.kakao.com) 접속</li>
                <li>개발자 등록 및 앱 생성</li>
                <li>웹 플랫폼 추가: 앱 선택 – [플랫폼] – [Web 플랫폼 등록] – 사이트 도메인 등록</li>
                <li>페이지 상단의 [JavaScript 키]를 복사하여 위에 붙여넣기</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="setup-footer">
          <button onClick={handleSaveApiKey} className="save-button">
            API 키 저장
          </button>
        </div>
      </div>
    </div>
  )
}

export default MapApiKeySetup
