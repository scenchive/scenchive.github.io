import React, { useEffect, useRef, useState } from 'react';
import { MapArea } from './styles';

/**
 * 카카오 지도 컴포넌트입니다.
 *  @author 김민지
 */

declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoMap = (props: { storeName: string; x: string; y: string }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    //지도를 담을 영역의 DOM 레퍼런스
    const container = mapRef.current;
    //지도를 생성할 때 필요한 기본 옵션
    const options = {
      center: new window.kakao.maps.LatLng(props?.y, props?.x), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };

    //지도 생성 및 객체 리턴
    const map = new window.kakao.maps.Map(container, options);

    // 지도에 마커 표시
    const displayMarker = (place: { y: any; x: any }) => {
      const marker = new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(place.y, place.x),
      });

      // 커스텀 오버레이 컴포넌트
      const customOverlayContent = `
        <div style="position:absolute; top: 50%; left: 50%; transform:translate(-50%, -240%");>
          <div style="color:white; font-family:Noto Sans KR, sans-serif; font-size: 1.3rem; background-color:#d67070; padding: 5px 10px 6px; border:1px solid white; border-radius:5px;">${props?.storeName}</div>
        </div>
      `;

      // 커스텀 오버레이 생성
      const customOverlay = new window.kakao.maps.CustomOverlay({
        position: new window.kakao.maps.LatLng(props?.y, props?.x),
        content: customOverlayContent,
      });

      marker.setMap(map);
      customOverlay.setMap(map);
    };

    displayMarker({ y: props.y, x: props.x });

    // 중심좌표 재설정
    const position = new window.kakao.maps.LatLng(props.y, props.x);
    map.setCenter(position);
  }, []);

  return <MapArea ref={mapRef} />;
};

export default KakaoMap;
