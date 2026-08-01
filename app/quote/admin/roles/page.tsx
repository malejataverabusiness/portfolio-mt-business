"use client";

import { useEffect, useState } from "react";
import {
  getRolesAdmin,
  createRoleAdmin,
  updateRoleAdmin,
} from "@/lib/quote/actions/admin";

interface AdminRole {
  id: string;
  name: string;
  name_es: string;
  seniority: string;
  is_mtb_internal: boolean;
  is_active: boolean;
  role_rates?: Array<{ id: string; hourly_rate_cop: number; is_active: boolean }>;
}

export default function AdminRolesPage() {
  const [roles, setRoles] = useState<AdminRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // New role form state
  const [name, setName] = useState("");
  const [nameEs, setNameEs] = useState("");
  const [seniority, setSeniority] = useState("mid");
  const [isMtbInternal, setIsMtbInternal] = useState(false);
  const [initialRateCop, setInitialRateCop] = useState(50000);

  const loadRoles = async () => {
    setLoading(true);
    try {
      const data = await getRolesAdmin();
      setRoles(data as unknown as AdminRole[]);
    } catch (err) {
      console.error("Failed to load roles:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRoles();
  }, []);

  const handleCreateRole = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return alert("Role name is required");

    setActionLoading(true);
    try {
      await createRoleAdmin({
        name,
        name_es: nameEs || name,
        seniority,
        is_mtb_internal: isMtbInternal,
        hourly_rate_cop: Number(initialRateCop),
      });
      setShowModal(false);
      setName("");
      setNameEs("");
      await loadRoles();
    } catch (err) {
      alert(`Error creating role: ${(err as Error).message}`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleActive = async (roleId: string, currentState: boolean) => {
    try {
      await updateRoleAdmin(roleId, { is_active: !currentState });
      await loadRoles();
    } catch (err) {
      alert(`Failed to update status: ${(err as Error).message}`);
    }
  };

  const filteredRoles = roles.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.name_es?.toLowerCase().includes(search.toLowerCase()) ||
      r.seniority.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-light tracking-tight text-slate-900">
            Roles & Descriptions Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage titles, seniorities, billing classifications, and active states for estimation labor.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-all shadow-sm flex items-center gap-2 self-start md:self-auto"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          Create New Role
        </button>
      </div>

      {/* Filter & Search */}
      <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-4 shadow-sm flex items-center gap-4">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3.5 top-2.5 text-slate-400 text-lg">
            search
          </span>
          <input
            type="text"
            placeholder="Search role titles or seniorities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
          />
        </div>
      </div>

      {/* Roles List Table */}
      <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-6 shadow-sm">
        {loading ? (
          <div className="py-16 text-center text-slate-400 text-sm">
            Loading roles database...
          </div>
        ) : filteredRoles.length === 0 ? (
          <div className="py-16 text-center text-slate-500 text-sm">
            No roles found matching your query.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200/80 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="pb-3 px-2">ROLE NAME (ENGLISH)</th>
                  <th className="pb-3 px-2">ROLE NAME (SPANISH)</th>
                  <th className="pb-3 px-2">SENIORITY</th>
                  <th className="pb-3 px-2">CLASSIFICATION</th>
                  <th className="pb-3 px-2">STATUS</th>
                  <th className="pb-3 px-2 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRoles.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-2 font-bold text-slate-900">{r.name}</td>
                    <td className="py-3.5 px-2 text-slate-600">{r.name_es}</td>
                    <td className="py-3.5 px-2">
                      <span className="inline-block px-2.5 py-0.5 rounded-md bg-slate-100 font-semibold text-slate-700 text-[11px] uppercase">
                        {r.seniority}
                      </span>
                    </td>
                    <td className="py-3.5 px-2">
                      {r.is_mtb_internal ? (
                        <span className="inline-block px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-800 font-semibold text-[11px]">
                          MTB Internal
                        </span>
                      ) : (
                        <span className="inline-block px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600 font-semibold text-[11px]">
                          External Talent
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-2">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${
                          r.is_active
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {r.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="py-3.5 px-2 text-right">
                      <button
                        onClick={() => handleToggleActive(r.id, r.is_active)}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                          r.is_active
                            ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            : "bg-emerald-600 text-white hover:bg-emerald-700"
                        }`}
                      >
                        {r.is_active ? "Deactivate" : "Activate"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create Role Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h2 className="text-lg font-bold text-slate-900">Create New Role</h2>
              <button
                onClick={() => setShowModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateRole} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Role Name (English)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior Frontend Engineer"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Role Name (Spanish)</label>
                <input
                  type="text"
                  placeholder="e.g. Ingeniero Frontend Senior"
                  value={nameEs}
                  onChange={(e) => setNameEs(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Seniority Level</label>
                  <select
                    value={seniority}
                    onChange={(e) => setSeniority(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  >
                    <option value="junior">Junior</option>
                    <option value="mid">Mid</option>
                    <option value="senior">Senior</option>
                    <option value="standard">Standard (Internal)</option>
                    <option value="advanced">Advanced (Internal)</option>
                    <option value="expert">Expert (Internal)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Initial COP Rate/hr</label>
                  <input
                    type="number"
                    value={initialRateCop}
                    onChange={(e) => setInitialRateCop(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="mtbInternal"
                  checked={isMtbInternal}
                  onChange={(e) => setIsMtbInternal(e.target.checked)}
                  className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                />
                <label htmlFor="mtbInternal" className="font-medium text-slate-700">
                  This is an MTB Internal Role
                </label>
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
                  {actionLoading ? "Creating..." : "Save Role"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
