import GlobalStyle from "@/styles/GlobalStyle";

export function Page1() {
  return (
    <>
      <GlobalStyle />
      <div style={{ backgroundColor: "var(--bg-01)" }}>
        <h1 style={{ color: "var(--orange-button)" }}>
          Hello Styled Components
        </h1>
        <p style={{ color: "var(--error-02)" }}>This is a sample text</p>
      </div>
    </>
  );
}

export default Page1;
