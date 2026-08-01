"use client";

import { useEffect, useState } from "react";
import {
  getPricingSettingsAdmin,
  updatePricingSettings,
} from "@/lib/quote/actions/admin";
import { formatCopCurrency } from "@/lib/quote/utils";
import type { PricingSettings } from "@/lib/quote/types";

export default function AdminPricingPage() {
  const [settings, setSettings] = useState<PricingSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const loadSettings = async () => {
    setLoading(true);
    try {
      const data = await getPricingSettingsAdmin();
      if (data) setSettings(data);
    } catch (err) {
      console.error("Error loading pricing settings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    if ((settings.mtb_standard_rate_cop ?? 0) < 140000) {
      return alert("MTB Standard Internal Rate cannot be configured below 140,000 COP/hour.");
    }

    setSaving(true);
    setSuccessMsg("");
    try {
      await updatePricingSettings(settings);
      setSuccessMsg("Global pricing settings saved and persisted to database!");
      setTimeout(() => setSuccessMsg(""), 4000);
      await loadSettings();
    } catch (err) {
      alert(`Failed to save pricing settings: ${(err as Error).message}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-16 text-center text-slate-400 text-sm">
        Loading global pricing settings...
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="py-16 text-center text-red-500 text-sm">
        Failed to load pricing settings from database.
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-light tracking-tight text-slate-900">
          Global Pricing Settings & Rule Controls
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Configure authoritative margins, contingency tiers, urgency multipliers, labor floors, and minimum project values.
        </p>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <span className="material-symbols-outlined text-base text-emerald-600">
            check_circle
          </span>
          {successMsg}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* Section 1: Target Margins */}
        <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span className="material-symbols-outlined text-purple-600 text-lg">
              trending_up
            </span>
            Margin Tiers (%)
          </h2>
          <p className="text-slate-500 text-xs">
            Calculated as: Price = Cost Base / (1 - Margin Rate).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Margin Floor (%)
              </label>
              <input
                type="number"
                step="0.01"
                min="0.05"
                max="0.90"
                value={(settings.margin_floor ?? 0.25) * 100}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    margin_floor: Number(e.target.value) / 100,
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 font-bold"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">Default: 25%</span>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Margin Target (%)
              </label>
              <input
                type="number"
                step="0.01"
                min="0.05"
                max="0.90"
                value={(settings.margin_target ?? 0.35) * 100}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    margin_target: Number(e.target.value) / 100,
                    default_margin: Number(e.target.value) / 100,
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 font-bold"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">Default: 35%</span>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Margin Premium (%)
              </label>
              <input
                type="number"
                step="0.01"
                min="0.05"
                max="0.90"
                value={(settings.margin_premium ?? 0.45) * 100}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    margin_premium: Number(e.target.value) / 100,
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 font-bold"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">Default: 45%</span>
            </div>
          </div>
        </div>

        {/* Section 2: Contingency Tiers */}
        <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-600 text-lg">
              shield
            </span>
            Contingency Risk Tiers (%)
          </h2>
          <p className="text-slate-500 text-xs">
            Risk contingency added directly to the direct labor cost base.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Contingency Small (%)
              </label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                max="0.50"
                value={(settings.contingency_small ?? 0.1) * 100}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    contingency_small: Number(e.target.value) / 100,
                    default_contingency: Number(e.target.value) / 100,
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 font-bold"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">Default: 10%</span>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Contingency Medium (%)
              </label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                max="0.50"
                value={(settings.contingency_medium ?? 0.08) * 100}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    contingency_medium: Number(e.target.value) / 100,
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 font-bold"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">Default: 8%</span>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Contingency Large (%)
              </label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                max="0.50"
                value={(settings.contingency_large ?? 0.07) * 100}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    contingency_large: Number(e.target.value) / 100,
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 font-bold"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">Default: 7%</span>
            </div>
          </div>
        </div>

        {/* Section 3: Urgency Multipliers */}
        <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span className="material-symbols-outlined text-red-600 text-lg">
              speed
            </span>
            Urgency Multipliers
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Normal (1.00x)</label>
              <input
                type="number"
                step="0.05"
                value={settings.urgency_normal ?? 1.0}
                onChange={(e) =>
                  setSettings({ ...settings, urgency_normal: Number(e.target.value) })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 font-bold"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Urgent (1.15x)</label>
              <input
                type="number"
                step="0.05"
                value={settings.urgency_urgent ?? 1.15}
                onChange={(e) =>
                  setSettings({ ...settings, urgency_urgent: Number(e.target.value) })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 font-bold"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Very Urgent (1.30x)</label>
              <input
                type="number"
                step="0.05"
                value={settings.urgency_very_urgent ?? 1.3}
                onChange={(e) =>
                  setSettings({ ...settings, urgency_very_urgent: Number(e.target.value) })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 font-bold"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Critical (1.50x)</label>
              <input
                type="number"
                step="0.05"
                value={settings.urgency_critical ?? 1.5}
                onChange={(e) =>
                  setSettings({ ...settings, urgency_critical: Number(e.target.value) })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 font-bold"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Management Hourly Rates & Minimum Project Value */}
        <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-600 text-lg">
              manage_accounts
            </span>
            Management Hourly Rates & Project Thresholds
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Account Management (COP/hr)
              </label>
              <input
                type="number"
                value={settings.account_mgmt_rate_cop ?? 70000}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    account_mgmt_rate_cop: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 font-bold"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">Default: 70,000 COP/hr</span>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Project Management (COP/hr)
              </label>
              <input
                type="number"
                value={settings.project_mgmt_rate_cop ?? 80000}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    project_mgmt_rate_cop: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 font-bold"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">Default: 80,000 COP/hr</span>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Minimum Project Value (COP)
              </label>
              <input
                type="number"
                value={settings.min_project_value_cop}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    min_project_value_cop: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 font-bold"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                {formatCopCurrency(settings.min_project_value_cop)}
              </span>
            </div>
          </div>
        </div>

        {/* Section 5: MTB Internal Rates */}
        <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-600 text-lg">
              engineering
            </span>
            MTB Internal Labor Rates (COP/hour)
          </h2>
          <p className="text-slate-500 text-xs">
            MTB Standard Rate has a mandatory floor check (&ge; 140,000 COP/hr).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                MTB Standard (Floor 140k COP/hr)
              </label>
              <input
                type="number"
                min="140000"
                value={settings.mtb_standard_rate_cop ?? 140000}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    mtb_standard_rate_cop: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 font-bold"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                MTB Advanced (COP/hr)
              </label>
              <input
                type="number"
                value={settings.mtb_advanced_rate_cop ?? 175000}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    mtb_advanced_rate_cop: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 font-bold"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                MTB Expert (COP/hr)
              </label>
              <input
                type="number"
                value={settings.mtb_expert_rate_cop ?? 200000}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    mtb_expert_rate_cop: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 font-bold"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-all shadow-md flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">save</span>
            {saving ? "Persisting Settings..." : "Save Global Pricing Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
