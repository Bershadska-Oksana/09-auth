import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div style={{ padding: 20 }}>{children}</div>;
}
