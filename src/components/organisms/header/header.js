"use client";
import Image from "next/image";

import { useHeader } from "@/hooks/useHeader";

import HeaderActionsPublic from "@/components/molecules/headerActionsPublic/headerActionsPublic";
import HeaderActionsLogging from "@/components/molecules/headerActionsLogging/headerActionsLogging";
import HeaderActionsPrivate from "@/components/molecules/headerActionsPrivate/headerActionsPrivate";

import Link from "next/link";

import styles from "./header.module.css";

export default function Header() {
  const { publicHeader, loggingHeader, privateHeader, noneHeader } =
    useHeader();

  return (
    !noneHeader && (
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div>
            <Link href="/">
              <Image
                src="/brand/Logo.svg"
                width={227}
                height={40}
                alt="Logo The Athena AI"
                priority
              />
            </Link>
          </div>

          <div>
            {publicHeader && <HeaderActionsPublic />}
            {loggingHeader && <HeaderActionsLogging />}
            {privateHeader && <HeaderActionsPrivate />}
          </div>
        </div>
      </header>
    )
  );
}
