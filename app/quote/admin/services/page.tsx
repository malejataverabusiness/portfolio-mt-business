"use client";

import { useEffect, useState } from "react";
import {
  getServicesAdmin,
  createServiceAdmin,
  updateServiceAdmin,
  createCategoryAdmin,
  updateCategoryAdmin,
} from "@/lib/quote/actions/admin";

interface AdminCategory {
  id: string;
  name: string;
  name_es: string;
  slug: string;
  display_order: number;
  is_active: boolean;
}

interface AdminService {
  id: string;
  category_id: string;
  name: string;
  name_es: string;
  description: string;
  is_active: boolean;
}

export default function AdminServicesPage() {
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [services, setServices] = useState<AdminService[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"services" | "categories">("services");
  const [actionLoading, setActionLoading] = useState(false);

  // Modal states
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);

  // Category form state
  const [catName, setCatName] = useState("");
  const [catNameEs, setCatNameEs] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [catOrder, setCatOrder] = useState(1);

  // Service form state
  const [srvCatId, setSrvCatId] = useState("");
  const [srvName, setSrvName] = useState("");
  const [srvNameEs, setSrvNameEs] = useState("");
  const [srvDesc, setSrvDesc] = useState("");

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getServicesAdmin();
      setCategories(data.categories as unknown as AdminCategory[]);
      setServices(data.services as unknown as AdminService[]);
      if (data.categories.length > 0 && !srvCatId) {
        setSrvCatId(data.categories[0].id);
      }
    } catch (err) {
      console.error("Error loading services data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName.trim() || !catSlug.trim()) return alert("Name and Slug are required");

    setActionLoading(true);
    try {
      await createCategoryAdmin({
        name: catName,
        name_es: catNameEs || catName,
        slug: catSlug,
        display_order: Number(catOrder),
      });
      setShowCategoryModal(false);
      setCatName("");
      setCatNameEs("");
      setCatSlug("");
      await loadData();
    } catch (err) {
      alert(`Error creating category: ${(err as Error).message}`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleCreateService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!srvName.trim() || !srvCatId) return alert("Service name and Category are required");

    setActionLoading(true);
    try {
      await createServiceAdmin({
        category_id: srvCatId,
        name: srvName,
        name_es: srvNameEs || srvName,
        description: srvDesc,
      });
      setShowServiceModal(false);
      setSrvName("");
      setSrvNameEs("");
      setSrvDesc("");
      await loadData();
    } catch (err) {
      alert(`Error creating service: ${(err as Error).message}`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleCategoryActive = async (id: string, current: boolean) => {
    try {
      await updateCategoryAdmin(id, { is_active: !current });
      await loadData();
    } catch (err) {
      alert(`Error updating category: ${(err as Error).message}`);
    }
  };

  const handleToggleServiceActive = async (id: string, current: boolean) => {
    try {
      await updateServiceAdmin(id, { is_active: !current });
      await loadData();
    } catch (err) {
      alert(`Error updating service: ${(err as Error).message}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-light tracking-tight text-slate-900">
            Services & Categories
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage industry categories, service packages, and default component mappings.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCategoryModal(true)}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            New Category
          </button>
          <button
            onClick={() => setShowServiceModal(true)}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-all shadow-sm flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            New Service
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab("services")}
          className={`px-4 py-2.5 text-xs font-bold transition-all border-b-2 ${
            activeTab === "services"
              ? "border-slate-900 text-slate-900"
              : "border-transparent text-slate-400 hover:text-slate-700"
          }`}
        >
          Services ({services.length})
        </button>
        <button
          onClick={() => setActiveTab("categories")}
          className={`px-4 py-2.5 text-xs font-bold transition-all border-b-2 ${
            activeTab === "categories"
              ? "border-slate-900 text-slate-900"
              : "border-transparent text-slate-400 hover:text-slate-700"
          }`}
        >
          Categories ({categories.length})
        </button>
      </div>

      {/* Services Table */}
      {activeTab === "services" && (
        <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-6 shadow-sm">
          {loading ? (
            <div className="py-16 text-center text-slate-400 text-sm">Loading services...</div>
          ) : services.length === 0 ? (
            <div className="py-16 text-center text-slate-500 text-sm">No services found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200/80 text-slate-400 font-semibold uppercase tracking-wider">
                    <th className="pb-3 px-2">SERVICE NAME</th>
                    <th className="pb-3 px-2">CATEGORY</th>
                    <th className="pb-3 px-2">DESCRIPTION</th>
                    <th className="pb-3 px-2">STATUS</th>
                    <th className="pb-3 px-2 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {services.map((s) => {
                    const cat = categories.find((c) => c.id === s.category_id);
                    return (
                      <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-2">
                          <span className="font-bold text-slate-900 block">{s.name}</span>
                          <span className="text-[11px] text-slate-400">{s.name_es}</span>
                        </td>
                        <td className="py-3.5 px-2 font-medium text-slate-700">
                          {cat?.name || "Unassigned"}
                        </td>
                        <td className="py-3.5 px-2 text-slate-500 max-w-xs truncate">
                          {s.description || "—"}
                        </td>
                        <td className="py-3.5 px-2">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${
                              s.is_active
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {s.is_active ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="py-3.5 px-2 text-right">
                          <button
                            onClick={() => handleToggleServiceActive(s.id, s.is_active)}
                            className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold text-xs hover:bg-slate-200"
                          >
                            {s.is_active ? "Deactivate" : "Activate"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Categories Table */}
      {activeTab === "categories" && (
        <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-6 shadow-sm">
          {loading ? (
            <div className="py-16 text-center text-slate-400 text-sm">Loading categories...</div>
          ) : categories.length === 0 ? (
            <div className="py-16 text-center text-slate-500 text-sm">No categories found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200/80 text-slate-400 font-semibold uppercase tracking-wider">
                    <th className="pb-3 px-2">CATEGORY NAME</th>
                    <th className="pb-3 px-2">SLUG</th>
                    <th className="pb-3 px-2 text-right">DISPLAY ORDER</th>
                    <th className="pb-3 px-2">STATUS</th>
                    <th className="pb-3 px-2 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {categories.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-2">
                        <span className="font-bold text-slate-900 block">{c.name}</span>
                        <span className="text-[11px] text-slate-400">{c.name_es}</span>
                      </td>
                      <td className="py-3.5 px-2 font-mono text-slate-600">{c.slug}</td>
                      <td className="py-3.5 px-2 text-right font-mono font-bold text-slate-900">
                        {c.display_order}
                      </td>
                      <td className="py-3.5 px-2">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${
                            c.is_active
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {c.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="py-3.5 px-2 text-right">
                        <button
                          onClick={() => handleToggleCategoryActive(c.id, c.is_active)}
                          className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold text-xs hover:bg-slate-200"
                        >
                          {c.is_active ? "Deactivate" : "Activate"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h2 className="text-lg font-bold text-slate-900">Create New Category</h2>
              <button
                onClick={() => setShowCategoryModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
            <form onSubmit={handleCreateCategory} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Category Name (English)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bespoke Systems"
                  value={catName}
                  onChange={(e) => {
                    setCatName(e.target.value);
                    if (!catSlug) setCatSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"));
                  }}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Category Name (Spanish)</label>
                <input
                  type="text"
                  placeholder="e.g. Sistemas a la Medida"
                  value={catNameEs}
                  onChange={(e) => setCatNameEs(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Slug</label>
                  <input
                    type="text"
                    required
                    value={catSlug}
                    onChange={(e) => setCatSlug(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Display Order</label>
                  <input
                    type="number"
                    value={catOrder}
                    onChange={(e) => setCatOrder(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowCategoryModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800"
                >
                  {actionLoading ? "Saving..." : "Save Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Service Modal */}
      {showServiceModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h2 className="text-lg font-bold text-slate-900">Create New Service</h2>
              <button
                onClick={() => setShowServiceModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
            <form onSubmit={handleCreateService} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Category</label>
                <select
                  value={srvCatId}
                  onChange={(e) => setSrvCatId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Service Name (English)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Full-Stack Web System"
                  value={srvName}
                  onChange={(e) => setSrvName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Service Name (Spanish)</label>
                <input
                  type="text"
                  placeholder="e.g. Sistema Web Full-Stack"
                  value={srvNameEs}
                  onChange={(e) => setSrvNameEs(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={srvDesc}
                  onChange={(e) => setSrvDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowServiceModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800"
                >
                  {actionLoading ? "Saving..." : "Save Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
