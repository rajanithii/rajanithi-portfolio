// Masked line reveal. Animated by [data-lines] in scrollAnimations.js.
export default function Lines({ as: Tag = 'h2', lines, className = '', ...rest }) {
  return (
    <Tag className={className} data-lines {...rest}>
      {lines.map((l) => (
        <span className="line" key={l}>
          <span>{l}</span>
        </span>
      ))}
    </Tag>
  );
}
