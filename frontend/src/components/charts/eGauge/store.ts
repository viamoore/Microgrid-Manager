import { create } from "zustand";

interface EGaugeConfig {
  name: string;
  period: string;
  source: string;
}

interface EGaugeConfigState {
  config: EGaugeConfig[];
  saveConfigValues: ({
    newConfigState,
  }: {
    newConfigState: EGaugeConfig;
  }) => void;
}

const mockEGaugeConfig = [
  {
    name: "Kitchen",
    source: "S1_L1",
    period: "30 seconds",
  } as EGaugeConfig,
  {
    name: "HVAC",
    source: "S7_L1",
    period: "30 seconds",
  } as EGaugeConfig,
  {
    name: "WATER",
    source: "S9_L1",
    period: "1 minute",
  } as EGaugeConfig,
];

const useEGaugeConfigStore = create<EGaugeConfigState>((set) => ({
  config: mockEGaugeConfig,
  saveConfigValues: ({ newConfigState }: { newConfigState: EGaugeConfig }) =>
    set((state) => {
      const isValid = Object.values(newConfigState).every(
        (value) => value !== undefined && value !== null,
      );
      if (!isValid) return state;

      const newState = state.config;
      const ref = newConfigState.name;

      const idx = newState.findIndex((config) => config.name === ref);
      newState[idx] = newConfigState;

      return { ...state, config: newState };
    }),
}));

export default useEGaugeConfigStore;
