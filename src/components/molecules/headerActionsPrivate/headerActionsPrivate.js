import { useContext } from "react";

import Image from "next/image";

import { useMenu } from "@/hooks/useMenu";

import { UserContext } from "@/stores/UserContextProvider";

import Menu from "@/components/molecules/menu/menu";

import styles from './headerActionsPrivate.module.css'

export default function HeaderActionsPrivate() {
  const { user } = useContext(UserContext);
  const { active, actionableRef, options } = useMenu();

  return (
    <div className={styles.headerActionsPrivate + (active ? ` ${styles.active}` : "")}>

      <div ref={actionableRef} className={styles.profileContainer}>
        <Image
          src={user.photo}
          width={32}
          height={32}
          alt={`${user.fullName} profile photo`}
        />
      </div>

      <div className={styles.menuContainer}>
        <Menu options={options} />
      </div>

    </div>
  );
}
