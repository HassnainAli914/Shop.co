import React from "react";
import Dress from "../components/dress";
import FontShowcase from "../components/Retangle";
import BreadcrumbCollapsed from "../components/Breadcrupm";

export default function BrandsPage({ onNavigate }) {
  return (
    <div className="mt-24 md:mt-28 lg:mt-32 max-w-screen-2xl mx-auto px-4">
      <BreadcrumbCollapsed current="Brands" onNavigate={onNavigate} />
      <div className="my-6">
        <FontShowcase />
      </div>
      <Dress onNavigate={onNavigate} />
    </div>
  );
}
