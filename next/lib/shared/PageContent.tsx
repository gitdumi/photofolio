import DynamicZoneManager from "@/components/dynamic-zone/manager";

export default function PageContent({ pageData }: { pageData: any }) {
  const dynamicZone = pageData?.dynamic_zone;
  return (
    <div
      id="page-content"
      className="relative overflow-hidden w-full h-full min-h-[80vh] flex flex-col mt-16"
    >
      {dynamicZone && (
        <DynamicZoneManager
          dynamicZone={dynamicZone}
          locale={pageData.locale}
        />
      )}
    </div>
  );
}
