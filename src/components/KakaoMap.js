"use client"

/**
 * 카카오맵 컴포넌트
 * 카카오맵 API를 사용하여 지도를 렌더링합니다.
 *
 * @author Frontend Team
 * @version 1.0
 */
import { useEffect, useRef } from "react"
import "./KakaoMap.css"

/**
 * 카카오맵 컴포넌트
 *
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.width - 지도 너비
 * @param {string} props.height - 지도 높이
 * @param {Array} props.markers - 지도에 표시할 마커 배열
 * @param {Object} props.center - 지도 중심 좌표
 * @param {number} props.level - 지도 확대 레벨
 * @returns {JSX.Element} 카카오맵 컴포넌트
 */
function KakaoMap({
  width = "100%",
  height = "400px",
  markers = [],
  center = { lat: 37.5665, lng: 126.978 }, // 서울 중심 좌표
  level = 5,
}) {
  // 지도 컨테이너 참조
  const mapRef = useRef(null)
  // 지도 인스턴스 참조
  const mapInstanceRef = useRef(null)

  // 카카오맵 초기화 함수
  const initializeMap = () => {
    if (typeof window.kakao === "undefined" || !mapRef.current) return

    const options = {
      center: new window.kakao.maps.LatLng(center.lat, center.lng),
      level,
    }

    // 지도 생성
    const mapInstance = new window.kakao.maps.Map(mapRef.current, options)
    mapInstanceRef.current = mapInstance

    // 마커 생성
    markers.forEach((markerInfo) => {
      const position = new window.kakao.maps.LatLng(markerInfo.position.lat, markerInfo.position.lng)

      const marker = new window.kakao.maps.Marker({
        position,
        map: mapInstance,
      })

      // 마커에 타이틀 설정
      if (markerInfo.title) {
        const infowindow = new window.kakao.maps.InfoWindow({
          content: `<div style="padding:5px;font-size:12px;">${markerInfo.title}</div>`,
        })

        // 마커에 마우스오버 이벤트 등록
        window.kakao.maps.event.addListener(marker, "mouseover", () => {
          infowindow.open(mapInstance, marker)
        })

        // 마커에 마우스아웃 이벤트 등록
        window.kakao.maps.event.addListener(marker, "mouseout", () => {
          infowindow.close()
        })

        // 마커 클릭 시 정보창 토글
        window.kakao.maps.event.addListener(marker, "click", () => {
          if (infowindow.getMap()) {
            infowindow.close()
          } else {
            infowindow.open(mapInstance, marker)
          }
        })
      }
    })
  }

  // 카카오맵 API 로드 및 초기화
  useEffect(() => {
    // 카카오맵 API 스크립트 로드
    const script = document.createElement("script")
    script.async = true
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}&autoload=false`

    script.onload = () => {
      window.kakao.maps.load(initializeMap)
    }

    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  // 마커나 중심 좌표, 레벨 변경 시 지도 업데이트
  useEffect(() => {
    if (window.kakao && window.kakao.maps && mapInstanceRef.current) {
      // 중심 좌표 변경
      mapInstanceRef.current.setCenter(new window.kakao.maps.LatLng(center.lat, center.lng))

      // 확대 레벨 변경
      mapInstanceRef.current.setLevel(level)

      // 기존 마커 제거
      mapInstanceRef.current.removeOverlayMapTypeId(window.kakao.maps.MapTypeId.OVERLAY)

      // 새 마커 추가
      markers.forEach((markerInfo) => {
        const position = new window.kakao.maps.LatLng(markerInfo.position.lat, markerInfo.position.lng)

        const marker = new window.kakao.maps.Marker({
          position,
          map: mapInstanceRef.current,
        })

        // 마커에 타이틀 설정
        if (markerInfo.title) {
          const infowindow = new window.kakao.maps.InfoWindow({
            content: `<div style="padding:5px;font-size:12px;">${markerInfo.title}</div>`,
          })

          // 마커에 마우스오버 이벤트 등록
          window.kakao.maps.event.addListener(marker, "mouseover", () => {
            infowindow.open(mapInstanceRef.current, marker)
          })

          // 마커에 마우스아웃 이벤트 등록
          window.kakao.maps.event.addListener(marker, "mouseout", () => {
            infowindow.close()
          })

          // 마커 클릭 시 정보창 토글
          window.kakao.maps.event.addListener(marker, "click", () => {
            if (infowindow.getMap()) {
              infowindow.close()
            } else {
              infowindow.open(mapInstanceRef.current, marker)
            }
          })
        }
      })
    }
  }, [markers, center, level])

  return (
    <div className="kakao-map-container">
      <div ref={mapRef} style={{ width, height }} className="kakao-map"></div>
    </div>
  )
}

export default KakaoMap
