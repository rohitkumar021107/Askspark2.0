import { useNavigate } from "@tanstack/react-router";

interface AvatarButtonProps {
  imageUrl?: string;
  name: string;
  size?: "sm" | "md";
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function AvatarButton({
  imageUrl,
  name,
  size = "sm",
}: AvatarButtonProps) {
  const navigate = useNavigate();
  const dim = size === "md" ? "w-14 h-14" : "w-10 h-10";
  const textSize = size === "md" ? "text-lg" : "text-sm";

  return (
    <button
      type="button"
      onClick={() => navigate({ to: "/profile" })}
      className={`${dim} rounded-full flex-shrink-0 overflow-hidden shadow-md hover:ring-2 hover:ring-primary/40 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/60`}
      aria-label="Go to profile"
      data-ocid="nav.link"
    >
      {imageUrl ? (
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
      ) : (
        <div
          className={`w-full h-full gradient-primary flex items-center justify-center text-white font-bold ${textSize}`}
        >
          {getInitials(name)}
        </div>
      )}
    </button>
  );
}
