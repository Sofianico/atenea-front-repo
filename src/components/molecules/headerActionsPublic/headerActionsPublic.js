import { useAuth } from "@/hooks/useAuth";

import ButtonLink from "@/components/atoms/buttonLink/buttonLink";

export default function HeaderActionsPublic() {
  const { login } = useAuth();

  return (
    <div>
      <ButtonLink onClick={login} label="Log In" />
    </div>
  );
}
