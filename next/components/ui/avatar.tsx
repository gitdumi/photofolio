export const Avatar = ({ username }: { username?: string }) => {
  return (
    <div className="avatar avatar-placeholder">
      <div className="flex bg-white text-black h-9 w-9 text-center mask mask-hexagon">
        <span>{username?.slice(0, 2).toUpperCase() || "HI"}</span>
      </div>
    </div>
  );
};
