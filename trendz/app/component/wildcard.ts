export default function parseRoomWildcards(wildcards: string[] | null | undefined): string[] {
  if (!wildcards?.length) return [];

  const tags = new Set<string>();

  wildcards.forEach((item) => {
    try {
      const room = JSON.parse(item);
      const desc = (room.hotelRoomDescription?.content || "").toLowerCase();
      const code = room.characteristicCode || "";

      if (code.includes("VP") || desc.includes("pool view")) tags.add("Pool View");
      if (code.includes("SV") || desc.includes("sea view")) tags.add("Sea View");
      if (desc.includes("suite")) tags.add("Suite");
      if (desc.includes("balcony")) tags.add("Balcony");
      if (desc.includes("family") || desc.includes("quadruple") || desc.includes("triple")) tags.add("Family Room");
    } catch {}
  });

  return Array.from(tags);
}
