"use client";

import { trpc } from "@/trpc/client";
import Image from "next/image";
import SmartWtfPng from "public/smartwtf.png";

const ProButton = () => {
  const { mutate: createStripeSession } =
    trpc.user.createStripeSession.useMutation({
      onSuccess: ({ url }) => {
        window.location.href = url ?? "settings/billing";
      },
    });

  return (
    <button onClick={() => createStripeSession()}>
      <div className="relative">
        <Image
          width="80"
          height="80"
          src={SmartWtfPng}
          alt="brain"
          className="animate-pulse cursor-pointer transition-all hover:scale-110"
        />
      </div>
    </button>
  );
};

export default ProButton;
