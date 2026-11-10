export function MediumTail({ text }: { text: string }) {
  const words = text.trim().split(/\s+/);
  if (words.length < 2) return <>{text}</>;
  const tail = words.pop();
  return (
    <span className="kit-title-text">
      {words.join(' ')} <b>{tail}</b>
    </span>
  );
}
