"use client";

import { useEffect, useState } from "react";
import {
  getDeliverablesAdmin,
  createDeliverableAdmin,
  updateDeliverableAdmin,
} from "@/lib/quote/actions/admin";

interface DeliverableItem {
  id: string;
  name: string;
  name_es: string;
  description: string;
  deliverable_type: string;
  default_complexity: string;
  estimated_hours: number;
  unit_of_measure: string;
  is_active: boolean;
}

export default function AdminDeliverablesPage() {
  const [deliverables, setDeliverables] = useState<DeliverableItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [nameEs, setNameEs] = useState("");
  const [description, setDescription] = useState("");
  const [deliverableType, setDeliverableType] = useState("asset");
  const [defaultComplexity, setDefaultComplexity] = useState("standard");
  const [estimatedHours, setEstimatedHours] = useState(10);
  const [unitOfMeasure, setUnitOfMeasure] = useState("unit");

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getDeliverablesAdmin();
      setDeliverables(data as unknown as DeliverableItem[]);
    } catch (err) {
      console.error("Error loading deliverables:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return alert("Deliverable name is required");

    setActionLoading(true);
    try {
      await createDeliverableAdmin({
        name,
        name_es: nameEs || name,
        description,
        deliverable_type: deliverableType,
        default_complexity: defaultComplexity,
        estimated_hours: Number(estimatedHours),
        unit_of_measure: unitOfMeasure,
      });
      setShowModal(false);
      setName("");
      setNameEs("");
      setDescription("");
      await loadData();
    } catch (err) {
      alert(`Error creating deliverable: ${(err as Error).message}`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleActive = async (id: string, currentState: boolean) => {
    try {
      await updateDeliverableAdmin(id, { is_active: !currentState });
      await loadData();
    } catch (err) {
      alert(`Failed to update status: ${(err as Error).message}`);
    }
  };

  const filtered = deliverables.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.name_es?.toLowerCase().includes(search.toLowerCase()) ||
      d.deliverable_type?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-light tracking-tight text-slate-900">
            Deliverables Catalog
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage deliverables, estimated baseline hours, complexity defaults, and active states.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-all shadow-sm flex items-center gap-2 self-start md:self-auto"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          Create Deliverable
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-4 shadow-sm">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3.5 top-2.5 text-slate-400 text-lg">
            search
          </span>
          <input
            type="text"
            placeholder="Search deliverables by title or type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
          />
        </div>
      </div>

      {/* Deliverables Table */}
      <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-6 shadow-sm">
        {loading ? (
          <div className="py-16 text-center text-slate-400 text-sm">
            Loading deliverables catalog...
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-slate-500 text-sm">
            No deliverables found matching your query.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200/80 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="pb-3 px-2">DELIVERABLE NAME</th>
                  <th className="pb-3 px-2">TYPE</th>
                  <th className="pb-3 px-2">DEFAULT COMPLEXITY</th>
                  <th className="pb-3 px-2 text-right">BASE HOURS</th>
                  <th className="pb-3 px-2 text-right">UNIT</th>
                  <th className="pb-3 px-2">STATUS</th>
                  <th className="pb-3 px-2 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-2">
                      <span className="font-bold text-slate-900 block">{d.name}</span>
                      <span className="text-[11px] text-slate-400">{d.name_es}</span>
                    </td>
                    <td className="py-3.5 px-2 font-medium text-slate-600">
                      <span className="inline-block px-2 py-0.5 rounded bg-slate-100 uppercase text-[10px]">
                        {d.deliverable_type}
                      </span>
                    </td>
                    <td className="py-3.5 px-2">
                      <span className="inline-block px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-800 font-semibold text-[11px] uppercase">
                        {d.default_complexity}
                      </span>
                    </td>
                    <td className="py-3.5 px-2 text-right font-mono font-bold text-slate-900 text-sm">
                      {d.estimated_hours} hrs
                    </td>
                    <td className="py-3.5 px-2 text-right text-slate-500 font-mono">
                      {d.unit_of_measure}
                    </td>
                    <td className="py-3.5 px-2">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${
                          d.is_active
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {d.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="py-3.5 px-2 text-right">
                      <button
                        onClick={() => handleToggleActive(d.id, d.is_active)}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                          d.is_active
                            ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            : "bg-emerald-600 text-white hover:bg-emerald-700"
                        }`}
                      >
                        {d.is_active ? "Deactivate" : "Activate"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h2 className="text-lg font-bold text-slate-900">Create New Deliverable</h2>
              <button
                onClick={() => setShowModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Name (English)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. E-Commerce Checkout Module"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Name (Spanish)</label>
                <input
                  type="text"
                  placeholder="e.g. Módulo Checkout E-Commerce"
                  value={nameEs}
                  onChange={(e) => setNameEs(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Deliverable Type</label>
                  <select
                    value={deliverableType}
                    onChange={(e) => setDeliverableType(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  >
                    <option value="asset">Asset</option>
                    <option value="feature">Feature</option>
                    <option value="service">Service</option>
                    <option value="campaign">Campaign</option>
                    <option value="system">System</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Default Complexity</label>
                  <select
                    value={defaultComplexity}
                    onChange={(e) => setDefaultComplexity(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  >
                    <option value="basic">Basic (0.7x)</option>
                    <option value="standard">Standard (1.0x)</option>
                    <option value="advanced">Advanced (1.4x)</option>
                    <option value="enterprise">Enterprise (2.0x)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Base Estimated Hours</label>
                  <input
                    type="number"
                    value={estimatedHours}
                    onChange={(e) => setEstimatedHours(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Unit of Measure</label>
                  <input
                    type="text"
                    value={unitOfMeasure}
                    onChange={(e) => setUnitOfMeasure(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800"
                >
                  {actionLoading ? "Creating..." : "Save Deliverable"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
