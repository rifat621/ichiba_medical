"use client";

import { useState, useEffect, useCallback } from "react";
import { Menu, Plus, KeyRound } from "lucide-react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";

type User = {
  id: string;
  username: string;
  role: string;
  createdAt: string;
};

export default function ManageAccountPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    try {
      const res = await fetch("/api/users", { credentials: "include" });
      const data = await res.json();
      if (data.ok) setUsers(data.users);
    } catch (error) {
      console.error("Fetch users error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  async function handleDelete(id: string) {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();

      if (!data.ok) {
        alert(data.message || "Failed to delete user");
        return;
      }

      alert("User deleted successfully!");
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (error) {
      console.error("Delete user error:", error);
      alert("An error occurred. Please try again.");
    }
  }

  async function handleEdit(user: User) {
    const allowedRoles = ["ADMIN", "STAFF"];

    const newUsername = window.prompt("Username", user.username)?.trim();
    if (!newUsername) return;

    const roleInput = window
      .prompt("Role (ADMIN / STAFF)", user.role.toUpperCase())
      ?.trim()
      .toUpperCase();

    if (!roleInput || !allowedRoles.includes(roleInput)) {
      alert("Invalid role. Use ADMIN or STAFF.");
      return;
    }

    try {
      const res = await fetch(`/api/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          username: newUsername,
          role: roleInput,
        }),
      });

      const data = await res.json();
      if (!data.ok) {
        alert(data.message || "Failed to update user");
        return;
      }

      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, ...data.user } : u))
      );
    } catch (error) {
      console.error("Update user error:", error);
      alert("An error occurred. Please try again.");
    }
  }

  // 🔐 Reset Password
  async function handleResetPassword(user: User) {
    const newPass = window
      .prompt(`Set new password for ${user.username}`)
      ?.trim();

    if (!newPass) return;

    if (newPass.length < 6) {
      alert("Password minimal 6 karakter.");
      return;
    }

    try {
      const res = await fetch(`/api/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ password: newPass }),
      });

      const data = await res.json();
      if (!data.ok) {
        alert(data.message || "Failed to reset password");
        return;
      }

      alert("Password berhasil di-reset!");
    } catch (error) {
      console.error("Reset password error:", error);
      alert("An error occurred. Please try again.");
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="mx-auto max-w-6xl px-6 py-6">
        <button
          onClick={() => setSidebarOpen(true)}
          className="mb-4 grid h-12 w-12 place-items-center rounded-xl text-black hover:bg-slate-100"
        >
          <Menu size={24} />
        </button>

        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-black text-black">
            MANAGE ACCOUNT
          </h1>

          <button
            onClick={() => router.push("/admin/create-account")}
            className="flex items-center gap-2 rounded-2xl bg-teal-700 px-6 py-3 text-sm font-extrabold text-white shadow hover:bg-teal-800"
          >
            <Plus size={18} />
            CREATE ACCOUNT
          </button>
        </div>

        <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 shadow-xl">
          {/* Header */}
          <div className="bg-slate-100 px-6 py-4 grid grid-cols-4 text-xs font-extrabold text-black">
            <div>USERNAME</div>
            <div>ROLE</div>
            <div>CREATED AT</div>
            <div className="text-right">ACTIONS</div>
          </div>

          <div className="divide-y">
            {loading ? (
              <div className="px-6 py-10 text-center text-sm font-semibold text-slate-500">
                Loading...
              </div>
            ) : users.length === 0 ? (
              <div className="px-6 py-10 text-center text-sm font-semibold text-slate-500">
                No users found.
              </div>
            ) : (
              users.map((u) => (
                <div
                  key={u.id}
                  className="px-6 py-4 grid grid-cols-4 items-center text-sm font-semibold text-black"
                >
                  <div>{u.username}</div>
                  <div>{u.role}</div>
                  <div>{new Date(u.createdAt).toLocaleDateString()}</div>

                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleEdit(u)}
                      className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-extrabold text-slate-900 hover:bg-slate-200"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleResetPassword(u)}
                      className="flex items-center gap-1 rounded-lg bg-amber-100 px-3 py-2 text-xs font-extrabold text-amber-800 hover:bg-amber-200"
                    >
                      <KeyRound size={14} />
                      Reset Password
                    </button>

                    {u.role !== "ADMIN" ? (
                      <button
                        onClick={() => handleDelete(u.id)}
                        className="rounded-lg bg-red-100 px-3 py-2 text-xs font-extrabold text-red-700 hover:bg-red-200"
                      >
                        Delete
                      </button>
                    ) : (
                      <span className="rounded-lg bg-gray-100 px-3 py-2 text-xs font-extrabold text-gray-500 cursor-not-allowed">
                        Protected
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <p className="mt-4 text-xs text-slate-500">
          Catatan: Demi keamanan, password tidak ditampilkan. Jika user lupa password,
          gunakan tombol <b>Reset Password</b> untuk membuat password baru.
        </p>
      </div>
    </main>
  );
}
