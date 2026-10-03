// Opens real URLs in a new tab; placeholder '#' links stay inert.
export default function SmartLink({ href, children, ...rest }) {
  const external = /^https?:/.test(href);
  return (
    <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>
      {children}
    </a>
  );
}
