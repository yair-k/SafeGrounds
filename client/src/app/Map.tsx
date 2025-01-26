OLD:







import React, { useState } from "react";
import { Factory, ChevronDown, ChevronUp } from "lucide-react";
import { useGeneral } from "@/context/generalContext";

export default function Info() {
  return (
    <section className="border-r-2 h-full flex flex-col justify-start bg-[#0d0d0d] text-gray-200">
      <div className="p-5 flex flex-col flex-1">
        <ListOflands />
      </div>
    </section>
  );
}

function ListOflands() {
  const { landData, selectedlandID, togglelandSelection, numFeedback } =
    useGeneral();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredlands = landData.filter(
    (land) =>
      land.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      land.type_of_mining.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col flex-1">
      <h1 className="text-center text-lg font-semibold mb-4 text-gray-100">
        Nearby Active lands
      </h1>
      <input
        type="text"
        placeholder={`Search...`}
        className="p-3 border-2 border-gray-700 bg-[#1a1a1a] text-gray-300 rounded-2xl mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex flex-row justify-between px-4 py-2 bg-[#1a1a1a] rounded-xl mb-4">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold text-blue-400">
            {filteredlands.length}
          </h1>
          <h4 className="text-gray-400">Total</h4>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold text-yellow-400">{numFeedback}</h1>
          <h4 className="text-gray-400">Issue Submitted</h4>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold text-green-400">1</h1>
          <h4 className="text-gray-400">Resolved</h4>
        </div>
      </div>
      <section className="flex flex-col gap-4 flex-1 overflow-y-auto">
        {filteredlands.length > 0 ? (
          filteredlands.map((el) => (
            <div
              key={el.id}
              className={`flex flex-col bg-[#1a1a1a] border-2 border-gray-800 rounded-xl transition-all duration-300 ease-in-out cursor-pointer
                        ${
                          selectedlandID === el.id
                            ? "ring-2 ring-blue-400 shadow-lg"
                            : ""
                        }`}
              onClick={() => togglelandSelection(el.id)}
            >
              <div className="flex flex-row items-center py-4 px-3 justify-between gap-4">
                <p className="text-gray-500">{el.id}</p>
                <Factory size={28} color="#fda668" />
                <div className="grow text-center">
                  <h1 className="text-lg font-semibold text-gray-200">
                    {el.location}
                  </h1>
                  <p className="text-gray-400">{el.type_of_mining}</p>
                </div>

                {selectedlandID === el.id ? (
                  <ChevronUp size={24} className="text-gray-400" />
                ) : (
                  <ChevronDown size={24} className="text-gray-400" />
                )}
              </div>
              {selectedlandID === el.id && (
                <div className="bg-gray-800 p-4 border-t border-gray-700 text-sm text-gray-300">
                  <p>
                    <strong>Tenure:</strong> {el.tenure} years
                  </p>
                  <p>
                    <strong>Affect Radius:</strong> {el.affect_radius} km
                  </p>
                  <p>
                    <strong>Water Quality:</strong> {el.water_quality}
                  </p>
                  <p>
                    <strong>Air Quality:</strong> {el.air_quality}
                  </p>
                  <p>
                    <strong>Soil Quality:</strong> {el.soil_quality}
                  </p>
                  <p>
                    <strong>Biodiversity:</strong> {el.biodiversity}
                  </p>
                  <p>
                    <strong>Socioeconomic Index:</strong> {el.socioeconomic_index}
                  </p>
                  <p>
                    <strong>Description:</strong> {el.description}
                  </p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center text-xl my-20 text-gray-400">
            No matching lands found 🥲
          </div>
        )}
      </section>
    </div>
  );
}


