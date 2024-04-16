import React, { useEffect, useState, useRef } from "react";
import {
  Container, Text, ArrowImage, StoreListArea,
  StoreListRow, StoreNameAddress, StoreName, Address,
} from "./styles";
import { useNavigate, useSearchParams } from "react-router-dom";
import KakaoMap from "./KakaoMap";

interface Store {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
}

const KakaoMapArea = (props: { toggleStore: boolean, setToggleStore: React.Dispatch<React.SetStateAction<boolean>>, mapNumber: number | undefined, setMapNumber: React.Dispatch<React.SetStateAction<number | undefined>>, storeList: Array<Store>, storeTotalCount: number }) => {

  const handleClickStore = (index: number) => {
    if (index === props?.mapNumber) {
      props?.setMapNumber(undefined);
    } else {
      props?.setMapNumber(index)
    }

  }

  return (
    <Container>
      <Text onClick={() => props?.setToggleStore(!props?.toggleStore)}>
        <div>오프라인 매장 ( 총 {props?.storeTotalCount} 개 ) </div>
        <ArrowImage src={props?.toggleStore ? "/assets/icon/icon_arrow_up_branddetail.svg" : "/assets/icon/icon_arrow_down_branddetail.svg"} />
      </Text>
      {props?.toggleStore &&
        <StoreListArea>
          {props?.storeList?.map((el, index) =>
            <>
              <StoreListRow key={'store_' + index} onClick={() => handleClickStore(index)}>
                <StoreNameAddress>
                  <StoreName>{el?.place_name}</StoreName>
                  <Address>{el?.road_address_name}</Address>
                </StoreNameAddress>

              </StoreListRow>
              {index === props?.mapNumber && <KakaoMap storeName={props?.storeList[index]?.place_name} x={props?.storeList[index]?.x} y={props?.storeList[index]?.y} />}
            </>

          )}
        </StoreListArea>
      }
    </Container>
  );
};

export default KakaoMapArea;
