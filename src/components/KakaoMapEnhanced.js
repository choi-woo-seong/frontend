"use client"

/**
 * 향상된 카카오맵 컴포넌트
 * 카카오맵 API를 사용하여 지도를 렌더링하고 추가 기능을 제공합니다.
 *
 * @author Frontend Team
 * @version 1.0
 */
import { useEffect, useRef, useState } from "react"
import "./KakaoMapEnhanced.css"

/**
 * 향상된 카카오맵 컴포넌트
 *
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.width - 지도 너비
 * @param {string} props.height - 지도 높이
 * @param {Array} props.markers - 지도에 표시할 마커 배열
 * @param {Object} props.center - 지도 중심 좌표
 * @param {number} props.level - 지도 확대 레벨
 * @param {boolean} props.showControls - 지도 컨트롤 표시 여부
 * @param {boolean} props.enableClustering - 마커 클러스터링 활성화 여부
 * @param {Function} props.onMarkerClick - 마커 클릭 이벤트 핸들러
 * @returns {JSX.Element} 향상된 카카오맵 컴포넌트
 */
function KakaoMapEnhanced({
  width = "100%",
  height = "400px",
  markers = [],
  center = { lat: 37.5665, lng: 126.978 }, // 서울 중심 좌표
  level = 5,
  showControls = true,
  enableClustering = true,
  onMarkerClick,
}) {
  // 지도 컨테이너 참조
  const mapRef = useRef(null)
  // 지도 인스턴스 참조
  const mapInstanceRef = useRef(null)
  // 로딩 상태 관리
  const [isLoading, setIsLoading] = useState(true)
  // 에러 상태 관리
  const [error, setError] = useState(null)
  // 스크립트 로드 상태 관리
  const [scriptLoaded, setScriptLoaded] = useState(false)

  // 카카오맵 초기화 함수
  const initializeMap = () => {
    if (!mapRef.current) {
      console.error("Map container ref is not available")
      setError("지도 컨테이너를 찾을 수 없습니다")
      setIsLoading(false)
      return
    }

    if (!window.kakao || !window.kakao.maps) {
      console.error("Kakao Maps SDK is not loaded yet")
      setError("카카오맵 SDK가 로드되지 않았습니다")
      setIsLoading(false)
      return
    }

    try {
      console.log("Initializing Kakao Map...")

      // 지도 생성에 필요한 옵션
      const options = {
        center: new window.kakao.maps.LatLng(center.lat, center.lng),
        level,
      }

      // 지도 생성
      const mapInstance = new window.kakao.maps.Map(mapRef.current, options)
      mapInstanceRef.current = mapInstance
      console.log("Map instance created successfully")

      // 지도 컨트롤 추가
      if (showControls) {
        addMapControls(mapInstance)
      }

      // 마커 생성
      const kakaoMarkers = createMarkers(mapInstance, markers)

      // 클러스터링 활성화
      if (enableClustering && window.kakao.maps.MarkerClusterer && markers.length > 1) {
        addClustering(mapInstance, kakaoMarkers)
      }

      setIsLoading(false)
      console.log("Map initialization completed")
    } catch (error) {
      console.error("Error initializing map:", error)
      setError("지도를 초기화하는 중 오류가 발생했습니다")
      setIsLoading(false)
    }
  }

  // 지도 컨트롤 추가
  const addMapControls = (map) => {
    try {
      // 줌 컨트롤 추가
      const zoomControl = new window.kakao.maps.ZoomControl()
      map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT)

      // 타입 컨트롤 추가
      const mapTypeControl = new window.kakao.maps.MapTypeControl()
      map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT)
    } catch (error) {
      console.error("지도 컨트롤을 추가하는데 실패했습니다:", error)
    }
  }

  // 마커 생성 함수
  const createMarkers = (map, markerInfos) => {
    const kakaoMarkers = []

    markerInfos?.forEach((markerInfo) => {
      try {
        const position = new window.kakao.maps.LatLng(markerInfo.position.lat, markerInfo.position.lng)

        // 마커 생성
        const marker = new window.kakao.maps.Marker({
          position,
          map,
          title: markerInfo.title,
        })

        kakaoMarkers.push(marker)

        // 마커에 타이틀 설정
        if (markerInfo.title) {
          const infowindow = new window.kakao.maps.InfoWindow({
            content: `
              <div style="padding:10px;width:200px;text-align:center;">
                <div style="font-weight:bold;font-size:14px;margin-bottom:5px;">${markerInfo.title}</div>
                <div style="font-size:12px;color:#666;">클릭하여 상세정보 보기</div>
              </div>
            `,
          })

          // 마커에 마우스오버 이벤트 등록
          window.kakao.maps.event.addListener(marker, "mouseover", () => {
            infowindow.open(map, marker)
          })

          // 마커에 마우스아웃 이벤트 등록
          window.kakao.maps.event.addListener(marker, "mouseout", () => {
            infowindow.close()
          })

          // 마커 클릭 이벤트 등록
          if (onMarkerClick && markerInfo.id) {
            window.kakao.maps.event.addListener(marker, "click", () => {
              onMarkerClick(markerInfo.id)
            })
          }
        }
      } catch (error) {
        console.error("마커 생성에 실패했습니다:", error)
      }
    })

    return kakaoMarkers
  }

  // 클러스터링 기능 추가
  const addClustering = (map, kakaoMarkers) => {
    try {
      // 클러스터러 생성
      const clusterer = new window.kakao.maps.MarkerClusterer({
        map: map,
        averageCenter: true,
        minLevel: 5,
        disableClickZoom: false,
        styles: [
          {
            width: "50px",
            height: "50px",
            background: "rgba(117, 142, 103, 0.8)",
            color: "#fff",
            borderRadius: "50%",
            textAlign: "center",
            lineHeight: "50px",
            fontSize: "14px",
            fontWeight: "bold",
          },
        ],
      })

      // 클러스터러에 마커 추가
      clusterer.addMarkers(kakaoMarkers)
    } catch (error) {
      console.error("클러스터링 기능을 추가하는데 실패했습니다:", error)
    }
  }

  // 카카오맵 API 로드 및 초기화
  useEffect(() => {
    // 카카오맵 API 스크립트 로드
    const script = document.createElement("script")
    script.async = true
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}&autoload=false`

    script.onload = () => {
      console.log("Kakao Maps script loaded")
      setScriptLoaded(true)

      // 스크립트 로드 후 kakao.maps.load 함수 호출
      if (window.kakao && window.kakao.maps) {
        console.log("Kakao Maps SDK found, loading maps module")
        window.kakao.maps.load(() => {
          console.log("Kakao Maps module loaded successfully")
          initializeMap()
        })
      } else {
        console.error("Kakao Maps SDK not found after script load")
        setError("카카오맵 SDK를 불러오는데 실패했습니다")
        setIsLoading(false)
      }
    }

    script.onerror = () => {
      console.error("Failed to load Kakao Maps script")
      setError("카카오맵 스크립트를 불러오는데 실패했습니다")
      setIsLoading(false)
    }

    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  // 스크립트 로드 후 지도 초기화
  useEffect(() => {
    if (scriptLoaded && window.kakao && window.kakao.maps) {
      console.log("Kakao Maps SDK already loaded, initializing map")
      // 이미 로드된 경우 바로 초기화
      if (window.kakao.maps.Map) {
        initializeMap()
      } else {
        // maps 객체는 있지만 Map 생성자가 없는 경우 load 함수 호출
        window.kakao.maps.load(initializeMap)
      }
    }
  }, [scriptLoaded, markers, center, level])

  // API 키 확인
  if (!process.env.REACT_APP_KAKAO_MAP_API_KEY) {
    return (
      <div className="kakao-map-error">
        <div className="error-message">
          <p className="error-title">카카오맵 API 키가 설정되지 않았습니다</p>
          <p className="error-description">환경 변수 REACT_APP_KAKAO_MAP_API_KEY를 확인해주세요</p>
        </div>
      </div>
    )
  }

  return (
    <div className="kakao-map-enhanced-container">
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <span className="loading-text">지도를 불러오는 중...</span>
        </div>
      )}
      {error && (
        <div className="error-overlay">
          <div className="error-content">
            <p className="error-title">{error}</p>
            <p className="error-description">카카오맵 API 키와 도메인 설정을 확인해주세요</p>
            <button className="refresh-button" onClick={() => window.location.reload()}>
              새로고침
            </button>
          </div>
        </div>
      )}
      <div ref={mapRef} style={{ width, height }} className="kakao-map-enhanced"></div>
    </div>
  )
}

export default KakaoMapEnhanced
