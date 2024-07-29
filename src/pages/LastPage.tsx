import styled from "styled-components";
import CVcomponent from "../components/CVcomponent";

function LastPage() {
  return (
    <main style={{ display: "grid", justifyContent: "center" }}>
      <Cvdiv>
        <CVcomponent />
      </Cvdiv>
    </main>
  );
}

export default LastPage;

const Cvdiv = styled.div`
  width: 822px;
  height: 1080px;
  border: 1px black;
`;
