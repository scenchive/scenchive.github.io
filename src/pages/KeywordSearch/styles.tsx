import styled from "@emotion/styled";

export const Container = styled.div`
  label: container;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Text = styled.div`
  label: text;
  width: 60%;
  height: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`;

export const Main = styled.div`
  label: main;
  width: 60%;
  height: 60%;
  display: flex;
  justify-content: space-between;
`;

export const Box = styled.div<{ bgColor: string }>`
  label: box;
  width: 45%;
  height: 200px;
  padding: 50px 5px;
  box-sizing: border-box;
  background-color: ${(props) => props.bgColor};
  color: white;
  font-size: 20px;
  font-weight: 500;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Header = styled.div`
  label: header;
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: #616161;
  position: relative;

  img {
    position: absolute;
    top: 37px;
    left: 30px;
  }
`;

export const Content = styled.div`
  label: content;
  width: 30%;
  border: 1px solid rgba(181, 146, 255, 0.6);
  border-radius: 20px;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  padding: 20px 5px;
`;

export const Title = styled.div`
  label: title;
  font-size: 15px;
  position: absolute;
  top: -10px;
  left: 20px;
  background-color: white;
`;

export const Keyword = styled.div<{ isSelected: boolean }>`
  label: keyword;
  width: fit-content;
  font-size: 12px;
  font-weight: 450;
  border: 1.5px solid #a281ff;
  align-self: flex-start;
  padding: 6px 10px 6.5px 10px;
  border-radius: 30px;
  background-color: ${(props) => (props.isSelected ? "#b592ff" : "#f6f2ff")};
  color: ${(props) => (props.isSelected ? "white" : "#616161")};
  box-shadow: 2px 3px 2.5px #d9d9d9;
  margin-bottom: 5px;
  margin: 5px;
  cursor: pointer;
  &:hover {
    background-color: #b592ff;
    color: white;
  }
`;

export const Button = styled.div`
  label: button;
  background-color: #b89fff;
  color: white;
  font-weight: 500;
  width: 100px;
  height: 45px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px 0;
`;
