"use client"

/**
 * 이미지 폴백 처리 컴포넌트
 * 이미지 로드 실패 시 대체 이미지를 표시합니다.
 *
 * @author Frontend Team
 * @version 1.0
 */
import { useState } from "react"
import "./ImageWithFallback.css"

/**
 * 이미지 폴백 처리 컴포넌트
 *
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.src - 이미지 소스 URL
 * @param {string} props.alt - 이미지 대체 텍스트
 * @param {string} props.fallbackSrc - 폴백 이미지 소스 URL
 * @param {string} props.className - 추가 CSS 클래스
 * @param {Object} props.style - 인라인 스타일 객체
 * @returns {JSX.Element} 이미지 폴백 처리 컴포넌트
 */
function ImageWithFallback({ src, alt, fallbackSrc = "/placeholder.jpg", className = "", style = {} }) {
  // 이미지 소스 상태 관리
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc)
  // 에러 상태 관리
  const [error, setError] = useState(false)

  /**
   * 이미지 로드 에러 처리 함수
   */
  const handleError = () => {
    if (!error) {
      setImgSrc(fallbackSrc)
      setError(true)
    }
  }

  /**
   * 백엔드 연동 포인트:
   * 이미지 로드 실패 시 로그 기록 또는 분석을 위한 API 호출
   *
   * 예시:
   * const logImageError = (originalSrc) => {
   *   axios.post('/api/logs/image-error', { originalSrc })
   *     .catch(error => {
   *       console.error('이미지 에러 로그 기록 실패:', error);
   *     });
   * };
   *
   * // handleError 함수 내에서 호출
   * if (!error) {
   *   logImageError(src);
   *   setImgSrc(fallbackSrc);
   *   setError(true);
   * }
   */

  return (
    <img
      src={imgSrc || "/placeholder.svg"}
      alt={alt}
      onError={handleError}
      className={`image-with-fallback ${className}`}
      style={style}
    />
  )
}

export default ImageWithFallback
