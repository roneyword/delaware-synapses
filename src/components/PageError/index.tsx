import Wrapper from "../Wrapper";
import { ErrorPageContainer } from "./styles";

export default function PageError() {
  return (
    <Wrapper>
      <ErrorPageContainer>
        <p>Page not found.</p>
        <p>
          Please contact the project manager if you believe you should see
          the content of this page
        </p>
      </ErrorPageContainer>
    </ Wrapper>

  )
}