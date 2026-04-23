import { FormData } from "./types";
import { BRAZILIAN_STATES, PROFILE_OPTIONS } from "@/data/brazilian-states";
import CitySearch from "./CitySearch";

interface Step2Props {
  data: FormData;
  onChange: (field: keyof FormData, value: string) => void;
  errors: Record<string, string>;
}

const Step2Location = ({ data, onChange, errors }: Step2Props) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block font-display text-[11px] tracking-wider uppercase text-dark/50 mb-2">
          Estado *
        </label>
        <select
          value={data.state}
          onChange={(e) => {
            onChange("state", e.target.value);
            onChange("city", ""); // reset city on state change
          }}
          className={`w-full bg-white/60 border ${errors.state ? "border-red-400" : "border-dark/10"} rounded-[10px] px-4 py-3.5 font-body text-[15px] text-dark focus:outline-none focus:border-dark/30 transition-colors appearance-none`}
        >
          <option value="">Selecione seu estado</option>
          {BRAZILIAN_STATES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        {errors.state && <p className="text-red-500 text-xs mt-1.5 font-body">{errors.state}</p>}
      </div>

      <CitySearch
        value={data.city}
        state={data.state}
        onChange={(city) => onChange("city", city)}
        error={errors.city}
      />

      <div>
        <label className="block font-display text-[11px] tracking-wider uppercase text-dark/50 mb-2">
          Seu perfil *
        </label>
        <select
          value={data.profile}
          onChange={(e) => onChange("profile", e.target.value)}
          className={`w-full bg-white/60 border ${errors.profile ? "border-red-400" : "border-dark/10"} rounded-[10px] px-4 py-3.5 font-body text-[15px] text-dark focus:outline-none focus:border-dark/30 transition-colors appearance-none`}
        >
          <option value="">Selecione seu perfil</option>
          {PROFILE_OPTIONS.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        {errors.profile && <p className="text-red-500 text-xs mt-1.5 font-body">{errors.profile}</p>}
      </div>
    </div>
  );
};

export default Step2Location;
