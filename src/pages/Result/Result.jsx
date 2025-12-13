import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import TeacherInfo from "./TeacherInfo";
import SeatStatus from "./SeatStatus";
import MessageBox from "./MessageBox";
import "../../styles/pages/result.css";

const Result = () => {
  const [searchParams] = useSearchParams();
  const teacherEmail = searchParams.get("email");
  const [teacherData, setTeacherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!teacherEmail) {
      setError("선생님 이메일이 제공되지 않았습니다.");
      setLoading(false);
      return;
    }

    const fetchTeacherData = async () => {
      try {
        setLoading(true);
        const token = sessionStorage.getItem("id_token");
        const backendUrl =
          import.meta.env.VITE_API_URL || "https://sunrinsaemter.pixelhize.xyz";

        const response = await fetch(
          `${backendUrl}/api/loc/location/get?target_email=${teacherEmail}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        if (response.status === 404) {
          setError("해당 선생님의 정보를 찾을 수 없습니다.");
          setTeacherData(null);
          return;
        }

        if (response.status === 500) {
          throw new Error("서버 내부 오류가 발생했습니다.");
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        setTeacherData({
          id: data.id,
          name: data.name,
          location: data.location,
          description: data.description,
          is_present: data.description ? true : false, // description이 있으면 재실 없으면 부재
        });
      } catch (error) {
        console.error("Error fetching teacher data:", error);
        setError(error.message);

        if (process.env.NODE_ENV === "development") {
          setTeacherData({
            id: 1,
            name: "김성수",
            location: "3호관 4층 소프트웨어과 교무실",
            description: "현재 자리에 계세요",
            is_present: true,
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherData();
  }, [teacherEmail]);

  if (loading) {
    return (
      <div className="result-page loading">
        <div>선생님 정보를 불러오는 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="result-page error">
        <div>오류가 발생했습니다: {error}</div>
        <button onClick={() => window.location.reload()}>다시 시도</button>
      </div>
    );
  }

  if (!teacherData) {
    return (
      <div className="result-page not-found">
        <div>정우진 선생님은 우리 학교 선생님이 아니에요.</div>{" "}
        {/*나중에 수정할 예정*/}
        <div>선생님 성함을 올바르게 입력해주세요.</div>
      </div>
    );
  }

  return (
    <div className="result-page">
      <TeacherInfo
        teacherName={teacherData.name}
        teacherLocation={teacherData.location}
      />
      <SeatStatus
        isPresent={teacherData.is_present}
        teacherName={teacherData.name}
        description={teacherData.description}
      />
      <MessageBox receiverEmail={teacherEmail} teacherName={teacherData.name} />
    </div>
  );
};

export default Result;
