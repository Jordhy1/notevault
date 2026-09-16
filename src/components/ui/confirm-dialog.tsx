"use client";

type ConfirmDialogProps = { open: boolean; title: string; description: string; confirmLabel?: string; onConfirm: () => void; onCancel: () => void; pending?: boolean };

export function ConfirmDialog({ open, title, description, confirmLabel = "Delete", onConfirm, onCancel, pending = false }: ConfirmDialogProps) {
  if (!open) return null;
  return <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-5" role="dialog" aria-modal="true" aria-labelledby="confirm-title"><div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl dark:bg-zinc-900"><h2 id="confirm-title" className="text-lg font-semibold">{title}</h2><p className="mt-2 text-sm text-zinc-500">{description}</p><div className="mt-6 flex justify-end gap-2"><button onClick={onCancel} disabled={pending} className="rounded-lg border px-4 py-2 text-sm">Cancel</button><button onClick={onConfirm} disabled={pending} className="rounded-lg bg-red-700 px-4 py-2 text-sm text-white disabled:opacity-50">{pending ? "Working..." : confirmLabel}</button></div></div></div>;
}
