"use client";

import { useEffect, useState } from "react";
import { getRoleRatesAdmin, updateRoleRateAdmin } from "@/lib/quote/actions/admin";
import { formatCopCurrency } from "@/lib/quote/utils";

interface RateRecord {
  id: string;
  role_id: string;
  seniority: "Junior" | "Mid" | "Senior";
  rate_cop: number;
  is_active: boolean;
  roles?: {
    name?: string;
  } | null;
}

export default function AdminRatesPage() {
  const [rates, setRates] = useState<RateRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState<number>(0);
  const [saving, setSaving] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getRoleRatesAdmin();
      setRates(data as unknown as RateRecord[]);
    } catch (err) {
      console.error("Error loading role rates:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStartEdit = (rate: RateRecord) => {
    setEditingId(rate.id);
    setEditingValue(rate.rate_cop);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleSaveEdit = async (id: string) => {
    setSaving(true);
    try {
      await updateRoleRateAdmin(id, Number(editingValue));
      setEditingId(null);
      await loadData();
    } catch (err) {
      alert(`Error updating rate: ${(err as Error).message}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-light tracking-tight text-slate-900">
          Role Hourly Rates (COP)
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage internal hourly billing rates by seniority level (Junior, Mid, Senior). Changes persist immediately to the estimation engine database.
        </p>
      </div>

      {/* Rates Table */}
      <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-6 shadow-sm">
        {loading ? (
          <div className="py-16 text-center text-slate-400 text-sm">
            Loading rate card matrix...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200/80 text-slate-400 font-semibold uppercase tracking-wider sticky top-0 bg-slate-50/90">
                  <th className="pb-3 px-2">ROLE NAME</th>
                  <th className="pb-3 px-2">SENIORITY LEVEL</th>
                  <th className="pb-3 px-2 text-right">HOURLY RATE (COP)</th>
                  <th className="pb-3 px-2 text-right font-mono">STATUS</th>
                  <th className="pb-3 px-2 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rates.map((r) => {
                  const isEditing = editingId === r.id;
                  return (
                    <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-2 font-bold text-slate-900">
                        {r.roles?.name || "Unassigned Role"}
                      </td>
                      <td className="py-3.5 px-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-semibold uppercase ${
                            r.seniority === "Senior"
                              ? "bg-purple-100 text-purple-800"
                              : r.seniority === "Mid"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {r.seniority}
                        </span>
                      </td>
                      <td className="py-3.5 px-2 text-right font-mono font-bold text-slate-900 text-sm">
                        {isEditing ? (
                          <div className="inline-flex items-center gap-1">
                            <label htmlFor={`rateInput_${r.id}`} className="sr-only">
                              Edit hourly rate for {r.roles?.name} {r.seniority}
                            </label>
                            <input
                              id={`rateInput_${r.id}`}
                              type="number"
                              value={editingValue}
                              onChange={(e) => setEditingValue(Number(e.target.value))}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") handleSaveEdit(r.id);
                                if (e.key === "Escape") handleCancelEdit();
                              }}
                              className="w-32 px-2 py-1 bg-white border border-slate-300 rounded text-xs font-mono font-bold text-right focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
                            />
                            <span className="text-slate-400 text-xs">COP</span>
                          </div>
                        ) : (
                          formatCopCurrency(r.rate_cop)
                        )}
                      </td>
                      <td className="py-3.5 px-2 text-right">
                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase ${
                            r.is_active
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {r.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="py-3.5 px-2 text-right space-x-1">
                        {isEditing ? (
                          <>
                            <button
                              disabled={saving}
                              onClick={() => handleSaveEdit(r.id)}
                              className="px-3 py-1 rounded bg-slate-900 text-white font-bold text-[11px] hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-slate-900"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="px-2 py-1 rounded bg-slate-100 text-slate-600 font-semibold text-[11px] hover:bg-slate-200 focus-visible:ring-2 focus-visible:ring-slate-900"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleStartEdit(r)}
                            aria-label={`Edit rate for ${r.roles?.name} ${r.seniority}`}
                            className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 font-semibold text-[11px] hover:bg-slate-200 focus-visible:ring-2 focus-visible:ring-slate-900"
                          >
                            Edit Rate
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
