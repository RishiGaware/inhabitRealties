import React from "react";
const PropertyTypes = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Property Types</h2>
    <pre className="bg-light-background p-4 rounded-lg shadow text-xs overflow-x-auto">
      {JSON.stringify([
        {
          typeName: "APARTMENT",
          description: "Apartment type",
          createdByUserId: "admin",
          updatedByUserId: "admin",
          published: true
        },
        {
          typeName: "HOUSE",
          description: "House type",
          createdByUserId: "admin",
          updatedByUserId: "admin",
          published: true
        }
      ], null, 2)}
    </pre>
  </div>
);
export default PropertyTypes; 