"use client";

import React, { useState, useEffect } from "react";
import { useSaaS } from "@/lib/SaaSContext";
import { Settings } from "lucide-react";
import { updateTenant } from "@/app/actions/tenant";
import { LogoUploader } from "@/components/LogoUploader";

export default function TenantListView() {
  const { tenants, updateTenantDetails } = useSaaS();
  const [editingTenant, setEditingTenant] = useState<{ id: string; name: string; domain: string; logoUrl: string } | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Since there's only one tenant for ASAP Kerala, we automatically select it for editing.
  useEffect(() => {
    if (tenants.length > 0 && !editingTenant) {
      const tenant = tenants[0];
      setEditingTenant({ id: tenant.id, name: tenant.name, domain: tenant.domain || "", logoUrl: tenant.logoUrl || "" });
    }
  }, [tenants, editingTenant]);

  if (!editingTenant) {
    return <div className="p-8 text-center text-slate-500">Loading system settings...</div>;
  }

  return (
    <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm overflow-hidden p-6 max-w-2xl">
      <div className="border-b border-slate-100 dark:border-zinc-800 pb-4 mb-6">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-indigo-500" /> System Configuration
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Update your core ERP instance settings.</p>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Instance Name</label>
          <input 
            type="text" 
            value={editingTenant.name} 
            onChange={e => setEditingTenant({ ...editingTenant, name: e.target.value })}
            className="w-full px-4 py-3 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Primary Domain</label>
          <input 
            type="text" 
            value={editingTenant.domain} 
            onChange={e => setEditingTenant({ ...editingTenant, domain: e.target.value })}
            className="w-full px-4 py-3 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Institution Logo</label>
          <div className="bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl p-4">
            <LogoUploader 
              tenantId={editingTenant.id} 
              currentLogoUrl={editingTenant.logoUrl || null} 
              onUploadSuccess={(url) => setEditingTenant({ ...editingTenant, logoUrl: url })}
            />
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100 dark:border-zinc-800 flex justify-end">
        <button 
          onClick={async () => {
            setIsSaving(true);
            const res = await updateTenant(editingTenant.id, {
              name: editingTenant.name,
              domain: editingTenant.domain,
              logoUrl: editingTenant.logoUrl
            });
            
            if (res.success) {
              updateTenantDetails(editingTenant.id, {
                name: editingTenant.name,
                domain: editingTenant.domain,
                logoUrl: editingTenant.logoUrl
              });
              alert("Settings saved successfully!");
            } else {
              alert("Failed to update settings: " + (res.error || "Unknown error"));
            }
            setIsSaving(false);
          }}
          disabled={isSaving}
          className="px-6 py-3 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500/20 disabled:opacity-50 transition-all shadow-sm shadow-indigo-500/20"
        >
          {isSaving ? "Saving..." : "Save Configuration"}
        </button>
      </div>
    </div>
  );
}
