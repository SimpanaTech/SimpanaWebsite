/** Centred page-width wrapper. One place to change the site's max width. */
export default function Container({
  as: Tag = "div",
  className = "",
  children,
}) {
  return (
    <Tag className={`mx-auto w-full max-w-[1200px] px-5 sm:px-8 ${className}`}>
      {children}
    </Tag>
  );
}
