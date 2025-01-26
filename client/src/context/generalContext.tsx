"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface landState {
  affect_radius: number;
  air_quality: number;
  assessment: string;
  biodiversity: string;
  description: string;
  id: number;
  impact_scale: number | null;
  location: string;
  location_coords: string;
  socioeconomic_index: string;
  soil_quality: number;
  tenure: number;
  type_of_mining: string;
  water_quality: number;
  selectedlandID: number;
}

interface GeneralContextType {
  landData: landState[];
  setlandData: React.Dispatch<React.SetStateAction<landState[]>>;
  selectedlandID: number | null;
  setSelectedlandID: React.Dispatch<React.SetStateAction<number | null>>;
  togglelandSelection: (id: number) => void;
  position: string;
  setPosition: React.Dispatch<React.SetStateAction<string>>;
  numFeedback: number;
  setNumFeedback: React.Dispatch<React.SetStateAction<number>>;
}

const GeneralContext = createContext<GeneralContextType | undefined>(undefined);

const serverURL = process.env.BACKEND_URL;

const initialState: landState[] = [];

interface GeneralProviderProps {
  children: ReactNode;
}

function GeneralProvider({ children }: GeneralProviderProps) {
  const [landData, setlandData] = useState<landState[]>(initialState);
  const [selectedlandID, setSelectedlandID] = useState<number | null>(null);
  const [position, setPosition] = useState<string>("Community 👨‍👩‍👧‍👦");
  const [numFeedback, setNumFeedback] = useState(0);

  const togglelandSelection = (id: number) => {
    setSelectedlandID(selectedlandID === id ? null : id);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${serverURL}/mining_locations`);
        const fetchedData = await res.json();
        setlandData(fetchedData);
      } catch (error) {
        console.error("There was an error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <GeneralContext.Provider
      value={{
        landData,
        setlandData,
        selectedlandID,
        setSelectedlandID,
        togglelandSelection,
        position,
        setPosition,
        numFeedback,
        setNumFeedback,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
}

function useGeneral(): GeneralContextType {
  const context = useContext(GeneralContext);
  if (context === undefined) {
    throw new Error("GeneralContext was used outside the GeneralProvider");
  }
  return context;
}

export { GeneralProvider, useGeneral };
