'use client';

import React, { createContext, useContext } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
  rectSortingStrategy,
  SortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * Item interface for drag and drop lists
 */
export interface DragDropItem {
  id: string;
  [key: string]: any;
}

/**
 * Context for sharing drag handle listeners
 */
interface DragHandleContextValue {
  attributes: any;
  listeners: any;
  setActivatorNodeRef?: (element: HTMLElement | null) => void;
}

const DragHandleContext = createContext<DragHandleContextValue | null>(null);

/**
 * Props for DragDropList component
 */
export interface DragDropListProps<T extends DragDropItem> {
  /**
   * Array of items to display
   */
  items: T[];
  /**
   * Callback fired when items are reordered
   */
  onReorder: (items: T[]) => void;
  /**
   * Render function for each item
   */
  renderItem: (item: T, isDragging: boolean) => React.ReactNode;
  /**
   * Enable drag handle mode (only drag from handle)
   * @default false
   */
  withHandle?: boolean;
  /**
   * Custom class name for the list container
   */
  className?: string;
  /**
   * Custom class name for list items
   */
  itemClassName?: string;
  /**
   * Sorting strategy for the drag & drop behavior
   * - verticalListSortingStrategy: For vertical lists (default)
   * - rectSortingStrategy: For grid layouts
   * @default verticalListSortingStrategy
   */
  strategy?: SortingStrategy;
}

/**
 * Props for sortable item
 */
interface SortableItemProps {
  id: string;
  children: React.ReactNode;
  withHandle?: boolean;
  className?: string;
}

/**
 * Internal sortable item component
 */
function SortableItem({ id, children, withHandle, className }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  // If using handle, don't attach listeners to the item
  const itemProps = withHandle ? {} : { ...listeners, ...attributes };

  const content = withHandle ? (
    <DragHandleContext.Provider value={{ attributes, listeners, setActivatorNodeRef }}>
      {children}
    </DragHandleContext.Provider>
  ) : (
    children
  );

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'relative transition-opacity',
        isDragging && 'z-50',
        className
      )}
      {...itemProps}
    >
      {content}
    </div>
  );
}

/**
 * Drag handle component for manual drag control
 * Must be used within a DragDropList with withHandle={true}
 */
export interface DragDropHandleProps {
  /**
   * Custom class name
   */
  className?: string;
  /**
   * Handle icon
   */
  icon?: React.ReactNode;
}

export function DragDropHandle({ className, icon }: DragDropHandleProps) {
  const context = useContext(DragHandleContext);

  if (!context) {
    console.warn('DragDropHandle must be used within a DragDropList with withHandle={true}');
    return null;
  }

  const { attributes, listeners, setActivatorNodeRef } = context;

  return (
    <div
      ref={setActivatorNodeRef}
      {...attributes}
      {...listeners}
      className={cn(
        'flex items-center justify-center cursor-grab active:cursor-grabbing',
        'text-[var(--color-text-secondary)] hover:text-[var(--color-foreground)]',
        'transition-colors',
        className
      )}
    >
      {icon || <GripVertical className="w-4 h-4" />}
    </div>
  );
}

/**
 * DragDropList - Sortable list component with drag and drop functionality
 *
 * @example
 * ```tsx
 * const [items, setItems] = useState([
 *   { id: '1', name: 'Item 1' },
 *   { id: '2', name: 'Item 2' },
 * ]);
 *
 * <DragDropList
 *   items={items}
 *   onReorder={setItems}
 *   renderItem={(item) => (
 *     <div className="p-4 bg-surface rounded">{item.name}</div>
 *   )}
 * />
 * ```
 */
export function DragDropList<T extends DragDropItem>({
  items,
  onReorder,
  renderItem,
  withHandle = false,
  className,
  itemClassName,
  strategy = verticalListSortingStrategy,
}: DragDropListProps<T>) {
  const [activeId, setActiveId] = React.useState<string | null>(null);

  // Configure sensors for touch/mouse/keyboard support
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Prevents accidental drags on mobile
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      onReorder(arrayMove(items, oldIndex, newIndex));
    }

    setActiveId(null);
  };

  const activeItem = items.find((item) => item.id === activeId);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={strategy}>
        <div className={cn(strategy === verticalListSortingStrategy && 'space-y-2', className)}>
          {items.map((item) => (
            <SortableItem
              key={item.id}
              id={item.id}
              withHandle={withHandle}
              className={itemClassName}
            >
              {renderItem(item, item.id === activeId)}
            </SortableItem>
          ))}
        </div>
      </SortableContext>

      <DragOverlay>
        {activeId && activeItem ? (
          <div className="opacity-80 shadow-lg">
            {renderItem(activeItem, true)}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

/**
 * Props for DragDropTable component
 */
export interface DragDropTableProps<T extends DragDropItem> {
  /**
   * Array of items to display
   */
  items: T[];
  /**
   * Callback fired when items are reordered
   */
  onReorder: (items: T[]) => void;
  /**
   * Table columns configuration
   */
  columns: {
    key: string;
    header: string;
    render?: (item: T) => React.ReactNode;
  }[];
  /**
   * Custom class name for the table
   */
  className?: string;
}

/**
 * DragDropTable - Sortable table with draggable rows
 *
 * @example
 * ```tsx
 * <DragDropTable
 *   items={data}
 *   onReorder={setData}
 *   columns={[
 *     { key: 'name', header: 'Name' },
 *     { key: 'email', header: 'Email' },
 *   ]}
 * />
 * ```
 */
export function DragDropTable<T extends DragDropItem>({
  items,
  onReorder,
  columns,
  className,
}: DragDropTableProps<T>) {
  const [activeId, setActiveId] = React.useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      onReorder(arrayMove(items, oldIndex, newIndex));
    }

    setActiveId(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className={cn('overflow-x-auto', className)}>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[var(--color-border)]">
              <th className="w-12"></th>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="text-left p-3 text-sm font-medium text-[var(--color-text-secondary)]"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
              {items.map((item) => (
                <TableRow
                  key={item.id}
                  item={item}
                  columns={columns}
                  isDragging={item.id === activeId}
                />
              ))}
            </SortableContext>
          </tbody>
        </table>
      </div>
    </DndContext>
  );
}

interface TableRowProps<T extends DragDropItem> {
  item: T;
  columns: { key: string; header: string; render?: (item: T) => React.ReactNode }[];
  isDragging: boolean;
}

function TableRow<T extends DragDropItem>({ item, columns, isDragging }: TableRowProps<T>) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className={cn(
        'border-b border-[var(--color-border)] hover:bg-[var(--color-hover)]',
        'transition-colors',
        isDragging && 'bg-[var(--color-active)]'
      )}
    >
      <td className="p-3">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-[var(--color-text-secondary)] hover:text-[var(--color-foreground)] transition-colors"
        >
          <GripVertical className="w-4 h-4" />
        </div>
      </td>
      {columns.map((column) => (
        <td key={column.key} className="p-3 text-sm">
          {column.render ? column.render(item) : (item as any)[column.key]}
        </td>
      ))}
    </tr>
  );
}
