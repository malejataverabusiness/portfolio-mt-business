"use client";

import { useEffect, useState } from "react";
import {
  getClientsAdmin,
  createClientAdmin,
  updateClientAdmin,
} from "@/lib/quote/actions/admin";

interface AdminClient {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  referral_source?: string;
  created_at: string;
  quotes?: Array<{ id: string; reference_number: string; final_price: number }>;
}

export default function AdminClientsPage() {
  const [clients, setClients] = useState<AdminClient[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getClientsAdmin();
      setClients(data as unknown as AdminClient[]);
    } catch (err) {
      console.error("Error loading clients:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return alert("Client name is required");

    setActionLoading(true);
    try {
      await createClientAdmin({ name, email, company, phone });
      setShowModal(false);
      setName("");
      setEmail("");
      setCompany("");
      setPhone("");
      await loadData();
    } catch (err) {
      alert(`Error creating client: ${(err as Error).message}`);
    } finally {
      setActionLoading(false);
    }
  };

  const filteredClients = clients.filter(
    (c) =>
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase()) ||
      c.company?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-light tracking-tight text-slate-900">
            Client Directory & Portfolio
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage prospective and active client profiles and view quote history.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-all shadow-sm flex items-center gap-2 self-start md:self-auto"
        >
          <span className="material-symbols-outlined text-sm">person_add</span>
          Add New Client
        </button>
      </div>

      {/* Search */}
      <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-4 shadow-sm">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3.5 top-2.5 text-slate-400 text-lg">
            search
          </span>
          <input
            type="text"
            placeholder="Search by client name, email, or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-6 shadow-sm">
        {loading ? (
          <div className="py-16 text-center text-slate-400 text-sm">
            Loading clients directory...
          </div>
        ) : filteredClients.length === 0 ? (
          <div className="py-16 text-center text-slate-500 text-sm">
            No clients found matching your query.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200/80 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="pb-3 px-2">CLIENT NAME</th>
                  <th className="pb-3 px-2">COMPANY</th>
                  <th className="pb-3 px-2">CONTACT EMAIL</th>
                  <th className="pb-3 px-2">PHONE</th>
                  <th className="pb-3 px-2 text-right">TOTAL QUOTES</th>
                  <th className="pb-3 px-2 text-right">CREATED</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredClients.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-2 font-bold text-slate-900">{c.name}</td>
                    <td className="py-3.5 px-2 text-slate-700 font-medium">
                      {c.company || "—"}
                    </td>
                    <td className="py-3.5 px-2 text-slate-600 font-mono">
                      {c.email || "—"}
                    </td>
                    <td className="py-3.5 px-2 text-slate-600 font-mono">
                      {c.phone || "—"}
                    </td>
                    <td className="py-3.5 px-2 text-right font-mono font-bold text-slate-900">
                      {c.quotes?.length || 0}
                    </td>
                    <td className="py-3.5 px-2 text-right text-slate-400">
                      {new Date(c.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h2 className="text-lg font-bold text-slate-900">Add New Client</h2>
              <button
                onClick={() => setShowModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
            <form onSubmit={handleCreateClient} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maria Alejandra"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="client@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Company</label>
                <input
                  type="text"
                  placeholder="Company Name"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Phone</label>
                <input
                  type="text"
                  placeholder="+57 300 000 0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
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
                  {actionLoading ? "Saving..." : "Save Client"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
