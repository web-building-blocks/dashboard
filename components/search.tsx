"use client";

import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";

export function Search() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const onChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("query", value);
    } else {
      params.delete("query");
    }
    router.replace(`?${params.toString()}`);
  };

  return (
    <Input
      type="search"
      placeholder="Search by name or email..."
      defaultValue={searchParams.get("query") || ""}
      onChange={(e) => onChange(e.target.value)}
      className="w-[250px]"
    />
  );
}
