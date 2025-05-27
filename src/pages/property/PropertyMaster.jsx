import React from "react";
const PropertyMaster = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Property Master</h2>
    <pre className="bg-light-background p-4 rounded-lg shadow text-xs overflow-x-auto">
      {JSON.stringify({
        name: "Sample Property",
        propertyTypeId: "ObjectId",
        description: "A beautiful property.",
        propertyAddress: {
          street: "123 Main St",
          area: "Downtown",
          city: "Metropolis",
          state: "State",
          zipOrPinCode: "123456",
          country: "Country",
          location: { lat: 12.34, lng: 56.78 }
        },
        owner: "UserId",
        price: 1000000,
        propertyStatus: "FOR SALE",
        features: {
          bedRooms: 3,
          bathRooms: 2,
          areaInSquarFoot: 1500,
          amenities: ["Pool", "Gym"]
        },
        listedDate: "2024-05-25",
        createdByUserId: "admin",
        updatedByUserId: "admin",
        published: true
      }, null, 2)}
    </pre>
  </div>
);
export default PropertyMaster; 