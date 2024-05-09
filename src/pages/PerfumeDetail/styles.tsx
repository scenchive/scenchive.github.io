import styled from "@emotion/styled";
const breakpoint = "565px";
const mediaQuery = () => `@media(max-width:${breakpoint})`;

export const Container = styled.div`
  label: container;
  width: 100%;
  min-height: 800px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
`;

export const Main = styled.div`
  label: main;
  width: 60%;
  max-width: 700px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-family: Gowun Batang;

  ${mediaQuery} {
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
`;

export const PerfumeArea = styled.div`
  label: perfume-area;
  display: flex;
  flex-direction: row;
  margin-top: 50px;

  ${mediaQuery} {
    display: flex;
    flex-direction: column;
  }
`;

export const PerfumeImageArea = styled.div`
  label: perfume-image-area;
  width: 250px;
  height: 250px;
  position: relative;
  margin-right: 15px;

  ${mediaQuery} {
    width: 200px;
    height: 200px;
    position: relative;
    align-self: center;
  }
`;

export const PerfumeImage = styled.img`
  label: perfume-image;
  width: 200px;
  height: 200px;
  object-fit: scale-down;
  box-shadow: 2px 2px 10px 2px #eaeaea;

  ${mediaQuery} {
    width: 200px;
    height: 200px;
    box-sizing: border-box;
  }
`;

export const Bookmark = styled.img`
  label: bookmark;
  width: 37.33px;
  height: 59.94px;
  position: absolute;
  top: 0px;
  left: 45px;
  cursor: pointer;

  ${mediaQuery} {
    left: 20px;
  }
`;

export const MobilePerfumeInformationArea = styled.div`
  label: mobile-perfume-information-area;
  display: none;

  ${mediaQuery} {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 15px;
  }
`;

export const SeasonIcon = styled.img`
  label: season-icon;
  width: 45px;
  height: 35px;
  object-fit: scale-down;
  margin-bottom: 3px;

  ${mediaQuery} {
  }
`;
