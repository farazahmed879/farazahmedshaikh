"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, Reorder } from "framer-motion";
import { Button, Card, Modal, PageHeader, Spinner, api, useToast } from "./ui";
import { FieldsForm, IconBtn, type Field } from "./fields";

type Item = { id?: string; [key: string]: any };

export default function CollectionManager({
  collection,
  title,
  description,
  singular,
  fields,
  empty,
  primary,
  secondary,
  image,
}: {
  collection: "experiences" | "projects" | "skills";
  title: string;
  description: string;
  singular: string;
  fields: Field[];
  empty: Item;
  primary: string;
  secondary?: (item: Item) => string;
  image?: string;
}) {
  const [items, setItems] = useState<Item[] | null>(null);
  const [editing, setEditing] = useState<Item | null>(null);
  const [saving, setSaving] = useState(false);
  const [dirtyOrder, setDirtyOrder] = useState(false);
  const toast = useToast();
  const base = `/api/admin/collections/${collection}`;

  useEffect(() => {
    api<Item[]>(base)
      .then(setItems)
      .catch((e) => toast(e.message, "error"));
  }, [base, toast]);

  async function save() {
    if (!editing) return;
    setSaving(true);
    try {
      if (editing.id) {
        const updated = await api<Item>(`${base}/${editing.id}`, { method: "PUT", json: editing });
        setItems((list) => list!.map((x) => (x.id === updated.id ? updated : x)));
      } else {
        const created = await api<Item>(base, { method: "POST", json: editing });
        setItems((list) => [...(list ?? []), created]);
      }
      toast(`${singular} saved`);
      setEditing(null);
    } catch (e) {
      toast((e as Error).message, "error");
    } finally {
      setSaving(false);
    }
  }

  async function remove(item: Item) {
    if (!confirm(`Delete "${item[primary]}"? This cannot be undone.`)) return;
    try {
      await api(`${base}/${item.id}`, { method: "DELETE" });
      setItems((list) => list!.filter((x) => x.id !== item.id));
      toast(`${singular} deleted`);
    } catch (e) {
      toast((e as Error).message, "error");
    }
  }

  async function saveOrder() {
    try {
      await api(`${base}/reorder`, { method: "POST", json: { ids: items!.map((x) => x.id) } });
      setDirtyOrder(false);
      toast("Order saved");
    } catch (e) {
      toast((e as Error).message, "error");
    }
  }

  return (
    <>
      <PageHeader
        title={title}
        description={description}
        actions={
          <>
            {dirtyOrder && (
              <Button variant="ghost" onClick={saveOrder}>
                Save order
              </Button>
            )}
            <Button onClick={() => setEditing({ ...empty })}>+ New {singular.toLowerCase()}</Button>
          </>
        }
      />

      {!items ? (
        <div className="flex justify-center py-20">
          <Spinner />
        </div>
      ) : items.length === 0 ? (
        <Card className="py-16 text-center text-white/50">No {title.toLowerCase()} yet. Create your first one.</Card>
      ) : (
        <>
          <p className="mb-3 text-xs text-white/40">Drag rows to reorder, then click “Save order”.</p>
          <Reorder.Group
            axis="y"
            values={items}
            onReorder={(v) => {
              setItems(v);
              setDirtyOrder(true);
            }}
            className="space-y-2"
          >
            <AnimatePresence initial={false}>
              {items.map((item) => (
                <Reorder.Item
                  key={item.id}
                  value={item}
                  className="flex cursor-grab items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-3 pr-4 transition-colors hover:bg-white/[0.05] active:cursor-grabbing"
                >
                  <span className="pl-1 text-white/25 select-none">⋮⋮</span>
                  {image && (
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-white/5">
                      {item[image] && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={item[image]} alt="" className="h-full w-full object-contain" draggable={false} />
                      )}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-white">{item[primary] || "Untitled"}</p>
                    {secondary && <p className="truncate text-sm text-white/45">{secondary(item)}</p>}
                  </div>
                  <div className="flex gap-1.5" onPointerDown={(e) => e.stopPropagation()}>
                    <IconBtn onClick={() => setEditing(structuredClone(item))} label="Edit">
                      ✎
                    </IconBtn>
                    <IconBtn onClick={() => remove(item)} label="Delete" danger>
                      🗑
                    </IconBtn>
                  </div>
                </Reorder.Item>
              ))}
            </AnimatePresence>
          </Reorder.Group>
        </>
      )}

      <Modal open={!!editing} onClose={() => !saving && setEditing(null)} title={editing?.id ? `Edit ${singular.toLowerCase()}` : `New ${singular.toLowerCase()}`}>
        <div className="flex-1 overflow-y-auto p-6">{editing && <FieldsForm fields={fields} value={editing} onChange={setEditing} />}</div>
        <div className="flex justify-end gap-2 border-t border-white/10 px-6 py-4">
          <Button variant="ghost" onClick={() => setEditing(null)} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={save} disabled={saving || !editing?.[primary]}>
            {saving && <Spinner />} Save
          </Button>
        </div>
      </Modal>
    </>
  );
}
