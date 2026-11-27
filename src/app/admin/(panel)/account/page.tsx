"use client";

import { useEffect, useState } from "react";
import { Button, Card, PageHeader, PasswordInput, Spinner, api, inputCls, useToast } from "@/components/admin/ui";

export default function AccountPage() {
  const [username, setUsername] = useState("");
  const [isDefault, setIsDefault] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const toast = useToast();

  useEffect(() => {
    api<{ username: string; isDefault: boolean }>("/api/admin/account")
      .then((a) => {
        setUsername(a.username);
        setIsDefault(a.isDefault);
        setLoaded(true);
      })
      .catch((e) => toast(e.message, "error"));
  }, [toast]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setError("");
    if (data.newPassword !== data.confirmPassword) {
      setError("New passwords don't match");
      return;
    }
    setSaving(true);
    try {
      await api("/api/admin/account", {
        method: "PUT",
        json: { currentPassword: data.currentPassword, username: data.username, newPassword: data.newPassword || undefined },
      });
      toast("Account updated");
      // Reload so the layout picks up the new username / clears the default-password warning.
      setTimeout(() => window.location.reload(), 600);
    } catch (err) {
      setError((err as Error).message);
      setSaving(false);
    }
  }

  return (
    <>
      <PageHeader eyebrow="Inbox & account" title="Account & password" description="Change the username and password you use to sign in." />
      {!loaded ? (
        <div className="flex justify-center py-20">
          <Spinner />
        </div>
      ) : (
        <Card className="max-w-xl">
          <form onSubmit={onSubmit} className="space-y-5">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-white/70">Username</span>
              <input name="username" defaultValue={username} required minLength={3} maxLength={50} autoCapitalize="none" autoComplete="username" className={inputCls} />
            </label>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-white/70">New password</span>
                <PasswordInput
                  name="newPassword"
                  minLength={8}
                  required={isDefault}
                  autoComplete="new-password"
                  placeholder={isDefault ? "Required" : "Leave blank to keep"}
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-white/70">Confirm new password</span>
                <PasswordInput name="confirmPassword" autoComplete="new-password" />
              </label>
            </div>
            <p className="text-xs text-white/40">At least 8 characters. Changing your login signs out every other device.</p>
            <hr className="border-white/5" />
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-white/70">Current password</span>
              <PasswordInput name="currentPassword" required autoComplete="current-password" />
            </label>
            {error && <p className="text-sm text-rose-400">{error}</p>}
            <Button type="submit" disabled={saving}>
              {saving && <Spinner />} Save changes
            </Button>
          </form>
        </Card>
      )}
    </>
  );
}
