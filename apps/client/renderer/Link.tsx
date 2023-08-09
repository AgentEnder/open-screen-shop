import { usePageContext } from '@open-screen-shop/vite-plugin-ssr-utils';

export function Link(p: {
  href?: string;
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const pageContext = usePageContext();
  const { children, ...props } = p;
  const className = [
    props.className,
    pageContext.urlPathname === props.href && 'is-active',
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <a {...props} className={className} style={p.style}>
      {children}
    </a>
  );
}
