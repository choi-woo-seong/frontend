"use client"
import { Link } from "react-router-dom"
import "./FacilityTypeButtons.css"

/**
 * 시설 유형 버튼 컴포넌트
 * @returns {JSX.Element} 시설 유형 버튼 컴포넌트
 */
function FacilityTypeButtons() {
  // 시설 유형 정의
  const facilityTypes = [
    { id: "silver-town", label: "실버타운", description: "독립적인 생활이 가능한 노인을 위한 주거 시설" },
    { id: "nursing-home", label: "요양원", description: "전문적인 간호 서비스가 제공되는 요양 시설" },
    { id: "elderly-home", label: "양로원", description: "일상생활 지원이 필요한 노인을 위한 주거 시설" },
  ]

  /**
   * 백엔드 연동 포인트:
   * 시설 유형 정보를 API에서 가져올 수 있습니다.
   *
   * 예시:
   * useEffect(() => {
   *   axios.get('/api/facility-types')
   *     .then(response => {
   *       setFacilityTypes(response.data);
   *     })
   *     .catch(error => {
   *       console.error('시설 유형 정보를 불러오는데 실패했습니다:', error);
   *     });
   * }, []);
   */

  return (
    <div className="facility-type-buttons">
      {facilityTypes.map((type) => (
        <Link key={type.id} to={`/facilities/${type.id}`} className="facility-type-button">
          <h3 className="facility-type-title">{type.label}</h3>
          <p className="facility-type-description">{type.description}</p>
        </Link>
      ))}
    </div>
  )
}

export default FacilityTypeButtons
