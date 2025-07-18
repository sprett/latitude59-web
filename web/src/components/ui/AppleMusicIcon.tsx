interface AppleMusicIconProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function AppleMusicIcon({
  className,
  style,
}: AppleMusicIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      style={style}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.5 2.5l-12 2.4v13.6c-0.4-0.2-0.9-0.4-1.5-0.4-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3V8.9l8-1.6v6.7c-0.4-0.2-0.9-0.4-1.5-0.4-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3V2.5z" />
    </svg>
  );
}
