function TypographyH2({ children, hover = false }) {
  return (
    <h2
      className={`scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 ${
        hover ? "hover:underline" : ""
      }`}
    >
      {children}
    </h2>
  );
}

export default TypographyH2;
