import React, { useState } from "react";
import { MapPin, ChevronDown, ChevronUp } from "lucide-react";

/**
 * Parent container: holds the NearbyActiveLands component
 * with a full height, side panel style (border-r, dark background).
 */
export default function Info() {
  return (
    <section className="border-r-2 h-full flex flex-col justify-start bg-[#0D0D0D] text-gray-200">
      <div className="p-5 flex flex-col flex-1">
        <NearbyActiveLands />
      </div>
    </section>
  );
}

function NearbyActiveLands() {
  // Placeholder data for demonstration:
  const [landData] = useState([
    {
      id: 101,
      name: "Peach Orchard Mesa",
      landType: "Cultural Farmland",
      region: "Southwest Region",
      significance: "High indigenous significance",
      airQuality: "Moderate",
      waterQuality: "Good",
      soilHealth: "High fertility",
      status: "Pending Development",
      description:
        "Known for historic orchard grounds with special meaning to local tribes.",
    },
    {
      id: 102,
      name: "Green Valley Site",
      landType: "Sacred Grassland",
      region: "North Region",
      significance: "Historic spiritual site",
      airQuality: "Good",
      waterQuality: "Moderate",
      soilHealth: "Slight contamination",
      status: "Preserved Area",
      description:
        "Rich in biodiversity and home to ancient spiritual ceremonies.",
    },
    {
      id: 103,
      name: "Crescent Lake Dunes",
      landType: "Archaeological Site",
      region: "South Region",
      significance: "Archaeological artifacts found",
      airQuality: "Poor",
      waterQuality: "N/A (arid)",
      soilHealth: "Sandy, low fertility",
      status: "Restricted Access",
      description:
        "Dune region containing artifacts dating back thousands of years.",
    },
  ]);

  // Track user’s search input and the ID of the currently expanded item.
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedID, setExpandedID] = useState<number | null>(null);

  // Simple stats placeholders
  const totalLands = landData.length;
  const totalIssues = 2; // placeholder
  const totalResolved = 1; // placeholder

  // Filtered list based on search term
  const filteredData = landData.filter((land) => {
    return (
      land.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      land.landType.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Toggle function for expanding/collapsing an item
  const handleToggle = (id: number) => {
    setExpandedID((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex flex-col flex-1 h-full overflow-hidden">
      {/* Heading */}
      <h1 className="text-center text-lg font-semibold mb-4">Nearby Active Lands</h1>

      {/* Search Input */}
      <div className="mb-4 rounded-xl bg-[#1A1A1A] p-2">
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-transparent text-gray-300 focus:outline-none rounded-md px-3 py-2 border-2 border-gray-700 placeholder-gray-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Stats Row */}
      <div className="flex flex-row items-center justify-around bg-[#1A1A1A] py-3 rounded-xl mb-4">
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold text-blue-400">{totalLands}</span>
          <span className="text-sm text-gray-400">Total</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold text-yellow-400">{totalIssues}</span>
          <span className="text-sm text-gray-400">Issue Submitted</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold text-green-400">{totalResolved}</span>
          <span className="text-sm text-gray-400">Resolved</span>
        </div>
      </div>

      {/* List Container (scrollable) */}
      <div className="flex-1 overflow-y-auto pr-1">
        {filteredData.length > 0 ? (
          filteredData.map((land) => (
            <div
              key={land.id}
              className={`flex flex-col bg-[#1A1A1A] border-2 border-gray-800 rounded-xl mb-3 transition-all 
                duration-300 ease-in-out cursor-pointer
                ${expandedID === land.id ? "ring-2 ring-blue-400" : ""}`}
              onClick={() => handleToggle(land.id)}
            >
              {/* Header Row */}
              <div className="flex items-center py-3 px-4 justify-between">
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin size={28} className="text-[#fda668]" />
                  <div>
                    <h2 className="font-semibold text-gray-200">{land.name}</h2>
                    <p className="text-xs text-gray-400">
                      {land.landType} &bull; {land.region}
                    </p>
                  </div>
                </div>
                {expandedID === land.id ? (
                  <ChevronUp size={24} className="text-gray-400" />
                ) : (
                  <ChevronDown size={24} className="text-gray-400" />
                )}
              </div>

              {/* Expandable Content */}
              {expandedID === land.id && (
                <div className="bg-gray-800 p-4 border-t border-gray-700 text-sm text-gray-300 space-y-2">
                  <p>
                    <strong className="text-gray-200">Significance:</strong>{" "}
                    {land.significance}
                  </p>
                  <p>
                    <strong className="text-gray-200">Air Quality:</strong>{" "}
                    {land.airQuality}
                  </p>
                  <p>
                    <strong className="text-gray-200">Water Quality:</strong>{" "}
                    {land.waterQuality}
                  </p>
                  <p>
                    <strong className="text-gray-200">Soil Health:</strong>{" "}
                    {land.soilHealth}
                  </p>
                  <p>
                    <strong className="text-gray-200">Development Status:</strong>{" "}
                    {land.status}
                  </p>
                  <p>
                    <strong className="text-gray-200">Description:</strong>{" "}
                    {land.description}
                  </p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center text-xl my-20 text-gray-400">
            No matching lands found <span className="text-sm">🥲</span>
          </div>
        )}
      </div>
    </div>
  );
}
