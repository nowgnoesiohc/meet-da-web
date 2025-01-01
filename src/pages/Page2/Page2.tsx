import GlobalStyle from "@/styles/GlobalStyle";
import { Input, Textarea } from "@/components/ui/Input";
import { Input1, Textarea1 } from "@/components/ui/Input1";

export function Page1() {
  return (
    <>
      <GlobalStyle />
      <div style={{ backgroundColor: "var(--bg-01)" }}>
        <h1 style={{ color: "var(--orange-button)" }}>
          Hello Styled Components
        </h1>
        <p style={{ color: "var(--error-02)" }}>This is a sample text</p>

        <div style={{ width: "300px", margin: "50px auto" }}>
          <h2>Input 예제</h2>
          <Input placeholder="이름을 입력하세요" maxLength={10} showCount />

          <h2>Textarea 예제</h2>
          <Textarea placeholder="내용을 입력하세요" maxLength={50} showCount />
        </div>

        <div style={{ width: "300px", margin: "50px auto" }}>
          <h2>Input1 예제</h2>
          <Input1 placeholder="이름을 입력하세요" maxLength={10} showCount />

          <h2>Textarea1 예제</h2>
          <Textarea1 placeholder="내용을 입력하세요" maxLength={50} showCount />
        </div>
      </div>
    </>
  );
}

export default Page1;
