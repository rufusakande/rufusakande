import { DndContext, closestCenter, PointerSensor, KeyboardSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2, Play, Image as ImageIcon } from 'lucide-react';

function Row({ id, item, onRemove }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };
  const isVideo = item.type === 'video';
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 p-2 pr-3 bg-white border border-line rounded-xl shadow-sm"
    >
      <button
        type="button"
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing p-1.5 text-ink-muted hover:text-brand-blue"
        aria-label="Réordonner"
      >
        <GripVertical size={18} />
      </button>
      <div className="w-16 h-12 rounded-lg overflow-hidden bg-brand-blue-deep flex-shrink-0 flex items-center justify-center text-white">
        {isVideo ? (
          <Play size={16} fill="currentColor" />
        ) : (
          <img src={item.url} alt="" loading="lazy" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-semibold text-ink flex items-center gap-1.5">
          {isVideo ? <Play size={12} /> : <ImageIcon size={12} />}
          {isVideo ? 'Vidéo' : 'Image'}
        </div>
        <div className="text-xs text-ink-muted truncate">{item.url}</div>
      </div>
      <button
        type="button"
        onClick={() => onRemove(id)}
        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
        aria-label="Supprimer"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}

/**
 * items: [{ id, type: 'image'|'video', url }]
 */
export default function SortableMediaList({ items, onChange }) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);
    onChange(arrayMove(items, oldIndex, newIndex));
  };

  const handleRemove = (id) => onChange(items.filter((i) => i.id !== id));

  if (!items.length) {
    return (
      <div className="text-xs text-ink-muted p-4 bg-surface rounded-xl border border-dashed border-line text-center">
        Aucun média — ajoutez des URLs ci-dessus. Glissez-déposez pour réordonner.
      </div>
    );
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-2">
          {items.map((it) => (
            <Row key={it.id} id={it.id} item={it} onRemove={handleRemove} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
