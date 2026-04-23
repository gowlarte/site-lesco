import { useState, useRef, useEffect, useCallback } from "react";

interface CitySearchProps {
  value: string;
  state: string;
  onChange: (city: string) => void;
  error?: string;
}

// Lazy-loaded city list per state from IBGE API
const cityCache: Record<string, string[]> = {};

const fetchCities = async (uf: string): Promise<string[]> => {
  if (cityCache[uf]) return cityCache[uf];
  try {
    const res = await fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios?orderBy=nome`
    );
    const data = await res.json();
    const cities = data.map((c: { nome: string }) => c.nome);
    cityCache[uf] = cities;
    return cities;
  } catch {
    return [];
  }
};

const CitySearch = ({ value, state, onChange, error }: CitySearchProps) => {
  const [query, setQuery] = useState(value);
  const [cities, setCities] = useState<string[]>([]);
  const [filtered, setFiltered] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  // Load cities when state changes
  useEffect(() => {
    if (!state) {
      setCities([]);
      setQuery("");
      onChange("");
      return;
    }
    fetchCities(state).then(setCities);
  }, [state]);

  // Sync external value
  useEffect(() => {
    setQuery(value);
  }, [value]);

  const filterCities = useCallback(
    (q: string) => {
      if (!q.trim()) {
        setFiltered([]);
        return;
      }
      const lower = q.toLowerCase();
      setFiltered(cities.filter((c) => c.toLowerCase().includes(lower)).slice(0, 20));
    },
    [cities]
  );

  const handleInputChange = (val: string) => {
    setQuery(val);
    setHighlightIndex(-1);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => filterCities(val), 200);
    setIsOpen(true);
    // Clear selection if user types something different
    if (value && val !== value) onChange("");
  };

  const selectCity = (city: string) => {
    setQuery(city);
    onChange(city);
    setIsOpen(false);
    setFiltered([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || filtered.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && highlightIndex >= 0) {
      e.preventDefault();
      selectCity(filtered[highlightIndex]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <label className="block font-display text-[11px] tracking-wider uppercase text-dark/50 mb-2">
        Cidade *
      </label>
      <input
        type="text"
        value={query}
        onChange={(e) => handleInputChange(e.target.value)}
        onFocus={() => { if (filtered.length > 0) setIsOpen(true); }}
        onKeyDown={handleKeyDown}
        placeholder={state ? "Digite sua cidade" : "Selecione o estado primeiro"}
        disabled={!state}
        className={`w-full bg-white/60 border ${error ? "border-red-400" : "border-dark/10"} rounded-[10px] px-4 py-3.5 font-body text-[15px] text-dark placeholder:text-dark/30 focus:outline-none focus:border-dark/30 transition-colors disabled:opacity-40`}
      />
      {error && <p className="text-red-500 text-xs mt-1.5 font-body">{error}</p>}

      {isOpen && filtered.length > 0 && (
        <div className="absolute z-50 top-full mt-1 w-full bg-white rounded-[10px] border border-dark/10 shadow-lg max-h-[200px] overflow-y-auto">
          {filtered.map((city, i) => (
            <button
              key={city}
              type="button"
              onClick={() => selectCity(city)}
              className={`w-full text-left px-4 py-2.5 font-body text-[14px] text-dark hover:bg-dark/5 transition-colors ${
                i === highlightIndex ? "bg-dark/5" : ""
              } ${i === 0 ? "rounded-t-[10px]" : ""} ${i === filtered.length - 1 ? "rounded-b-[10px]" : ""}`}
            >
              {city}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CitySearch;
