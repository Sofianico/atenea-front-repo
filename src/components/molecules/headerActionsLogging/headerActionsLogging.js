import { useAuth } from "@/hooks/useAuth";

import ButtonLink from "@/components/atoms/buttonLink/buttonLink";

export default function HeaderActionsLogging() {
  const { logout } = useAuth();

  return (
    <div>
      <ButtonLink onClick={logout} label="Exit" />
    </div>
  );
}
